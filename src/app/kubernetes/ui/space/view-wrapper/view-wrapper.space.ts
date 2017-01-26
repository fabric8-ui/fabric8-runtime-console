import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Space} from "../../../model/space.model";
import {SpaceStore} from "../../../store/space.store";

@Component({
  selector: 'ipaas-space-view-wrapper',
  templateUrl: './view-wrapper.space.html',
  styleUrls: ['./view-wrapper.space.scss'],
})
export class SpaceViewWrapperComponent implements OnInit {
  space: Observable<Space>;

  constructor(private store: SpaceStore) { }

  ngOnInit() { this.space = this.store.resource; }
}
