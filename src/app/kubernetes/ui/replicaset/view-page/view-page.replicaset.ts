import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ReplicaSetStore} from "../../../store/replicaset.store";

@Component({
  selector: 'ipaas-replicaset-view-page',
  templateUrl: './view-page.replicaset.html',
  styleUrls: ['./view-page.replicaset.scss'],
})
export class ReplicaSetViewPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: ReplicaSetStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
