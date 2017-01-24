import {ScalableResource} from "./scalableresource.model";

export class ReplicaSet extends ScalableResource {

  defaultKind() {
    return 'ReplicaSet';
  }
}

export class ReplicaSets extends Array<ReplicaSet>{
}
