import {NgModule, Optional, SkipSelf} from "@angular/core";
import {StoreModule} from "../store/store.module";
import {ServiceStore} from "./store/service.store";
import {ServiceService} from "./service/service.service";
import {KubernetesRestangularModule} from "./service/kubernetes.restangular";
import {DeploymentService} from "./service/deployment.service";
import {DeploymentStore} from "./store/deployment.store";
//import {RestangularModule} from "ng2-restangular";

@NgModule({
  imports: [
    //RestangularModule,
    StoreModule,
    KubernetesRestangularModule,
  ],
  providers: [
    DeploymentService,
    DeploymentStore,
    ServiceService,
    ServiceStore,
  ],
})
export class KuberentesStoreModule {
  constructor( @Optional() @SkipSelf() parentModule: KuberentesStoreModule) {
    if (parentModule) {
      throw new Error(
        'KuberentesStoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
