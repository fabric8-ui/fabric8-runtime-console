import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ServiceStore} from "../../../store/service.store";

@Component({
  selector: 'ipaas-service-view-page',
  templateUrl: './view-page.service.html',
  styleUrls: ['./view-page.service.scss'],
})
export class ServiceViewPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: ServiceStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
