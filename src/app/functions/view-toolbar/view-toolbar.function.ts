import { Component, Input } from '@angular/core';

import { Function } from '../../store/function/function.model';

@Component({
  selector: 'ipaas-function-view-toolbar',
  templateUrl: './view-toolbar.function.html',
  styleUrls: ['./view-toolbar.function.scss'],
})
export class FunctionViewToolbarComponent {

  @Input() fn: Function;

}
