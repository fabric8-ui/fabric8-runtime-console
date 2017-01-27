import {Component, Input, ViewChild} from "@angular/core";
import {BuildConfigDeleteDialog} from "../delete-dialog/delete-dialog.buildconfig";
import {BuildConfigs} from "../../../model/buildconfig.model";

@Component({
  selector: 'fabric8-buildconfigs-list',
  templateUrl: './list.buildconfig.html',
  styleUrls: ['./list.buildconfig.scss'],
})
export class BuildConfigsListComponent {

  @Input() buildconfigs: BuildConfigs;

  @Input() loading: boolean;

  @ViewChild(BuildConfigDeleteDialog) deleteDialog: BuildConfigDeleteDialog;

  openDeleteDialog(deleteBuildConfigModal, buildconfig) {
    this.deleteDialog.modal = deleteBuildConfigModal;
    this.deleteDialog.buildconfig = buildconfig;
    deleteBuildConfigModal.open();
  }

}
