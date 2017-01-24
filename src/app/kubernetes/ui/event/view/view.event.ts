import {Input, Component, OnChanges} from "@angular/core";
import {Event} from "../../../model/event.model";
import {resourceKindToCollectionName, isNamespacedKind} from "../../../model/helpers";


@Component({
  selector: 'ipaas-event-view',
  templateUrl: './view.event.html',
  styleUrls: ['./view.event.scss'],
})
export class EventViewComponent implements OnChanges {
  public involvedObjectPath: string;

  @Input() event: Event;

  ngOnChanges(): void {
    this.involvedObjectPath = "";
    let event = this.event;
    if (event) {
      var resource = event.resource;
      if (resource) {
        var involvedObject = resource.involvedObject;
        if (involvedObject) {
          var kind = involvedObject.kind;
          var name = involvedObject.name;
          if (kind && name) {
            var path = resourceKindToCollectionName[kind];
            if (path) {
              var namespacePrefix = "/run";
              if (isNamespacedKind(kind)) {
                namespacePrefix = "/run/namespaces/" + event.namespace + "/";
              }
              this.involvedObjectPath = namespacePrefix + path + "/" + name;
            }
          }
        }
      }
    }
  }
}
