import {Component, Input} from "@angular/core";
import {Build} from "../../../model/build.model";

@Component({
  selector: 'build-stage-view',
  templateUrl: './build-stage-view.component.html',
  styleUrls: ['./build-stage-view.component.scss'],
})
export class BuildStageViewComponent {

  @Input() build: Build;

}
