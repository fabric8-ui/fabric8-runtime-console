import {Service, Services} from "../../kubernetes/model/kuberentes.service.model";
import {Deployment, Deployments} from "../model/kuberentes.deployment.model";


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

    constructor(deployment: Deployment, service: Service) {
        this.deployment = deployment;
        this.service = service;
        this.id = deployment.id;
        this.name = deployment.name;
        this.icon = deployment.icon;
        this.description = deployment.description;
        this.labels = deployment.labels;
        this.annotations = deployment.annotations;
        if (service) {
            this.exposeUrl = service.exposeUrl;
        }
        this.images = new  Array<String>();
        var spec = deployment.spec;
        if (spec) {
          var template = spec.template;
          if (template) {
            var podSpec = template.spec;
            if (podSpec) {
              var containers = podSpec.containers;
              if (containers) {
                containers.forEach((c) => {
                  var image = c.image;
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
        var status = deployment.status;
        if (status) {
            this.replicas = status.replicas;
            this.availableReplicas = status.availableReplicas;
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
