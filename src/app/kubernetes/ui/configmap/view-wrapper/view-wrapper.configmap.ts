import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ConfigMap} from "../../../model/configmap.model";
import {ConfigMapStore} from "../../../store/configmap.store";

@Component({
  selector: 'fabric8-configmap-view-wrapper',
  templateUrl: './view-wrapper.configmap.html',
  styleUrls: ['./view-wrapper.configmap.scss'],
})
export class ConfigMapViewWrapperComponent implements OnInit {
  configmap: Observable<ConfigMap>;

  constructor(private store: ConfigMapStore) { }

  ngOnInit() { this.configmap = this.store.resource; }
}
