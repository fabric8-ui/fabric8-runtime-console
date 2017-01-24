import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {ServiceService} from "../../../service/service.service";
import {YamlEditor} from "../../../view/yaml.editor";
import {Service} from "../../../model/service.model";

@Component({
  selector: 'ipaas-service-edit-toolbar',
  templateUrl: './edit-toolbar.service.html',
  styleUrls: ['./edit-toolbar.service.scss'],
})
export class ServiceEditToolbarComponent {

  @Input() service: Service;

  @Input() yamlEditor: YamlEditor;

  constructor(private serviceService: ServiceService, private router: Router) {
  }

  save() {
    let resource = this.yamlEditor.parseYaml();
    this.serviceService.updateResource(this.service, resource).subscribe(
      () => this.router.navigate(['services']),
    );
  }
}
