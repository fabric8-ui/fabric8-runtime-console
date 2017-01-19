import {Injectable, Inject} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {Connections, Connection} from "./connection.model";
import {KUBERNETES_RESTANGULAR} from "../../kubernetes/service/kubernetes.restangular";
import {ConfigMapService} from "../../kubernetes/service/configmap.service";

/*
@Injectable()
export class ConnectionService extends RESTService<Connection, Connections> {
  constructor(restangular: Restangular) {
    super(restangular.service('connections'));
  }

*/
@Injectable()
export class ConnectionService extends ConfigMapService<Connection, Connections> {

  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
    super(kubernetesRestangular, "Connector");
  }
}
