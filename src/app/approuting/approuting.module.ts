import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
  { path: 'integrations', loadChildren: '../integrations/integrations.module#IntegrationsModule' },
  { path: 'connections', loadChildren: '../connections/connections.module#ConnectionsModule' },
  { path: 'functions', loadChildren: '../functions/functions.module#FunctionsModule' },
  { path: 'templates', loadChildren: '../templates/templates-routes.module#TemplateRoutesModule' },
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
