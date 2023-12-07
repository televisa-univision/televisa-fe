const nextBuild = require("next/dist/build").default;
const path = require("path");
const fse = require("fs-extra");
const parseNextConfiguration = require("serverless-nextjs-plugin/lib/parseNextConfiguration");
const logger = require("serverless-nextjs-plugin/utils/logger");
const copyBuildFiles = require("serverless-nextjs-plugin/lib/copyBuildFiles");
const getNextPagesFromBuildDir = require("./getNextPagesFromBuildDir");
const rewritePageHandlers = require("./rewritePageHandlers");

const overrideTargetIfNotServerless = nextConfiguration => {
  const { target } = nextConfiguration;
  if (target !== "serverless") {
    logger.log(`Target "${target}" found! Overriding it with serverless`);
    nextConfiguration.target = "serverless";
  }
};

module.exports = async function() {
  const pluginBuildDir = this.pluginBuildDir;
  const nextConfigDir = pluginBuildDir.nextConfigDir;

  const [pageConfig, customHandler, routes] = this.getPluginConfigValues(
    "pageConfig",
    "customHandler",
    "routes"
  );

  const { nextConfiguration } = await parseNextConfiguration(nextConfigDir);

  overrideTargetIfNotServerless(nextConfiguration);

  logger.log("Getting pages from build ...");
  await copyBuildFiles(
    path.join(nextConfigDir, nextConfiguration.distDir),
    pluginBuildDir
  );

  const nextPages = await getNextPagesFromBuildDir(pluginBuildDir.buildDir, {
    customHandler,
    pageConfig,
    routes,
    additionalExcludes: customHandler
      ? [path.basename(customHandler)]
      : undefined
  });

  await rewritePageHandlers(nextPages, customHandler);

  nextPages.forEach(page => {
    const functionName = page.functionName;
    this.serverless.service.functions[functionName] =
      page.serverlessFunction[functionName];
  });

  this.serverless.service.setFunctionNames();

  return nextPages;
};
