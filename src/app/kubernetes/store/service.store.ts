import {Service, Services} from '../model/kuberentes.service.model';
import {ServiceService} from '../service/service.service';
import {Injectable} from '@angular/core';
import {NamespacedResourceStore} from './namespaced.resource.store';
import {NamespaceScope} from '../service/namespace.scope';

@Injectable()
export class ServiceStore extends NamespacedResourceStore<Service, Services, ServiceService> {
  constructor(serviceService: ServiceService, namespaceScope: NamespaceScope) {
    super(serviceService, [], <Service>{}, namespaceScope);
  }

  protected get kind() {
    return 'Service';
  }
}
