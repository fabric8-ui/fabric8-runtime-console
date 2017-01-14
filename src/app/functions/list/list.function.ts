import {Component, Input} from "@angular/core";
import {RuntimeFunctions} from "../model/runtime.function.model";

@Component({
  selector: 'ipaas-functions-list',
  templateUrl: './list.function.html',
  styleUrls: ['./list.function.scss'],
})
export class FunctionsListComponent {

  @Input() runtimeFunctions: RuntimeFunctions;

  @Input() loading: boolean;

}
