import {Component, Input} from "@angular/core";
import {ReplicaSet} from "../../../model/replicaset.model";

@Component({
  selector: 'ipaas-replicaset-view-toolbar',
  templateUrl: './view-toolbar.replicaset.html',
  styleUrls: ['./view-toolbar.replicaset.scss'],
})
export class ReplicaSetViewToolbarComponent {

  @Input() replicaset: ReplicaSet;

}
