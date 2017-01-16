import {BaseEntity} from "../store/entity/entity.model";

export abstract class KubernetesResource implements BaseEntity {
  id: string;
  name: string;
  description: string;
  icon: string;
  labels: Map<string,string>;
  annotations: Map<string,string>;
  resource: any;

  public setResource(resource) {
    this.resource = resource || {};
    this.updateValuesFromResource();
    return this;
  }

  updateResource(resource) {
    if (!this.labels) {
      this.labels = new Map<string,string>();
    }
    if (!this.annotations) {
      this.annotations = new Map<string,string>();
    }
    this.annotations["description"] = this.description;

    var metadata = resource.metadata;
    if (!metadata) {
      metadata = {};
      resource.metadata = metadata;
    }
    if (this.name) {
      metadata.name = this.name;
    }
    metadata.labels = this.labels;
    metadata.annotations = this.annotations;
  }

  updateValuesFromResource() {
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

  defaultKind() {
    return "Unknown";
  }
}
