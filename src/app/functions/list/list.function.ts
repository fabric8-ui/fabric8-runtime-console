import { Component, Input } from '@angular/core';

import { Functions } from '../../store/function/function.model';
import {Service} from "../../kubernetes-restangular/kuberentes.service.model";

@Component({
  selector: 'ipaas-functions-list',
  templateUrl: './list.function.html',
  styleUrls: ['./list.function.scss'],
})
export class FunctionsListComponent {

  @Input() functions: Functions;

  @Input() loading: boolean;

  @Input() serviceMap: Map<string, Service>;

}
