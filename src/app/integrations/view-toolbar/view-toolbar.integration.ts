import { Component, Input } from '@angular/core';
import {Integration} from "../../store/integration/integration.model";

@Component({
  selector: 'ipaas-integration-view-toolbar',
  templateUrl: './view-toolbar.integration.html',
  styleUrls: ['./view-toolbar.integration.scss'],
})
export class IntegrationViewToolbarComponent {

  @Input() integration: Integration;

}
