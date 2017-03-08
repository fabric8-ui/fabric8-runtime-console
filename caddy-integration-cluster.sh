#!/usr/bin/env bash

echo "Running the caddy server to proxy API requests to a kubernetes cluster"
echo "To download caddy see: https://caddyserver.com/download"
echo ""

export KUBERNETES_SERVICE_HOST=int.rdu2c.fabric8.io
export KUBERNETES_SERVICE_PORT=8443

export OAUTH_AUTHORIZE_URI="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/oauth/authorize"
export OAUTH_LOGOUT_URI="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/connect/endsession?id_token={{id_token}}"
export K8S_API_SERVER="${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"


if [ -z "${OAUTH_ISSUER}" ]; then
  #export OAUTH_ISSUER=""
  export OAUTH_ISSUER="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"
fi
if [ -z "${OAUTH_SCOPE}" ]; then
  export OAUTH_SCOPE="user:full"
fi
if [ -z "${OAUTH_CLIENT_ID}" ]; then
  export OAUTH_CLIENT_ID="fabric8"
fi


echo "Connecting to kubernetes cluster at https://${K8S_API_SERVER}/"

echo "OAUTH_ISSUER:    ${OAUTH_ISSUER}"
echo "OAUTH_CLIENT_ID: ${OAUTH_CLIENT_ID}"
echo "OAUTH_SCOPE:     ${OAUTH_SCOPE}"
echo ""

caddy --root ./src
