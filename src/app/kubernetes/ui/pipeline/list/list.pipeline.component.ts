import {Component, Input, ViewChild} from "@angular/core";
import {BuildConfigs} from "../../../model/buildconfig.model";
import {BuildConfigDeleteDialog} from "../../buildconfig/delete-dialog/delete-dialog.buildconfig.component";

@Component({
  selector: 'fabric8-pipelines-list',
  templateUrl: './list.pipeline.component.html',
  styleUrls: ['./list.pipeline.component.scss'],
})
export class PipelinesListComponent {

  @Input() pipelines: BuildConfigs;

  @Input() loading: boolean;

  @ViewChild(BuildConfigDeleteDialog) deleteDialog: BuildConfigDeleteDialog;

  // This hardcode will be replaced by the information received from the build to trigger the stack analysis
  public codebases: Array<any> = [
        {
        name: 'Pllm',
        uuid: 'ff59ea91cf264003bc6dc12621c91205'
        },
    ];

  openDeleteDialog(deleteBuildConfigModal, pipeline) {
    this.deleteDialog.modal = deleteBuildConfigModal;
    this.deleteDialog.buildconfig = pipeline;
    deleteBuildConfigModal.open();
  }

}
