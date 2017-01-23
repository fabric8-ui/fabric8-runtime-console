import {NgModule, OpaqueToken} from '@angular/core';
import {Restangular} from 'ng2-restangular';
import {KubernetesResource} from '../model/kuberentes.model';
import {Service} from '../model/kuberentes.service.model';
import {Deployment} from '../model/kuberentes.deployment.model';
import {ConfigMap} from '../model/kuberentes.configmap.model';
import {Namespace} from '../model/namespace.model';
import {Pod} from '../model/pod.model';
import {ReplicaSet} from '../model/replicaset.model';
import {ReplicationController} from '../model/replicationcontroller.model';


export const KUBERNETES_RESTANGULAR = new OpaqueToken('KubernetesRestangular');


function convertToKubernetesResource(resource) {
  // TODO would be nice to make this bit more modular so we could register other kinds of resource more easily
  let kind = resource.kind;
  if (!kind) {
    return resource;
  }
  switch (kind) {
    case 'ConfigMap':
      /*
       var metadata = resource.metadata || {};
       var labels = metadata.labels || {};
       var kindLabel = labels[FunktionKindAnnotation];
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
       */
      return new ConfigMap().setResource(resource);
    case 'Service':
      return new Service().setResource(resource);
    case 'Deployment':
      return new Deployment().setResource(resource);
    case 'Namespace':
      return new Namespace().setResource(resource);
    case 'Pod':
      return new Pod().setResource(resource);
    case 'ReplicaSet':
      return new ReplicaSet().setResource(resource);
    case 'ReplicationController':
      return new ReplicationController().setResource(resource);
    default:
      console.log('Unknown resource kind ' + kind);
      return new KubernetesResource().setResource(resource);
  }
}

export function KubernetesRestangularFactory(restangular: Restangular) {
  return restangular.withConfig((RestangularConfigurer) => {
    // TODO setting the baseUrl to empty string doesn't seem to work so lets use the absolute URL of the app
    let baseUrl = '';
    let location = window.location;
    if (location) {
      let hostname = location.hostname;
      let port = location.port;
      if (hostname) {
        baseUrl = 'http://' + hostname;
        if (port) {
          baseUrl += ':' + port;
        }
      }
    }
    //console.log("using Restangular base URL " + baseUrl);
    RestangularConfigurer.setBaseUrl(baseUrl);

    //RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    RestangularConfigurer.addResponseInterceptor(function (data, operation) {
      let kind = data ? data.kind : null;
      if (operation === 'getList') {
        if (data && data.constructor !== Array) {
          if (kind.endsWith('List')) {
            kind = kind.substring(0, kind.length - 4);
          }
          let resourceApiVersion = (data.metadata || {}).apiVersion;
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
    {provide: KUBERNETES_RESTANGULAR, useFactory: KubernetesRestangularFactory, deps: [Restangular]},
  ],
})
export class KubernetesRestangularModule {
}

