import * as moment from "moment";
import {ConfigMap} from "../../kubernetes-restangular/kuberentes.configmap.model";

/*
export interface Connection extends BaseEntity {
  configuredProperties: Map<string, string>;
  createdBy: string;
  createdOn: moment.Moment;
  description: string;
  icon: string;
  modifiedBy: string;
  modifiedOn: moment.Moment;
  name: string;
  type: string;
}

export type Connections = Array<Connection>;

*/

export class Connection extends ConfigMap {
  configuredProperties: Map<string, string>;
  createdBy: string;
  createdOn: moment.Moment;
  modifiedBy: string;
  modifiedOn: moment.Moment;
  type: string;
  configText: string;


  updateResource(resource) {
    if (!resource.data) {
      resource.data = {};
    }
    resource.data["application.properties"] = this.configText || "";
    super.updateResource(resource);
  }


  updateValuesFromResource() {
    super.updateValuesFromResource();
    this.type = this.labels["type"];
    this.configText = this.data["application.properties"] || "";

    // TODO load configured properties from the data
    // then remove the key camel.component.${this.name}. keys
    //
    // e.g. an entry may be "camel.component.twitter.access-token=foo"
    //
    // parse this.configText using properties file notation
    this.configuredProperties = new Map<string, string>();
  }

  defaultFunctionKind() {
    return "Connector";
  }
}

export class Connections extends Array<Connection> {
}


