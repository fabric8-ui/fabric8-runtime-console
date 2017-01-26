import {Component, Input} from "@angular/core";
import {Space} from "../../../model/space.model";

@Component({
  selector: 'ipaas-space-view-toolbar',
  templateUrl: './view-toolbar.space.html',
  styleUrls: ['./view-toolbar.space.scss'],
})
export class SpaceViewToolbarComponent {

  @Input() space: Space;

}
