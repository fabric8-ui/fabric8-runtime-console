import {KubernetesSpecResource} from "./kuberentesspecresource.model";
import {defaultBuildIconStyle} from "./buildconfig.model";


export class Build extends KubernetesSpecResource {
  statusPhase: string;
  duration: number;
  iconStyle: string;

  updateValuesFromResource() {
    super.updateValuesFromResource();
    let status = this.status || {};
    this.statusPhase = status.phase || "";
    this.duration = status.duration || 0;
    if (this.duration) {
      this.duration = this.duration / 1000000000;
    }

    switch (this.statusPhase) {
      case "Complete":
        this.iconStyle = "pficon-ok";
        break;
      case "Failed":
      case "Error":
        this.iconStyle = "pficon-error-circle-o";
        break;
      case "Cancelled":
        this.iconStyle = "pficon-warning-triangle-o";
        break;
      case "New":
      case "Pending":
      case "Running":
        this.iconStyle = "pficon-running";
        break;
      default:
        this.iconStyle = defaultBuildIconStyle;
    }
  }

  defaultKind() {
    return 'Build';
  }

  defaultIconUrl(): string {
    return "";
  }
}

export class Builds extends Array<Build>{
}
