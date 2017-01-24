import {KubernetesSpecResource} from './kuberentesspecresource.model';

export class Service extends KubernetesSpecResource {
  exposeUrl: string;

  updateValuesFromResource() {
    super.updateValuesFromResource();
    this.exposeUrl = this.annotations['fabric8.io/exposeUrl'] || '';
  }
}

export class Services extends Array<Service>{
}
