import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Services} from "../../../model/service.model";
import {ServiceStore} from "../../../store/service.store";


@Component({
  selector: 'ipaas-services-list-page',
  templateUrl: './list-page.service.html',
  styleUrls: ['./list-page.service.scss'],
})
export class ServicesListPage implements OnInit {
  private readonly services: Observable<Services>;
  private readonly loading: Observable<boolean>;

  constructor(private servicesStore: ServiceStore) {
    this.services = this.servicesStore.list;
    this.loading = this.servicesStore.loading;
  }

  ngOnInit() {
    this.servicesStore.loadAll();
  }

}
