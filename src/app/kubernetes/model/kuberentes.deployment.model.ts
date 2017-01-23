import {ScalableResource} from './kuberentes.scalable.model';

export class Deployment extends ScalableResource {
  defaultKind() {
    return 'Deployment';
  }
}

export class Deployments extends Array<Deployment>{
}
