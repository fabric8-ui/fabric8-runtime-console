import { Component, Input } from '@angular/core';

import { Function } from '../../store/function/function.model';

@Component({
  selector: 'ipaas-function-edit-toolbar',
  templateUrl: './edit-toolbar.function.html',
  styleUrls: ['./edit-toolbar.function.scss'],
})
export class FunctionEditToolbarComponent {

  @Input() fn: Function;

  save(fn) {
    console.log("Lets save the changes!");
    console.log("description now: " + fn.description);
  }
}
