import {Input, Component} from '@angular/core';

import { Integration } from '../../store/integration/integration.model';

@Component({
  selector: 'ipaas-integration-view',
  templateUrl: './view.integration.html',
  styleUrls: ['./view.integration.scss'],
})
export class IntegrationViewComponent {

  @Input() integration: Integration;

}
