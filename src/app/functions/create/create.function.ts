import {Input, Component} from '@angular/core';

import { Function } from '../../store/function/function.model';

@Component({
  selector: 'ipaas-function-create',
  templateUrl: './create.function.html',
  styleUrls: ['./create.function.scss'],
})
export class FunctionCreateComponent {

  @Input() fn: Function;

}
