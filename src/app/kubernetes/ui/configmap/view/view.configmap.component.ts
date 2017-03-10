import {Input, Component} from "@angular/core";
import {ConfigMap} from "../../../model/configmap.model";

@Component({
  selector: 'fabric8-configmap-view',
  templateUrl: './view.configmap.component.html',
  styleUrls: ['./view.configmap.component.scss'],
})
export class ConfigMapViewComponent {

  @Input() configmap: ConfigMap;
}
