import { WatcherFactory } from './watcher-factory.service';
import {Inject, Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {KUBERNETES_RESTANGULAR} from './kubernetes.restangular';
import {NamespacedResourceService} from './namespaced.resource.service';
import {NamespaceScope} from './namespace.scope';
import {DeploymentConfig, DeploymentConfigs} from "../model/deploymentconfig.model";

export const openshiftNamespacesUrl = '/oapi/v1/namespaces/';

@Injectable()
export class DeploymentConfigService extends NamespacedResourceService<DeploymentConfig, DeploymentConfigs> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceScope: NamespaceScope, watcherFactory: WatcherFactory) {
    super(kubernetesRestangular, namespaceScope, '/deploymentconfigs', watcherFactory, openshiftNamespacesUrl);
  }
}
