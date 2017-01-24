import {Service, Services} from '../model/service.model';
import {Deployment, Deployments} from '../model/deployment.model';


export class DeploymentView {
    public readonly deployment: Deployment;
    public readonly service: Service;
    public readonly id: string;
    public readonly name: string;
    public readonly icon: string;
    public readonly description: string;
    public readonly exposeUrl: string;
    public readonly replicas: number;
    public readonly availableReplicas: number;
    public readonly labels: Map<string,string>;
    public readonly images: Array<String>;
    public readonly annotations: Map<string,string>;
    public readonly creationTimestamp: any;

    constructor(deployment: Deployment, service: Service) {
        this.deployment = deployment;
        this.service = service;
        this.id = deployment.id;
        this.name = deployment.name;
        this.icon = deployment.icon;
        this.description = deployment.description;
        this.labels = deployment.labels;
        this.annotations = deployment.annotations;
        this.creationTimestamp = deployment.creationTimestamp;
        if (service) {
            this.exposeUrl = service.exposeUrl;
        }
        this.images = new  Array<String>();
        let spec = deployment.spec;
        if (spec) {
          let template = spec.template;
          if (template) {
            let podSpec = template.spec;
            if (podSpec) {
              let containers = podSpec.containers;
              if (containers) {
                containers.forEach((c) => {
                  let image = c.image;
                  if (image) {
                    this.images.push(image);
                  }
                });
              }
            }
          }
        }
        this.replicas = 0;
        this.availableReplicas = 0;
        let status = deployment.status;
        if (status) {
            this.replicas = status.replicas || 0;
            this.availableReplicas = status.availableReplicas || 0;
        }
    }
}

export class DeploymentViews extends Array<DeploymentView> {
}

export function createDeploymentViews(deployments: Deployments, services: Services): DeploymentViews {
   let map = {};
   services.forEach(s => map[s.name] = s);
   return deployments.map(d => new DeploymentView(d, map[d.name]));
}
