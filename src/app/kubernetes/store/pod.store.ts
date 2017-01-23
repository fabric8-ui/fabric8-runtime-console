import {Injectable} from "@angular/core";
import {PodService} from "../service/pod.service";
import {Pod, Pods} from "../model/pod.model";
import {NamespacedResourceStore} from "./namespaced.resource.store";
import {NamespaceContext} from "../service/namespace.context";

@Injectable()
export class PodStore extends NamespacedResourceStore<Pod, Pods, PodService> {
  constructor(podPod: PodService, namespaceContext: NamespaceContext) {
    super(podPod, [], <Pod>{}, namespaceContext);
  }

  protected get kind() {
    return 'Pod';
  }
}
