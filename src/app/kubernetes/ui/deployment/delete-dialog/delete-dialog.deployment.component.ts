import {Component} from "@angular/core";
import {Deployment} from "../../../model/deployment.model";
import {DeploymentStore} from "../../../store/deployment.store";
import {DeploymentService} from "../../../service/deployment.service";

@Component({
  selector: 'delete-deployment-dialog',
  templateUrl: './delete-dialog.deployment.component.html',
  styleUrls: ['./delete-dialog.deployment.component.scss'],
})
export class DeploymentDeleteDialog {
  deployment: Deployment = new Deployment();
  modal: any;

  constructor(private deploymentService: DeploymentService, private deploymentStore: DeploymentStore) {
  }

  ok() {
    console.log('deleting deployment ' + this.deployment.name);
    this.modal.close();
    this.deploymentService.delete(this.deployment).subscribe(
      () => {
        this.deploymentStore.loadAll();
      },
    );
  }

  close() {
    this.modal.close();
  }
}
