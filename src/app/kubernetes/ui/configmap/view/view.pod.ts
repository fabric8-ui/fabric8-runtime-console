import {Input, Component} from "@angular/core";
import {Pod} from "../../../model/pod.model";

@Component({
  selector: 'ipaas-pod-view',
  templateUrl: './view.pod.html',
  styleUrls: ['./view.pod.scss'],
})
export class PodViewComponent {

  @Input() pod: Pod;
}
