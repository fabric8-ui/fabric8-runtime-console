import {Inject, Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {KUBERNETES_RESTANGULAR} from './kubernetes.restangular';
import {BuildConfigs, BuildConfig} from '../model/buildconfig.model';
import {NamespacedResourceService} from './namespaced.resource.service';
import {NamespaceScope} from './namespace.scope';

@Injectable()
export class BuildConfigService extends NamespacedResourceService<BuildConfig, BuildConfigs> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceScope: NamespaceScope) {
    super(kubernetesRestangular, namespaceScope, '/buildconfigs', '/oapi/v1/namespaces/');
  }


  protected createUrl(urlPrefix: string, namespace: string, urlSuffix: string): string {
    if (namespace) {
      // TODO use a nicer mechanism to detect if openshift or not
      var openshift = false;
      if (openshift) {
        return super.createUrl(urlPrefix, namespace, urlSuffix);
      }
      // TODO use a nicer path joiner function
      return "/api/v1/proxy/namespaces/" + namespace + "/services/jenkinshift:80/oapi/v1/namespaces/" + namespace + "/buildconfigs";
    }
    return '';
  }

}
