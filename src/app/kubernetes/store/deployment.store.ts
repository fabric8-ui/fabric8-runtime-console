import {Injectable} from "@angular/core";
import {Deployment, Deployments} from "../model/kuberentes.deployment.model";
import {DeploymentService} from "../service/deployment.service";
import {NamespacedResourceStore} from "./namespaced.resource.store";
import {NamespaceContext} from "../service/namespace.context";

@Injectable()
export class DeploymentStore extends NamespacedResourceStore<Deployment, Deployments, DeploymentService> {
  constructor(deploymentService: DeploymentService, namespaceContext: NamespaceContext) {
    super(deploymentService, [], <Deployment>{}, namespaceContext);
  }

  protected get kind() {
    return 'Deployment';
  }
}
