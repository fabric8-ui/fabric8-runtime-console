import {Component, Input} from "@angular/core";
import {Events} from "../../../model/event.model";

@Component({
  selector: 'fabric8-events-list',
  templateUrl: './list.event.component.html',
  styleUrls: ['./list.event.component.scss'],
})
export class EventsListComponent {

  @Input() events: Events;

  @Input() loading: boolean;
}
