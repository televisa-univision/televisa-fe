const getKey = require('@univision/fe-utilities/cjs/helpers/object/getKey');
const config = require('./environmentEnvVars.json');

class AWSConfig {
    constructor() {
    if (process.env.CIRCLE_BRANCH && config[process.env.CIRCLE_BRANCH]) {
      this.data = config[process.env.CIRCLE_BRANCH];
      this.hasDeployEnv = true;
    } else {
      this.hasDeployEnv = false;
    }
  }

  getMappedEnvVar(key) {
    return process.env[getKey(this.data, key, '')];
  }

  getAccessKeyId() {
    return this.getMappedEnvVar('AWS_ACCESS_KEY_ID');
  }

  getAccountId() {
    return this.getMappedEnvVar('AWS_ACCOUNT_ID');
  }

  getSecretAccessKey() {
    return this.getMappedEnvVar('AWS_SECRET_ACCESS_KEY');
  }

  getEcrRepoName() {
    return getKey(this.data, 'AWS_ECR_REPO_NAME', null);
  }

  getServiceName() {
    return getKey(this.data, 'AWS_ECS_SERVICE_NAME', null);
  }

  getClusterName() {
    return getKey(this.data, 'AWS_ECS_CLUSTER_NAME', null);
  }

  getLogGroup() {
    return getKey(this.data, 'AWS_LOG_GROUP', null);
  }

  getRegion() {
    return getKey(this.data, 'AWS_REGION', process.env.AWS_DEFAULT_REGION);
  }

  getTaskFamily() {
    return getKey(this.data, 'AWS_ECS_TASK_FAMILY', null);
  }

  getContainerName() {
    return getKey(this.data, 'AWS_ECS_CONTAINER', null);
  }

  getMappingPort(port) {
    const version = getKey(this.data, 'AWS_TASK_DEF_VERSION', 2);
    if (version === 1) {
      return port;
    }
    return 0;
  }

  getImageName() {
    return `${this.getAccountId()}.dkr.ecr.${this.getRegion()}.amazonaws.com/${this.getEcrRepoName()}`;
  }
};

module.exports = AWSConfig;
