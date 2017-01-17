import {Injectable, Inject} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Integration, Integrations} from "./integration.model";
import {KubernetesConfigMapService} from "../../kubernetes/service/kubernetes.configmap.service";
import {KUBERNETES_RESTANGULAR} from "../../kubernetes/service/kubernetes.restangular";

/*@Injectable()
export class IntegrationService extends RESTService<Integration, Integrations> {

  constructor(restangular: Restangular) {
    super(restangular.service('integrations'));
  }

}*/

@Injectable()
export class IntegrationService extends KubernetesConfigMapService<Integration, Integrations> {

  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular, "Flow");
  }
}
