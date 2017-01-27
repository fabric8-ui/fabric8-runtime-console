import {Component, Input} from "@angular/core";
import {Namespace} from "../../../model/namespace.model";

@Component({
  selector: 'fabric8-namespace-view-toolbar',
  templateUrl: './view-toolbar.namespace.html',
  styleUrls: ['./view-toolbar.namespace.scss'],
})
export class NamespaceViewToolbarComponent {

  @Input() namespace: Namespace;

}
