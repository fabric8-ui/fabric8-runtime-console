import {Component, Input} from "@angular/core";

@Component({
  selector: 'pod-phase-icon',
  templateUrl: './pod-phase-icon.html',
  styleUrls: ['./pod-phase-icon.component.scss'],
})
export class PodPhaseIconComponent {

  @Input() phase: String;

}
