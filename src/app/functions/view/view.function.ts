import {Input, Component} from '@angular/core';

import { Function } from '../../store/function/function.model';

@Component({
  selector: 'ipaas-function-view',
  templateUrl: './view.function.html',
  styleUrls: ['./view.function.scss'],
})
export class FunctionViewComponent {

  @Input() fn: Function;

}
