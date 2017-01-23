import {Injectable} from "@angular/core";
import {ReplicaSetService} from "../service/replicaset.service";
import {ReplicaSet, ReplicaSets} from "../model/replicaset.model";
import {NamespacedResourceStore} from "./namespaced.resource.store";
import {NamespaceContext} from "../service/namespace.context";

@Injectable()
export class ReplicaSetStore extends NamespacedResourceStore<ReplicaSet, ReplicaSets, ReplicaSetService> {
  constructor(replicaSetReplicaSet: ReplicaSetService, namespaceContext: NamespaceContext) {
    super(replicaSetReplicaSet, [], <ReplicaSet>{}, namespaceContext);
  }

  protected get kind() {
    return 'ReplicaSet';
  }
}
