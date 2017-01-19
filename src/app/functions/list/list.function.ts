import {Component, Input, ViewChild} from "@angular/core";
import {RuntimeFunctions} from "../model/runtime.function.model";
import {FunctionDeleteDialog} from "../delete-dialog/delete-dialog.function";

@Component({
  selector: 'ipaas-functions-list',
  templateUrl: './list.function.html',
  styleUrls: ['./list.function.scss'],
})
export class FunctionsListComponent {

  @Input() runtimeFunctions: RuntimeFunctions;

  @Input() loading: boolean;

  @ViewChild(FunctionDeleteDialog) deleteDialog: FunctionDeleteDialog;

  openDeleteDialog(deleteFunctionModal, fn) {
    console.log("showing dialog for deployment " + fn.name);
    this.deleteDialog.modal = deleteFunctionModal;
    this.deleteDialog.fn = fn;
    deleteFunctionModal.open();
  }

}
