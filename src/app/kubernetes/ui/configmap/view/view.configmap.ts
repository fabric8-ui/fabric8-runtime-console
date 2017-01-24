import {Input, Component} from "@angular/core";
import {ConfigMap} from "../../../model/configmap.model";

@Component({
  selector: 'ipaas-configmap-view',
  templateUrl: './view.configmap.html',
  styleUrls: ['./view.configmap.scss'],
})
export class ConfigMapViewComponent {

  @Input() configmap: ConfigMap;
}
