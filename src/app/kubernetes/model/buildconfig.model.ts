import {KubernetesSpecResource} from "./kuberentesspecresource.model";
import {Build, Builds} from "./build.model";
import {Params} from "@angular/router";

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

  private _builds: Array<Build> = new Array<Build>();
  interestingBuilds: Array<Build> = new Array<Build>();

  private _lastBuild: Build;

  get builds(): Array<Build> {
    return this._builds;
  }

  set builds(builds: Array<Build>) {
    this._builds = builds;
    this.onBuildsUpdated();
  }

  get lastBuild(): Build {
    return this._lastBuild;
  }

  /**
   * When the builds are updated lets keep track of the interesting builds
   * and the last build
   */
  private onBuildsUpdated() {
    let answer = this.interestingBuilds;
    answer.splice(0, answer.length);

    let builds = this.builds;
    let lastVersionName = this.lastBuildName;
    if (lastVersionName) {
      for (let build of builds) {
        if (lastVersionName === build.name) {
          this._lastBuild = build;
        }
      }
    }

    for (let build of builds) {
      if ("Running" === build.statusPhase) {
        answer.push(build);
      }
    }
    let build = this.lastBuild;
    if (!answer.length && build) {
      answer.push(build);
    }

    this.statusPhase = build ? build.statusPhase : "";
    this.duration = build ? build.duration : 0;
    this.iconStyle = build ? build.iconStyle : defaultBuildIconStyle;
  }

  get isPipeline(): boolean {
    return "JenkinsPipeline" === this.type;
  }

  get interestingBuildsAverageDuration(): number {
    var answer = 0;
    var count = 0;
    var builds = this.interestingBuilds;
    for (let build of builds) {
      let duration = build.duration;
      if (duration) {
        answer += duration;
        count++;
      }
    }
    if (count > 0) {
      return answer / count;
    }
    return 0;
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
    this.onBuildsUpdated();

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


export function findBuildConfigByID(buildConfigs: BuildConfigs, params: Params): BuildConfig {
  let id = params['id'];
  if (id) {
    if (buildConfigs) {
      for (let buildConfig of buildConfigs) {
        if (id === buildConfig.name) {
          return buildConfig;
        }
      }
    }
  }
  return id;
}

export function combineBuildConfigAndBuilds(buildConfigs: BuildConfigs, builds: Builds): BuildConfigs {
    let map = {};
    let bcBuilds = {};
    if (builds) {
      builds.forEach(s => {
        map[s.name] = s;
        let bcName = s.buildConfigName;
        if (bcName) {
          let list = bcBuilds[bcName];
          if (!list) {
            list = new Array<Build>();
            bcBuilds[bcName] = list;
          }
          list.push(s);
        }
      });
    }
    if (buildConfigs) {
      buildConfigs.forEach(bc => {
/*
        let lastVersionName = bc.lastBuildName;
        if (lastVersionName) {
          let build = map[lastVersionName];
          if (build) {
            bc.lastBuild = build;
          }
        }
*/
        let name = bc.name;
        if (name) {
          let list = bcBuilds[name];
          if (list) {
            bc.builds = list;
          }
        }
      });
    }
    return buildConfigs;


  }

export function filterPipelines(buildConfigs: BuildConfigs): BuildConfigs {
  var answer = new BuildConfigs();
  buildConfigs.forEach(bc => {
    if (bc.isPipeline) {
      answer.push(bc);
    }
  });
  return answer;
}
