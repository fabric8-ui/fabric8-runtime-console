import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  { path: 'namespaces/:namespace/buildconfigs', loadChildren: './buildconfig/buildconfig.module#BuildConfigModule' },
  { path: 'namespaces/:namespace/configmaps', loadChildren: './configmap/configmap.module#ConfigMapModule' },
  { path: 'namespaces/:namespace/deployments', loadChildren: './deployment/deployment.module#DeploymentModule' },
  { path: 'namespaces/:namespace/events', loadChildren: './event/event.module#EventModule' },
  { path: 'namespaces/:namespace/replicasets', loadChildren: './replicaset/replicaset.module#ReplicaSetModule' },
  { path: 'namespaces/:namespace/pods', loadChildren: './pod/pod.module#PodModule' },
  { path: 'namespaces/:namespace/services', loadChildren: './service/service.module#ServiceModule' },
  { path: 'spaces', loadChildren: './namespace/namespace.module#NamespaceModule' },
];


@NgModule({
  imports: [
/*
    CommonModule,
    FormsModule,
    DeploymentModule,
    NamespaceModule,
*/
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class KubernetesUIModule {
}
