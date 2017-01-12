import {Moment} from "moment";
import {KubernetesResource} from "../../kubernetes-restangular/kuberentes.model";

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


export class Integration extends KubernetesResource {
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

  constructor(resource) {
    super(resource);
  }
}

export class Integrations extends Array<Integration> {
}

