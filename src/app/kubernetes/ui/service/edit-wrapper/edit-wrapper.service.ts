import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Service} from "../../../model/service.model";
import {ServiceStore} from "../../../store/service.store";
import {YamlEditor} from "../../../view/yaml.editor";

@Component({
  selector: 'ipaas-service-edit-wrapper',
  templateUrl: './edit-wrapper.service.html',
  styleUrls: ['./edit-wrapper.service.scss'],
})
export class ServiceEditWrapperComponent implements OnInit {
  service: Observable<Service>;
  yamlEditor = new YamlEditor();

  constructor(private store: ServiceStore) {
  }

  ngOnInit() {
    this.service = this.store.resource;
    this.service.subscribe((d) => this.yamlEditor.loadResource(d));
  }
}
