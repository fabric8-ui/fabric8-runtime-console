import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {ReplicaSet, ReplicaSets} from "../model/replicaset.model";
import {NamespacedResourceService} from "./namespaced.resource.service";
import {NamespaceContext} from "./namespace.context";

@Injectable()
export class ReplicaSetService extends NamespacedResourceService<ReplicaSet, ReplicaSets> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceContext: NamespaceContext) {
    super(kubernetesRestangular, namespaceContext, "/replicasets");
  }
}
