import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Pods} from "../../../model/pod.model";
import {PodStore} from "../../../store/pod.store";
import {ServiceStore} from "../../../store/service.store";


@Component({
  selector: 'ipaas-pods-list-page',
  templateUrl: './list-page.pod.html',
  styleUrls: ['./list-page.pod.scss'],
})
export class PodsListPage implements OnInit {
  private readonly pods: Observable<Pods>;
  private readonly loading: Observable<boolean>;

  constructor(private podsStore: PodStore, private serviceStore: ServiceStore) {
    this.pods = this.podsStore.list;
    this.loading = this.podsStore.loading;
  }

  ngOnInit() {
    this.podsStore.loadAll();
    this.serviceStore.loadAll();
  }

}
