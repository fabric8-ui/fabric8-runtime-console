import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesService} from "./kubernetes.service";
import {Service, Services} from "../model/kuberentes.service.model";

// TODO need to parameterize this better
var servicesUrl = '/api/v1/namespaces/funky/services';

@Injectable()
export class ServiceService extends KubernetesService<Service, Services> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular.service(servicesUrl));
  }
}
