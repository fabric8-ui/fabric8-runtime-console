import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BuildConfig} from "../../../model/buildconfig.model";
import {BuildConfigStore} from "../../../store/buildconfig.store";

@Component({
  selector: 'fabric8-pipeline-view-wrapper',
  templateUrl: './view-wrapper.pipeline.component.html',
  styleUrls: ['./view-wrapper.pipeline.component.scss'],
})
export class PipelineViewWrapperComponent implements OnInit {
  pipeline: Observable<BuildConfig>;

  constructor(private store: BuildConfigStore) { }

  ngOnInit() { this.pipeline = this.store.resource; }
}
