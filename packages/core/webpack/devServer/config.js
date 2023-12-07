import defaultConfiguration from './defaults.json';

const configuration = defaultConfiguration;

// https://github.com/webpack-contrib/webpack-serve/issues/81#issuecomment-378469110
// export default const configuration = ...
module.exports = configuration;

if (process.env.PORT) {
  configuration.webserver.port = process.env.PORT;
}
