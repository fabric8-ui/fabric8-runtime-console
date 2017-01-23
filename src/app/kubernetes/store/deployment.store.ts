import {Injectable} from '@angular/core';
import {Deployment, Deployments} from '../model/kuberentes.deployment.model';
import {DeploymentService} from '../service/deployment.service';
import {NamespacedResourceStore} from './namespaced.resource.store';
import {NamespaceScope} from '../service/namespace.scope';

@Injectable()
export class DeploymentStore extends NamespacedResourceStore<Deployment, Deployments, DeploymentService> {
  constructor(deploymentService: DeploymentService, namespaceScope: NamespaceScope) {
    super(deploymentService, [], <Deployment>{}, namespaceScope);
  }

  protected get kind() {
    return 'Deployment';
  }
}
