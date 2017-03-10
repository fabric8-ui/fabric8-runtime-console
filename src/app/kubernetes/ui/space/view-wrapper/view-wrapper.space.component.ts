import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Space} from "../../../model/space.model";
import {SpaceStore} from "../../../store/space.store";

@Component({
  selector: 'fabric8-space-view-wrapper',
  templateUrl: './view-wrapper.space.component.html',
  styleUrls: ['./view-wrapper.space.component.scss'],
})
export class SpaceViewWrapperComponent implements OnInit {
  space: Observable<Space>;

  constructor(private store: SpaceStore) { }

  ngOnInit() { this.space = this.store.resource; }
}
