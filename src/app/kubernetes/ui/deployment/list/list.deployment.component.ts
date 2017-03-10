import {Component, Input, ViewChild} from "@angular/core";
import {DeploymentDeleteDialog} from "../delete-dialog/delete-dialog.deployment";
import {DeploymentViews} from "../../../view/deployment.view";
import {DeploymentScaleDialog} from "../scale-dialog/scale-dialog.deployment";

@Component({
  selector: 'fabric8-deployments-list',
  templateUrl: './list.deployment.component.html',
  styleUrls: ['./list.deployment.component.scss'],
})
export class DeploymentsListComponent {

  @Input() runtimeDeployments: DeploymentViews;

  @Input() loading: boolean;

  @ViewChild(DeploymentDeleteDialog) deleteDialog: DeploymentDeleteDialog;

  @ViewChild(DeploymentScaleDialog) scaleDialog: DeploymentScaleDialog;

  openDeleteDialog(deleteDeploymentModal, deployment) {
    this.deleteDialog.modal = deleteDeploymentModal;
    this.deleteDialog.deployment = deployment;
    deleteDeploymentModal.open();
  }

  openScaleDialog(scaleDeploymentModal, deployment) {
    this.scaleDialog.configure(scaleDeploymentModal, deployment);
    scaleDeploymentModal.open();
  }

}
