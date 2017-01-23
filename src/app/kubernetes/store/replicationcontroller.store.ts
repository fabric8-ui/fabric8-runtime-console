import {Injectable} from "@angular/core";
import {ReplicationControllerService} from "../service/replicationcontroller.service";
import {ReplicationController, ReplicationControllers} from "../model/replicationcontroller.model";
import {NamespacedResourceStore} from "./namespaced.resource.store";
import {NamespaceContext} from "../service/namespace.context";

@Injectable()
export class ReplicationControllerStore extends NamespacedResourceStore<ReplicationController, ReplicationControllers, ReplicationControllerService> {
  constructor(replicationControllerReplicationController: ReplicationControllerService, namespaceContext: NamespaceContext) {
    super(replicationControllerReplicationController, [], <ReplicationController>{}, namespaceContext);
  }

  protected get kind() {
    return 'ReplicationController';
  }
}
