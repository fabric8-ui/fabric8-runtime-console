import {Input, Component, ViewChild} from "@angular/core";
import {ReplicaSet} from "../../../model/replicaset.model";
import {ReplicaSetScaleDialog} from "../scale-dialog/scale-dialog.replicaset";

@Component({
  selector: 'ipaas-replicaset-view',
  templateUrl: './view.replicaset.html',
  styleUrls: ['./view.replicaset.scss'],
})
export class ReplicaSetViewComponent {

  @Input() replicaset: ReplicaSet;

  @ViewChild(ReplicaSetScaleDialog) scaleDialog: ReplicaSetScaleDialog;

  openScaleDialog(scaleReplicaSetModal, replicaset) {
    this.scaleDialog.configure(scaleReplicaSetModal, replicaset);
    scaleReplicaSetModal.open();
  }
}
