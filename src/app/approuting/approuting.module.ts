import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'run/spaces', pathMatch: 'full' },
  { path: 'home', redirectTo: 'run/spaces', pathMatch: 'full' },
  { path: 'run', loadChildren: '../kubernetes/ui/ui.module#KubernetesUIModule' },
  { path: 'run/space/:space', loadChildren: '../kubernetes/ui/ui.module#KubernetesUIModule' },
  { path: 'run/app/:app/space/:space', loadChildren: '../kubernetes/ui/ui.module#KubernetesUIModule' },
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
