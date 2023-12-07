# Kubernetes Deploy Configuration
This directory contains the following files and directories for kubernetes deployments:

* charts: this directory contains helm charts that represent the application that will be deployed.  Helm is a package manager for Kubernetes and is used to deploy and manage the lifecycle of the application in the cluster. Helm uses go templating to create kubernetes manifests, which allows you to create a repeatable process for each environment your application runs in.

* values: this directory contains environment specific helm values files that override default helm chart values.  The default values are in `deploy/charts/univision-fe/values.yaml`.

* build.config: This file contains config variables for rok8s-scripts necessary to build a docker image.

* dev.config: This file contains config variables for rok8s-scripts necessary to deploy a helm chart to a kubernetes cluster.
