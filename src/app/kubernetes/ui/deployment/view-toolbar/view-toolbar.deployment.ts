import {Component, Input} from "@angular/core";
import {Deployment} from "../../../model/deployment.model";

@Component({
  selector: 'ipaas-deployment-view-toolbar',
  templateUrl: './view-toolbar.deployment.html',
  styleUrls: ['./view-toolbar.deployment.scss'],
})
export class DeploymentViewToolbarComponent {

  @Input() deployment: Deployment;

}
