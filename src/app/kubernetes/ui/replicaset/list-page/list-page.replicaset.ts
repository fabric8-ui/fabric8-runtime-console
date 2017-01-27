import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ReplicaSets} from "../../../model/replicaset.model";
import {Services} from "../../../model/service.model";
import {ReplicaSetStore} from "../../../store/replicaset.store";
import {ReplicaSetViews, createReplicaSetViews} from "../../../view/replicaset.view";
import {ServiceStore} from "../../../store/service.store";


@Component({
  selector: 'fabric8-replicasets-list-page',
  templateUrl: './list-page.replicaset.html',
  styleUrls: ['./list-page.replicaset.scss'],
})
export class ReplicaSetsListPage implements OnInit {
  private readonly replicasets: Observable<ReplicaSets>;
  private readonly services: Observable<Services>;
  private readonly loading: Observable<boolean>;
  private readonly runtimeReplicaSets: Observable<ReplicaSetViews>;

  constructor(private replicasetsStore: ReplicaSetStore, private serviceStore: ServiceStore) {
    this.replicasets = this.replicasetsStore.list;
    this.services = this.serviceStore.list;
    this.loading = this.replicasetsStore.loading.combineLatest(this.serviceStore.loading, (f, s) => f && s);
    this.runtimeReplicaSets = this.replicasets.combineLatest(this.services, createReplicaSetViews);
  }

  ngOnInit() {
    this.replicasetsStore.loadAll();
    this.serviceStore.loadAll();
  }

}
