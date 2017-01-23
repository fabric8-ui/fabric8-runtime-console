import {Service, Services} from "../model/kuberentes.service.model";
import {ServiceService} from "../service/service.service";
import {Injectable} from "@angular/core";
import {NamespacedResourceStore} from "./namespaced.resource.store";
import {NamespaceContext} from "../service/namespace.context";

@Injectable()
export class ServiceStore extends NamespacedResourceStore<Service, Services, ServiceService> {
  constructor(serviceService: ServiceService, namespaceContext: NamespaceContext) {
    super(serviceService, [], <Service>{}, namespaceContext);
  }

  protected get kind() {
    return 'Service';
  }
}
