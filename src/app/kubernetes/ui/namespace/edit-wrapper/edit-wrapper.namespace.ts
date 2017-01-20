import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Namespace} from "../../../model/namespace.model";
import {NamespaceStore} from "../../../store/namespace.store";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'ipaas-namespace-edit-wrapper',
  templateUrl: './edit-wrapper.namespace.html',
  styleUrls: ['./edit-wrapper.namespace.scss'],
})
export class NamespaceEditWrapperComponent implements OnInit {
  namespace: Observable<Namespace>;
  yamlEditor = new YamlEditor();

  constructor(private store: NamespaceStore) {
  }

  ngOnInit() {
    this.namespace = this.store.resource;
    this.namespace.subscribe((d) => this.yamlEditor.loadResource(d));
  }
}
