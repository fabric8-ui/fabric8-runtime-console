import {AbstractStore} from "../../store/entity/entity.store";
import {Injectable} from "@angular/core";
import {ReplicaSetService} from "../service/replicaset.service";
import {ReplicaSet, ReplicaSets} from "../model/replicaset.model";

@Injectable()
export class ReplicaSetStore extends AbstractStore<ReplicaSet, ReplicaSets, ReplicaSetService> {
  constructor(replicaSetReplicaSet: ReplicaSetService) {
    super(replicaSetReplicaSet, [], <ReplicaSet>{});
  }

  protected get kind() {
    return 'ReplicaSet';
  }
}
