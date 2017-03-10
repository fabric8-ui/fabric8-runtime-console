import {Component} from "@angular/core";
import {Space} from "../../../model/space.model";
import {SpaceStore} from "../../../store/space.store";
import {Namespaces} from "../../../model/namespace.model";

@Component({
  selector: 'delete-space-dialog',
  templateUrl: './delete-dialog.space.component.html',
  styleUrls: ['./delete-dialog.space.component.scss'],
})
export class SpaceDeleteDialog {
  space: Space = new Space(null, new Namespaces(), null);
  modal: any;

  constructor(private spaceStore: SpaceStore) {
  }

  ok() {
    console.log('deleting space ' + this.space.name);
    this.modal.close();
    this.spaceStore.delete(this.space).subscribe(
      () => {
        this.spaceStore.loadAll();
      },
    );
  }

  close() {
    this.modal.close();
  }
}
