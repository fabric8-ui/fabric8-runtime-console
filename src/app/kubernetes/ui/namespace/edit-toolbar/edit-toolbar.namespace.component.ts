import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {NamespaceService} from "../../../service/namespace.service";
import {YamlEditor} from "../../../view/yaml.editor";
import {Namespace} from "../../../model/namespace.model";

@Component({
  selector: 'fabric8-namespace-edit-toolbar',
  templateUrl: './edit-toolbar.namespace.component.html',
  styleUrls: ['./edit-toolbar.namespace.component.scss'],
})
export class NamespaceEditToolbarComponent {

  @Input() namespace: Namespace;

  @Input() yamlEditor: YamlEditor;

  constructor(private namespaceService: NamespaceService, private router: Router) {
  }

  save() {
    let resource = this.yamlEditor.parseYaml();
    this.namespaceService.updateResource(this.namespace, resource).subscribe(
      () => this.router.navigate(['namespaces']),
    );
  }
}
