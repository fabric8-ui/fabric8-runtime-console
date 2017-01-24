import {KubernetesSpecResource} from './kuberentesspecresource.model';

export class ScalableResource extends KubernetesSpecResource {
  replicas: number;

  updateResource(resource) {
    resource.spec = this.spec;
    resource.spec.replicas = this.replicas;
    super.updateResource(resource);
  }

  updateValuesFromResource() {
    super.updateValuesFromResource();
    this.replicas = this.resource.spec.replicas || 0;
  }
}
