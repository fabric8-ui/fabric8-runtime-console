import {BaseEntity} from "../store/entity/entity.model";

export class KubernetesResource implements BaseEntity {
  id: string;
  name: string;
  description: string;
  icon: string;
  labels: Map<string,string>;
  annotations: Map<string,string>;
  resource: any;

  public setResource(resource) {
    this.resource = resource;
    this.updateValues();
    return this;
  }

  updateValues() {
    var resource = this.resource || {};
    var metadata = resource.metadata || {};
    this.name = metadata.name || "";
    this.id = this.name;
    this.labels = metadata.labels || new Map<string,string>();
    this.annotations = metadata.annotations || new Map<string,string>();
    this.icon = this.annotations["fabric8.io/iconUrl"] || this.defaultIconUrl();

    // TODO any other annotations we should look for?
    this.description = this.annotations["description"] || "";
  }

  defaultIconUrl() {
    return "";
  }
}
