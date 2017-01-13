import {KubernetesResource} from "./kuberentes.model";

export class ConfigMap extends KubernetesResource {
  data: Map<string,string>;

  updateValues() {
    super.updateValues();
    this.data = this.resource.data || new Map<string,string>();
  }
}
