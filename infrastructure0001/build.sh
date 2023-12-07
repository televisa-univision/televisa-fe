#!/bin/bash
source ~/.bashrc

echo "==================================Cleaning up Build Directory==================================="
# cd $WORKSPACE/ && \
# rm -rf $WORKSPACE/node_modules

echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

echo "==================================Installing Node Version 8.4=================================="
nvm install 9.11.2 && node --version

echo "=================================Installing yarn========================================="
curl -o- -L https://yarnpkg.com/install.sh | bash

echo "==================================Installing Node Modules======================================"
cd $WORKSPACE/ && pwd && nvm use 9.11.2 && node --version && yarn install

echo "==================================Building Dependencies================================================"
cd $WORKSPACE/ && pwd && nvm use 9.11.2 && node --version && yarn build:all

echo "==================================Running Tests================================================"
cd $WORKSPACE/ && pwd && nvm use 9.11.2 && node --version && yarn test:all

echo "==================================Bulding Node App=============================================="
nvm use 9.11.2 && node --version && yarn run:core prod:build

echo "=================================Building Docker Image===============+========================="
docker build -t univision-fe-dev-ecr .

echo "==================================Tagging Docker Image========================================="
docker tag univision-fe-dev-ecr:latest $ECR_URL/univision-fe-dev-ecr:$BUILD_NUMBER
docker tag univision-fe-dev-ecr:latest $ECR_URL/univision-fe-dev-ecr:latest

PORT=$(( RANDOM % (9000 - 8000 + 1 ) + 8000 ))

echo "==================================Testing Docker Container on Port:${PORT}====================================="

docker run -d -p ${PORT}:8080 \
-e  ENVIRONMENT=$ENVIRONMENT \
-e  NODE_ENV=$NODE_ENV \
-e  SENTRY_DSN=$SENTRY_DSN \
-e  SENTRY_ENVIRONMENT=$SENTRY_ENVIRONMENT \
-e  NEW_RELIC_APP_NAME=$NEW_RELIC_APP_NAME \
-e  NEW_RELIC_LICENSE_KEY=$NEW_RELIC_LICENSE_KEY \
-e  NEW_RELIC_LOG_LEVEL=$NEW_RELIC_LOG_LEVEL \
-e  CMS_API_URL=$CMS_API_URL \
-e  CMS_API_CLIENT_ID=$CMS_API_CLIENT_ID \
-e  CMS_API_SECRET=$CMS_API_SECRET \
-e  DEPLOY_ENV=$DEPLOY_ENV \
-e  CDN_URL=$CDN_URL \
-e  VIDEO_HUB_ENV=$VIDEO_HUB_ENV \
-e  VIDEO_HUB_PROFILE=$VIDEO_HUB_PROFILE \
-e  VIDEO_HUB_API_KEY=$VIDEO_HUB_API_KEY \
-e  WEATHER_API_KEY=$WEATHER_API_KEY \
-e  LOGS_LOCATION=$LOGS_LOCATION --name univision-fe-dev-$BUILD_NUMBER $ECR_URL/univision-fe-dev-ecr:$BUILD_NUMBER && \
sleep 90

curl --retry 5 --retry-delay 10 http://localhost:${PORT}/health

echo "====================================Stoping Docker Container==================================="
docker stop univision-fe-dev-$BUILD_NUMBER
