import {Component, Input, ViewChild} from "@angular/core";
import {Spaces} from "../../../model/space.model";
import {SpaceDeleteDialog} from "../delete-dialog/delete-dialog.space";
import {ParentLinkFactory} from "../../../../common/parent-link-factory";

@Component({
  selector: 'ipaas-spaces-list',
  templateUrl: './list.space.html',
  styleUrls: ['./list.space.scss'],
})
export class SpacesListComponent {
  parentLink: string;

  @Input() spaces: Spaces;

  @Input() loading: boolean;

  @ViewChild(SpaceDeleteDialog) deleteDialog: SpaceDeleteDialog;

  constructor(parentLinkFactory: ParentLinkFactory) {
    this.parentLink = parentLinkFactory.parentLink;

  }
  openDeleteDialog(deleteSpaceModal, space) {
    this.deleteDialog.modal = deleteSpaceModal;
    this.deleteDialog.space = space;
    deleteSpaceModal.open();
  }
}
