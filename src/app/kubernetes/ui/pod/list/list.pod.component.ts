import {Component, Input, ViewChild} from "@angular/core";
import {PodDeleteDialog} from "../delete-dialog/delete-dialog.pod.component";
import {Pods, Pod} from "../../../model/pod.model";
import {pathJoin} from "../../../model/utils";

@Component({
  selector: 'fabric8-pods-list',
  templateUrl: './list.pod.component.html',
  styleUrls: ['./list.pod.component.scss'],
})
export class PodsListComponent {

  @Input() pods: Pods;

  @Input() loading: boolean;

  @ViewChild(PodDeleteDialog) deleteDialog: PodDeleteDialog;

  readonly openShiftConsoleUrl: string;

  constructor() {
    this.openShiftConsoleUrl = process.env.OPENSHIFT_CONSOLE_URL;
  }
  openDeleteDialog(deletePodModal, pod) {
    this.deleteDialog.modal = deletePodModal;
    this.deleteDialog.pod = pod;
    deletePodModal.open();
  }

  consoleLogsUrl(pod: Pod): string {
    let consoleUrl = this.consoleUrl(pod);
    return consoleUrl ? consoleUrl + "?tab=logs" : "";
  }

  consoleTerminalUrl(pod: Pod): string {
    let consoleUrl = this.consoleUrl(pod);
    return consoleUrl ? consoleUrl + "?tab=terminal" : "";
  }

  consoleUrl(pod: Pod): string {
    let openShiftConsoleUrl = this.openShiftConsoleUrl;
    if (pod && openShiftConsoleUrl) {
      return pathJoin(openShiftConsoleUrl, "/project/", pod.namespace, "/browse/pods", pod.name);
    }
    return "";
  }
}
