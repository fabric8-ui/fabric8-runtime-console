import {AbstractStore} from "../../store/entity/entity.store";
import {Injectable} from "@angular/core";
import {Deployment, Deployments} from "../model/kuberentes.deployment.model";
import {DeploymentService} from "../service/deployment.service";

@Injectable()
export class DeploymentStore extends AbstractStore<Deployment, Deployments, DeploymentService> {
  constructor(deploymentService: DeploymentService) {
    super(deploymentService, [], <Deployment>{});
  }

  protected get kind() {
    return 'Deployment';
  }
}
