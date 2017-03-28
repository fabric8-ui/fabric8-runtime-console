import { WatcherFactory } from './watcher-factory.service';
import { Inject, Injectable } from "@angular/core";
import { Restangular } from "ng2-restangular";
import { KUBERNETES_RESTANGULAR } from "./kubernetes.restangular";
import { Builds, Build } from "../model/build.model";
import { NamespacedResourceService } from "./namespaced.resource.service";
import { APIsStore } from "../store/apis.store";
import { DevNamespaceScope } from "./devnamespace.scope";
import { pathJoin } from "../model/utils";

@Injectable()
export class BuildService extends NamespacedResourceService<Build, Builds> {

  constructor(
    @Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular,
    namespaceScope: DevNamespaceScope,
    private apiStore: APIsStore,
    watcherFactory: WatcherFactory
  ) {
    super(kubernetesRestangular, namespaceScope, '/builds', watcherFactory, '/oapi/v1/namespaces/');

    apiStore.loading.subscribe(loading => {
      if (!loading) {
        // force recalculation of the URL
        this._serviceUrl = null;
      }
    })
  }

  protected createServiceUrl(urlPrefix: string, namespace: string, urlSuffix: string): string {
    if (namespace) {
      if (this.apiStore.isOpenShift()) {
        return super.createServiceUrl(urlPrefix, namespace, urlSuffix);
      }
      return pathJoin("/api/v1/proxy/namespaces", namespace, "/services/jenkinshift:80/oapi/v1/namespaces", namespace, "/builds");
    }
    return '';
  }

}
