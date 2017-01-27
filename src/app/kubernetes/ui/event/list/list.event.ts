import {Component, Input} from "@angular/core";
import {Events} from "../../../model/event.model";

@Component({
  selector: 'fabric8-events-list',
  templateUrl: './list.event.html',
  styleUrls: ['./list.event.scss'],
})
export class EventsListComponent {

  @Input() events: Events;

  @Input() loading: boolean;
}
