import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {ReplicaSetsListPage} from "./list-page/list-page.replicaset";
import {ReplicaSetsListToolbarComponent} from "./list-toolbar/list-toolbar.replicaset";
import {ReplicaSetsListComponent} from "./list/list.replicaset";
import {ReplicaSetViewPage} from "./view-page/view-page.replicaset";
import {ReplicaSetViewWrapperComponent} from "./view-wrapper/view-wrapper.replicaset";
import {ReplicaSetViewToolbarComponent} from "./view-toolbar/view-toolbar.replicaset";
import {ReplicaSetViewComponent} from "./view/view.replicaset";
import {ReplicaSetEditPage} from "./edit-page/edit-page.replicaset";
import {ReplicaSetEditWrapperComponent} from "./edit-wrapper/edit-wrapper.replicaset";
import {ReplicaSetEditToolbarComponent} from "./edit-toolbar/edit-toolbar.replicaset";
import {ReplicaSetEditComponent} from "./edit/edit.replicaset";
import {ReplicaSetDeleteDialog} from "./delete-dialog/delete-dialog.replicaset";
import {Fabric8CommonModule} from "../../../common/common.module";
import {ReplicaSetScaleDialog} from "./scale-dialog/scale-dialog.replicaset";
import {MomentModule} from "angular2-moment";
import {KubernetesComponentsModule} from "../../components/components.module";

const routes: Routes = [
  { path: '', component: ReplicaSetsListPage },
  { path: ':id', component: ReplicaSetViewPage },
  { path: ':id/edit', component: ReplicaSetEditPage },
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
    ReplicaSetsListPage,
    ReplicaSetsListToolbarComponent,
    ReplicaSetsListComponent,
    ReplicaSetViewPage,
    ReplicaSetViewWrapperComponent,
    ReplicaSetViewToolbarComponent,
    ReplicaSetViewComponent,
    ReplicaSetEditPage,
    ReplicaSetEditWrapperComponent,
    ReplicaSetEditToolbarComponent,
    ReplicaSetEditComponent,
    ReplicaSetDeleteDialog,
    ReplicaSetScaleDialog,
  ],
  entryComponents: [
    ReplicaSetDeleteDialog,
    ReplicaSetEditPage,
  ],
  exports: [
    ModalModule,
  ],
})
export class ReplicaSetModule {
}
