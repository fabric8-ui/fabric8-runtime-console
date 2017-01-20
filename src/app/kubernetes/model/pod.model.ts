import {KubernetesResource} from "./kuberentes.model";

export class Pod extends KubernetesResource {

  defaultKind() {
    return "Pod";
  }
}

export class Pods extends Array<Pod>{
}
