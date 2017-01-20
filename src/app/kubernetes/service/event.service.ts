import {Inject, Injectable} from "@angular/core";
import {Restangular} from "ng2-restangular";
import {KUBERNETES_RESTANGULAR} from "./kubernetes.restangular";
import {KubernetesService} from "./kubernetes.service";
import {Events, Event} from "../model/event.model";

@Injectable()
export class EventService extends KubernetesService<Event, Events> {
  constructor(@Inject(KUBERNETES_RESTANGULAR) kubernetesRestangular: Restangular) {
// TODO need to parameterize this better
    super(kubernetesRestangular.service('/api/v1/namespaces/funky/events'));
  }
}
