import { EnvironmentDetailComponent } from './detail/detail.environment.component';
import { DeploymentModule } from './../deployment/deployment.module';
import { ConfigMapStore } from './../../store/configmap.store';
import { NamespaceStore } from './../../store/namespace.store';

import { NgModule } from '@angular/core';
import { DropdownConfig, DropdownModule } from 'ng2-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ng2-modal';
import { ToolbarModule, TreeListModule } from 'ngx-widgets';
import { TreeModule } from 'angular2-tree-component';
import { Fabric8CommonModule } from '../../../common/common.module';
import { MomentModule } from 'angular2-moment';
import { KubernetesComponentsModule } from '../../components/components.module';
import { ConfigMapService } from '../../service/configmap.service';
import { NamespaceScope } from '../../service/namespace.scope';
import { NamespaceService } from '../../service/namespace.service';
import { EnvironmentListPageComponent } from './list-page/list-page.environment.component';
import { EnvironmentListComponent } from './list/list.environment.component';
import { EnvironmentListToolbarComponent } from './list-toolbar/list-toolbar.environment.component';

const routes: Routes = [
  {
    path: '',
    component: EnvironmentListPageComponent,
    children: [
      { path: 'namespaces/:namespace/configmaps', component: EnvironmentDetailComponent, loadChildren: './../configmap/configmap.module#ConfigMapModule' },
      { path: 'namespaces/:namespace/deployments', component: EnvironmentDetailComponent, loadChildren: './../deployment/deployment.module#DeploymentModule' },
      { path: 'namespaces/:namespace/events', component: EnvironmentDetailComponent, loadChildren: './../event/event.module#EventModule' },
      { path: 'namespaces/:namespace/replicasets', component: EnvironmentDetailComponent, loadChildren: './../replicaset/replicaset.module#ReplicaSetModule' },
      { path: 'namespaces/:namespace/pods', component: EnvironmentDetailComponent, loadChildren: './../pod/pod.module#PodModule' },
      { path: 'namespaces/:namespace/services', component: EnvironmentDetailComponent, loadChildren: './../service/service.module#ServiceModule' }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class EnvironmentRoutingModule {
}
