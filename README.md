[![CircleCi Status for univision/univision-fe](https://circleci.com/gh/univision/univision-fe.svg?&style=shield&circle-token=4f2460d7f44dcdf331abb10015c5dfccbf3e83d8)](https://circleci.com/gh/univision/univision-fe)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

# univision-fe
React Based Front-End Layer for Univision.com

Features

* React 16
* Next.js
* Webpack 4
* Development mode: HMR for React components
* [End-to-End testing suite](https://github.com/univision/univision-fe/wiki/Testing#end-to-end-testing): implemented with Cypress

Quick Start
===========

**STRUCTURE**

This repository is conformed by different packages:
* **packages/app:** Next.js web application.
* **packages/core:** Proxy Node.js application.
* **packages/commons:** Common configuration for all packages on the web application.
* **packages/utilities:** Utilities shared and agnostic for Univision.
* **packages/icons:** Icons library for the web/native.
* **packages/components-base:** Basic components for the web application.
* **packages/deportes:** Sports-related components/widgets for the web application.
* **packages/prendetv:** PrendeTV components/widgets for the web application.
* **packages/local:** Local-related components/widgets for the web application.
* **packages/video:** Video-related components and video-sdk integration.
* **packages/end-to-end:** End-to-End Tests for the web application.
* **packages/tool:** Continuous integration scripts and platform/docker definition.
* **deploy:** Deprecated configuration for [Kubernetes](https://kubernetes.io/docs/home/) aka k8s, now we use AWS Lambdas/Fargate.

**DEVELOPMENT MODE**

#### Installation
* Install node v18.16.1 or higher
* Install Yarn v1.22.0 or higher
* Login to npm `npm login` (you will need access to the `@univision` organization)
* Copy the required environments files, `app` is for the Next.js webapp and `core` for the Node.js server proxy

```sh
$ yarn
$ cp packages/app/.env.example packages/app/.env
$ cp packages/core/.env.example packages/core/.env
```

#### Running Local
Build the packages and start the Next.js app as development mode:

```sh
$ yarn clean:all
$ yarn build:all
$ yarn start:app:dev
```
* Go to `http://localhost:3000`
* Interact with the local version of the web application, the first request will take some time to build.
* `Ctrl + C` to stop services

For the Node.js server proxy as development mode:
```sh
$ yarn build:all
$ yarn start:dev
```
* Go to an`http://localhost:8080/famosos`
* You will see  the page data for `/famosos` path
* `Ctrl + C` to stop services

*If you modify any package like **icons**, **commons**, etc will be rebuilt automatically*, 
If you are not able to see the changes you need to build that package e.g `yarn build:utilities` or `yarn build:all`.

For more information about application setup or proxy server setup check the [wiki](https://github.com/univision/univision-fe/wiki/Local-Development-Setup#application-setup)

**ENVIRONMENT VARIABLES**

For Next.js we leverage the API Gateway stage features, so each lambda can have multiple stages. Then each environment is tied to a different stage like: integration, dev, uat, prod.
In order to pass env vars into the lambdas they are added on deployment time on circle CI using deplyment utility on `packages/tools/ci/deploy.js`

To add new env var it has to be defined on:

* `packages/tools/ci/variables.json`
* `packages/tools/ci/stageEnvVars.json`

**TEST**

We use [jest](https://jestjs.io/) for the unit test, all the unit test should pass successfully and keep 100% of coverage,
you can run check it with:

```sh
$ yarn test:all
```

or per package for example:
```sh
$ yarn test:deportes
$ yarn test:core
...etc
```

**STORYBOOK**

You can see each component individually per package using the [Storybook](https://storybook.js.org/):
```sh
$ yarn story:commons
$ yarn story:components-base
...etc
```

**Troubleshooting**

* Run `yarn clean:jestCache` to clean the jest cache on your local machine.
* If you have issues finding private NPM modules, try deleting your local `.npmrc` and then `npm login`

For more information please visit the project's wiki:

## Publishing to NPM
* New versions of all packages are published from master
* See [circle.yml](https://github.com/univision/univision-fe/blob/master/.circleci/config.yml#L281) for more details.

## Wiki's Table of Contents

- [Home](https://github.com/univision/univision-fe/wiki)
- [Architecture](https://github.com/univision/univision-fe/wiki/Architecture)
- [Continuous Integration](https://github.com/univision/univision-fe/wiki/Continuous-Integration-and-Deployment)
- [Data and APIs](https://github.com/univision/univision-fe/wiki/Data-and-APIs)
- [Deployment steps](https://github.com/univision/univision-fe/wiki/Deployment)
- [Development Guidelines](https://github.com/univision/univision-fe/wiki/Development-Guidelines)
- [Local Development Setup](https://github.com/univision/univision-fe/wiki/Local-Development-Setup)
- [Technology Stack](https://github.com/univision/univision-fe/wiki/Technology-Stack)
- [Testing](https://github.com/univision/univision-fe/wiki/Testing)
