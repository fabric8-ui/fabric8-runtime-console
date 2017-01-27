import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {NamespaceStore} from "../../../store/namespace.store";

@Component({
  selector: 'fabric8-namespace-view-page',
  templateUrl: './view-page.namespace.html',
  styleUrls: ['./view-page.namespace.scss'],
})
export class NamespaceViewPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: NamespaceStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
