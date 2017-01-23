import {Injectable} from "@angular/core";
import {EventService} from "../service/event.service";
import {Event, Events} from "../model/event.model";
import {NamespacedResourceStore} from "./namespaced.resource.store";
import {NamespaceContext} from "../service/namespace.context";

@Injectable()
export class EventStore extends NamespacedResourceStore<Event, Events, EventService> {
  constructor(eventEvent: EventService, namespaceContext: NamespaceContext) {
    super(eventEvent, [], <Event>{}, namespaceContext);
  }

  protected get kind() {
    return 'Event';
  }
}
