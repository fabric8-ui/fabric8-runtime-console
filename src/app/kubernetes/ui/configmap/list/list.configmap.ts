import {Component, Input, ViewChild} from "@angular/core";
import {ConfigMapDeleteDialog} from "../delete-dialog/delete-dialog.configmap";
import {ConfigMaps} from "../../../model/configmap.model";

@Component({
  selector: 'fabric8-configmaps-list',
  templateUrl: './list.configmap.html',
  styleUrls: ['./list.configmap.scss'],
})
export class ConfigMapsListComponent {

  @Input() configmaps: ConfigMaps;

  @Input() loading: boolean;

  @ViewChild(ConfigMapDeleteDialog) deleteDialog: ConfigMapDeleteDialog;

  openDeleteDialog(deleteConfigMapModal, configmap) {
    this.deleteDialog.modal = deleteConfigMapModal;
    this.deleteDialog.configmap = configmap;
    deleteConfigMapModal.open();
  }

}
