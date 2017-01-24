import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {ConfigMap, ConfigMaps} from "../model/configmap.model";
import {NamespacedResourceService} from "./namespaced.resource.service";
import {NamespaceScope} from "./namespace.scope";

@Injectable()
export class ConfigMapService extends NamespacedResourceService<ConfigMap, ConfigMaps> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceScope: NamespaceScope) {
    super(kubernetesRestangular, namespaceScope, '/configmaps');
  }
}
