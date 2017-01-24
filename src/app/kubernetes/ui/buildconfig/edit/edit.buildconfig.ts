import {Input, Component} from "@angular/core";
import {BuildConfig} from "../../../model/buildconfig.model";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'ipaas-buildconfig-edit',
  templateUrl: './edit.buildconfig.html',
  styleUrls: ['./edit.buildconfig.scss'],
})
export class BuildConfigEditComponent {

  @Input() buildconfig: BuildConfig;

  @Input() yamlEditor: YamlEditor;

}

