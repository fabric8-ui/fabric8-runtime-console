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

  openInputActionDialog(stage) {
    const build = this.build;
    if (!build) {
      return;
    }
    let inputAction = build.firstPendingInputAction;
    if (isValidInputAction(inputAction) && build.jenkinsNamespace) {
      this.inputActionDialog.build = build;
      this.inputActionDialog.inputAction = inputAction;
      this.inputActionDialog.stage = stage;
      this.inputActionDialog.open();
    } else {
      // if no PendingInputAction JSON or jenkins namespace on the Build then lets just open the URL: stage.jenkinsInputURL
      let url = stage.jenkinsInputURL;
      if (url) {
        window.location.href = url;
      }
    }
  }
}
