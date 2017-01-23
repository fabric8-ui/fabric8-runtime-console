import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {Deployment, Deployments} from "../model/kuberentes.deployment.model";
import {NamespacedResourceService} from "./namespaced.resource.service";
import {NamespaceContext} from "./namespace.context";

@Injectable()
export class DeploymentService extends NamespacedResourceService<Deployment, Deployments> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceContext: NamespaceContext) {
    super(kubernetesRestangular, namespaceContext, "/deployments", "/apis/extensions/v1beta1/namespaces/");
  }
}
