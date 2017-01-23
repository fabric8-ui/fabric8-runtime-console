import {AbstractStore} from "../../store/entity/entity.store";
import {Injectable} from "@angular/core";
import {KubernetesResource} from "../model/kuberentes.model";
import {NamespacedResourceService} from "../service/namespaced.resource.service";
import {NamespaceContext} from "../service/namespace.context";
import {Subscription} from "rxjs";

@Injectable()
export abstract class NamespacedResourceStore<T extends KubernetesResource, L extends Array<T>, R extends NamespacedResourceService<T, L>> extends AbstractStore<T, L, R> {
  private namespaceSubscription: Subscription;

  constructor(service: R, initialList: L, initialCurrent: T, namespaceContext: NamespaceContext) {
    super(service, initialList, initialCurrent);

    this.namespaceSubscription = namespaceContext.namespace.subscribe(
      namespace => {
        this.service.namespace = namespace;
        this.reload();
      }
    );
  }
}
