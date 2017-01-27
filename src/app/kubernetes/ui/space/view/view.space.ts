import {Input, Component} from "@angular/core";
import {Space} from "../../../model/space.model";

@Component({
  selector: 'fabric8-space-view',
  templateUrl: './view.space.html',
  styleUrls: ['./view.space.scss'],
})
export class SpaceViewComponent {

  @Input() space: Space;
}
