import {Input, Component} from "@angular/core";
import {Service} from "../../../model/service.model";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'ipaas-service-edit',
  templateUrl: './edit.service.html',
  styleUrls: ['./edit.service.scss'],
})
export class ServiceEditComponent {

  @Input() service: Service;

  @Input() yamlEditor: YamlEditor;

}

