import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {PipelinesListPage} from "./list-page/list-page.pipeline.component";
import {PipelinesListToolbarComponent} from "./list-toolbar/list-toolbar.pipeline.component";
import {PipelinesListComponent} from "./list/list.pipeline.component";
import {PipelineViewPage} from "./view-page/view-page.pipeline.component";
import {PipelineViewWrapperComponent} from "./view-wrapper/view-wrapper.pipeline.component";
import {PipelineViewToolbarComponent} from "./view-toolbar/view-toolbar.pipeline.component";
import {PipelineViewComponent} from "./view/view.pipeline.component";
import {Fabric8CommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";
import {KubernetesComponentsModule} from "../../components/components.module";
import {BuildConfigDialogsModule} from "../buildconfig/delete-dialog/buildconfig.dialogs.module";

const routes: Routes = [
  { path: '', component: PipelinesListPage },
  { path: ':id', component: PipelineViewPage },
  { path: ':buildConfig/builds', loadChildren: '../build/build.module#BuildModule' },
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
    BuildConfigDialogsModule,
  ],
  declarations: [
    PipelinesListPage,
    PipelinesListToolbarComponent,
    PipelinesListComponent,
    PipelineViewPage,
    PipelineViewWrapperComponent,
    PipelineViewToolbarComponent,
    PipelineViewComponent,
  ],
  entryComponents: [
  ],
  exports: [
  ],
})
export class PipelineModule {
}
