import {ScalableResource} from './scalableresource.model';

export class DeploymentConfig extends ScalableResource {
  defaultKind() {
    return 'DeploymentConfig';
  }
}

export class DeploymentConfigs extends Array<DeploymentConfig>{
}
