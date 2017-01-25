import {Input, Component} from "@angular/core";
import {Build} from "../../../model/build.model";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'ipaas-build-edit',
  templateUrl: './edit.build.html',
  styleUrls: ['./edit.build.scss'],
})
export class BuildEditComponent {

  @Input() build: Build;

  @Input() yamlEditor: YamlEditor;

}

