import {Input, Component} from "@angular/core";
import {Namespace} from "../../../model/namespace.model";

@Component({
  selector: 'fabric8-namespace-view',
  templateUrl: './view.namespace.html',
  styleUrls: ['./view.namespace.scss'],
})
export class NamespaceViewComponent {

  @Input() namespace: Namespace;
}
