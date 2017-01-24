import {Component, Input} from "@angular/core";
import {Event} from "../../../model/event.model";

@Component({
  selector: 'ipaas-event-view-toolbar',
  templateUrl: './view-toolbar.event.html',
  styleUrls: ['./view-toolbar.event.scss'],
})
export class EventViewToolbarComponent {

  @Input() event: Event;

}
