import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {BuildConfigs, combineBuildConfigAndBuilds} from "../../../model/buildconfig.model";
import {BuildConfigStore} from "../../../store/buildconfig.store";
import {APIsStore} from "../../../store/apis.store";
import {BuildStore} from "../../../store/build.store";


@Component({
  selector: 'fabric8-buildconfigs-list-page',
  templateUrl: './list-page.buildconfig.html',
  styleUrls: ['./list-page.buildconfig.scss'],
})
export class BuildConfigsListPage implements OnInit {
  private readonly buildconfigs: Observable<BuildConfigs>;
  private readonly loading: Observable<boolean>;

  constructor(private buildconfigsStore: BuildConfigStore, private buildStore: BuildStore, private apiStore: APIsStore) {
    this.loading = this.buildconfigsStore.loading.combineLatest(this.buildStore.loading, (f, s) => f && s);
    this.buildconfigs = this.buildconfigsStore.list.combineLatest(this.buildStore.list, combineBuildConfigAndBuilds);
  }

  ngOnInit() {
    this.apiStore.load();
    this.apiStore.loading.distinctUntilChanged().subscribe((flag) => {
      if (!flag) {
        // lets wait until we've loaded the APIS before trying to load the BuildConfigs
        this.buildconfigsStore.loadAll();
        this.buildStore.loadAll();
      }
    });
  }

}
