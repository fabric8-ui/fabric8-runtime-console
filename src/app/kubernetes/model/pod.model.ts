import {KubernetesSpecResource} from "./kuberentesspecresource.model";

export class Pod extends KubernetesSpecResource {
  public images: Array<String>;
  public phase: String;

  public setResource(resource) {
    var answer = super.setResource(resource);
    this.images = new Array<String>();
    let spec = this.spec;
    if (spec) {
      let containers = spec.containers;
      if (containers) {
        containers.forEach((c) => {
          let image = c.image;
          if (image) {
            this.images.push(image);
          }
        });
      }
    }
    let status = this.status;
    if (status) {
      this.phase = status.phase;
    }
    return answer;
  }

  defaultKind() {
    return 'Pod';
  }
}

export class Pods extends Array<Pod> {
}
