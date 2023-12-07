const fs = require('fs');
const path = require('path');
const { printSchema, buildClientSchema } = require('graphql');
const cconsole = require('../src/utils/console.js');
const instrospectionQuery = require('./introspectionQuery');

/**
 * Generate schema.graphql file per service
 * @param {Object} object containing schema generation configuration
 */
const generateSchemas = async ({
  graphqlServicesMeta,
  schemasPath,
}) => {
  graphqlServicesMeta.forEach(({ name, graphqlUrl }, i) => {
    if (!name || !graphqlUrl) {
      throw new Error('\x1b[31m', `Please provide a valid 'name' and 'graphQlUrl' properties for graphqlService number ${i}`);
    }
  });

  const promises = graphqlServicesMeta.map(({ name, graphqlUrl }) => {
    return instrospectionQuery(graphqlUrl).then(({ data: serviceSchemaJson }) => {
      const serviceSchema = buildClientSchema(serviceSchemaJson);
      const serviceSchemaPath = path.resolve(__dirname, `${schemasPath}/${name}.graphql`);

      fs.writeFile(
        serviceSchemaPath,
        printSchema(serviceSchema),
        (err) => {
          if (err) {
            cconsole.error(`Writing failed: ${name} service to path: ${serviceSchemaPath}`);
            return;
          }
          cconsole.success(`Schema written for: ${name} service \n\t ${serviceSchemaPath}`);
        },
      );
    }).catch((err) => {
      cconsole.error(`Download failed: ${name} service \n\t Error: ${err.message} `);
    });
  });

  await Promise.all(promises);
};


module.exports = {
  generateSchemas,
};
