import {Injectable, Inject} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Function, Functions} from "./function.model";
import {KUBERNETES_RESTANGULAR} from "../../kubernetes-restangular/kubernetes.restangular";
import {KubernetesConfigMapService} from "../../kubernetes-restangular/kubernetes.configmap.service";

@Injectable()
export class FunctionService extends KubernetesConfigMapService<Function, Functions> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular, "Function");
  }
}
