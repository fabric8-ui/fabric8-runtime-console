import {Component} from "@angular/core";
import {ReplicaSet} from "../../../model/replicaset.model";
import {ReplicaSetStore} from "../../../store/replicaset.store";
import {ReplicaSetService} from "../../../service/replicaset.service";

@Component({
  selector: 'scale-replicaset-dialog',
  templateUrl: './scale-dialog.replicaset.html',
  styleUrls: ['./scale-dialog.replicaset.scss'],
})
export class ReplicaSetScaleDialog {
  replicaset: ReplicaSet = new ReplicaSet();
  modal: any;
  replicas: number = 0;

  constructor(private replicasetService: ReplicaSetService, private replicasetStore: ReplicaSetStore) {
  }

  configure(modal: any, replicaset: ReplicaSet) {
    this.modal = modal;
    this.replicaset = replicaset;
    this.replicas = replicaset.replicas || 0;
  }
  ok() {
    console.log('scaling replicaset ' + this.replicaset.name);
    this.modal.close();
    if (this.replicas !== this.replicaset.replicas) {
      this.replicaset.replicas = this.replicas;
      this.replicasetService.update(this.replicaset).subscribe(
        () => {
          this.replicasetStore.loadAll();
        },
      );
    }
  }

  close() {
    this.modal.close();
  }
}
