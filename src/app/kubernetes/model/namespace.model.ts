import {KubernetesResource} from "./kuberentes.model";

export class Namespace extends KubernetesResource {

  defaultKind() {
    return "Namespace";
  }
}

export class Namespaces extends Array<Namespace>{
}
