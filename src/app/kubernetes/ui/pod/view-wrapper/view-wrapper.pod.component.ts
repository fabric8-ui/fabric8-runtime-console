import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Pod} from "../../../model/pod.model";
import {PodStore} from "../../../store/pod.store";

@Component({
  selector: 'fabric8-pod-view-wrapper',
  templateUrl: './view-wrapper.pod.component.html',
  styleUrls: ['./view-wrapper.pod.component.scss'],
})
export class PodViewWrapperComponent implements OnInit {
  pod: Observable<Pod>;

  constructor(private store: PodStore) { }

  ngOnInit() { this.pod = this.store.resource; }
}
