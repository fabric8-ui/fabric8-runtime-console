import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Event} from "../../../model/event.model";
import {EventStore} from "../../../store/event.store";

@Component({
  selector: 'ipaas-event-view-wrapper',
  templateUrl: './view-wrapper.event.html',
  styleUrls: ['./view-wrapper.event.scss'],
})
export class EventViewWrapperComponent implements OnInit {
  event: Observable<Event>;

  constructor(private store: EventStore) { }

  ngOnInit() { this.event = this.store.resource; }
}
