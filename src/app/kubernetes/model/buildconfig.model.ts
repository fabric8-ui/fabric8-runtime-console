import {KubernetesSpecResource} from "./kuberentesspecresource.model";
import {Build, Builds} from "./build.model";

export const defaultBuildIconStyle = "pficon-build";

export class BuildConfig extends KubernetesSpecResource {
  gitUrl: string;
  type: string;
  lastVersion: number;

  jenkinsJobUrl: string;
  openInDEAUrl: string;
  openInCheUrl: string;

  lastBuildPath: string;
  lastBuildName: string;

  // last build related data
  statusPhase: string;
  duration: number;
  iconStyle: string;

  private _lastBuild: Build;

  get lastBuild(): Build {
    return this._lastBuild;
  }

  set lastBuild(build: Build) {
    this._lastBuild = build;
    this.statusPhase = build ? build.statusPhase : "";
    this.duration = build ? build.duration : 0;
    this.iconStyle = build ? build.iconStyle : defaultBuildIconStyle;
  }

  updateValuesFromResource() {
    super.updateValuesFromResource();

    let spec = this.spec || {};
    let status = this.status || {};
    let source = spec.source || {};
    let git = source.git || {};
    let strategy = spec.strategy || {};
    let type = strategy.type || "";

    this.lastVersion = status.lastVersion || 0;
    this.lastBuildName = this.lastVersion ? this.name + "-" +  this.lastVersion: "";
    this.lastBuildPath = this.lastBuildName ? this.name + "/builds/" + this.lastBuildName: "";
    this.iconStyle = defaultBuildIconStyle;

    this.type = type;
    var gitUrl = this.annotations["fabric8.io/git-clone-url"];
    if (!gitUrl) {
      gitUrl = git.uri || "";
    }
    this.gitUrl = gitUrl;
    this.jenkinsJobUrl = this.annotations["fabric8.link.jenkins.job/url"] || "";
    if (gitUrl) {
      this.openInDEAUrl = "jetbrains://idea/checkout/git?idea.required.plugins.id=Git4Idea&checkout.repo=" + gitUrl;
    }

    // TODO create openInCheUrl URL
  }

  defaultKind() {
    return 'BuildConfig';
  }

  defaultIconUrl(): string {
    return "";
  }
}

export class BuildConfigs extends Array<BuildConfig> {
}


export function combineBuildConfigAndBuilds(buildConfigs: BuildConfigs, builds: Builds): BuildConfigs {
  let map = {};
  if (builds) {
    builds.forEach(s => map[s.name] = s);
  }
  if (buildConfigs) {
    buildConfigs.forEach(bc => {
      let lastVersionName = bc.lastBuildName;
      if (lastVersionName) {
        let build = map[lastVersionName];
        if (build) {
          bc.lastBuild = build;
        }
      }
    });
  }
  return buildConfigs;


}