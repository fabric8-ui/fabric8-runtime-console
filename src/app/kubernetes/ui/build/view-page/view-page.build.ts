import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {BuildStore} from "../../../store/build.store";

@Component({
  selector: 'ipaas-build-view-page',
  templateUrl: './view-page.build.html',
  styleUrls: ['./view-page.build.scss'],
})
export class BuildViewPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: BuildStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
