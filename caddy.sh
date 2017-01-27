#!/usr/bin/env bash

echo "Running the caddy server to proxy API requests to a kubernetes cluster"
echo "To download caddy see: https://caddyserver.com/download"
echo ""

# TODO - lets detect if there's no KUBERNETES_SERVICE_HOST and if so try figure it out from gofabric8?

echo "Connecting to kubernetes cluster at https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/"


caddy
