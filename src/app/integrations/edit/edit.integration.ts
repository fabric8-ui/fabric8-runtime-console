import {Input, Component} from '@angular/core';

import { Integration } from '../../store/integration/integration.model';

@Component({
  selector: 'ipaas-integration-edit',
  templateUrl: './edit.integration.html',
  styleUrls: ['./edit.integration.scss'],
})
export class IntegrationEditComponent {

  @Input() integration: Integration;

}
