import serverConfig from './config';

const { devserver: devServer } = serverConfig.webpack;


/**
 * Adds `webpack-serve` settings to webpack configuration.
 * @param {Object} configuration - base webpack configuration
 * @returns {Object}
 */
export function addDevServerConfiguration(configuration) {
  return {
    ...configuration,
    serve:
      {
        host: devServer.host,
        port: devServer.port,
        clipboard: false,
        devMiddleware:
          {
            // https://github.com/webpack-contrib/webpack-serve/issues/95
            publicPath: configuration.output.publicPath,
            headers: { 'Access-Control-Allow-Origin': '*' },
          },
      },
  };
}

/**
 * Modifies webpack configuration to get all files
 * from webpack development server.
 * @param {Object} configuration - base webpack configuration
 * @returns {Object}
 */
export function setDevFileServer(configuration) {
  return {
    ...configuration,
    output:
      {
        ...configuration.output,
        publicPath: `http://${devServer.host}:${devServer.port}${configuration.output.publicPath}`,
      },
  };
}
