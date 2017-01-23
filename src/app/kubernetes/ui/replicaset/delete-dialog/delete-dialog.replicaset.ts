import {Component} from "@angular/core";
import {ReplicaSet} from "../../../model/replicaset.model";
import {ReplicaSetStore} from "../../../store/replicaset.store";
import {ReplicaSetService} from "../../../service/replicaset.service";

@Component({
  selector: 'delete-replicaset-dialog',
  templateUrl: './delete-dialog.replicaset.html',
  styleUrls: ['./delete-dialog.replicaset.scss'],
})
export class ReplicaSetDeleteDialog {
  replicaset: ReplicaSet = new ReplicaSet();
  modal: any;

  constructor(private replicasetService: ReplicaSetService, private replicasetStore: ReplicaSetStore) {
  }

  ok() {
    console.log('deleting replicaset ' + this.replicaset.name);
    this.modal.close();
    this.replicasetService.delete(this.replicaset).subscribe(
      () => {
        this.replicasetStore.loadAll();
      },
    );
  }

  close() {
    this.modal.close();
  }
}
