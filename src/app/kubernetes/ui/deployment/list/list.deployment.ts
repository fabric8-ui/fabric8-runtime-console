import {Component, Input, ViewChild} from "@angular/core";
import {DeploymentDeleteDialog} from "../delete-dialog/delete-dialog.deployment";
import {DeploymentViews} from "../../../view/deployment.view";

@Component({
  selector: 'ipaas-deployments-list',
  templateUrl: './list.deployment.html',
  styleUrls: ['./list.deployment.scss'],
})
export class DeploymentsListComponent {

  @Input() runtimeDeployments: DeploymentViews;

  @Input() loading: boolean;

  @ViewChild(DeploymentDeleteDialog) deleteDialog: DeploymentDeleteDialog;

  openDeleteDialog(deleteDeploymentModal, deployment) {
    console.log("showing dialog for deployment " + deployment.name);
    this.deleteDialog.modal = deleteDeploymentModal;
    this.deleteDialog.deployment = deployment;
    deleteDeploymentModal.open();
  }

}
