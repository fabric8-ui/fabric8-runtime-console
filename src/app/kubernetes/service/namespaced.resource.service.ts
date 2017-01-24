import {Restangular} from "ng2-restangular";
import {KubernetesService} from "./kubernetes.service";
import {Subscription, Observable} from "rxjs";
import {KubernetesResource} from "../model/kuberentes.model";
import {NamespaceScope} from "./namespace.scope";


export abstract class NamespacedResourceService<T extends KubernetesResource, L extends Array<T>> extends KubernetesService<T, L> {
  private namespaceSubscription: Subscription;
  private _namespace: string;
  private _serviceUrl: string;

  constructor(kubernetesRestangular: Restangular,
              private namespaceScope: NamespaceScope,
              private urlSuffix: string, private urlPrefix: string = '/api/v1/namespaces/') {
    super(kubernetesRestangular);
    this.namespace = namespaceScope.defaultNamespace();

    if (this.namespaceScope) {
      this.namespaceSubscription = this.namespaceScope.namespace.subscribe(
        namespace => {
          this.namespace = namespace;
        },
      );
    }
  }

  get namespace(): string {
    return this._namespace;
  }

  set namespace(namespace: string) {
    this._namespace = namespace;
    this._serviceUrl = null;
  }

  get serviceUrl(): string {
    if (!this._serviceUrl) {
      this._serviceUrl = this.createUrl(this.urlPrefix, this.namespace, this.urlSuffix);
    }
    return this._serviceUrl;
  }

  protected createUrl(urlPrefix: string, namespace: string, urlSuffix: string): string {
    if (namespace) {
      // TODO use a nicer path joiner function
      let url = urlPrefix + namespace + urlSuffix;
      //console.log("setting url to: " + url);
      return url;
    }
    return '';
  }


  get(id: string): Observable<T> {
    return this.restangularService.one(this.serviceUrl, id).get();
  }

  list(): Observable<L> {
    return this.restangularService.all(this.serviceUrl).getList();
  }

  // TODO
  ngOnDestroy() {
    this.namespaceSubscription.unsubscribe();
  }
}
