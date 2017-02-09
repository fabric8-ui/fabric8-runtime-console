import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {PodsListPage} from "./list-page/list-page.pod";
import {PodsListToolbarComponent} from "./list-toolbar/list-toolbar.pod";
import {PodsListComponent} from "./list/list.pod";
import {PodViewPage} from "./view-page/view-page.pod";
import {PodViewWrapperComponent} from "./view-wrapper/view-wrapper.pod";
import {PodViewToolbarComponent} from "./view-toolbar/view-toolbar.pod";
import {PodViewComponent} from "./view/view.pod";
import {PodEditPage} from "./edit-page/edit-page.pod";
import {PodEditWrapperComponent} from "./edit-wrapper/edit-wrapper.pod";
import {PodEditToolbarComponent} from "./edit-toolbar/edit-toolbar.pod";
import {PodEditComponent} from "./edit/edit.pod";
import {PodDeleteDialog} from "./delete-dialog/delete-dialog.pod";
import {Fabric8CommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";
import {KubernetesComponentsModule} from "../../components/components.module";

const routes: Routes = [
  { path: '', component: PodsListPage },
  { path: ':id', component: PodViewPage },
  { path: ':id/edit', component: PodEditPage },
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
    PodsListPage,
    PodsListToolbarComponent,
    PodsListComponent,
    PodViewPage,
    PodViewWrapperComponent,
    PodViewToolbarComponent,
    PodViewComponent,
    PodEditPage,
    PodEditWrapperComponent,
    PodEditToolbarComponent,
    PodEditComponent,
    PodDeleteDialog,
  ],
  entryComponents: [
    PodDeleteDialog,
    PodEditPage,
  ],
  exports: [
    ModalModule,
  ],
})
export class PodModule {
}
