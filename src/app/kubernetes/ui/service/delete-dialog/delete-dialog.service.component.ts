import {Component} from "@angular/core";
import {Service} from "../../../model/service.model";
import {ServiceStore} from "../../../store/service.store";
import {ServiceService} from "../../../service/service.service";

@Component({
  selector: 'delete-service-dialog',
  templateUrl: './delete-dialog.service.component.html',
  styleUrls: ['./delete-dialog.service.component.scss'],
})
export class ServiceDeleteDialog {
  service: Service = new Service();
  modal: any;

  constructor(private serviceService: ServiceService, private serviceStore: ServiceStore) {
  }

  ok() {
    console.log('deleting service ' + this.service.name);
    this.modal.close();
    this.serviceService.delete(this.service).subscribe(
      () => {
        this.serviceStore.loadAll();
      },
    );
  }

  close() {
    this.modal.close();
  }
}
