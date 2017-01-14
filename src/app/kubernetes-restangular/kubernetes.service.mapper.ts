import {Service} from "./kuberentes.service.model";
import {KubernetesServiceStore} from "./kubernetes.service.store";
import {Injectable} from "@angular/core";

@Injectable()
export class KubernetesServiceMapper {
  public map: Map<string, Service> = new Map<string, Service>();

  constructor(private serviceStore: KubernetesServiceStore) {
    this.serviceStore.loadAll();
    this.serviceStore.list.subscribe((services) => {
      services.forEach((service) => {
        this.map[service.name] = service;
      });
    });
  }
}
