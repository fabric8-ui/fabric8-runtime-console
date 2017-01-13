import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Function } from '../../store/function/function.model';
import { FunctionStore } from '../../store/function/function.store';

@Component({
  selector: 'ipaas-function-edit-wrapper',
  templateUrl: './edit-wrapper.function.html',
  styleUrls: ['./edit-wrapper.function.scss'],
})
export class FunctionEditWrapperComponent implements OnInit {
  fn: Observable<Function>;

  constructor(private store: FunctionStore) { }

  ngOnInit() { this.fn = this.store.resource; }
}
