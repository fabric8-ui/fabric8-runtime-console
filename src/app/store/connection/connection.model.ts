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


  updateValues() {
    super.updateValues();
    this.type = this.labels["type"];

    // TODO load configured properties from the data
    // then remove the key camel.component.${this.name}. keys
    //
    // e.g. an entry may be "camel.component.twitter.access-token=foo"
    //
    //var propertiesFile = this.data["application.properties"];
    this.configuredProperties = new Map<string, string>();
  }
}

export class Connections extends Array<Connection> {
}


