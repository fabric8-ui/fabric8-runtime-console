import {ConfigMap} from "../../kubernetes-restangular/kuberentes.configmap.model";

export class Function extends ConfigMap {
  source: string;
  envVars: Map<string,string>;
  envVarText: string;
  runtime: string;
  runtimeVersion: string;


  updateValues() {
    super.updateValues();
    this.source = this.data["source"];
    this.runtime = this.labels["runtime"];

    this.envVarText = this.data["envVars"];
    // TODO load env vars as a Map
    this.envVars = new Map<string,string>();
  }
}

export class Functions extends Array<Function> {
}
