import {NgModule} from "@angular/core";
import {DropdownModule} from "ng2-bootstrap";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ModalModule} from "ng2-modal";
import {Fabric8CommonModule} from "../../../common/common.module";
import {MomentModule} from "angular2-moment";
import {KubernetesComponentsModule} from "../../components/components.module";
import {SpaceStore} from "../../store/space.store";
import {NamespaceStore} from "../../store/namespace.store";
import {StatusListComponent} from "./status-list.component";
import {StatusInfoComponent} from "./status-info-component";


@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ModalModule,
    MomentModule,
    RouterModule,
    Fabric8CommonModule,
    KubernetesComponentsModule,
  ],
  declarations: [
    StatusInfoComponent,
    StatusListComponent,
  ],
  providers: [
    SpaceStore,
    NamespaceStore,
  ],
  exports: [
    StatusInfoComponent,
    StatusListComponent,
  ],
})
export class StatusListModule {
}
