import {Component, OnInit} from "@angular/core";
import {Function} from "../../store/function/function.model";

@Component({
  selector: 'ipaas-function-create-wrapper',
  templateUrl: './create-wrapper.function.html',
  styleUrls: ['./create-wrapper.function.scss'],
})
export class FunctionCreateWrapperComponent implements OnInit {
  fn: Function;

  constructor() { }

  ngOnInit() { this.fn = new Function(); }
}
