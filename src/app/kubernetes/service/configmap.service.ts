import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {ConfigMap} from "../model/kuberentes.configmap.model";
import {NamespacedResourceService} from "./namespaced.resource.service";
import {NamespaceContext} from "./namespace.context";

export const FunktionKindAnnotation = "funktion.fabric8.io/kind";

@Injectable()
export abstract class ConfigMapService<T extends ConfigMap, L extends Array<T>> extends NamespacedResourceService<T, L> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceContext: NamespaceContext, public funktionKind: string = "") {
    super(kubernetesRestangular, namespaceContext, "/configmaps");
  }

  list(): Observable<L> {
    if (this.funktionKind) {
      return this.restangularService.getList({
        labelSelector: FunktionKindAnnotation + "=" + this.funktionKind
      });
    } else {
      return super.list();
    }
  }
}
