import {ConfigMap} from "../../kubernetes-restangular/kuberentes.configmap.model";

export class Function extends ConfigMap {
  source: string;
  envVars: Map<string,string>;
  envVarText: string;
  runtime: string;
  runtimeVersion: string;

  updateResource(resource) {
    if (!resource.data) {
      resource.data = {};
    }
    resource.data["source"] = this.source;
    resource.data["envVars"] = this.envVarText;
    super.updateResource(resource);
  }

  updateValuesFromResource() {
    super.updateValuesFromResource();
    this.source = this.data["source"] || "";
    this.runtime = this.labels["runtime"] || "";

    this.envVarText = this.data["envVars"] || "";
    // TODO load env vars as a Map
    this.envVars = new Map<string,string>();
  }
}

export class Functions extends Array<Function> {
}
