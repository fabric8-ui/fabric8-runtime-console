import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {NamespacesListPage} from "./list-page/list-page.namespace";
import {NamespacesListComponent} from "./list/list.namespace";
import {NamespaceViewWrapperComponent} from "./view-wrapper/view-wrapper.namespace";
import {NamespaceViewToolbarComponent} from "./view-toolbar/view-toolbar.namespace";
import {NamespaceViewComponent} from "./view/view.namespace";
import {NamespaceEditWrapperComponent} from "./edit-wrapper/edit-wrapper.namespace";
import {NamespaceEditToolbarComponent} from "./edit-toolbar/edit-toolbar.namespace";
import {NamespaceEditComponent} from "./edit/edit.namespace";
import {NamespaceDeleteDialog} from "./delete-dialog/delete-dialog.namespace";
import {IPaaSCommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";
import {NamespaceViewPage} from "./view-page/view-page.namespace";
import {NamespaceEditPage} from "./edit-page/edit-page.namespace";
import {NamespacesListToolbarComponent} from "./list-toolbar/list-toolbar.namespace";

const routes: Routes = [
  { path: '', component: NamespacesListPage},
  { path: ':id', component: NamespaceViewPage },
  { path: ':id/edit', component: NamespaceEditPage, },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    MomentModule,
    RouterModule.forChild(routes),
    RouterModule,
    IPaaSCommonModule,
  ],
  declarations: [
    NamespacesListPage,
    NamespacesListToolbarComponent,
    NamespacesListComponent,
    NamespaceViewPage,
    NamespaceViewWrapperComponent,
    NamespaceViewToolbarComponent,
    NamespaceViewComponent,
    NamespaceEditPage,
    NamespaceEditWrapperComponent,
    NamespaceEditToolbarComponent,
    NamespaceEditComponent,
    NamespaceDeleteDialog,
  ],
  entryComponents: [
    NamespaceDeleteDialog,
    NamespaceEditPage,
  ],
  exports: [
    ModalModule,
  ]
})
export class NamespacesModule {
}
