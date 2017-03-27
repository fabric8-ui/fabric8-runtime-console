import { SpaceNamespace } from './../space-namespace';
import { Service } from './../../../model/service.model';
import { ReplicaSet } from './../../../model/replicaset.model';
import { Pod } from './../../../model/pod.model';
import { Event } from './../../../model/event.model';
import { ConfigMap } from './../../../model/configmap.model';
import { DeploymentConfig } from './../../../model/deploymentconfig.model';
import { KubernetesResource } from './../../../model/kubernetesresource.model';
import { Environment, Space } from './../../../model/space.model';
import { Params } from '@angular/router';
import { BehaviorSubject, ConnectableObservable, Observable, Subject } from 'rxjs';
import { ServiceService } from './../../../service/service.service';
import { ReplicaSetService } from './../../../service/replicaset.service';
import { PodService } from './../../../service/pod.service';
import { EventService } from './../../../service/event.service';
import { ConfigMapService } from './../../../service/configmap.service';
import { DeploymentConfigService } from './../../../service/deploymentconfig.service';
import { NamespacedResourceService } from '../../../service/namespaced.resource.service';
import { ActivatedRoute } from '@angular/router';
import { SpaceStore } from './../../../store/space.store';
import { Component, OnInit } from "@angular/core";

export let KINDS: Kind[] = [
  {
    name: "ConfigMap",
    path: "configmaps",
  },
  {
    name: "Deployment",
    path: "deployments",
  },
  {
    name: "Event",
    path: "events",
  },
  {
    name: "Pod",
    path: "pods",
  },
  {
    name: "ReplicaSet",
    path: "replicasets",
  },
  {
    name: "Service",
    path: "services",
  },
];

export class EnvironmentEntry {
  environment: Environment;
  kinds: KindNode[];
  loading: boolean;
}

export class Kind {
  name: string;
  path: string;
}

export class KindNode {
  title: Subject<string>;
  environment: Environment;
  kind: Kind;
  children: [
    {
      loading: Observable<boolean>,
      data: Observable<any[]>,
    }
  ];
}

@Component({
  host: {
    'class': "app-component flex-container in-column-direction flex-grow-1"
  },
  selector: 'fabric8-environments-list-page',
  templateUrl: './list-page.environment.component.html',
  styleUrls: ['./list-page.environment.component.scss'],
})
export class EnvironmentListPageComponent implements OnInit {

  environments: ConnectableObservable<EnvironmentEntry[]>;
  loading: Subject<boolean> = new BehaviorSubject(true);
  space: ConnectableObservable<Space>;

  constructor(
    private spaceStore: SpaceStore,
    private route: ActivatedRoute,
    private deploymentConfigService: DeploymentConfigService,
    private configMapService: ConfigMapService,
    private eventService: EventService,
    private podService: PodService,
    private replicaSetService: ReplicaSetService,
    private serviceService: ServiceService,
    private spaceNamespace: SpaceNamespace,
  ) {
  }

  ngOnInit() {
    this.space = this.spaceNamespace.namespaceSpace
      .map((id) => this.spaceStore.load(id))
      .switchMap(() => this.spaceStore.resource.distinctUntilChanged())
      // Wait 200ms before publishing an empty value - it's probably not empty but it might be!
      .debounce(space => (space ? Observable.interval(0) : Observable.interval(200)))
      .publish();
    this.space.subscribe(space => console.log('spaces', space));
    let kindPaths = Object.keys(KINDS).map(key => KINDS[key].path);
    this.environments = this.spaceNamespace.labelSpace
      .switchMap(label => this.space
        .map(space => space.environments)
        .map(environments => environments.map(environment => ({
          environment: environment,
          kinds: KINDS.map(kind => {
            // Give it a default title
            let title = new BehaviorSubject(`${kind.name}s`);
            let loading = new BehaviorSubject(true);
            return {
              environment: environment,
              kind: kind,
              title: title,
              children: [
                {
                  loading: loading,
                  data: this.getList(kind.path, environment)
                    // Update the title with the number of objects
                    .distinctUntilChanged()
                    .map(arr => {
                      if (label) {
                        return arr.filter(val => {
                          return val.labels['space'] === label;
                        });
                      } else {
                        return arr;
                      }
                    })
                    .do(arr => title.next(`${arr.length} ${kind.name}${arr.length === 1 ? '' : 's'}`))
                    .do(() => loading.next(false)),
                },
              ],
            } as KindNode;
          }),
        })),
      ))
      .do(arr => console.log('arr', arr))
      // Wait 200ms before publishing an empty value - it's probably not empty but it might be!
      .debounce(arr => (arr.length > 0 ? Observable.interval(0) : Observable.interval(200)))
      .do(() => this.loading.next(false))
      .publish();

    this.environments.subscribe(node => {
      console.log('env', node);
    });
    this.environments.connect();
    this.space.connect();
  }

