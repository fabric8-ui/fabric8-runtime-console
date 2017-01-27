import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Service} from "../../../model/service.model";
import {ServiceStore} from "../../../store/service.store";

@Component({
  selector: 'fabric8-service-view-wrapper',
  templateUrl: './view-wrapper.service.html',
  styleUrls: ['./view-wrapper.service.scss'],
})
export class ServiceViewWrapperComponent implements OnInit {
  service: Observable<Service>;

  constructor(private store: ServiceStore) { }

  ngOnInit() { this.service = this.store.resource; }
}
