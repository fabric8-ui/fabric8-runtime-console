import {Input, Component, ViewChild} from "@angular/core";
import {Deployment} from "../../../model/kuberentes.deployment.model";
import {DeploymentScaleDialog} from "../scale-dialog/scale-dialog.deployment";

@Component({
  selector: 'ipaas-deployment-view',
  templateUrl: './view.deployment.html',
  styleUrls: ['./view.deployment.scss'],
})
export class DeploymentViewComponent {

  @Input() deployment: Deployment;

  @ViewChild(DeploymentScaleDialog) scaleDialog: DeploymentScaleDialog;

  openScaleDialog(scaleDeploymentModal, deployment) {
    this.scaleDialog.configure(scaleDeploymentModal, deployment);
    scaleDeploymentModal.open();
  }
}
