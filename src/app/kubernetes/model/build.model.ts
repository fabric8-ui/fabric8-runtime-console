import {KubernetesSpecResource} from "./kuberentesspecresource.model";
import {defaultBuildIconStyle} from "./buildconfig.model";
import {PipelineStage} from "./pipelinestage.model";
import {pathJoin} from "./utils";


export class Build extends KubernetesSpecResource {
  statusPhase: string;
  duration: number;
  iconStyle: string;
  buildNumber: string;
  buildNumberInt: number = 0;
  buildConfigName: string;

  jenkinsBuildURL: string;
  logURL: string;

  private _pipelineStages: Array<PipelineStage>;

  get pipelineStages(): Array<PipelineStage> {
    if (!this._pipelineStages) {
      this._pipelineStages = new Array<PipelineStage>();
      // lets parse the annotation from Jenkins sync plugin
      var json = this.annotations["openshift.io/jenkins-status-json"];
      if (json) {
        try {
          var obj = JSON.parse(json);
          if (obj != null) {
            var stages = obj.stages;
            if (stages && stages.length) {
              stages.forEach(stage => {
                var pipelineStage = new PipelineStage(stage, this);
                if (pipelineStage.name) {
                  this._pipelineStages.push(pipelineStage);
                }
              });
            }
          }
        } catch (e) {
          // ignore bad JSON
        }
      }
    }
    return this._pipelineStages;
  }


  updateValuesFromResource() {
    this._pipelineStages = null;
    super.updateValuesFromResource();
    let status = this.status || {};
    this.statusPhase = status.phase || "";
    this.duration = status.duration || 0;
    if (this.duration) {
      this.duration = this.duration / 1000000000;
    }
    let statusConfig = status.config || {};
    this.buildConfigName = statusConfig.name || "";
    this.buildNumber = this.annotations["openshift.io/build.number"] || "";
    this.buildNumberInt = 0;
    if (this.buildNumber) {
      try {
        this.buildNumberInt = parseInt(this.buildNumber);
      } catch (e) {
        // ignore invalid text values
      }
    }
    this.jenkinsBuildURL = this.annotations["openshift.io/jenkins-build-uri"] || "";
    this.logURL = "";
    if (this.jenkinsBuildURL) {
      this.logURL = pathJoin(this.jenkinsBuildURL, "/console");
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
