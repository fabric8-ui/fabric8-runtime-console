import {Component} from "@angular/core";
import {BuildConfig} from "../../../model/buildconfig.model";
import {BuildConfigStore} from "../../../store/buildconfig.store";
import {BuildConfigService} from "../../../service/buildconfig.service";

@Component({
  selector: 'delete-buildconfig-dialog',
  templateUrl: './delete-dialog.buildconfig.html',
  styleUrls: ['./delete-dialog.buildconfig.scss'],
})
export class BuildConfigDeleteDialog {
  buildconfig: BuildConfig = new BuildConfig();
  modal: any;

  constructor(private buildconfigService: BuildConfigService, private buildconfigStore: BuildConfigStore) {
  }

  ok() {
    console.log('deleting buildconfig ' + this.buildconfig.name);
    this.modal.close();
    this.buildconfigService.delete(this.buildconfig).subscribe(
      () => {
        this.buildconfigStore.loadAll();
      },
    );
  }

  close() {
    this.modal.close();
  }
}
