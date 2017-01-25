import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {BuildService} from "../../../service/build.service";
import {YamlEditor} from "../../../view/yaml.editor";
import {Build} from "../../../model/build.model";

@Component({
  selector: 'ipaas-build-edit-toolbar',
  templateUrl: './edit-toolbar.build.html',
  styleUrls: ['./edit-toolbar.build.scss'],
})
export class BuildEditToolbarComponent {

  @Input() build: Build;

  @Input() yamlEditor: YamlEditor;

  constructor(private buildService: BuildService, private router: Router) {
  }

  save() {
    let resource = this.yamlEditor.parseYaml();
    this.buildService.updateResource(this.build, resource).subscribe(
      () => this.router.navigate(['builds']),
    );
  }
}
