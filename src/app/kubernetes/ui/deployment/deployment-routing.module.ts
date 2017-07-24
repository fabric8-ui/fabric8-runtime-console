import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {DeploymentsListPage} from "./list-page/list-page.deployment.component";
import {DeploymentsListToolbarComponent} from "./list-toolbar/list-toolbar.deployment.component";
import {DeploymentsListComponent} from "./list/list.deployment.component";
import {DeploymentViewPage} from "./view-page/view-page.deployment.component";
import {DeploymentViewWrapperComponent} from "./view-wrapper/view-wrapper.deployment.component";
import {DeploymentViewToolbarComponent} from "./view-toolbar/view-toolbar.deployment.component";
import {DeploymentViewComponent} from "./view/view.deployment.component";
import {DeploymentEditPage} from "./edit-page/edit-page.deployment.component";
import {DeploymentEditWrapperComponent} from "./edit-wrapper/edit-wrapper.deployment.component";
import {DeploymentEditToolbarComponent} from "./edit-toolbar/edit-toolbar.deployment.component";
import {DeploymentEditComponent} from "./edit/edit.deployment.component";
import {DeploymentDeleteDialog} from "./delete-dialog/delete-dialog.deployment.component";
import {Fabric8CommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";
import {KubernetesComponentsModule} from "../../components/components.module";
import {DeploymentScaleDialog} from './scale-dialog/scale-dialog.deployment.component';

export const deploymentRoutes: Routes = [
  { path: '', component: DeploymentsListPage },
  { path: ':id', component: DeploymentViewPage },
  { path: ':id/edit', component: DeploymentEditPage },
];

@NgModule({
  imports: [
    RouterModule.forChild(deploymentRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class DeploymentRoutingModule {
}
