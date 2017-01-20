import {Input, Component} from "@angular/core";
import {Namespace} from "../../../model/namespace.model";

@Component({
  selector: 'ipaas-namespace-view',
  templateUrl: './view.namespace.html',
  styleUrls: ['./view.namespace.scss'],
})
export class NamespaceViewComponent {

  @Input() namespace: Namespace;
}
