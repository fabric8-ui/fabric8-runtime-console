import {AbstractStore} from "../../store/entity/entity.store";
import {Injectable} from "@angular/core";
import {PodService} from "../service/pod.service";
import {Pod, Pods} from "../model/pod.model";

@Injectable()
export class PodStore extends AbstractStore<Pod, Pods, PodService> {
  constructor(podPod: PodService) {
    super(podPod, [], <Pod>{});
  }

  protected get kind() {
    return 'Pod';
  }
}
