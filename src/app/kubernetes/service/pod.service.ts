import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {Pods, Pod} from "../model/pod.model";
import {NamespacedResourceService} from "./namespaced.resource.service";
import {NamespaceContext} from "./namespace.context";


@Injectable()
export class PodService extends NamespacedResourceService<Pod, Pods> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, namespaceContext: NamespaceContext) {
    super(kubernetesRestangular, namespaceContext, "/pods");
  }
}
