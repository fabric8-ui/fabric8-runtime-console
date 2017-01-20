import {Component, Input, ViewChild} from "@angular/core";
import {Namespaces} from "../../../model/namespace.model";
import {NamespaceDeleteDialog} from "../delete-dialog/delete-dialog.namespace";

@Component({
  selector: 'ipaas-namespaces-list',
  templateUrl: './list.namespace.html',
  styleUrls: ['./list.namespace.scss'],
})
export class NamespacesListComponent {

  @Input() namespaces: Namespaces;

  @Input() loading: boolean;

  @ViewChild(NamespaceDeleteDialog) deleteDialog: NamespaceDeleteDialog;

  openDeleteDialog(deleteNamespaceModal, namespace) {
    this.deleteDialog.modal = deleteNamespaceModal;
    this.deleteDialog.namespace = namespace;
    deleteNamespaceModal.open();
  }
}
