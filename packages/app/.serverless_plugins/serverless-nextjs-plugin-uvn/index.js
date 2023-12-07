"use strict";

const ServerlessNextjsPlugin = require("serverless-nextjs-plugin");
const build = require("./lib/build");

/**
 * Extending nexjs pluging to decouple next build from deploy
 * https://github.com/danielcondemarin/serverless-next.js/tree/master/packages/serverless-plugin
 */
class ServerlessNextJsPluginExtended extends ServerlessNextjsPlugin {
  constructor(serverless, options) {
    super(serverless, options); // call the super class constructor and pass in the name parameter

    this.build = build.bind(this);
    this.hooks = {
      "before:offline:start": this.hookWrapper.bind(this, this.build),
      "before:package:initialize": this.hookWrapper.bind(this, this.build),
      "before:deploy:function:initialize": this.hookWrapper.bind(
        this,
        this.build
      ),
      "before:aws:package:finalize:mergeCustomProviderResources": this.hookWrapper.bind(
        this,
        this.addCustomStackResources
      ),
      "after:package:createDeploymentArtifacts": this.hookWrapper.bind(
        this,
        this.removePluginBuildDir
      ),
      "after:aws:deploy:deploy:checkForChanges": this.hookWrapper.bind(
        this,
        this.checkForChanges
      ),
      "after:aws:deploy:deploy:uploadArtifacts": this.hookWrapper.bind(
        this,
        this.uploadStaticAssets
      ),
      "after:aws:info:displayStackOutputs": this.hookWrapper.bind(
        this,
        this.printStackOutput
      )
    };
  }
}

module.exports = ServerlessNextJsPluginExtended;

