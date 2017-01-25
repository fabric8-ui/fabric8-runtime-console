import {KubernetesResource} from './kubernetesresource.model';

export class Build extends KubernetesResource {

  defaultKind() {
    return 'Build';
  }
}

export class Builds extends Array<Build>{
}
