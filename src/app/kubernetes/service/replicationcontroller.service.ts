import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {ReplicationController, ReplicationControllers} from "../model/replicationcontroller.model";
import {NamespacedResourceService} from "./namespaced.resource.service";
import {NamespaceContext} from "./namespace.context";

@Injectable()
export class ReplicationControllerService extends NamespacedResourceService<ReplicationController, ReplicationControllers> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceContext: NamespaceContext) {
    super(kubernetesRestangular, namespaceContext, '/replicationcontrollers');
  }
}
