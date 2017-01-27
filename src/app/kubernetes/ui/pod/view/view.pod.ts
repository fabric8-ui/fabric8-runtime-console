import {Input, Component} from "@angular/core";
import {Pod} from "../../../model/pod.model";

@Component({
  selector: 'fabric8-pod-view',
  templateUrl: './view.pod.html',
  styleUrls: ['./view.pod.scss'],
})
export class PodViewComponent {

  @Input() pod: Pod;
}
