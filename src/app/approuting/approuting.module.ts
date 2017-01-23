import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'run/spaces', pathMatch: 'full' },
  { path: 'home', redirectTo: 'run/spaces', pathMatch: 'full' },
  { path: 'run/namespaces/:namespace/deployments', loadChildren: '../kubernetes/ui/deployment/deployment.module#DeploymentsModule' },
  { path: 'run/spaces', loadChildren: '../kubernetes/ui/namespace/namespace.module#NamespacesModule' },
/*
  // TODO multi level lazy loading doesn't seem to work
  { path: 'run', loadChildren: '../kubernetes/ui/ui.module#KubernetesUIModule' },
*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
