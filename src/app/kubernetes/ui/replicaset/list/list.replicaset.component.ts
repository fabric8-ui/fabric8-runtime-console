import {Component, Input, ViewChild} from "@angular/core";
import {ReplicaSetDeleteDialog} from "../delete-dialog/delete-dialog.replicaset";
import {ReplicaSetViews} from "../../../view/replicaset.view";
import {ReplicaSetScaleDialog} from "../scale-dialog/scale-dialog.replicaset";

@Component({
  selector: 'fabric8-replicasets-list',
  templateUrl: './list.replicaset.component.html',
  styleUrls: ['./list.replicaset.component.scss'],
})
export class ReplicaSetsListComponent {

  @Input() runtimeReplicaSets: ReplicaSetViews;

  @Input() loading: boolean;

  @ViewChild(ReplicaSetDeleteDialog) deleteDialog: ReplicaSetDeleteDialog;

  @ViewChild(ReplicaSetScaleDialog) scaleDialog: ReplicaSetScaleDialog;

  openDeleteDialog(deleteReplicaSetModal, replicaset) {
    this.deleteDialog.modal = deleteReplicaSetModal;
    this.deleteDialog.replicaset = replicaset;
    deleteReplicaSetModal.open();
  }

  openScaleDialog(scaleReplicaSetModal, replicaset) {
    this.scaleDialog.configure(scaleReplicaSetModal, replicaset);
    scaleReplicaSetModal.open();
  }

}
