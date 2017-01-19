import {Component} from "@angular/core";
import {Deployment} from "../../../model/kuberentes.deployment.model";
import {DeploymentStore} from "../../../store/deployment.store";
import {DeploymentService} from "../../../service/deployment.service";

@Component({
  selector: 'scale-deployment-dialog',
  templateUrl: './scale-dialog.deployment.html',
  styleUrls: ['./scale-dialog.deployment.scss']
})
export class DeploymentScaleDialog {
  deployment: Deployment = new Deployment();
  modal: any;
  replicas: number = 0;

  constructor(private deploymentService: DeploymentService, private deploymentStore: DeploymentStore) {
  }

  configure(modal: any, deployment: Deployment) {
    this.modal = modal;
    this.deployment = deployment;
    this.replicas = deployment.replicas || 0;
  }
  ok() {
    console.log("scaling deployment " + this.deployment.name);
    this.modal.close();
    if (this.replicas !== this.deployment.replicas) {
      this.deployment.replicas = this.replicas;
      this.deploymentService.update(this.deployment).subscribe(
        () => {
          this.deploymentStore.loadAll();
        }
      );
    }
  }

  close() {
    this.modal.close();
  }
}
