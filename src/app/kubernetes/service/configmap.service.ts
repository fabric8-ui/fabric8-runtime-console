import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs";
import {KUBERNETES_RESTANGULAR, FunktionKindAnnotation} from "./kubernetes.restangular";
import {KubernetesResource} from "../model/kuberentes.model";
import {KubernetesService} from "./kubernetes.service";


// TODO need to parameterize this better
var configMapUrl = '/api/v1/namespaces/funky/configmaps';

@Injectable()
export abstract class ConfigMapService<T extends KubernetesResource, L extends Array<T>> extends KubernetesService<T, L> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, public kind: string) {
    super(kubernetesRestangular.service(configMapUrl));
  }

  list(): Observable<L> {
    if (this.kind) {
      return this.restangularService.getList({
        labelSelector: FunktionKindAnnotation + "=" + this.kind
      });
    } else {
      return super.list();
    }
  }
}
