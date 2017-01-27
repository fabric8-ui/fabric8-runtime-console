import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Build} from "../../../model/build.model";
import {BuildStore} from "../../../store/build.store";

@Component({
  selector: 'fabric8-build-view-wrapper',
  templateUrl: './view-wrapper.build.html',
  styleUrls: ['./view-wrapper.build.scss'],
})
export class BuildViewWrapperComponent implements OnInit {
  build: Observable<Build>;

  constructor(private store: BuildStore) { }

  ngOnInit() { this.build = this.store.resource; }
}
