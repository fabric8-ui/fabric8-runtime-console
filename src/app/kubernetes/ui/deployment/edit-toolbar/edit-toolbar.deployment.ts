import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {DeploymentService} from "../../../service/deployment.service";
import {YamlEditor} from "../../../view/yaml.editor";
import {Deployment} from "../../../model/kuberentes.deployment.model";

@Component({
  selector: 'ipaas-deployment-edit-toolbar',
  templateUrl: './edit-toolbar.deployment.html',
  styleUrls: ['./edit-toolbar.deployment.scss'],
})
export class DeploymentEditToolbarComponent {

  @Input() deployment: Deployment;

  @Input() yamlEditor: YamlEditor;

  constructor(private deploymentService: DeploymentService, private router: Router) {
  }

  save() {
    var resource = this.yamlEditor.parseYaml();
    this.deploymentService.updateResource(this.deployment, resource).subscribe(
      () => this.router.navigate(["deployments"])
    );
  }
}
