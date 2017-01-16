import {KubernetesResource} from "./kuberentes.model";
import {FunktionKindAnnotation} from "./kubernetes.restangular";

export class ConfigMap extends KubernetesResource {
  data: Map<string,string>;


  updateResource(resource) {
    resource.data = this.data;
    super.updateResource(resource);

    if (!this.labels[FunktionKindAnnotation]) {
      var funktionKind = this.defaultFunctionKind();
      if (funktionKind) {
        this.labels[FunktionKindAnnotation] = funktionKind;
      }
    }
  }

  updateValuesFromResource() {
    super.updateValuesFromResource();
    this.data = this.resource.data || new Map<string,string>();
  }

  defaultKind() {
    return "ConfigMap";
  }

  defaultFunctionKind() {
    return "";
  }
}
