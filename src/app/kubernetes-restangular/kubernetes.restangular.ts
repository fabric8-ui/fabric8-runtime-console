import {NgModule, OpaqueToken} from "@angular/core";
import {Restangular} from "ng2-restangular";


export const KUBERNETES_RESTANGULAR = new OpaqueToken('KubernetesRestangular');

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
          return data.items || [];
        }
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

