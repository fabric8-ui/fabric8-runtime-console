import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {BuildConfigsListPage} from "./list-page/list-page.buildconfig";
import {BuildConfigsListToolbarComponent} from "./list-toolbar/list-toolbar.buildconfig";
import {BuildConfigsListComponent} from "./list/list.buildconfig";
import {BuildConfigViewPage} from "./view-page/view-page.buildconfig";
import {BuildConfigViewWrapperComponent} from "./view-wrapper/view-wrapper.buildconfig";
import {BuildConfigViewToolbarComponent} from "./view-toolbar/view-toolbar.buildconfig";
import {BuildConfigViewComponent} from "./view/view.buildconfig";
import {BuildConfigEditPage} from "./edit-page/edit-page.buildconfig";
import {BuildConfigEditWrapperComponent} from "./edit-wrapper/edit-wrapper.buildconfig";
import {BuildConfigEditToolbarComponent} from "./edit-toolbar/edit-toolbar.buildconfig";
import {BuildConfigEditComponent} from "./edit/edit.buildconfig";
import {BuildConfigDeleteDialog} from "./delete-dialog/delete-dialog.buildconfig";
import {IPaaSCommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";

const routes: Routes = [
  { path: '', component: BuildConfigsListPage },
  { path: ':id', component: BuildConfigViewPage },
  { path: ':id/edit', component: BuildConfigEditPage },
  { path: ':buildConfig/builds', loadChildren: '../build/build.module#BuildModule' },
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
    BuildConfigsListPage,
    BuildConfigsListToolbarComponent,
    BuildConfigsListComponent,
    BuildConfigViewPage,
    BuildConfigViewWrapperComponent,
    BuildConfigViewToolbarComponent,
    BuildConfigViewComponent,
    BuildConfigEditPage,
    BuildConfigEditWrapperComponent,
    BuildConfigEditToolbarComponent,
    BuildConfigEditComponent,
    BuildConfigDeleteDialog,
  ],
  entryComponents: [
    BuildConfigDeleteDialog,
    BuildConfigEditPage,
  ],
  exports: [
    ModalModule,
  ],
})
export class BuildConfigModule {
}
