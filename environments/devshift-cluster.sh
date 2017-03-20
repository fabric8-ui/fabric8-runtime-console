#!/usr/bin/env bash

# This is devshift
export KUBERNETES_SERVICE_HOST=tsrv.devshift.net
export KUBERNETES_SERVICE_PORT=8443

echo "Using Kubernetes Master: ${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"

export OAUTH_AUTHORIZE_URI="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/oauth/authorize"
export OAUTH_LOGOUT_URI="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/connect/endsession?id_token={{id_token}}"
export PROXIED_K8S_API_SERVER="${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"

# This is our proxy that we will connect to
export K8S_API_SERVER="localhost:4200"

export OAUTH_ISSUER="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"
export OAUTH_SCOPE="user:full"
export OAUTH_CLIENT_ID="fabric8"
export K8S_API_SERVER_PROTOCOL="http"
export K8S_API_SERVER_BASE_PATH="/_p/oso"
export WS_K8S_API_SERVER=${PROXIED_K8S_API_SERVER}

echo "Configured to connect to kubernetes cluster at https://${PROXIED_K8S_API_SERVER}/"

echo ""
echo "WS_K8S_API_SERVER:             ${WS_K8S_API_SERVER}"
echo "K8S_API_SERVER_PROTOCOL:       ${K8S_API_SERVER_PROTOCOL}"
echo "K8S_API_SERVER_BASE_PATH:      ${K8S_API_SERVER_BASE_PATH}"
echo "OAUTH_ISSUER:                  ${OAUTH_ISSUER}"
echo "OAUTH_CLIENT_ID:               ${OAUTH_CLIENT_ID}"
echo "OAUTH_SCOPE:                   ${OAUTH_SCOPE}"
echo ""
