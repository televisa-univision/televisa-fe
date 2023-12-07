#!/bin/bash

set -euo pipefail

namespace="$1"

if [ -z "$namespace" ]; then
    echo "Usage: create-ephemeral-values.sh <namespace>"
    exit 1
fi

cat << EOF > deploy/values/${namespace}.values.yml
ingress:
  hosts:
  - ${namespace}-fe.k8s.dev-univision.com
EOF
