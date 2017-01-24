import {ScalableResource} from "./scalableresource.model";

export class ReplicationController extends ScalableResource {

  defaultKind() {
    return 'ReplicationController';
  }
}

export class ReplicationControllers extends Array<ReplicationController>{
}
