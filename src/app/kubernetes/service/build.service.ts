import {Inject, Injectable} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {KUBERNETES_RESTANGULAR} from './kubernetes.restangular';
import {Builds, Build} from '../model/build.model';
import {NamespacedResourceService} from './namespaced.resource.service';
import {NamespaceScope} from './namespace.scope';
import {APIsStore} from "../store/apis.store";

@Injectable()
export class BuildService extends NamespacedResourceService<Build, Builds> {

  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceScope: NamespaceScope, private apiStore: APIsStore) {
    super(kubernetesRestangular, namespaceScope, '/builds', '/oapi/v1/namespaces/');

    apiStore.loading.subscribe(loading => {
      if (!loading) {
        // force recalculation of the URL
        this._serviceUrl = null;
      }
    })
  }

  protected createUrl(urlPrefix: string, namespace: string, urlSuffix: string): string {
    if (namespace) {
      if (this.apiStore.isOpenShift()) {
        return super.createUrl(urlPrefix, namespace, urlSuffix);
      }
      // TODO use a nicer path joiner function
      return "/api/v1/proxy/namespaces/" + namespace + "/services/jenkinshift:80/oapi/v1/namespaces/" + namespace + "/builds";
    }
    return '';
  }

}
