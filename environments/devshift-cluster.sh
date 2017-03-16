#!/usr/bin/env bash

export KUBERNETES_SERVICE_HOST=tsrv.devshift.net
export KUBERNETES_SERVICE_PORT=8443

echo "Using Kubernetes Master: ${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"