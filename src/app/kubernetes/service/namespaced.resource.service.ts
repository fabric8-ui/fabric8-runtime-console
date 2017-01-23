import {Inject} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesService} from "./kubernetes.service";
import {Subscription, Observable} from "rxjs";
import {KubernetesResource} from "../model/kuberentes.model";
import {NamespaceContext} from "./namespace.context";

function createUrl(urlPrefix: string, namespace: string, urlSuffix: string) {
  if (namespace) {
    // TODO use a nicer path joiner function
    var url = urlPrefix + namespace + urlSuffix;
    //console.log("setting url to: " + url);
    return url;
  }
  return "";
}


export abstract class NamespacedResourceService<T extends KubernetesResource, L extends Array<T>> extends KubernetesService<T, L> {
  private namespaceSubscription: Subscription;
  private _namespace: string;
  private serviceUrl: string;

  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceContext: NamespaceContext, private urlSuffix: string, private urlPrefix: string = "/api/v1/namespaces/") {
    super(kubernetesRestangular);
    this.namespace = namespaceContext.defaultNamespace();

    this.namespaceSubscription = namespaceContext.namespace.subscribe(
      namespace => {
        this.namespace = namespace;
      }
    );
  }

  get namespace(): string {
    return this._namespace;
  }

  set namespace(namespace: string) {
    this._namespace = namespace;
    this.serviceUrl = createUrl(this.urlPrefix, namespace, this.urlSuffix);
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
