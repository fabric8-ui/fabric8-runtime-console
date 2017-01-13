import {Input, Component} from '@angular/core';

import { Function } from '../../store/function/function.model';

@Component({
  selector: 'ipaas-function-edit',
  templateUrl: './edit.function.html',
  styleUrls: ['./edit.function.scss'],
})
export class FunctionEditComponent {

  @Input() fn: Function;

}
