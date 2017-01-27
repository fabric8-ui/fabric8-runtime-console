import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {SpacesListPage} from "./list-page/list-page.space";
import {SpacesListComponent} from "./list/list.space";
import {SpaceViewWrapperComponent} from "./view-wrapper/view-wrapper.space";
import {SpaceViewToolbarComponent} from "./view-toolbar/view-toolbar.space";
import {SpaceViewComponent} from "./view/view.space";
import {SpaceEditWrapperComponent} from "./edit-wrapper/edit-wrapper.space";
import {SpaceEditToolbarComponent} from "./edit-toolbar/edit-toolbar.space";
import {SpaceEditComponent} from "./edit/edit.space";
import {SpaceDeleteDialog} from "./delete-dialog/delete-dialog.space";
import {Fabric8CommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";
import {SpaceViewPage} from "./view-page/view-page.space";
import {SpaceEditPage} from "./edit-page/edit-page.space";
import {SpacesListToolbarComponent} from "./list-toolbar/list-toolbar.space";

const routes: Routes = [
  { path: '', component: SpacesListPage},
  { path: ':id', component: SpaceViewPage },
  { path: ':id/edit', component: SpaceEditPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    MomentModule,
    RouterModule.forChild(routes),
    RouterModule,
    Fabric8CommonModule,
  ],
  declarations: [
    SpacesListPage,
    SpacesListToolbarComponent,
    SpacesListComponent,
    SpaceViewPage,
    SpaceViewWrapperComponent,
    SpaceViewToolbarComponent,
    SpaceViewComponent,
    SpaceEditPage,
    SpaceEditWrapperComponent,
    SpaceEditToolbarComponent,
    SpaceEditComponent,
    SpaceDeleteDialog,
  ],
  entryComponents: [
    SpaceDeleteDialog,
    SpaceEditPage,
  ],
  exports: [
    ModalModule,
  ],
})
export class SpaceModule {
}
