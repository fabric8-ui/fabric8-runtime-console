import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ConfigMap} from "../../../model/configmap.model";
import {ConfigMapStore} from "../../../store/configmap.store";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'ipaas-configmap-edit-wrapper',
  templateUrl: './edit-wrapper.configmap.html',
  styleUrls: ['./edit-wrapper.configmap.scss'],
})
export class ConfigMapEditWrapperComponent implements OnInit {
  configmap: Observable<ConfigMap>;
  yamlEditor = new YamlEditor();

  constructor(private store: ConfigMapStore) {
  }

  ngOnInit() {
    this.configmap = this.store.resource;
    this.configmap.subscribe((d) => this.yamlEditor.loadResource(d));
  }
}
