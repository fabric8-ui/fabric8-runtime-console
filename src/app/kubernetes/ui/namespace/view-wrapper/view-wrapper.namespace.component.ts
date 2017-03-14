import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Namespace} from "../../../model/namespace.model";
import {NamespaceStore} from "../../../store/namespace.store";

@Component({
  selector: 'fabric8-namespace-view-wrapper',
  templateUrl: './view-wrapper.namespace.component.html',
  styleUrls: ['./view-wrapper.namespace.component.scss'],
})
export class NamespaceViewWrapperComponent implements OnInit {
  namespace: Observable<Namespace>;

  constructor(private store: NamespaceStore) { }

  ngOnInit() { this.namespace = this.store.resource; }
}
