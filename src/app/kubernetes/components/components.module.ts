import {NgModule} from "@angular/core";
import {PodPhaseIconComponent} from "./pod-phase-icon/pod-phase-icon";
import {KubernetesLabelsComponent} from "./k8s-labels/k8s-labels";
import {Fabric8CommonModule} from "../../common/common.module";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
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
