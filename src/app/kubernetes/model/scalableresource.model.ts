import {KubernetesSpecResource} from './kuberentesspecresource.model';

export class ScalableResource extends KubernetesSpecResource {
  replicas: number;
  availableReplicas: number;
  unavailableReplicas: number;
  updatedReplicas: number;

  updateResource(resource) {
    resource.spec = this.spec;
    resource.spec.replicas = this.replicas;
    super.updateResource(resource);
  }

  updateValuesFromResource() {
    super.updateValuesFromResource();
    this.replicas = this.resource.spec.replicas || 0;
    this.availableReplicas = 0;
    this.unavailableReplicas = 0;
    this.updatedReplicas = 0;
    let status = this.status;
    if (status) {
      this.availableReplicas = status.availableReplicas || 0;
      this.unavailableReplicas = status.unavailableReplicas || 0;
      this.updatedReplicas = status.updatedReplicas || 0;
    }
  }
}
