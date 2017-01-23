import {NgModule, Optional, SkipSelf} from "@angular/core";
import {ServiceStore} from "./store/service.store";
import {ServiceService} from "./service/service.service";
import {KubernetesRestangularModule} from "./service/kubernetes.restangular";
import {DeploymentService} from "./service/deployment.service";
import {DeploymentStore} from "./store/deployment.store";
import {EventService} from "./service/event.service";
import {EventStore} from "./store/event.store";
import {PodService} from "./service/pod.service";
import {PodStore} from "./store/pod.store";
import {NamespaceService} from "./service/namespace.service";
import {NamespaceStore} from "./store/namespace.store";
import {ReplicaSetService} from "./service/replicaset.service";
import {ReplicaSetStore} from "./store/replicaset.store";
import {ReplicationControllerService} from "./service/replicationcontroller.service";
import {ReplicationControllerStore} from "./store/replicationcontroller.store";
import {RestangularModule} from "ng2-restangular";
import {NamespaceScope} from "./service/namespace.scope";
/*
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
*/

@NgModule({
  imports: [
/*
    BrowserModule,
    RouterModule,
*/
    RestangularModule,
    KubernetesRestangularModule,
  ],
  providers: [
    NamespaceScope,
    DeploymentService,
    DeploymentStore,
    EventService,
    EventStore,
    NamespaceService,
    NamespaceStore,
    PodService,
    PodStore,
    ReplicaSetService,
    ReplicaSetStore,
    ReplicationControllerService,
    ReplicationControllerStore,
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
