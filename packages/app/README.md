# univision-fe-webapp
Next.js based app for Univision sites

Quick Start
===========

Install node [active LTS](https://github.com/nodejs/Release#release-schedule) version

#### Dev Mode
Note: No build is needed on other packages cause nextjs use `src` code directly
```
$ yarn
$ yarn app:dev
```

### Assets and local server
In case you need to fetch the assets from the local server, you will need to go to the .env (dot env) file and change the variable PROXY_API_URL from its current value to PROXY_API_URL=http://localhost:8080

#### Prod Mode
Note: No build is needed on other packages cause nextjs use `src` code directly
```
cd package/app
yarn buid
yarn start
```

#### Degugging
Source map can be enable using a flag
```
cd package/app
yarn buid:sourcemap
yarn start
```
 and also minify can be disable using `debug` flag
```
cd package/app
yarn buid:debug
yarn start
```
#### Bundle analyzer
This build option generate a bundle analyzer report on client chunks and lambda pages
```
cd package/app
yarn buid:analyze
```


* Go to `http://localhost:3000/`
* Interact with the list of components
* `Ctrl + C` to stop services

# Lambda deployment

A workflow tied to `master`, `feat/serverless`, `feat/performance`, `feat/integration` branchs or release tag will trigger a deployment in one of the accounts (dev or prod). This will create lambdas with names depending on the stage defined in CircleCI:
#### In dev account:
* serverless-webapp-nextjs-dev-univision
* serverless-webapp-nextjs-uat-univision
* serverless-webapp-nextjs-dev-tudn
* serverless-webapp-nextjs-uat-tudn

#### In prod account:
* serverless-webapp-nextjs-prod-univision
* serverless-webapp-nextjs-prod-tudn

The API Gateway url can be found in the last step of the deployment

