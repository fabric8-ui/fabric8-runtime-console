#!/usr/bin/env bash

export KUBERNETES_SERVICE_HOST=int.rdu2c.fabric8.io
export KUBERNETES_SERVICE_PORT=8443

echo "Using Kubernetes Master: ${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"