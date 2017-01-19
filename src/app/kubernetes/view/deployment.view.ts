import {Service, Services} from "../../kubernetes/model/kuberentes.service.model";
import {Deployment, Deployments} from "../model/kuberentes.deployment.model";

export class DeploymentView {
    public readonly deployment: Deployment;
    public readonly service: Service;
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly exposeUrl: string;

    constructor(deployment: Deployment, service: Service) {
        this.deployment = deployment;
        this.service = service;
        this.id = deployment.id;
        this.name = deployment.name;
        this.description = deployment.description;
        if (service) {
            this.exposeUrl = service.exposeUrl;
        }
    }
}

export class DeploymentViews extends Array<DeploymentView> {
}

export function createDeploymentViews(deployments: Deployments, services: Services): DeploymentViews {
   var map = {};
   services.forEach(s => map[s.name] = s);
   return deployments.map(d => new DeploymentView(d, map[d.name]));
}
