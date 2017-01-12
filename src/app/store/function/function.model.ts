import {KubernetesResource} from "../../kubernetes-restangular/kuberentes.model";

export class Function extends KubernetesResource {
  constructor(resource) {
    super(resource);
  }
}

export class Functions extends Array<Function> {

}
