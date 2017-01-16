import {Component, Input} from "@angular/core";
import {Function} from "../../store/function/function.model";
import {FunctionService} from "../../store/function/function.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ipaas-function-create-toolbar',
  templateUrl: './create-toolbar.function.html',
  styleUrls: ['./create-toolbar.function.scss'],
})
export class FunctionCreateToolbarComponent {

  @Input() fn: Function;

  constructor(private functionService: FunctionService, private router: Router) {
  }

  save() {
    this.functionService.create(this.fn).subscribe(
      () => this.router.navigate(["functions"])
    );
  }
}
