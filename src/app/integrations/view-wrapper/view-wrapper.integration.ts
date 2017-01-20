import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Integration} from "../../store/integration/integration.model";
import {IntegrationStore} from "../../store/integration/integration.store";

@Component({
  selector: 'ipaas-integration-view-wrapper',
  templateUrl: './view-wrapper.integration.html',
  styleUrls: ['./view-wrapper.integration.scss'],
})
export class IntegrationViewWrapperComponent implements OnInit {
  integration: Observable<Integration>;

  constructor(private store: IntegrationStore) {
  }

  ngOnInit() {
    this.integration = this.store.resource;
  }
}
