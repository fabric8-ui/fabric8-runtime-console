import {Inject} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs";
import {RESTService} from "../../store/entity/rest.service";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesResource} from "../model/kuberentes.model";


export abstract class KubernetesService<T extends KubernetesResource, L extends Array<T>> extends RESTService<T, L> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular);
  }

  get(id: string): Observable<T> {
    return super.get(id);
  }

  create(obj: T): Observable<T> {
    var resource = obj.resource || {};
    if (!resource.kind) {
      resource.kind = obj.defaultKind();
    }
    obj.updateResource(resource);
    console.log("Creating resource with value " + JSON.stringify(resource, null, "  "));

    return this.restangularService.post(resource);
  }

  update(obj: T): Observable<T> {
    var resource = obj.resource;
    obj.updateResource(resource);
    var id = obj.id;
    console.log("Updating key " + id + " with value " + JSON.stringify(resource, null, "  "));
    var resty: any = obj;
    return resty.customPUT(resource);
  }

  defaultKind() {
    return "Service";
  }
}
