import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {DeploymentModule} from "./deployment/deployment.module";
import {NamespaceModule} from "./namespace/namespace.module";


const routes: Routes = [
  { path: 'namespaces/:namespace/deployments', loadChildren: './deployment/deployment.module#DeploymentModule' },
  { path: 'spaces', loadChildren: './namespace/namespace.module#NamespaceModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeploymentModule,
    NamespaceModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class KubernetesUIModule {
}
