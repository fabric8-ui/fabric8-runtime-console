import {BehaviorSubject, ConnectableObservable, Observable, Subject} from "rxjs";
import {Notifications, Notification, NotificationType} from "ngx-base";
import {Deployment} from "./../../../model/deployment.model";
import {DeploymentService} from "./../../../service/deployment.service";
import {SpaceNamespace} from "./../space-namespace";
import {Service} from "./../../../model/service.model";
import {Pod} from "./../../../model/pod.model";
import {Event} from "./../../../model/event.model";
import {ConfigMap} from "./../../../model/configmap.model";
import {Environment, Space} from "./../../../model/space.model";
import {ServiceService} from "./../../../service/service.service";
import {ReplicaSetService} from "./../../../service/replicaset.service";
import {PodService} from "./../../../service/pod.service";
import {EventService} from "./../../../service/event.service";
import {ConfigMapService} from "./../../../service/configmap.service";
import {DeploymentConfigService} from "./../../../service/deploymentconfig.service";
import {SpaceStore} from "./../../../store/space.store";
import {Component, OnInit, OnDestroy} from "@angular/core";
import {isOpenShift} from "../../../store/apis.store";
import {pathJoin} from "../../../model/utils";
import {ReplicationControllerService} from "../../../service/replicationcontroller.service";
import {RouteService} from "../../../service/route.service";
import {AbstractWatchComponent} from "../../../support/abstract-watch.component";


export let KINDS: Kind[] = [
  {
    name: 'Deployment',
    path: 'deployments',
  },
  {
    name: 'Pod',
    path: 'pods',
  },
  {
    name: 'Replica',
    path: 'replicasets',
  },
  {
    name: 'Service',
    path: 'services',
  },
  {
    name: 'ConfigMap',
    path: 'configmaps',
  },
  {
    name: 'Event',
    path: 'events',
  },
];

export class EnvironmentEntry {
  environment: Environment;
  kinds: KindNode[];
  loading: boolean;
  openshiftConsoleUrl: string;
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
      data: ConnectableObservable<any[]>,
    }
  ];
}

@Component({
  host: {
    'class': 'app-component flex-container in-column-direction flex-grow-1'
  },
  selector: 'fabric8-environments-list-page',
  templateUrl: './list-page.environment.component.html',
  styleUrls: ['./list-page.environment.component.scss'],
})
export class EnvironmentListPageComponent extends AbstractWatchComponent implements OnInit, OnDestroy {

  environments: ConnectableObservable<EnvironmentEntry[]>;
  loading: Subject<boolean> = new BehaviorSubject(true);
  space: ConnectableObservable<Space>;

  private listCache: Map<string, Observable<any[]>> = new Map<string, Observable<any[]>>();

  constructor(private serviceService: ServiceService,
    private routeService: RouteService,
    private spaceStore: SpaceStore,
    private deploymentConfigService: DeploymentConfigService,
    private deploymentService: DeploymentService,
    private configMapService: ConfigMapService,
    private eventService: EventService,
    private podService: PodService,
    private replicationControllerService: ReplicationControllerService,
    private replicaSetService: ReplicaSetService,
    private spaceNamespace: SpaceNamespace,
    private notifications: Notifications,
  ) {
    super();
  }

  ngOnInit() {
    this.space = this.spaceNamespace.namespaceSpace
      .switchMap((id) => {
        this.spaceStore.load(id);
        let res = this.spaceStore.resource
          .distinctUntilChanged()
          .debounce(space => ((space && space.environments) ? Observable.interval(0) : Observable.interval(1000)))
          .do(space => {
            if (space === null) {
              this.notifications.message({
                message: `Something went wrong your environments as the ${(isOpenShift ? 'OpenShift Project' : 'Kubernetes Namespace')} '${id}' is not accessible to you or does not exist.`,
                type: NotificationType.WARNING
              } as Notification);
            }
          });
        return res;
      })
      // Wait 1s before publishing an empty value - it's probably not empty but it might be!
      .publish();

    this.environments = this.spaceNamespace.labelSpace
      .switchMap(label => this.space
        .skipWhile(space => !space)
        .map(space => space.environments)
        .map(environments => environments.map(environment => ({
          environment: environment,
          openshiftConsoleUrl: environmentOpenShiftConoleUrl(environment),
          kinds: KINDS.map(kind => {
            // Give it a default title
            let title = new BehaviorSubject(`${kind.name}s`);
            let loading = new BehaviorSubject(true);
            let data = this.getCachedList(kind.path, environment)
              // Update the title with the number of objects
              .distinctUntilChanged()
              .map(arr => {
                if (label) {
                  return arr.filter(val => {
                    // lets only filter resources with a space label
                    return !val.labels['space'] || val.labels['space'] === label;
                  });
                } else {
                  return arr;
                }
              })
              .do(arr => title.next(`${arr.length} ${kind.name}${arr.length === 1 ? '' : 's'}`))
              .do(() => loading.next(false))
              .publishReplay(1);
            return {
              environment: environment,
              kind: kind,
              title: title,
              children: [
                {
                  loading: loading,
                  data: data,
                },
              ],
            } as KindNode;
          }),
        })),
      ))
      // Wait 200ms before publishing an empty value - it's probably not empty but it might be!
      .debounce(arr => (arr.length > 0 ? Observable.interval(0) : Observable.interval(200)))
      .do(() => this.loading.next(false))
      .publish();
    // Now, connect all the data
    // Note we don't do this inside main stream to allow the page to draw faster
    this.environments.subscribe(
      envs => envs.forEach(
        env => env.kinds.forEach(
          kind => kind.children.forEach(
            child => child.data.connect(),
          ),
        ),
      ),
    );
    this.environments.connect();
    this.space.connect();
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.listCache.clear();
    // TODO is there a way to disconnect from this.space / this.environments?
  }


  /**
   * Lets cache the observables so that we don't requery the services each time we ask for the observables
   */
  private getCachedList(kind: string, environment: Environment): Observable<any[]> {
    let namespace = environment.namespace.name;
    let key = (namespace || "") + "/" + kind;
    var answer = this.listCache[key];
    if (!answer) {
      answer = this.getList(kind, environment);
      this.listCache[key] = answer;
    }
    return answer;
  }

  private getList(kind: string, environment: Environment): Observable<any[]> {
    let namespace = environment.namespace.name;
    switch (kind) {
      case 'deployments':
        return this.listAndWatchDeployments(namespace, this.deploymentService, this.deploymentConfigService, this.serviceService, this.routeService);
      case 'configmaps':
        return this.listAndWatch(this.configMapService, namespace, ConfigMap);
      case 'events':
        return this.listAndWatch(this.eventService, namespace, Event);
      case 'pods':
        return this.listAndWatch(this.podService, namespace, Pod);
      case 'replicasets':
        return this.listAndWatchReplicas(namespace, this.replicaSetService, this.replicationControllerService, this.serviceService, this.routeService);
      case 'services':
        return this.listAndWatchServices(namespace, this.serviceService, this.routeService);
      default:
        return Observable.empty();
    }
  }
}

export function environmentOpenShiftConoleUrl(environment: Environment): string {
  let openshiftConsoleUrl = process.env.OPENSHIFT_CONSOLE_URL;
  let namespace = environment.namespaceName;
  if (namespace) {
    return pathJoin(openshiftConsoleUrl, "/project", namespace, "/overview")
  }
  return openshiftConsoleUrl;
}