import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FunctionStore } from '../../store/function/function.store';
import { Functions } from '../../store/function/function.model';
import {Service} from "../../kubernetes-restangular/kuberentes.service.model";
import {KubernetesServiceMapper} from "../../kubernetes-restangular/kubernetes.service.mapper";

@Component({
  selector: 'ipaas-functions-list-page',
  templateUrl: './list-page.function.html',
  styleUrls: ['./list-page.function.scss'],
})
export class FunctionsListPage implements OnInit {

  private readonly functions: Observable<Functions>;
  private readonly loading: Observable<boolean>;

  // TODO make this Observable too?
  private readonly serviceMap: Map<string, Service>;

  constructor(private store: FunctionStore, private serviceMapper: KubernetesServiceMapper) {
    this.functions = this.store.list;
    this.loading = this.store.loading;
    this.serviceMap = this.serviceMapper.map;
  }

  ngOnInit() {
    this.store.loadAll();
  }

}
