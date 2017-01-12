import * as moment from "moment";
import {KubernetesResource} from "../../kubernetes-restangular/kuberentes.model";

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


export class Connection extends KubernetesResource {
  configuredProperties: Map<string, string>;
  createdBy: string;
  createdOn: moment.Moment;
  icon: string;
  modifiedBy: string;
  modifiedOn: moment.Moment;
  type: string;

  constructor(resource) {
    super(resource);
  }
}

export class Connections extends Array<Connection> {
}


