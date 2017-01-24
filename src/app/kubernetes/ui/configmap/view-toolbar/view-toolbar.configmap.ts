import {Component, Input} from "@angular/core";
import {ConfigMap} from "../../../model/configmap.model";

@Component({
  selector: 'ipaas-configmap-view-toolbar',
  templateUrl: './view-toolbar.configmap.html',
  styleUrls: ['./view-toolbar.configmap.scss'],
})
export class ConfigMapViewToolbarComponent {

  @Input() configmap: ConfigMap;

}
