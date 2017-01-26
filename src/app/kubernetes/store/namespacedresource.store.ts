import {Injectable} from "@angular/core";
import {KubernetesResource} from "../model/kubernetesresource.model";
import {NamespacedResourceService} from "../service/namespaced.resource.service";
import {NamespaceScope} from "../service/namespace.scope";
import {Subscription} from "rxjs";
import {KubernetesResourceStore} from "./kuberentesresource.store";

@Injectable()
export abstract class NamespacedResourceStore<T extends KubernetesResource, L extends Array<T>, R extends NamespacedResourceService<T, L>> extends KubernetesResourceStore<T, L, R> {
  private namespaceSubscription: Subscription;

  constructor(service: R, initialList: L, initialCurrent: T, private namespaceScope: NamespaceScope) {
    super(service, initialList, initialCurrent);

    if (this.namespaceScope) {
      this.namespaceSubscription = this.namespaceScope.namespace.subscribe(
        namespace => {
          this.service.namespace = namespace;
          this.reload();
        },
      );
    }
  }
}
