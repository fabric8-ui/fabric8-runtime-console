import {Input, Component} from "@angular/core";
import {Space} from "../../../model/space.model";

@Component({
  selector: 'fabric8-space-view',
  templateUrl: './view.space.component.html',
  styleUrls: ['./view.space.component.scss'],
})
export class SpaceViewComponent {

  @Input() space: Space;
}
