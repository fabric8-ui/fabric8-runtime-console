import {Injectable, Inject} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Function, Functions} from "./function.model";
import {KUBERNETES_RESTANGULAR} from "../../kubernetes/service/kubernetes.restangular";
import {ConfigMapService} from "../../kubernetes/service/configmap.service";

@Injectable()
export class FunctionService extends ConfigMapService<Function, Functions> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular, "Function");
  }
}
