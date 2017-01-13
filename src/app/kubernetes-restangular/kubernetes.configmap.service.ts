import {Inject} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Observable} from "rxjs";
import {RESTService} from "../store/entity/rest.service";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesResource} from "./kuberentes.model";
import {Connection} from "../store/connection/connection.model";
import {Function} from "../store/function/function.model";
import {Integration} from "../store/integration/integration.model";

var kindAnnotation = "funktion.fabric8.io/kind";

// TODO need to parameterize this better
var configMapUrl = '/api/v1/namespaces/funky/configmaps';

export abstract class KubernetesConfigMapService<T extends KubernetesResource, L extends Array<T>> extends RESTService<T, L> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular, public kind: string) {
    super(kubernetesRestangular.withConfig((RestangularConfigurer) => {
      RestangularConfigurer.addElementTransformer(configMapUrl, false, function (element) {
        if (element instanceof KubernetesResource) {
          return element;
        }
        var resource = element || {};
        // TODO would be nice to make this bit more modular so we could register other kinds of resource more easily
        var metadata = resource.metadata || {};
        var labels = metadata.labels || {};
        var kindLabel = labels[kindAnnotation];

        if (kindLabel == "Function") {
          return new Function().setResource(resource);
        } else if (kindLabel == "Connector") {
          return new Connection().setResource(resource);
        } else if (kindLabel == "Flow") {
          return new Integration().setResource(resource);
        } else if (resource.kind) {
          return new KubernetesResource().setResource(resource);
        }
        return resource;
      });
    }).service(configMapUrl));
  }


  get(id: string): Observable<T> {
    console.log("Looking up kind " + this.kind + " for id " + id);
    return super.get(id);
  }

  list(): Observable<L> {
    if (this.kind) {
      return this.restangularService.getList({
        labelSelector: kindAnnotation + "=" + this.kind
      });
    } else {
      return super.list();
    }
  }
}
