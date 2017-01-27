import {Component, Input, ViewChild} from "@angular/core";
import {PodDeleteDialog} from "../delete-dialog/delete-dialog.pod";
import {Pods} from "../../../model/pod.model";

@Component({
  selector: 'fabric8-pods-list',
  templateUrl: './list.pod.html',
  styleUrls: ['./list.pod.scss'],
})
export class PodsListComponent {

  @Input() pods: Pods;

  @Input() loading: boolean;

  @ViewChild(PodDeleteDialog) deleteDialog: PodDeleteDialog;

  openDeleteDialog(deletePodModal, pod) {
    this.deleteDialog.modal = deletePodModal;
    this.deleteDialog.pod = pod;
    deletePodModal.open();
  }

}
