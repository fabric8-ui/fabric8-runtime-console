import {Input, Component} from "@angular/core";
import {ConfigMap} from "../../../model/configmap.model";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'fabric8-configmap-edit',
  templateUrl: './edit.configmap.html',
  styleUrls: ['./edit.configmap.scss'],
})
export class ConfigMapEditComponent {

  @Input() configmap: ConfigMap;

  @Input() yamlEditor: YamlEditor;

}

