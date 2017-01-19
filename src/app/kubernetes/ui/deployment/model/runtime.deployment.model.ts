import {Deployment, Deployments} from '../../store/deployment/deployment.model';
import {Service, Services} from "../../kubernetes/model/kuberentes.service.model";

export class RuntimeDeployment {
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

export class RuntimeDeployments extends Array<RuntimeDeployment> {
}

export deployment createRuntimeDeployments(deployments: Deployments, services: Services): RuntimeDeployments {
   var map = {};
   services.forEach(s => map[s.name] = s);
   return deployments.map(deployment => new RuntimeDeployment(deployment, map[deployment.name]));
}
