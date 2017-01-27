import {Input, Component} from "@angular/core";
import {Build} from "../../../model/build.model";

@Component({
  selector: 'fabric8-build-view',
  templateUrl: './view.build.html',
  styleUrls: ['./view.build.scss'],
})
export class BuildViewComponent {

  @Input() build: Build;
}
