import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesService} from "./kubernetes.service";
import {Pods, Pod} from "../model/pod.model";

// TODO need to parameterize this better
var servicesUrl = '/api/v1/namespaces/funky/pods';

@Injectable()
export class PodService extends KubernetesService<Pod, Pods> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular.service(servicesUrl));
  }
}
