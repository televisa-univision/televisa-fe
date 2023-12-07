const { generateSchemas } = require('./generateSchemas');
const cconsole = require('../src/utils/console');
const config = require('./config');

generateSchemas(config).catch((err) => { cconsole.error(`Error: ${err.message}`); });
