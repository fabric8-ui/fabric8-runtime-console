import {KubernetesSpecResource} from "./kuberentesspecresource.model";
import {defaultBuildIconStyle} from "./buildconfig.model";
import {PipelineStage} from "./pipelinestage.model";
import {pathJoin} from "./utils";
import * as jsyaml from "js-yaml";


const serviceEnvironmentsAnnotationPrefix = "environment.services.fabric8.io/";


function sortedKeys(map: Map<String,any>): string[] {
  let answer = [];
  for (let key in map) {
    answer.push(key);
  }
  answer.sort();
  return answer;
}

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
  private _serviceUrls: Array<ServiceUrl> = new Array<ServiceUrl>();
  private _serviceEnvironmentsMap: Map<String,ServiceEnvironments> = new Map<String,ServiceEnvironments>();

  get serviceUrls(): Array<ServiceUrl> {
    // lets force the lazy creation
    let foo = this.serviceEnvironmentMap;
    return this._serviceUrls;
  }

  get serviceEnvironmentMap(): Map<String,ServiceEnvironments> {
    let annotations = this.annotations;
    if (annotations) {
      for (let key in annotations) {
        if (key && key.startsWith(serviceEnvironmentsAnnotationPrefix)) {
          let yamlText = annotations[key];
          let envKey = key.substring(serviceEnvironmentsAnnotationPrefix.length);
          if (envKey) {
            try {
              let config = jsyaml.safeLoad(yamlText);
              if (config) {
                let se = new ServiceEnvironments(config.environmentName as string, config.serviceUrls as Map<String,String>);
                this._serviceEnvironmentsMap[envKey] = se;
              }
            } catch (e) {
              console.log("annotation on build " + this.name + " could not parse YAML: " + e);
            }
          } else {
            console.log("annotation on build " + this.name + " has no envKey for " + key);
          }
        }
      }
      // now lets build the service URls
      let serviceUrls = this._serviceUrls;
      serviceUrls.splice(0, serviceUrls.length);
      let seMap = this._serviceEnvironmentsMap;
      let keys = sortedKeys(seMap);
      for (let key of keys) {
        let se = seMap[key];
        if (se) {
          let envName = se.environmentName;
          let serviceUrlMap = se.serviceUrls;
          if (envName) {
            let serviceKeys = sortedKeys(serviceUrlMap);
            for (let serviceKey of serviceKeys) {
              let url = serviceUrlMap[serviceKey];
              if (url) {
                serviceUrls.push(new ServiceUrl(envName, serviceKey, url));
              } else {
                console.log("build " + this.name + " does not have a URL for " + serviceKey);
              }
            }
          }
        }
      }
    }
    return this._serviceEnvironmentsMap;
  }

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

export class ServiceUrl {
  label: string;

  constructor(public environmentName: string, public name: string, public url: string) {
    this.label = environmentName ? (environmentName + ": " + name) : name;
  }
}

export class ServiceEnvironments {
  constructor(public environmentName: string, public serviceUrls: Map<String,String>) {}
}

export class Builds extends Array<Build>{
}
