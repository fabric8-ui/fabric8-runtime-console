import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {CompositeDeploymentStore} from "../../../store/compositedeployment.store";

@Component({
  selector: 'ipaas-deployment-view-page',
  templateUrl: './view-page.deployment.html',
  styleUrls: ['./view-page.deployment.scss'],
})
export class DeploymentViewPage implements OnDestroy {
  private idSubscription: Subscription;

  constructor(store: CompositeDeploymentStore, route: ActivatedRoute) {
    this.idSubscription = route.params.pluck<Params, string>('id')
      .map((id) => store.load(id))
      .subscribe();
  }

  ngOnDestroy() { this.idSubscription.unsubscribe(); }
}
