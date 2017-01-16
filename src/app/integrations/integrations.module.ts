///<reference path="view-wrapper/view-wrapper.integration.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IntegrationsListPage } from './list-page/list-page.component';
import { IntegrationsListToolbarComponent } from './list-toolbar/list-toolbar.component';
import { IntegrationsFilterPipe } from './integrations-filter.pipe';
import { IntegrationsListComponent } from './list/list.component';
import { IntegrationsCreatePage } from './create-page/create-page.component';
import { IPaaSCommonModule } from '../common/common.module';
import {IntegrationViewPage} from "./view-page/view-page.integration";
import {IntegrationViewWrapperComponent} from "./view-wrapper/view-wrapper.integration";
import {IntegrationViewComponent} from "./view/view.integration";
import {IntegrationViewToolbarComponent} from "./view-toolbar/view-toolbar.integration";
import {IntegrationEditPage} from "./edit-page/edit-page.integration";
import {IntegrationEditWrapperComponent} from "./edit-wrapper/edit-wrapper.integration";
import {IntegrationEditToolbarComponent} from "./edit-toolbar/edit-toolbar.integration";
import {IntegrationEditComponent} from "./edit/edit.integration";

const routes: Routes = [
  { path: '', component: IntegrationsListPage, pathMatch: 'full' },
  { path: ':id', component: IntegrationViewPage, pathMatch: 'full' },
  { path: ':id/edit', component: IntegrationEditPage, pathMatch: 'full' },
  { path: '-/create', component: IntegrationsCreatePage, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IPaaSCommonModule,
  ],
  declarations: [
    IntegrationsListPage,
    IntegrationsListToolbarComponent,
    IntegrationsListComponent,
    IntegrationsFilterPipe,
    IntegrationsCreatePage,
    IntegrationViewPage,
    IntegrationViewWrapperComponent,
    IntegrationViewToolbarComponent,
    IntegrationViewComponent,
    IntegrationEditPage,
    IntegrationEditWrapperComponent,
    IntegrationEditToolbarComponent,
    IntegrationEditComponent,
  ],
})
export class IntegrationsModule {
}
