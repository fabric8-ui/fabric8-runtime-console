import {Component, ViewChild} from "@angular/core";
import {Deployment} from "../../../model/deployment.model";
import {DeploymentStore} from "../../../store/deployment.store";
import {DeploymentService} from "../../../service/deployment.service";
import {Observable} from "rxjs";

@Component({
  selector: 'scale-deployment-dialog',
  templateUrl: './scale-dialog.deployment.component.html',
  styleUrls: ['./scale-dialog.deployment.component.scss'],
})
export class DeploymentScaleDialog {
  deployment: Deployment = new Deployment();
  modal: any;
  replicas: number = 0;

  @ViewChild('scaleInput') scaleInput;


  constructor(private deploymentService: DeploymentService, private deploymentStore: DeploymentStore) {
  }

  configure(modal: any, deployment: Deployment) {
    this.modal = modal;
    this.deployment = deployment;
    this.replicas = deployment.replicas || 0;
  }


  ok() {
    console.log('scaling deployment ' + this.deployment.name);
    this.modal.close();
    if (this.replicas !== this.deployment.replicas) {
      this.deployment.replicas = this.replicas;
      this.deploymentService.update(this.deployment).subscribe(
        () => {
          this.deploymentStore.loadAll();
        },
      );
    }
  }

  open() {
    this.modal.open();
    Observable.timer(100).subscribe(next => {
      if (this.scaleInput) {
        console.log("======= open");
        this.scaleInput.nativeElement.focus();
      } else {
        console.log("Warning: could not find #scaleInput in the template: scale-dialog.deployment.component.html");
      }
    });
  }

  close() {
    this.modal.close();
  }
}
