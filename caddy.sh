#!/usr/bin/env bash

echo "Running the caddy server to proxy API requests to a kubernetes cluster"
echo "To download caddy see: https://caddyserver.com/download"
echo ""

# lets detect if there's no KUBERNETES_SERVICE_HOST and if so try figure it out from gofabric8?
PARTS=$(kubectl cluster-info | grep master |sed -e 's/.*http:\/\///g' -e 's/.*https:\/\///g')


[ -z "$KUBERNETES_SERVICE_HOST" ] && IFS=':' read KUBERNETES_SERVICE_HOST KUBERNETES_SERVICE_PORT <<< "$PARTS"
[ -z "$KUBERNETES_SERVICE_HOST" ] && echo "Need to set KUBERNETES_SERVICE_HOST" && exit 1;
[ -z "$KUBERNETES_SERVICE_PORT" ] && echo "Need to set KUBERNETES_SERVICE_PORT" && exit 1;


export OAUTH_AUTHORIZE_URI="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/oauth/authorize"
export OAUTH_CLIENT_ID="fabric8"
export OAUTH_LOGOUT_URI="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/connect/endsession?id_token={{id_token}}"

echo "Connecting to kubernetes cluster at https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/"

caddy --root ./src
