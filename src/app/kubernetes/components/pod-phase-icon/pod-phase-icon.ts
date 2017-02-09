import {Component, Input} from "@angular/core";

@Component({
  selector: 'pod-phase-icon',
  templateUrl: './pod-phase-icon.html',
  styleUrls: ['./pod-phase-icon.scss'],
})
export class PodPhaseIconComponent {

  @Input() phase: String;

}
