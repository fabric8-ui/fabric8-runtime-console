import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {BuildsListPage} from "./list-page/list-page.build";
import {BuildsListToolbarComponent} from "./list-toolbar/list-toolbar.build";
import {BuildsListComponent} from "./list/list.build";
import {BuildViewPage} from "./view-page/view-page.build";
import {BuildViewWrapperComponent} from "./view-wrapper/view-wrapper.build";
import {BuildViewToolbarComponent} from "./view-toolbar/view-toolbar.build";
import {BuildViewComponent} from "./view/view.build";
import {BuildEditPage} from "./edit-page/edit-page.build";
import {BuildEditWrapperComponent} from "./edit-wrapper/edit-wrapper.build";
import {BuildEditToolbarComponent} from "./edit-toolbar/edit-toolbar.build";
import {BuildEditComponent} from "./edit/edit.build";
import {BuildDeleteDialog} from "./delete-dialog/delete-dialog.build";
import {Fabric8CommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";

const routes: Routes = [
  { path: '', component: BuildsListPage },
  { path: ':id', component: BuildViewPage },
  { path: ':id/edit', component: BuildEditPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    MomentModule,
    RouterModule.forChild(routes),
    Fabric8CommonModule,
  ],
  declarations: [
    BuildsListPage,
    BuildsListToolbarComponent,
    BuildsListComponent,
    BuildViewPage,
    BuildViewWrapperComponent,
    BuildViewToolbarComponent,
    BuildViewComponent,
    BuildEditPage,
    BuildEditWrapperComponent,
    BuildEditToolbarComponent,
    BuildEditComponent,
    BuildDeleteDialog,
  ],
  entryComponents: [
    BuildDeleteDialog,
    BuildEditPage,
  ],
  exports: [
    ModalModule,
  ],
})
export class BuildModule {
}
