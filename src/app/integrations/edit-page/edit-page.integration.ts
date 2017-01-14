import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {IntegrationStore} from "../../store/integration/integration.store";

@Component({
  selector: 'ipaas-integration-edit-page',
  templateUrl: './edit-page.integration.html',
  styleUrls: ['./edit-page.integration.scss'],
})
export class IntegrationEditPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: IntegrationStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
