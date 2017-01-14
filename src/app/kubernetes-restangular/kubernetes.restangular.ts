import {NgModule, OpaqueToken} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Connection} from "../store/connection/connection.model";
import {Integration} from "../store/integration/integration.model";
import {KubernetesResource} from "./kuberentes.model";
import {Function} from "../store/function/function.model";
import {Service} from "./kuberentes.service.model";
import {Deployment} from "./kuberentes.deployment.model";
import {ConfigMap} from "./kuberentes.configmap.model";


export const KUBERNETES_RESTANGULAR = new OpaqueToken('KubernetesRestangular');

export const FunktionKindAnnotation = "funktion.fabric8.io/kind";


function convertToKubernetesResource(resource) {
  // TODO would be nice to make this bit more modular so we could register other kinds of resource more easily
  var metadata = resource.metadata || {};
  var labels = metadata.labels || {};
  var kindLabel = labels[FunktionKindAnnotation];
  var kind = resource.kind;
  if (!kind) {
    return resource;
  }
  switch (kind) {
    case "ConfigMap":
      switch (kindLabel) {
        case  "Function" :
          return new Function().setResource(resource);
        case  "Connector" :
          return new Connection().setResource(resource);
        case  "Flow" :
          return new Integration().setResource(resource);
        default:
          return new ConfigMap().setResource(resource);
      }
    case "Service":
      return new Service().setResource(resource);
    case "Deployment":
      return new Deployment().setResource(resource);
    default:
      console.log("Unknown resource kind " + kind);
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
      var kind = data ? data.kind : null;
      if (operation === "getList") {
        if (data && data.constructor !== Array) {
          if (kind.endsWith("List")) {
            kind = kind.substring(0, kind.length - 4);
          }
          var resourceApiVersion = (data.metadata || {}).apiVersion;
          return (data.items || []).map((object) => {
            // ensure each item has a kind and api version
            if (!object.apiVersion) {
              object.apiVersion = resourceApiVersion;
            }
            if (!object.kind) {
              object.kind = kind;
            }
            return convertToKubernetesResource(object);
          });
        }
      } else if (data && kind) {
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

