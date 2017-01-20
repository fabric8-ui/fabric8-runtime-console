import {Input, Component} from "@angular/core";
import {Namespace} from "../../../model/namespace.model";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'ipaas-namespace-edit',
  templateUrl: './edit.namespace.html',
  styleUrls: ['./edit.namespace.scss'],
})
export class NamespaceEditComponent {

  @Input() namespace: Namespace;

  @Input() yamlEditor: YamlEditor;

}

