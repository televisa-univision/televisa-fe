const path = require("path");
const PAGE_BUNDLE_PATH = "/*page_bundle_path_placeholder*/";
const HANDLER_FACTORY_PATH = "/*handler_factory_path_placeholder*/";

const lambdaHandlerWithFactory = `
  const page = require("${PAGE_BUNDLE_PATH}");
  const handlerFactory = require("${HANDLER_FACTORY_PATH}");

  module.exports.render = async (event, context) => {
    try {
      const handler = handlerFactory(page);
      const responsePromise = handler(event, context);
      return responsePromise;
    } catch (e) {
      console.log('test error' + e.message);
    }
  };
`;

module.exports = (jsHandlerPath, customHandlerPath) => {
  // convert windows path to POSIX
  jsHandlerPath = jsHandlerPath.replace(/\\/g, "/");
  const basename = path.basename(jsHandlerPath, ".js");
  let levels = '../';
  // get relative path to custom handler
  if (customHandlerPath) {
    let pathDepth = jsHandlerPath.split("/").length - 2;
    if (pathDepth > 0) {
      customHandlerPath = customHandlerPath.replace("./", "");
      while (pathDepth > 0) {
        levels = `../${levels}`;
        pathDepth -= 1;
      }
    }
    customHandlerPath = `${levels}${customHandlerPath}`;
  }

  return lambdaHandlerWithFactory
    .replace(PAGE_BUNDLE_PATH, `./${basename}.original.js`)
    .replace(HANDLER_FACTORY_PATH, customHandlerPath);
};
