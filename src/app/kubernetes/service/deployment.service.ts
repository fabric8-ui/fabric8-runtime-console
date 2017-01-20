import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesService} from "./kubernetes.service";
import {Deployment, Deployments} from "../model/kuberentes.deployment.model";


// TODO need to parameterize this better
var deploymentsUrl = '/apis/extensions/v1beta1/namespaces/funky/deployments';

@Injectable()
export class DeploymentService extends KubernetesService<Deployment, Deployments> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular.service(deploymentsUrl));
  }
}
