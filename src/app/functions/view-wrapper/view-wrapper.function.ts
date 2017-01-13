import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Function } from '../../store/function/function.model';
import { FunctionStore } from '../../store/function/function.store';

@Component({
  selector: 'ipaas-function-view-wrapper',
  templateUrl: './view-wrapper.function.html',
  styleUrls: ['./view-wrapper.function.scss'],
})
export class FunctionViewWrapperComponent implements OnInit {
  fn: Observable<Function>;

  constructor(private store: FunctionStore) { }

  ngOnInit() { this.fn = this.store.resource; }
}