  private getList(kind: string, environment: Environment): Observable<KubernetesResource[]> {
    let namespace = environment.namespace.name;
    switch (kind) {
      case 'deployments':
        return this.listAndWatch(this.deploymentConfigService, namespace, DeploymentConfig);
      case 'configmaps':
        return this.listAndWatch(this.configMapService, namespace, ConfigMap);
      case 'events':
        return this.listAndWatch(this.eventService, namespace, Event);
      case 'pods':
        return this.listAndWatch(this.podService, namespace, Pod);
      case 'replicasets':
        return this.listAndWatch(this.replicaSetService, namespace, ReplicaSet);
      case 'services':
        return this.listAndWatch(this.serviceService, namespace, Service);
      default:
        return Observable.empty();
    }
  }

  private listAndWatch<T extends KubernetesResource, L extends Array<T>>(service: NamespacedResourceService<T, L>, namespace: string, type: { new (): T; }) {
    return Observable.combineLatest(
      service.list(namespace),
      Observable.onErrorResumeNext(service.watchNamepace(namespace).dataStream),
      (list, msg) => this.combineListAndWatchEvent(list, msg, service, type, namespace)
    );
  }

  /**
   * Lets combine the web socket events with the latest list
   */
  protected combineListAndWatchEvent<T extends KubernetesResource, L extends Array<T>>(array: L, msg: any, service: NamespacedResourceService<T, L>, type: { new (): T; }, namespace: string): L {
    // lets process the added /updated / removed
    if (msg instanceof MessageEvent) {
      let me = msg as MessageEvent;
      let data = me.data;
      if (data) {
        var json = JSON.parse(data);
        if (json) {
          let type = json.type;
          let resource = json.object;
          if (type && resource) {
            switch (type) {
              case "ADDED":
                return this.upsertItem(array, resource, service, type);
              case "MODIFIED":
                return this.upsertItem(array, resource, service, type);
              case "DELETED":
                return this.deleteItemFromArray(array, resource);
              default:
                console.log("Unknown WebSocket event type " + type + " for " + resource + " on " + service.serviceUrl + '/' + namespace);
            }
          }
        }
      }
    }
    return array;
  }

  protected upsertItem<T extends KubernetesResource, L extends Array<T>>(array: L, resource: any, service: NamespacedResourceService<T, L>, type: { new (): T; }): L {
    let n = this.nameOfResource(resource);
    if (array && n) {
      for (let i = 0; i < array.length; i++) {
        let item = array[i];
        var name = item.name;
        if (name && name === n) {
          item.setResource(resource);
          //console.log("Updated item " + n);
          return array;
        }
      }

      // now lets add the new item!
      let item = new type();
      item.setResource(resource);
      // lets add the Restangular crack
      item = service.restangularize(item);
      array.push(item);
      //console.log("Added new item " + n);
    }
    return array;
  }


  protected deleteItemFromArray<T extends KubernetesResource, L extends Array<T>>(array: L, resource: any): L {
    let n = this.nameOfResource(resource);
    if (array && n) {
      for (var i = 0; i < array.length; i++) {
        let item = array[i];
        var name = item.name;
        if (name && name === n) {
          array.splice(i, 1);
        }
      }
    }
    return array;
  }


  nameOfResource(resource: any) {
    let obj = resource || {};
    let metadata = obj.metadata || {};
    return metadata.name || "";
  }

}
