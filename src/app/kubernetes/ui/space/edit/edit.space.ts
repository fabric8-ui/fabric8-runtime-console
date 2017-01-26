import {Input, Component} from "@angular/core";
import {Space} from "../../../model/space.model";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'ipaas-space-edit',
  templateUrl: './edit.space.html',
  styleUrls: ['./edit.space.scss'],
})
export class SpaceEditComponent {

  @Input() space: Space;

  @Input() yamlEditor: YamlEditor;

}

