import {KubernetesResource} from "./kuberentes.model";

export class ReplicaSet extends KubernetesResource {

  defaultKind() {
    return "ReplicaSet";
  }
}

export class ReplicaSets extends Array<ReplicaSet>{
}
