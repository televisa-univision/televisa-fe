#!/bin/bash
echo "==================================Loging in to ECS Repository=================================="
eval `aws --profile=$ENVIRONMENT ecr get-login --region us-east-1`

echo "=================================Pushing images to ECS========================================="
docker push $ECR_URL/univision-fe-dev-ecr:$BUILD_NUMBER
docker push $ECR_URL/univision-fe-dev-ecr:latest

cd $WORKSPACE/infraestructure/

SERVICE_NAME="univision-fe-dev-ecs-service"
CLUSTER_NAME="univision-fe-dev-ecs-cluster"
TASK_FAMILY="univision-fe-dev"
ECR_REPO="univision-fe-dev-ecr"

echo "==============================Create a new task definition for this build======================"
sed -e "s~%TASK_FAMILY%~${TASK_FAMILY}~g; \
s~%ECR_URL%~${ECR_URL}~g; \
s~%ECR_REPO%~${ECR_REPO}~g; \
s~%ENVIRONMENT%~${ENVIRONMENT}~g; \
s~%NODE_ENV%~${NODE_ENV}~g; \
s~%SENTRY_DSN%~${SENTRY_DSN}~g; \
s~%SENTRY_ENVIRONMENT%~${SENTRY_ENVIRONMENT}~g; \
s~%NEW_RELIC_LOG_LEVEL%~${NEW_RELIC_LOG_LEVEL}~g; \
s~%CMS_API_URL%~${CMS_API_URL}~g; \
s~%CMS_API_CLIENT_ID%~${CMS_API_CLIENT_ID}~g; \
s~%LOGS_LOCATION%~${LOGS_LOCATION}~g; \
s~%CMS_API_SECRET%~${CMS_API_SECRET}~g; \
s~%NEW_RELIC_APP_NAME%~${NEW_RELIC_APP_NAME}~g; \
s~%BUILD_NUMBER%~${BUILD_NUMBER}~g; \
s~%DEPLOY_ENV%~${DEPLOY_ENV}~g; \
s~%CDN_URL%~${CDN_URL}~g; \
s~%VIDEO_HUB_ENV%~${VIDEO_HUB_ENV}~g; \
s~%VIDEO_HUB_PROFILE%~${VIDEO_HUB_PROFILE}~g; \
s~%VIDEO_HUB_API_KEY%~${VIDEO_HUB_API_KEY}~g; \
s~%SPORT_API_URL%~${SPORT_API_URL}~g; \
s~%SPORT_API_KEY%~${SPORT_API_KEY}~g; \
s~%WEATHER_API_KEY%~${WEATHER_API_KEY}~g; \
s~%NEW_RELIC_LICENSE_KEY%~${NEW_RELIC_LICENSE_KEY}~g" \
./univision-fe-task.json.tpl > univision-fe-${BUILD_NUMBER}.json

echo "===============================Register the task definition in AWS============================"
aws --region=us-east-1 --profile=$ENVIRONMENT \
	ecs register-task-definition \
    	--family ${TASK_FAMILY} \
        --cli-input-json file://univision-fe-${BUILD_NUMBER}.json

echo "=================Get the task revision and the desired task count for the service============="
TASK_REVISION=`aws --region=us-east-1 --profile=$ENVIRONMENT ecs describe-task-definition --task-definition ${TASK_FAMILY} | jq '.taskDefinition.revision'`
DESIRED_COUNT=`aws --region=us-east-1 --profile=$ENVIRONMENT ecs describe-services --cluster ${CLUSTER_NAME} --service ${SERVICE_NAME} | jq '.services[0].desiredCount'`
if [[ ${DESIRED_COUNT} = "0" ]]; then
    DESIRED_COUNT="1"
fi

echo "================Update the service with the new task definition and desired count============="
aws --region=us-east-1 \
	--profile=$ENVIRONMENT \
	ecs update-service \
		--cluster ${CLUSTER_NAME} \
		--service ${SERVICE_NAME} \
		--desired-count ${DESIRED_COUNT} \
        --task-definition ${TASK_FAMILY}:${TASK_REVISION}
