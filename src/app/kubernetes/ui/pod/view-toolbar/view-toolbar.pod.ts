import {Component, Input} from "@angular/core";
import {Pod} from "../../../model/pod.model";

@Component({
  selector: 'ipaas-pod-view-toolbar',
  templateUrl: './view-toolbar.pod.html',
  styleUrls: ['./view-toolbar.pod.scss'],
})
export class PodViewToolbarComponent {

  @Input() pod: Pod;

}
