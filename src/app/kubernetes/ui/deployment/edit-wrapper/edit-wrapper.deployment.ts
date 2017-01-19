import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {Deployment} from "../../../model/kuberentes.deployment.model";
import {DeploymentStore} from "../../../store/deployment.store";

@Component({
  selector: 'ipaas-deployment-edit-wrapper',
  templateUrl: './edit-wrapper.deployment.html',
  styleUrls: ['./edit-wrapper.deployment.scss'],
})
export class DeploymentEditWrapperComponent implements OnInit {
  deployment: Observable<Deployment>;

  constructor(private store: DeploymentStore) { }

  ngOnInit() { this.deployment = this.store.resource; }
}
