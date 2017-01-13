import {KubernetesResource} from "./kuberentes.model";

export class ConfigMap extends KubernetesResource {
  data: Map<string,string>;


  updateResource(resource) {
    resource.data = this.data;
    super.updateResource(resource);
  }

  updateValuesFromResource() {
    super.updateValuesFromResource();
    this.data = this.resource.data || new Map<string,string>();
  }
}
