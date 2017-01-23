import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesService} from "./kubernetes.service";
import {Namespace, Namespaces} from "../model/namespace.model";

@Injectable()
export class NamespaceService extends KubernetesService<Namespace, Namespaces> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular.service('/api/v1/namespaces'));
  }
}
