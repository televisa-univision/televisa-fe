{
  "family": "%TASK_FAMILY%",
  "containerDefinitions": [
    {
      "name": "%CONTAINER_NAME%",
      "image": "%ECR_URL%/%ECR_REPO%:%BUILD_NUMBER%",
      "cpu": 512,
      "memory": 2048,
      "portMappings": [
        {
          "containerPort": 8080,
          "hostPort": 0,
          "protocol": "HTTP"
        },
        {
          "containerPort": 8081,
          "hostPort": 0,
          "protocol": "HTTP"
        }
      ],
      "essential": true,
      "environment": [
        {
          "name": "ENVIRONMENT",
          "value": "%ENVIRONMENT%"
        },
        {
          "name": "NODE_ENV",
          "value": "%NODE_ENV%"
        },
        {
          "name": "SENTRY_DSN",
          "value": "%SENTRY_DSN%"
        },
        {
          "name": "SENTRY_ENVIRONMENT",
          "value": "%SENTRY_ENVIRONMENT%"
        },
        {
          "name": "NEW_RELIC_APP_NAME",
          "value": "%NEW_RELIC_APP_NAME%"
        },
        {
          "name": "NEW_RELIC_LICENSE_KEY",
          "value": "%NEW_RELIC_LICENSE_KEY%"
        },
        {
          "name": "NEW_RELIC_LOG_LEVEL",
          "value": "%NEW_RELIC_LOG_LEVEL%"
        },
        {
          "name": "CMS_API_URL",
          "value": "%CMS_API_URL%"
        },
        {
          "name": "CMS_API_CLIENT_ID",
          "value": "%CMS_API_CLIENT_ID%"
        },
        {
          "name": "CMS_API_SECRET",
          "value": "%CMS_API_SECRET%"
        },
        {
          "name": "BUILD_NUMBER",
          "value": "%BUILD_NUMBER%"
        },
        {
          "name": "DEPLOY_ENV",
          "value": "%DEPLOY_ENV%"
        },
        {
          "name": "CDN_URL",
          "value": "%CDN_URL%"
        },
        {
          "name": "FEATURES",
          "value": "%FEATURES%"
        },
        {
          "name": "VIDEO_HUB_ENV",
          "value": "%VIDEO_HUB_ENV%"
        },
        {
          "name": "VIDEO_HUB_PROFILE",
          "value": "%VIDEO_HUB_PROFILE%"
        },
        {
          "name": "VIDEO_HUB_API_KEY",
          "value": "%VIDEO_HUB_API_KEY%"
        },
        {
          "name": "SPORT_API_URL",
          "value": "%SPORT_API_URL%"
        },
        {
          "name": "SPORT_API_KEY",
          "value": "%SPORT_API_KEY%"
        },
        {
          "name": "WEATHER_API_KEY",
          "value": "%WEATHER_API_KEY%"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "%AWS_LOG_GROUP%",
          "awslogs-region": "%AWS_REGION%",
          "awslogs-stream-prefix": "fe-webapp"
        }
      },
      "disableNetworking": false,
      "privileged": true
    }
  ]
}
