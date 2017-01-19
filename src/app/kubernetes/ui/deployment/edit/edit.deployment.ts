import {Input, Component} from '@angular/core';
import {Deployment} from "../../../model/kuberentes.deployment.model";


@Component({
  selector: 'ipaas-deployment-edit',
  templateUrl: './edit.deployment.html',
  styleUrls: ['./edit.deployment.scss'],
})
export class DeploymentEditComponent {

  @Input() deployment: Deployment;

}
