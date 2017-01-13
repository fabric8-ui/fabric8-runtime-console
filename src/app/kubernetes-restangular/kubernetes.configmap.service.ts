import {Inject} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs";
import {RESTService} from "../store/entity/rest.service";
import {KUBERNETES_RESTANGULAR, FunktionKindAnnotation} from "./kubernetes.restangular";
import {KubernetesResource} from "./kuberentes.model";


// TODO need to parameterize this better
var configMapUrl = '/api/v1/namespaces/funky/configmaps';

export abstract class KubernetesConfigMapService<T extends KubernetesResource, L extends Array<T>> extends RESTService<T, L> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, public kind: string) {
    super(kubernetesRestangular.service(configMapUrl));
  }

  get(id: string): Observable<T> {
    console.log("Looking up kind " + this.kind + " for id " + id);
    return super.get(id);
  }

  create(obj: T): Observable<T> {
    var resource = obj.resource;
    obj.updateResource(resource);
    console.log("Creating resource with value " + JSON.stringify(resource, null, "  "));

    var resty: any = obj;
    return resty.customPOST(resource);
  }

  update(obj: T): Observable<T> {
    var resource = obj.resource;
    obj.updateResource(resource);
    var id = obj.id;
    console.log("Updating key " + id + " with value " + JSON.stringify(resource, null, "  "));
    var resty: any = obj;
    return resty.customPUT(resource);
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
