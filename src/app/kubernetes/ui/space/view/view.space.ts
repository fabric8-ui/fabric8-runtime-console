import {Input, Component} from "@angular/core";
import {Space} from "../../../model/space.model";

@Component({
  selector: 'ipaas-space-view',
  templateUrl: './view.space.html',
  styleUrls: ['./view.space.scss'],
})
export class SpaceViewComponent {

  @Input() space: Space;
}
