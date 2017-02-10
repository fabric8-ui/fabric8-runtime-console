import {Injectable} from "@angular/core";
import {Namespaces, Namespace, isSecretsNamespace, isSystemNamespace} from "../model/namespace.model";
import {Observable, BehaviorSubject, Subscription} from "rxjs";
import {NamespaceStore} from "./namespace.store";
import {ConfigMapService} from "../service/configmap.service";
import {Space, Spaces, asSpaces} from "../model/space.model";
import {ConfigMap} from "../model/configmap.model";
import "rxjs/add/observable/forkJoin";
import {OnLogin} from "../../shared/onlogin.service";
import {messageEventToResourceOperation, Operation} from "../service/resource-operation";
import {Watcher} from "../service/watcher";
import {ConfigMapStore} from "./configmap.store";


class EnvironmentWatcher {
  protected configMapSubject: BehaviorSubject<ConfigMap> = new BehaviorSubject(null);
  protected configMap: ConfigMap;
  protected subscription: Subscription;
  public notified: boolean;

  constructor(protected configMapStore: ConfigMapStore, public watcher: Watcher, protected onChangeFn: (ConfigMap) => void) {
    this.subscription = watcher.dataStream.subscribe(msg => {
      this.onMessageEvent(msg);
    });
  }

  protected onMessageEvent(msg) {
    let resourceOperation = messageEventToResourceOperation(msg);
    if (resourceOperation) {
      if (resourceOperation.operation == Operation.DELETED) {
        this.configMap = null;
        this.notify(this.configMap);
      } else {
        let resource = resourceOperation.resource;
        let configMap = this.configMapStore.instantiate(resource);
        if (configMap) {
          this.configMap = configMap;
          this.notify(this.configMap);
        }
      }
    }
  }

  public notify(configMap: ConfigMap) {
    this.configMapSubject.next(configMap);
    if (this.onChangeFn) {
      this.onChangeFn(configMap);
    }
    this.notified = true;
  }
}

@Injectable()
export class SpaceStore {
  public list: Observable<Spaces>;
  public resource: Observable<Space>;
  private loadId: string;
  protected _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private environments: Map<String,EnvironmentWatcher>;
  private configMaps: Map<String,ConfigMap>;
  protected configMapsSubject: BehaviorSubject<Map<String,ConfigMap>>;

  constructor(private namespaceStore: NamespaceStore, configMapService: ConfigMapService, configMapStore: ConfigMapStore, private onLogin: OnLogin) {
    let namespacesList = this.namespaceStore.list;

    this.environments = new Map<String,EnvironmentWatcher>();
    this.configMaps = new Map<String,ConfigMap>();
    this.configMapsSubject = new BehaviorSubject(this.configMaps);

    // lets make sure we've always got an up to date map of configmaps
    namespacesList.subscribe(namespaces => {
      if (namespaces) {
        for (let namespace of namespaces) {
          if (isSecretsNamespace(namespace) || isSystemNamespace(namespace)) {
            // we don't need to watch these!
            continue;
          }
          var name = namespace.name;
          if (name) {
            var environmentWatcher = this.environments[name];
            if (!environmentWatcher) {
              //console.log("watching configmaps in namespace " + name);
              let watcher = configMapService.watchNamepace(name, {
                labelSelector: "kind=environments"
              });
              environmentWatcher = new EnvironmentWatcher(configMapStore, watcher, (configMap) => this.environmentUpdated(configMap));

              // lets load the initial value
              configMapService.list(name, {
                labelSelector: "kind=environments"
              }).take(1).subscribe(cms => {
                if (cms && cms.length) {
                  for (let c of cms) {
                    if (c.name === "fabric8-environments") {
                      environmentWatcher.notify(c);
                      break;
                    }
                  }
                }
              });
              this.environments[name] = environmentWatcher;
            }
          }
        }
        this.checkIfLoaded();
      }
    });
    this.list = namespacesList.combineLatest(this.configMapsSubject.asObservable(), this.combineNamespacesAndConfigMaps);

    this.resource = this.list.map(spaces => {
      for (let space of spaces) {
        if (space.name === this.loadId) {
          return space;
        }
      }
      return null;
    });
  }

  protected combineNamespacesAndConfigMaps(namespaces: Namespaces, configMaps: Map<String,ConfigMap>): Spaces {
    var spaces = [];
    if (namespaces) {
      for (let namespace of namespaces) {
        let name = namespace.name;
        if (name) {
          let configMap = configMaps.get(name);
          let space = new Space(namespace, namespaces, configMap);
          spaces.push(space);
        }
      }
    }
    return asSpaces(spaces);
  }

  protected environmentUpdated(configMap: ConfigMap) {
    let name = configMap.namespace;
    if (configMap == null) {
      this.configMaps.delete(name);
    } else {
      this.configMaps.set(name, configMap);
    }
    this.configMapsSubject.next(this.configMaps);
    this.checkIfLoaded();
  }


  protected checkIfLoaded() {
    // if we have loaded all environments lets mark the store as loaded
    var loaded = true;
    this.environments.forEach((environmentWatcher) => {
      if (!environmentWatcher.notified) {
        loaded = false;
      }
    });
    if (loaded) {
      // we've now loaded!
      this._loading.next(false);
    }
  }
  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  loadAll(): void {
    this.loadId = null;
    this.doLoad();
  }

  load(id: string): void {
    this.loadId = id;
    this.doLoad();
  }

  protected doLoad(): void {
    this._loading.next(true);
    this.onLogin.whenLoggedIn(() => {
      this.namespaceStore.loadAll();
    });
  }

  update(obj: Space): Observable<Namespace> {
    return this.namespaceStore.update(obj.namespace);
  }

  updateResource(obj: Space, resource: any): Observable<Namespace> {
    return this.namespaceStore.updateResource(obj.namespace, resource);
  }


  delete(space: Space): Observable<any> {
    return this.namespaceStore.delete(space.namespace);
  }
}
