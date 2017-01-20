import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesService} from "./kubernetes.service";
import {ReplicaSet, ReplicaSets} from "../model/replicaset.model";

// TODO need to parameterize this better
var servicesUrl = '/api/v1/namespaces/funky/replicasets';

@Injectable()
export class ReplicaSetService extends KubernetesService<ReplicaSet, ReplicaSets> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular.service(servicesUrl));
  }
}
