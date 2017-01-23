import {Inject, Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {KUBERNETES_RESTANGULAR} from './kubernetes.restangular';
import {Deployment, Deployments} from '../model/kuberentes.deployment.model';
import {NamespacedResourceService} from './namespaced.resource.service';
import {NamespaceScope} from './namespace.scope';

export const apisExtensionsNamespacesUrl = '/apis/extensions/v1beta1/namespaces/';

@Injectable()
export class DeploymentService extends NamespacedResourceService<Deployment, Deployments> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceScope: NamespaceScope) {
    super(kubernetesRestangular, namespaceScope, '/deployments', apisExtensionsNamespacesUrl);
  }
}
