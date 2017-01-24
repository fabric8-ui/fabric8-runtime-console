import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BuildConfigs} from "../../../model/buildconfig.model";
import {BuildConfigStore} from "../../../store/buildconfig.store";


@Component({
  selector: 'ipaas-buildconfigs-list-page',
  templateUrl: './list-page.buildconfig.html',
  styleUrls: ['./list-page.buildconfig.scss'],
})
export class BuildConfigsListPage implements OnInit {
  private readonly buildconfigs: Observable<BuildConfigs>;
  private readonly loading: Observable<boolean>;

  constructor(private buildconfigsStore: BuildConfigStore) {
    this.buildconfigs = this.buildconfigsStore.list;
    this.loading = this.buildconfigsStore.loading;
  }

  ngOnInit() {
    this.buildconfigsStore.loadAll();
  }

}
