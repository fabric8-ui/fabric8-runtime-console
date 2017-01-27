import {Input, Component} from "@angular/core";
import {Deployment} from "../../../model/deployment.model";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'fabric8-deployment-edit',
  templateUrl: './edit.deployment.html',
  styleUrls: ['./edit.deployment.scss'],
})
export class DeploymentEditComponent {

  @Input() deployment: Deployment;

  @Input() yamlEditor: YamlEditor;

}

