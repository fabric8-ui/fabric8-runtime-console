import {Component, Input} from "@angular/core";
import {Service} from "../../../model/service.model";

@Component({
  selector: 'fabric8-service-view-toolbar',
  templateUrl: './view-toolbar.service.html',
  styleUrls: ['./view-toolbar.service.scss'],
})
export class ServiceViewToolbarComponent {

  @Input() service: Service;

}
