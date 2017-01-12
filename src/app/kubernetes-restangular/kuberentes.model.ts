import {BaseEntity} from "../store/entity/entity.model";

export class KubernetesResource implements BaseEntity {
  name: string;
  description: string;
  icon: string;
  labels: Map<string,string>;
  annotations: Map<string,string>;

  constructor(public resource) {
    this.updateValues();
  }

  public setResource(resource) {
    this.resource = resource;
    this.updateValues();
  }

  updateValues() {
    var resource = this.resource || {};
    var metadata = resource.metadata || {};
    this.name = metadata.name || "";
    this.labels = metadata.labels || {};
    this.annotations = metadata.annotations || {};
    this.icon = this.annotations["fabric8.io/iconUrl"] || this.defaultIconUrl();
  }

  defaultIconUrl() {
    return "";
  }
}
