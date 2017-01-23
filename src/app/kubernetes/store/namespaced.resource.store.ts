import {AbstractStore} from '../../store/entity/entity.store';
import {Injectable} from '@angular/core';
import {KubernetesResource} from '../model/kuberentes.model';
import {NamespacedResourceService} from '../service/namespaced.resource.service';
import {NamespaceScope} from '../service/namespace.scope';
import {Subscription} from 'rxjs';

@Injectable()
export abstract class NamespacedResourceStore<T extends KubernetesResource, L extends Array<T>, R extends NamespacedResourceService<T, L>> extends AbstractStore<T, L, R> {
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
