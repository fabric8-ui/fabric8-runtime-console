import {AbstractStore} from "../../store/entity/entity.store";
import {Injectable} from "@angular/core";
import {EventService} from "../service/event.service";
import {Event, Events} from "../model/event.model";

@Injectable()
export class EventStore extends AbstractStore<Event, Events, EventService> {
  constructor(eventEvent: EventService) {
    super(eventEvent, [], <Event>{});
  }

  protected get kind() {
    return 'Event';
  }
}
