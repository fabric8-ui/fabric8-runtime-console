import {Input, Component} from "@angular/core";
import {BuildConfig} from "../../../model/buildconfig.model";

@Component({
  selector: 'fabric8-buildconfig-view',
  templateUrl: './view.buildconfig.html',
  styleUrls: ['./view.buildconfig.scss'],
})
export class BuildConfigViewComponent {

  @Input() buildconfig: BuildConfig;
}
