import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {EventStore} from "../../../store/event.store";

@Component({
  selector: 'ipaas-event-view-page',
  templateUrl: './view-page.event.html',
  styleUrls: ['./view-page.event.scss'],
})
export class EventViewPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: EventStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
