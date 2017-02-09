import {NgModule} from "@angular/core";
import {PodPhaseIconComponent} from "./pod-phase-icon/pod-phase-icon";
import {KubernetesLabelsComponent} from "./k8s-labels/k8s-labels";
import {Fabric8CommonModule} from "../../common/common.module";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    Fabric8CommonModule,
  ],
  declarations: [
    KubernetesLabelsComponent,
    PodPhaseIconComponent,
  ],
  exports: [
    KubernetesLabelsComponent,
    PodPhaseIconComponent,
  ],
})
export class KubernetesComponentsModule {
}
