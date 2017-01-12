import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FunctionStore } from '../../store/function/function.store';
import { Functions } from '../../store/function/function.model';

@Component({
  selector: 'ipaas-functions-list-page',
  templateUrl: './list-page.function.html',
  styleUrls: ['./list-page.function.scss'],
})
export class FunctionsListPage implements OnInit {

  private readonly functions: Observable<Functions>;
  private readonly loading: Observable<boolean>;

  constructor(private store: FunctionStore) {
    this.functions = this.store.list;
    this.loading = this.store.loading;
  }

  ngOnInit() {
    this.store.loadAll();
  }

}
