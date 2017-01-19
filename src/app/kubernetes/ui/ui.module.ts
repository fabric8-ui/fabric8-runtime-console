import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {DeploymentsModule} from "./deployment/deployment.module";


const routes: Routes = [
//  { path: '', component: NamespaeListPage, pathMatch: 'full' },
  { path: ':namespace/deployments', loadChildren: './deployment/deployment.module#DeploymentsModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    DeploymentsModule,
  ],
  declarations: [
  ],
})
export class KubernetesUIModule {
}
