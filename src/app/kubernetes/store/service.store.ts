import {Service, Services} from "../model/kuberentes.service.model";
import {ServiceService} from "../service/service.service";
import {AbstractStore} from "../../store/entity/entity.store";
import {Injectable} from "@angular/core";

@Injectable()
export class ServiceStore extends AbstractStore<Service, Services, ServiceService> {
  constructor(serviceService: ServiceService) {
    super(serviceService, [], <Service>{});
  }

  protected get kind() {
    return 'Service';
  }
}
