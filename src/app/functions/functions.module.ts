import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FunctionsListPage } from './list-page/list-page.function';
import { FunctionsListToolbarComponent } from './list-toolbar/list-toolbar.function';
import { FunctionsFilterPipe } from './functions-filter.pipe';
import { FunctionsListComponent } from './list/list.function';
import { FunctionsCreatePage } from './create-page/create-page.function';
import { IPaaSCommonModule } from '../common/common.module';

const routes: Routes = [
  { path: '', component: FunctionsListPage, pathMatch: 'full' },
  { path: 'create', component: FunctionsCreatePage, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IPaaSCommonModule,
  ],
  declarations: [
    FunctionsListPage,
    FunctionsListToolbarComponent,
    FunctionsListComponent,
    FunctionsFilterPipe,
    FunctionsCreatePage,
  ],
})
export class FunctionsModule {
}
