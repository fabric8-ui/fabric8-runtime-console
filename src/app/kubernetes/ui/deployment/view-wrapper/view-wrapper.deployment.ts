import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Deployment} from "../../../model/kuberentes.deployment.model";
import {DeploymentStore} from "../../../store/deployment.store";

@Component({
  selector: 'ipaas-deployment-view-wrapper',
  templateUrl: './view-wrapper.deployment.html',
  styleUrls: ['./view-wrapper.deployment.scss'],
})
export class DeploymentViewWrapperComponent implements OnInit {
  deployment: Observable<Deployment>;

  constructor(private store: DeploymentStore) { }

  ngOnInit() { this.deployment = this.store.resource; }
}
