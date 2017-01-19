import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {DeploymentService} from "../../../service/deployment.service";
import {Deployment} from "../../../model/kuberentes.deployment.model";

@Component({
  selector: 'ipaas-deployment-edit-toolbar',
  templateUrl: './edit-toolbar.deployment.html',
  styleUrls: ['./edit-toolbar.deployment.scss'],
})
export class DeploymentEditToolbarComponent {

  @Input() deployment: Deployment;

  constructor(private deploymentService: DeploymentService, private router: Router) {
  }

  save() {
    this.deploymentService.update(this.deployment).subscribe(
      () => this.router.navigate(["deployments"])
    );
  }
}
