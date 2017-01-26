import {Injectable} from "@angular/core";
import {Namespaces, Namespace, isSystemNamespace, isSecretsNamespace} from "../model/namespace.model";
import {Observable, BehaviorSubject} from "rxjs";
import {NamespaceStore} from "./namespace.store";
import {ConfigMapService} from "../service/configmap.service";
import {Space, Spaces, asSpaces} from "../model/space.model";
import {ConfigMap} from "../model/configmap.model";
import "rxjs/add/observable/forkJoin";


@Injectable()
export class SpaceStore {
  public list: Observable<Spaces>;
  public resource: Observable<Space>;
  private loadId: string;
  protected _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private namespaceStore: NamespaceStore, private configMapService: ConfigMapService) {
    this.list = this.namespaceStore.list.flatMap(namespaces => {
      if (!namespaces) {
        namespaces = [];
      }
      let spaceObservables = namespaces.map(namespace => this.enrichNamespace(namespaces, namespace));
      return Observable.forkJoin(spaceObservables).map(args => {
        // lets indicate loading has completed as we've the results
        this._loading.next(false);
        return asSpaces(args);
      });
    });

    this.resource = this.list.map(spaces => {
      for (let space of spaces) {
        if (space.name === this.loadId) {
          return space;
        }
      }
      return null;
    });
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
    this.namespaceStore.loadAll();
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

  protected enrichNamespace(namespaces: Namespaces, namespace: Namespace): Observable<Space> {
    if (isSecretsNamespace(namespace) || isSystemNamespace(namespace)) {
      return Observable.of(new Space(namespace, namespaces, null));
    }
    let ns = namespace.name;
    return this.configMapService.list(ns, {
      labelSelector: "kind=environments"
    }).map(cms => {
      var cm: ConfigMap = null;
      if (cms && cms.length) {
        for (let c of cms) {
          if (c.name === "fabric8-environments") {
            cm = c;
            break;
          }
        }
      }
      return new Space(namespace, namespaces, cm);
    })
      // lets force the observable to close after querying
      .take(1);
  }
}
