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
  "ReplicationControllers": "replicationControllers",
  "ReplicaSet": "replicasets",
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
export function openShiftBrowseResourceUrl(resource: KubernetesResource, openShiftConsoleUrl: string = null, kinds: string = null): string {
  if (resource) {
    if (!openShiftConsoleUrl) {
      openShiftConsoleUrl = process.env.OPENSHIFT_CONSOLE_URL;
    }
    if (!kinds) {
      let kind = resource.defaultKind();
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
    const namespace = resource.namespace;
    const name = resource.name;
    if (resource && openShiftConsoleUrl && namespace && name) {
      return pathJoin(openShiftConsoleUrl, "/project/", namespace, "/browse", kinds, name);
    }
  }
  return "";
}