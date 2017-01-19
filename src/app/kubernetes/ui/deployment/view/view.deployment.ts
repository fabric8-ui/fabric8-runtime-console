import {Input, Component} from "@angular/core";
import {Deployment} from "../../../model/kuberentes.deployment.model";

@Component({
  selector: 'ipaas-deployment-view',
  templateUrl: './view.deployment.html',
  styleUrls: ['./view.deployment.scss'],
})
export class DeploymentViewComponent {

  @Input() deployment: Deployment;

}
