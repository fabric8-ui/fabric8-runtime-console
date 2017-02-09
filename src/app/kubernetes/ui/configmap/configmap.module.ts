import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {ConfigMapsListPage} from "./list-page/list-page.configmap";
import {ConfigMapsListToolbarComponent} from "./list-toolbar/list-toolbar.configmap";
import {ConfigMapsListComponent} from "./list/list.configmap";
import {ConfigMapViewPage} from "./view-page/view-page.configmap";
import {ConfigMapViewWrapperComponent} from "./view-wrapper/view-wrapper.configmap";
import {ConfigMapViewToolbarComponent} from "./view-toolbar/view-toolbar.configmap";
import {ConfigMapViewComponent} from "./view/view.configmap";
import {ConfigMapEditPage} from "./edit-page/edit-page.configmap";
import {ConfigMapEditWrapperComponent} from "./edit-wrapper/edit-wrapper.configmap";
import {ConfigMapEditToolbarComponent} from "./edit-toolbar/edit-toolbar.configmap";
import {ConfigMapEditComponent} from "./edit/edit.configmap";
import {ConfigMapDeleteDialog} from "./delete-dialog/delete-dialog.configmap";
import {Fabric8CommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";
import {KubernetesComponentsModule} from "../../components/components.module";

const routes: Routes = [
  { path: '', component: ConfigMapsListPage },
  { path: ':id', component: ConfigMapViewPage },
  { path: ':id/edit', component: ConfigMapEditPage },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    MomentModule,
    RouterModule.forChild(routes),
    Fabric8CommonModule,
    KubernetesComponentsModule,
  ],
  declarations: [
    ConfigMapsListPage,
    ConfigMapsListToolbarComponent,
    ConfigMapsListComponent,
    ConfigMapViewPage,
    ConfigMapViewWrapperComponent,
    ConfigMapViewToolbarComponent,
    ConfigMapViewComponent,
    ConfigMapEditPage,
    ConfigMapEditWrapperComponent,
    ConfigMapEditToolbarComponent,
    ConfigMapEditComponent,
    ConfigMapDeleteDialog,
  ],
  entryComponents: [
    ConfigMapDeleteDialog,
    ConfigMapEditPage,
  ],
  exports: [
    ModalModule,
  ],
})
export class ConfigMapModule {
}
