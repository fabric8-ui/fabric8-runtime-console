import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {DeploymentsListPage} from "./list-page/list-page.deployment";
import {DeploymentsListToolbarComponent} from "./list-toolbar/list-toolbar.deployment";
import {DeploymentsListComponent} from "./list/list.deployment";
import {DeploymentViewPage} from "./view-page/view-page.deployment";
import {DeploymentViewWrapperComponent} from "./view-wrapper/view-wrapper.deployment";
import {DeploymentViewToolbarComponent} from "./view-toolbar/view-toolbar.deployment";
import {DeploymentViewComponent} from "./view/view.deployment";
import {DeploymentEditPage} from "./edit-page/edit-page.deployment";
import {DeploymentEditWrapperComponent} from "./edit-wrapper/edit-wrapper.deployment";
import {DeploymentEditToolbarComponent} from "./edit-toolbar/edit-toolbar.deployment";
import {DeploymentEditComponent} from "./edit/edit.deployment";
import {DeploymentDeleteDialog} from "./delete-dialog/delete-dialog.deployment";
import {IPaaSCommonModule} from "../../../common/common.module";
import {DeploymentScaleDialog} from "./scale-dialog/scale-dialog.deployment";
import {MomentModule} from "angular2-moment";

const routes: Routes = [
  { path: '', component: DeploymentsListPage },
  { path: ':id', component: DeploymentViewPage },
  { path: ':id/edit', component: DeploymentEditPage },
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
    DeploymentsListPage,
    DeploymentsListToolbarComponent,
    DeploymentsListComponent,
    DeploymentViewPage,
    DeploymentViewWrapperComponent,
    DeploymentViewToolbarComponent,
    DeploymentViewComponent,
    DeploymentEditPage,
    DeploymentEditWrapperComponent,
    DeploymentEditToolbarComponent,
    DeploymentEditComponent,
    DeploymentDeleteDialog,
    DeploymentScaleDialog,
  ],
  entryComponents: [
    DeploymentDeleteDialog,
    DeploymentEditPage,
  ],
  exports: [
    ModalModule,
  ],
})
export class DeploymentsModule {
}
