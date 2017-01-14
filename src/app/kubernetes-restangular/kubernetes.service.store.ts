import {Service, Services} from "./kuberentes.service.model";
import {KubernetesServiceService} from "./kubernetes.service.service";
import {AbstractStore} from "../store/entity/entity.store";
import {Injectable} from "@angular/core";

@Injectable()
export class KubernetesServiceStore extends AbstractStore<Service, Services, KubernetesServiceService> {
  constructor(serviceService: KubernetesServiceService) {
    super(serviceService, [], <Service>{});
  }

  protected get kind() {
    return 'Service';
  }
}
