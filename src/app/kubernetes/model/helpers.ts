export var resourceKindToCollectionName = {
  "Deployment": "deployments",
  "Event": "events",
  "Namespace": "spaces",
  "Pod": "pods",
  "ReplicationControllers": "replicationControllers",
  "ReplicaSet": "replicasets",
  "Service": "services",
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
