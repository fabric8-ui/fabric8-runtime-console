import {NgModule, Optional, SkipSelf} from "@angular/core";
import {RestangularModule} from "ng2-restangular";
import {StoreModule} from "../store/store.module";
import {KubernetesServiceMapper} from "./kubernetes.service.mapper";
import {KubernetesServiceStore} from "./kubernetes.service.store";
import {KubernetesServiceService} from "./kubernetes.service.service";

@NgModule({
  imports: [
    RestangularModule,
    StoreModule,
  ],
  providers: [
    KubernetesServiceMapper,
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
