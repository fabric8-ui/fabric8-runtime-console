import {KubernetesSpecResource} from "./kuberentesspecresource.model";

export class Build extends KubernetesSpecResource {

  defaultKind() {
    return 'Build';
  }
}

export class Builds extends Array<Build>{
}
