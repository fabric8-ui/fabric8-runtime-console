import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {DeploymentModule} from "./deployment/deployment.module";
import {NamespacesModule} from "./namespace/namespace.module";


const routes: Routes = [
  { path: 'namespaces/:namespace/deployments', loadChildren: './deployment/deployment.module#DeploymentModule' },
  { path: 'spaces', loadChildren: './namespace/namespace.module#NamespacesModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeploymentModule,
    NamespacesModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class KubernetesUIModule {
}
