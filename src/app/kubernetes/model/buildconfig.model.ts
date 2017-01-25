import {KubernetesSpecResource} from "./kuberentesspecresource.model";

export class BuildConfig extends KubernetesSpecResource {
  gitUrl: string;
  type: string;
  lastVersion: number;
  lastBuildPath: string;


  updateValuesFromResource() {
    super.updateValuesFromResource();

    let spec = this.spec || {};
    let status = this.status || {};
    let source = spec.source || {};
    let git = source.git || {};
    let strategy = spec.strategy || {};
    let type = strategy.type || "";
    this.lastVersion = status.lastVersion || 0;
    this.lastBuildPath = this.lastVersion ? this.name + "/builds/" + this.name + "-" +  this.lastVersion: "";

    this.type = type;
    var gitUrl = this.annotations["fabric8.io/git-clone-url"];
    if (!gitUrl) {
      gitUrl = git.uri || "";
    }
    this.gitUrl = gitUrl;

  }

  defaultKind() {
    return 'BuildConfig';
  }
}

export class BuildConfigs extends Array<BuildConfig> {
}
