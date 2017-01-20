import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {DeploymentsModule} from "./deployment/deployment.module";
import {NamespacesModule} from "./namespace/namespace.module";


const routes: Routes = [
  { path: 'spaces', loadChildren: './namespace/namespace.module#NamespacesModule' },
  { path: 'namespaces/:namespace/deployments', loadChildren: './deployment/deployment.module#DeploymentsModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DeploymentsModule,
    NamespacesModule,
    RouterModule.forChild(routes),
  ],
})
export class KubernetesUIModule {
}
