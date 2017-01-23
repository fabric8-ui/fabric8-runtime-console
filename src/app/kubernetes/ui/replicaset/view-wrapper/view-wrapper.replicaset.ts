import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ReplicaSet} from "../../../model/replicaset.model";
import {ReplicaSetStore} from "../../../store/replicaset.store";

@Component({
  selector: 'ipaas-replicaset-view-wrapper',
  templateUrl: './view-wrapper.replicaset.html',
  styleUrls: ['./view-wrapper.replicaset.scss'],
})
export class ReplicaSetViewWrapperComponent implements OnInit {
  replicaset: Observable<ReplicaSet>;

  constructor(private store: ReplicaSetStore) { }

  ngOnInit() { this.replicaset = this.store.resource; }
}
