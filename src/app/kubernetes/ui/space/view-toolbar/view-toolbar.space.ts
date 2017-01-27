import {Component, Input} from "@angular/core";
import {Space} from "../../../model/space.model";

@Component({
  selector: 'fabric8-space-view-toolbar',
  templateUrl: './view-toolbar.space.html',
  styleUrls: ['./view-toolbar.space.scss'],
})
export class SpaceViewToolbarComponent {

  @Input() space: Space;

}
