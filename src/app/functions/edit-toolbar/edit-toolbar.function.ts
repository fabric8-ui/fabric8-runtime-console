import {Component, Input} from "@angular/core";
import {Function} from "../../store/function/function.model";
import {FunctionService} from "../../store/function/function.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ipaas-function-edit-toolbar',
  templateUrl: './edit-toolbar.function.html',
  styleUrls: ['./edit-toolbar.function.scss'],
})
export class FunctionEditToolbarComponent {

  @Input() fn: Function;

  constructor(private functionService: FunctionService, private router: Router) {
  }

  save() {
    this.functionService.update(this.fn).subscribe(
      () => this.router.navigate(["functions"])
    );
  }
}
