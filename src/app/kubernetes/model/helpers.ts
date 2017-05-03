import {OAuthConfig} from "./../store/oauth-config-store";
import {KubernetesResource} from "./kubernetesresource.model";
import {pathJoin} from "./utils";

export var resourceKindToCollectionName = {
  "Deployment": "deployments",
  "DeploymentConfig": "deploymentconfigs",
  "Build": "builds",
  "BuildConfig": "buildsconfigs",
  "ConfigMap": "configmaps",
  "Event": "events",
  "Namespace": "spaces",
  "Pod": "pods",
  "Project": "projects",
  "ReplicationController": "replicationcontrollers",
  "ReplicaSet": "replicasets",
  "Route": "routes",
  "Service": "services",
};

export var resourceKindToOpenShiftConsoleCollectionName = {
  "DeploymentConfig": "dc",
  "BuildConfig": "pipelines",
};

/**
 * Returns true if the resource kind is namespaced
 */
export function isNamespacedKind(kind: string) {
  if (kind) {
    return kind !== "Namespace" && kind !== "Project" && kind !== "PersistentVolume";
  }
  return false;
}


/**
 * Given the resource generate a link to browse the resource on the OpenShift web console
 */
export function openShiftBrowseResourceUrl(resource: KubernetesResource, oauthConfig: OAuthConfig, openShiftConsoleUrl: string = null, kinds: string = null): string {
  if (resource) {
    if (!openShiftConsoleUrl) {
      openShiftConsoleUrl = oauthConfig.openshiftConsoleUrl;
    }
    if (!kinds) {
      let kind = resource.defaultKind();
      if (!kind || kind === "Unknown") {
        let k8sResource = resource.resource;
        if (k8sResource) {
          kind = k8sResource.kind;
        }
      }
      if (kind) {
        kinds = resourceKindToOpenShiftConsoleCollectionName[kind] || resourceKindToCollectionName[kind];
        if (!kinds) {
          console.log("Could not find collection name for kind: " + kind);
          kinds = kind.toLowerCase();
          if (!kinds.endsWith("s")) {
            kinds += "s";
          }
        }
      }
    }
    const name = resource.name;
    if (kinds === "spaces" || kinds === "projects") {
      if (name) {
        return pathJoin(openShiftConsoleUrl, "/project/", name, "/overview");
      }
    } else {
      const namespace = resource.namespace;
      if (resource && openShiftConsoleUrl && namespace && name) {
        return pathJoin(openShiftConsoleUrl, "/project/", namespace, "/browse", kinds, name);
      }
    }
  }
  return "";
}
