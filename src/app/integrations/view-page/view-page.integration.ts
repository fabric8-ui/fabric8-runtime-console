import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {IntegrationStore} from "../../store/integration/integration.store";

@Component({
  selector: 'ipaas-integration-view-page',
  templateUrl: './view-page.integration.html',
  styleUrls: ['./view-page.integration.scss'],
})
export class IntegrationViewPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: IntegrationStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
