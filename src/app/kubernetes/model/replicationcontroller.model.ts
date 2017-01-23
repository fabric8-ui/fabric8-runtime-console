import {KubernetesResource} from './kuberentes.model';

export class ReplicationController extends KubernetesResource {

  defaultKind() {
    return 'ReplicationController';
  }
}

export class ReplicationControllers extends Array<ReplicationController>{
}
