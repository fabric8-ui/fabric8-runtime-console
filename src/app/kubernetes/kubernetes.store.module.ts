import {NgModule, Optional, SkipSelf} from "@angular/core";
import {RestangularModule} from "ng2-restangular";
import {StoreModule} from "../store/store.module";
import {KubernetesServiceStore} from "./store/kubernetes.service.store";
import {KubernetesServiceService} from "./service/kubernetes.service.service";

@NgModule({
  imports: [
    RestangularModule,
    StoreModule,
  ],
  providers: [
    KubernetesServiceStore,
    KubernetesServiceService,
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
