import {AbstractStore} from "../../store/entity/entity.store";
import {Injectable} from "@angular/core";
import {ReplicationControllerService} from "../service/replicationcontroller.service";
import {ReplicationController, ReplicationControllers} from "../model/replicationcontroller.model";

@Injectable()
export class ReplicationControllerStore extends AbstractStore<ReplicationController, ReplicationControllers, ReplicationControllerService> {
  constructor(replicationControllerReplicationController: ReplicationControllerService) {
    super(replicationControllerReplicationController, [], <ReplicationController>{});
  }

  protected get kind() {
    return 'ReplicationController';
  }
}
