import {Component} from "@angular/core";
import {FunctionService} from "../../store/function/function.service";
import {Function} from "../../store/function/function.model";
import {FunctionStore} from "../../store/function/function.store";

@Component({
  selector: 'delete-function-dialog',
  templateUrl: './delete-dialog.function.html',
  styleUrls: ['./delete-dialog.function.scss']
})
export class FunctionDeleteDialog {
  fn: Function = new Function();
  modal: any;

  constructor(private functionService: FunctionService, private functionStore: FunctionStore) {
  }

  ok() {
    console.log("deleting function " + this.fn.name);
    this.modal.close();
    this.functionService.delete(this.fn).subscribe(
      () => {
        this.functionStore.loadAll();
      }
    );
  }

  close() {
    this.modal.close();
  }
}
