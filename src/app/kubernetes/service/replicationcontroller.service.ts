import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesService} from "./kubernetes.service";
import {ReplicationController, ReplicationControllers} from "../model/replicationcontroller.model";

// TODO need to parameterize this better
var servicesUrl = '/api/v1/namespaces/funky/replicationcontrollers';

@Injectable()
export class ReplicationControllerService extends KubernetesService<ReplicationController, ReplicationControllers> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular.service(servicesUrl));
  }
}
