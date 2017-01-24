import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {ServicesListPage} from "./list-page/list-page.service";
import {ServicesListToolbarComponent} from "./list-toolbar/list-toolbar.service";
import {ServicesListComponent} from "./list/list.service";
import {ServiceViewPage} from "./view-page/view-page.service";
import {ServiceViewWrapperComponent} from "./view-wrapper/view-wrapper.service";
import {ServiceViewToolbarComponent} from "./view-toolbar/view-toolbar.service";
import {ServiceViewComponent} from "./view/view.service";
import {ServiceEditPage} from "./edit-page/edit-page.service";
import {ServiceEditWrapperComponent} from "./edit-wrapper/edit-wrapper.service";
import {ServiceEditToolbarComponent} from "./edit-toolbar/edit-toolbar.service";
import {ServiceEditComponent} from "./edit/edit.service";
import {ServiceDeleteDialog} from "./delete-dialog/delete-dialog.service";
import {IPaaSCommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";

const routes: Routes = [
  { path: '', component: ServicesListPage },
  { path: ':id', component: ServiceViewPage },
  { path: ':id/edit', component: ServiceEditPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    MomentModule,
    RouterModule.forChild(routes),
    IPaaSCommonModule,
  ],
  declarations: [
    ServicesListPage,
    ServicesListToolbarComponent,
    ServicesListComponent,
    ServiceViewPage,
    ServiceViewWrapperComponent,
    ServiceViewToolbarComponent,
    ServiceViewComponent,
    ServiceEditPage,
    ServiceEditWrapperComponent,
    ServiceEditToolbarComponent,
    ServiceEditComponent,
    ServiceDeleteDialog,
  ],
  entryComponents: [
    ServiceDeleteDialog,
    ServiceEditPage,
  ],
  exports: [
    ModalModule,
  ],
})
export class ServiceModule {
}
