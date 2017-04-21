import {Component, Input, ViewChild} from "@angular/core";
import {Build, isValidInputAction, PendingInputAction} from "../../../model/build.model";
import {InputActionDialog} from "../input-action-dialog/input-action-dialog.component";

@Component({
  selector: 'build-stage-view',
  templateUrl: './build-stage-view.component.html',
  styleUrls: ['./build-stage-view.component.scss'],
})
export class BuildStageViewComponent {

  @Input() build: Build;

  @ViewChild(InputActionDialog) inputActionDialog: InputActionDialog;

  openInputActionDialog(inputActionModal, stage) {
    let inputAction = this.build.firstPendingInputAction;
    if (isValidInputAction(inputAction)) {
      this.inputActionDialog.build = this.build;
      this.inputActionDialog.inputAction = inputAction;
      this.inputActionDialog.stage = stage;
      this.inputActionDialog.open();
    } else {

      // if no PendingInputAction JSON on the Build then lets just open the URL: stage.jenkinsInputURL
      let url = stage.jenkinsInputURL;
      if (url) {
        window.location.href = url;
      }
    }
  }
}
