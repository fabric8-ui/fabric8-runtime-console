import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { FunctionStore } from '../../store/function/function.store';

@Component({
  selector: 'ipaas-function-edit-page',
  templateUrl: './edit-page.function.html',
  styleUrls: ['./edit-page.function.scss'],
})
export class FunctionEditPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: FunctionStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
