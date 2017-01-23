import {Input, Component} from "@angular/core";
import {Pod} from "../../../model/pod.model";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'ipaas-pod-edit',
  templateUrl: './edit.pod.html',
  styleUrls: ['./edit.pod.scss'],
})
export class PodEditComponent {

  @Input() pod: Pod;

  @Input() yamlEditor: YamlEditor;

}

