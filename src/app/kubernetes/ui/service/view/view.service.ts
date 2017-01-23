import {Input, Component} from "@angular/core";
import {Service} from "../../../model/service.model";

@Component({
  selector: 'ipaas-service-view',
  templateUrl: './view.service.html',
  styleUrls: ['./view.service.scss'],
})
export class ServiceViewComponent {

  @Input() service: Service;
}
