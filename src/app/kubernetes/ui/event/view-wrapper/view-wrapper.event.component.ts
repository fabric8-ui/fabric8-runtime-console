import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Event} from "../../../model/event.model";
import {EventStore} from "../../../store/event.store";

@Component({
  selector: 'fabric8-event-view-wrapper',
  templateUrl: './view-wrapper.event.component.html',
  styleUrls: ['./view-wrapper.event.component.scss'],
})
export class EventViewWrapperComponent implements OnInit {
  event: Observable<Event>;

  constructor(private store: EventStore) { }

  ngOnInit() { this.event = this.store.resource; }
}
