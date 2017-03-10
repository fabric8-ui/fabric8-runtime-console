import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Deployment} from "../../../model/deployment.model";
import {CompositeDeploymentStore} from "../../../store/compositedeployment.store";

@Component({
  selector: 'fabric8-deployment-view-wrapper',
  templateUrl: './view-wrapper.deployment.component.html',
  styleUrls: ['./view-wrapper.deployment.component.scss'],
})
export class DeploymentViewWrapperComponent implements OnInit {
  deployment: Observable<Deployment>;

  constructor(private store: CompositeDeploymentStore) { }

  ngOnInit() { this.deployment = this.store.resource; }
}
