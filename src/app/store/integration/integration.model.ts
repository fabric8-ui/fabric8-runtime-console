import {Moment} from "moment";
import {ConfigMap} from "../../kubernetes-restangular/kuberentes.configmap.model";

/*
export interface Integration extends BaseEntity {
  configuredProperties: Map<string, string>;
  createdBy: string;
  createdOn: Moment;
  description: string;
  icon: string;
  modifiedBy: string;
  modifiedOn: Moment;
  name: string;
  position: string;
  type: string;
}

export type Integrations = Array<Integration>;
*/


export class Integration extends ConfigMap {
  configuredProperties: Map<string, string>;
  createdBy: string;
  createdOn: Moment;
  modifiedBy: string;
  modifiedOn: Moment;
  position: string;
  type: string;
  flowYaml: string;
  configText: string;


  updateResource(resource) {
    resource.data["funktion.yml"] = this.flowYaml;
    super.updateResource(resource);
  }

  updateValuesFromResource() {
    super.updateValuesFromResource();
    this.type = this.labels["type"];

    this.flowYaml = this.data["funktion.yml"];
    // TODO parse the flow YAML?

    this.configText = this.data["application.properties"] || "";
    // TODO load configured properties from the data
    // e.g. an entry may be "camel.component.twitter.access-token=foo"
    //
    // should we keep then indexed by connector properties?
    //
    // e.g. an entry may be "camel.component.twitter.access-token=foo"
    //
    //var propertiesFile = this.data["application.properties"];
    this.configuredProperties = new Map<string, string>();
  }

}

export class Integrations extends Array<Integration> {
}

