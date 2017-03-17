#!/usr/bin/env bash

export KUBERNETES_SERVICE_HOST=tsrv.devshift.net
export KUBERNETES_SERVICE_PORT=8443

echo "Using Kubernetes Master: ${KUBERNETES_SERVICE_HOST}:${KUBERNETES_SERVICE_PORT}"

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
if [ -z "${OAUTH_SCOPE}" ]; then
  export OAUTH_SCOPE="user:full"
fi
if [ -z "${OAUTH_CLIENT_ID}" ]; then
  export OAUTH_CLIENT_ID="fabric8"
fi

if [ -z "${K8S_API_SERVER_PROXY}" ]; then
  export K8S_API_SERVER_PROXY="http://localhost:4200/"
fi


echo "Configured to connect to kubernetes cluster at https://${K8S_API_SERVER}/"

echo "K8S_API_SERVER_PROXY:     ${K8S_API_SERVER_PROXY}"
echo "OAUTH_ISSUER:             ${OAUTH_ISSUER}"
echo "OAUTH_CLIENT_ID:          ${OAUTH_CLIENT_ID}"
echo "OAUTH_SCOPE:              ${OAUTH_SCOPE}"
echo ""
