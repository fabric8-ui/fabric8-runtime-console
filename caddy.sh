#!/usr/bin/env bash

echo "Running the caddy server to proxy API requests to a kubernetes cluster"
echo "To download caddy see: https://caddyserver.com/download"
echo ""

# lets detect if there's no KUBERNETES_SERVICE_HOST and if so try figure it out from gofabric8?
PARTS=$(kubectl cluster-info | perl -pe 's/\x1b\[[0-9;]*m//g' | grep master |sed -e 's/.*http:\/\///g' -e 's/.*https:\/\///g')


[ -z "$KUBERNETES_SERVICE_HOST" ] && IFS=':' read KUBERNETES_SERVICE_HOST KUBERNETES_SERVICE_PORT <<< "$PARTS"
[ -z "$KUBERNETES_SERVICE_HOST" ] && echo "Need to set KUBERNETES_SERVICE_HOST" && exit 1;
[ -z "$KUBERNETES_SERVICE_PORT" ] && echo "Need to set KUBERNETES_SERVICE_PORT" && exit 1;


export OAUTH_AUTHORIZE_URI="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/oauth/authorize"
export OAUTH_LOGOUT_URI="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}/connect/endsession?id_token={{id_token}}"
export K8S_API_SERVER="${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"


if [ -z "${OAUTH_ISSUER}" ]; then
  #export OAUTH_ISSUER=""
  export OAUTH_ISSUER="https://${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"
fi


echo "Connecting to kubernetes cluster at https://${K8S_API_SERVER}/"

echo "OAUTH_ISSUER: ${OAUTH_ISSUER}"
echo "OAUTH_CLIENT_ID: ${OAUTH_CLIENT_ID}"
echo ""

caddy --root ./src
