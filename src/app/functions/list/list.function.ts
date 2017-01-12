import { Component, Input } from '@angular/core';

import { Functions } from '../../store/function/function.model';

@Component({
  selector: 'ipaas-functions-list',
  templateUrl: './list.function.html',
  styleUrls: ['./list.function.scss'],
})
export class FunctionsListComponent {

  @Input() functions: Functions;

  @Input() loading: boolean;

}
