import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Integration} from "../../store/integration/integration.model";
import {IntegrationStore} from "../../store/integration/integration.store";

@Component({
  selector: 'ipaas-integration-edit-wrapper',
  templateUrl: './edit-wrapper.integration.html',
  styleUrls: ['./edit-wrapper.integration.scss'],
})
export class IntegrationEditWrapperComponent implements OnInit {
  integration: Observable<Integration>;

  constructor(private store: IntegrationStore) {
  }

  ngOnInit() {
    this.integration = this.store.resource;
  }
}
