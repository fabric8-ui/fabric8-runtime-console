/// <reference path="../../../../node_modules/retyped-js-yaml-tsd-ambient/js-yaml.d.ts"/>
import * as jsyaml from 'js-yaml';

import {Namespace, Namespaces, isSecretsNamespace, isSystemNamespace} from "./namespace.model";
import {ConfigMap} from "./configmap.model";


export class Space {
  id: string;
  name: string;
  environments: Environment[] = [];

  constructor(public namespace: Namespace, namespaces: Namespaces, public configMap: ConfigMap) {
    if (namespace) {
      this.id = namespace.id;
      this.name = namespace.name;
    }

    let map = new Map<string, Namespace>();
    if (namespaces) {
      namespaces.forEach(ns => map[ns.name] = ns);
    }
    if (configMap) {
      this.environments = this.loadEnvironments(configMap, map);
    }
  }

  protected loadEnvironments(configMap: ConfigMap, namespaceMap: Map<string, Namespace>): Environment[] {
    let answer = [];
    var data = configMap.data;
    if (data) {
      Object.keys(data).forEach((key) => {
        let yaml = data[key];
        if (yaml) {
          let config = jsyaml.safeLoad(yaml);
          let namespaceName = config['namespace'];
          if (namespaceName) {
            let ns = namespaceMap[namespaceName];
            if (ns) {
              var order = config.order;
              if (order === undefined) {
                order = 1000;
              }
              let env = new Environment(key, config.name || key, namespaceName, this, ns, config, order);
              answer.push(env);
            }
          }
        }
      });
    } else {
      console.log("No data for ConfigMap " + configMap.name + " in namespace " + configMap.namespace);
    }
    // TODO sort in order!
    return answer;
  }
}

export class Environment {
  constructor(public key: string, public name: string, public namespaceName: string, public space: Space, public namespace: Namespace, public config: any, public order: number) {
  }
}

export class Spaces extends Array<Space>{
  /**
   * All the spaces whether a development Space a runtime Environment or a namespace for Secrets
   */
  all = new Array<Space>();

  /**
   * All the environments for all spaces
   */
  environments = new Array<Environment>();

  /**
   * All the namespaces used for storing user Secrets
   */
  secretNamespaces = new Array<Space>();

  /**
   * System namespaces
   */
  systemNamespaces = new Array<Space>();
}


export function asSpaces(spaces: Space[]): Spaces {
  var answer = new Spaces();
  if (spaces) {
    var nsNameToEnvMap = new Map<string,Environment>();
    for (let space of spaces) {
      if (space && space.environments) {
        for (let env of space.environments) {
          if (!nsNameToEnvMap[env.namespaceName]) {
            nsNameToEnvMap[env.namespaceName] = env;
            answer.environments.push(env);
          }
        }
      }
    }
    for (let space of spaces) {
      if (space) {
        let nsName = space.name;
        if (!nsNameToEnvMap[nsName]) {
          // this is a top level space not an environment
          if (isSecretsNamespace(space.namespace)) {
            answer.secretNamespaces.push(space);
          } else if (isSystemNamespace(space.namespace)) {
            answer.systemNamespaces.push(space);
          } else {
            answer.push(space);
          }
        }
        answer.all.push(space);
      }
    }
  }
  return answer;
}


