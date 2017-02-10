import {Restangular} from "ng2-restangular";
import {KubernetesService} from "./kubernetes.service";
import {Subscription, Observable} from "rxjs";
import {KubernetesResource} from "../model/kubernetesresource.model";
import {NamespaceScope} from "./namespace.scope";
import {Watcher} from "./watcher";


export abstract class NamespacedResourceService<T extends KubernetesResource, L extends Array<T>> extends KubernetesService<T, L> {
  private namespaceSubscription: Subscription;
  private _namespace: string;
  protected _serviceUrl: string;

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


  /**
   * Creates a watcher that can watch for events
   * @param queryParams
   */
  watchNamepace(namespace: string, queryParams: any = null) {
    if (namespace) {
      return new Watcher(() => this.serviceUrlForNamespace(namespace), queryParams);
    }
    return this.watch(queryParams);
  }



  get namespace(): string {
    return this._namespace;
  }

  set namespace(namespace: string) {
    if (namespace != this._namespace) {
      this._namespace = namespace;
      this._serviceUrl = null;
      this.onNamespaceChanged();
    }
  }

  get(id: string, namespace: string = null): Observable<T> {
    let url = namespace ? this.serviceUrlForNamespace(namespace) : this.serviceUrl;
    return this.restangularService.one(url, id).get();
  }

  list(namespace: string = null, queryParams: any = null): Observable<L> {
    let url = namespace ? this.serviceUrlForNamespace(namespace) : this.serviceUrl;
    return this.restangularService.all(url).getList(queryParams);
  }

  // TODO implement create using an optional namespace?

  /**
   * Returns the service URL to use for the current namespace scope
   */
  get serviceUrl(): string {
    if (!this._serviceUrl) {
      this._serviceUrl = this.serviceUrlForNamespace(this.namespace);
    }
    return this._serviceUrl;
  }

  /**
   * Returns the base URL to use for the given namespace
   */
  protected serviceUrlForNamespace(namespace: string) {
    return this.createServiceUrl(this.urlPrefix, namespace, this.urlSuffix);
  }

  protected createServiceUrl(urlPrefix: string, namespace: string, urlSuffix: string): string {
    if (namespace) {
      // TODO use a nicer path joiner function
      let url = urlPrefix + namespace + urlSuffix;
      //console.log("setting url to: " + url);
      return url;
    }
    return '';
  }


  // TODO
  ngOnDestroy() {
    this.namespaceSubscription.unsubscribe();
  }

  protected onNamespaceChanged() {
  }
}
