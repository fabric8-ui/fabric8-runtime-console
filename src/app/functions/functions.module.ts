import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";

import {FunctionsListPage} from "./list-page/list-page.function";
import {FunctionsListToolbarComponent} from "./list-toolbar/list-toolbar.function";
import {FunctionsFilterPipe} from "./functions-filter.pipe";
import {FunctionsListComponent} from "./list/list.function";
import {FunctionCreatePage} from "./create-page/create-page.function";
import {IPaaSCommonModule} from "../common/common.module";
import {FunctionViewPage} from "./view-page/view-page.function";
import {FunctionViewWrapperComponent} from "./view-wrapper/view-wrapper.function";
import {FunctionViewToolbarComponent} from "./view-toolbar/view-toolbar.function";
import {FunctionViewComponent} from "./view/view.function";
import {FunctionEditPage} from "./edit-page/edit-page.function";
import {FunctionEditWrapperComponent} from "./edit-wrapper/edit-wrapper.function";
import {FunctionEditToolbarComponent} from "./edit-toolbar/edit-toolbar.function";
import {FunctionEditComponent} from "./edit/edit.function";
import {FunctionCreateComponent} from "./create/create.function";
import {FunctionCreateWrapperComponent} from "./create-wrapper/create-wrapper.function";
import {FunctionCreateToolbarComponent} from "./create-toolbar/create-toolbar.function";
import {FunctionDeleteDialog} from "./delete-dialog/delete-dialog.function";

const routes: Routes = [
  { path: '', component: FunctionsListPage, pathMatch: 'full' },
  { path: ':id', component: FunctionViewPage, pathMatch: 'full' },
  { path: ':id/edit', component: FunctionEditPage, pathMatch: 'full' },
  { path: '-/create', component: FunctionCreatePage, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    RouterModule.forChild(routes),
    IPaaSCommonModule,
  ],
  declarations: [
    FunctionsListPage,
    FunctionsListToolbarComponent,
    FunctionsListComponent,
    FunctionsFilterPipe,
    FunctionViewPage,
    FunctionViewWrapperComponent,
    FunctionViewToolbarComponent,
    FunctionViewComponent,
    FunctionCreatePage,
    FunctionCreateWrapperComponent,
    FunctionCreateToolbarComponent,
    FunctionCreateComponent,
    FunctionEditPage,
    FunctionEditWrapperComponent,
    FunctionEditToolbarComponent,
    FunctionEditComponent,
    FunctionDeleteDialog,
  ],
  entryComponents: [FunctionDeleteDialog],
  exports: [ModalModule]
})
export class FunctionsModule {
}
