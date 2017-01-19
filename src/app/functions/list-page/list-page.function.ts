import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FunctionStore } from '../../store/function/function.store';
import { Functions } from '../../store/function/function.model';
import {Services} from "../../kubernetes/model/kuberentes.service.model";
import {RuntimeFunctions, createRuntimeFunctions} from "../model/runtime.function.model";
import {ServiceStore} from "../../kubernetes/store/service.store";

@Component({
  selector: 'ipaas-functions-list-page',
  templateUrl: './list-page.function.html',
  styleUrls: ['./list-page.function.scss'],
})
export class FunctionsListPage implements OnInit {
  private readonly functions: Observable<Functions>;
  private readonly services: Observable<Services>;
  private readonly loading: Observable<boolean>;
  private readonly runtimeFunctions: Observable<RuntimeFunctions>;

  constructor(private functionsStore: FunctionStore, private serviceStore: ServiceStore) {
    this.functions = this.functionsStore.list;
    this.services = this.serviceStore.list;
    this.loading = this.functionsStore.loading.combineLatest(this.serviceStore.loading, (f, s) => f && s);
    this.runtimeFunctions = this.functions.combineLatest(this.services, createRuntimeFunctions);
  }

  ngOnInit() {
    this.functionsStore.loadAll();
    this.serviceStore.loadAll();
  }

}
