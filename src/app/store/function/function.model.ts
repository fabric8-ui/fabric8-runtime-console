import {ConfigMap} from "../../kubernetes/model/kuberentes.configmap.model";

export class Function extends ConfigMap {
  source: string;
  envVars: Map<string,string>;
  envVarText: string;
  runtime: string = "nodejs";
  runtimeVersion: string;

  updateResource(resource) {
    if (!this.labels) {
      this.labels = new Map<string,string>();
    }
    if (this.runtime) {
      this.labels["runtime"] = this.runtime;
    }
    if (!this.data) {
      this.data = new Map<string,string>();
    }
    this.data["source"] = this.source || "";
    this.data["envVars"] = this.envVarText || "";
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

  defaultFunctionKind() {
    return "Function";
  }
}

export class Functions extends Array<Function> {
}
