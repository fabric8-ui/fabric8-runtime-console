import {NgModule, OpaqueToken} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Connection} from "../store/connection/connection.model";
import {Integration} from "../store/integration/integration.model";
import {KubernetesResource} from "./kuberentes.model";
import {Function} from "../store/function/function.model";


export const KUBERNETES_RESTANGULAR = new OpaqueToken('KubernetesRestangular');

export const FunktionKindAnnotation = "funktion.fabric8.io/kind";


function convertToKubernetesResource(resource) {
  // TODO would be nice to make this bit more modular so we could register other kinds of resource more easily
  var metadata = resource.metadata || {};
  var labels = metadata.labels || {};
  var kindLabel = labels[FunktionKindAnnotation];

  if (kindLabel == "Function") {
    return new Function().setResource(resource);
  } else if (kindLabel == "Connector") {
    return new Connection().setResource(resource);
  } else if (kindLabel == "Flow") {
    return new Integration().setResource(resource);
  } else if (resource.kind) {
    return new KubernetesResource().setResource(resource);
  }
}
export function KubernetesRestangularFactory(restangular: Restangular) {
  console.log('kubernetes-restangular');

  return restangular.withConfig((RestangularConfigurer) => {
    // TODO setting the baseUrl to empty string doesn't seem to work so lets use the absolute URL of the app
    var baseUrl = "";
    var location = window.location;
    if (location) {
      var hostname = location.hostname;
      var port = location.port;
      if (hostname) {
        baseUrl = "http://" + hostname;
        if (port) {
          baseUrl += ":" + port;
        }
      }
    }
    console.log("Found URL " + baseUrl);
    RestangularConfigurer.setBaseUrl(baseUrl);

    //RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    RestangularConfigurer.addResponseInterceptor(function (data, operation) {
      if (operation === "getList") {
        // // TODO lets copy the metadata.resourceVersion into all the items!
        if (data && data.constructor !== Array) {
          return (data.items || []).map(convertToKubernetesResource);
        }
      } else if (data && data.kind) {
        return convertToKubernetesResource(data);
      }
      return data;
    });


    // TODO add token
    //RestangularConfigurer.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
  });
}

@NgModule({
  providers: [
    {provide: KUBERNETES_RESTANGULAR, useFactory: KubernetesRestangularFactory, deps: [Restangular]}
  ],
})
export class KubernetesRestangularModule {
}

