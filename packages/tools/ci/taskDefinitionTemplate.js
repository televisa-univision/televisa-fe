const getKey = require('@univision/fe-utilities/cjs/helpers/object/getKey');
const variables = require('./variables.json');

const taskDefinition = (awsConfig) => ({
  family: awsConfig.getTaskFamily(),
  containerDefinitions: [
    {
      name: awsConfig.getContainerName(),
      image: `${awsConfig.getImageName()}:${process.env.CIRCLE_SHA1}`,
      cpu: 512,
      memory: 1536,
      portMappings: [
        {
          containerPort: 8080,
          hostPort: awsConfig.getMappingPort(8080),
          protocol: "HTTP"
        },
        {
          containerPort: 8081,
          hostPort: awsConfig.getMappingPort(8081),
          protocol: "HTTP"
        }
      ],
      essential: true,
      environment: (function () {
        return Object.keys(variables).map(variable => {
          const varData = variables[variable];
          if (varData.inTask) {
            const varKey = getKey(varData, 'keyOverride', variable)
            return { name: variable, value: process.env[varKey] };
          }
        }).filter(variable => variable !== undefined);
      })(),
      logConfiguration: {
        logDriver: "awslogs",
        options: {
          "awslogs-group": awsConfig.getLogGroup(),
          "awslogs-region": awsConfig.getRegion(),
          "awslogs-stream-prefix": "fe-webapp"
        }
      },
      disableNetworking: false,
      privileged: true
    }
  ]
});

module.exports = taskDefinition;
