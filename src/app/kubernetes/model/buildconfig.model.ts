import {KubernetesResource} from './kuberentes.model';

export class BuildConfig extends KubernetesResource {

  defaultKind() {
    return 'BuildConfig';
  }
}

export class BuildConfigs extends Array<BuildConfig>{
}
