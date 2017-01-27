import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BuildConfig} from "../../../model/buildconfig.model";
import {BuildConfigStore} from "../../../store/buildconfig.store";

@Component({
  selector: 'fabric8-buildconfig-view-wrapper',
  templateUrl: './view-wrapper.buildconfig.html',
  styleUrls: ['./view-wrapper.buildconfig.scss'],
})
export class BuildConfigViewWrapperComponent implements OnInit {
  buildconfig: Observable<BuildConfig>;

  constructor(private store: BuildConfigStore) { }

  ngOnInit() { this.buildconfig = this.store.resource; }
}
