import {Injectable} from '@angular/core';
import {ReplicationControllerService} from '../service/replicationcontroller.service';
import {ReplicationController, ReplicationControllers} from '../model/replicationcontroller.model';
import {NamespacedResourceStore} from './namespaced.resource.store';
import {NamespaceScope} from '../service/namespace.scope';

@Injectable()
export class ReplicationControllerStore extends NamespacedResourceStore<ReplicationController, ReplicationControllers, ReplicationControllerService> {
  constructor(replicationControllerReplicationController: ReplicationControllerService, namespaceScope: NamespaceScope) {
    super(replicationControllerReplicationController, [], <ReplicationController>{}, namespaceScope);
  }

  protected get kind() {
    return 'ReplicationController';
  }
}
