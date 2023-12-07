# univision-fe-graphql-services

GraphQL utility package with queries for Univision graphql service.

## Features

* Queries, Mutations, Fragments and Templates (to build queries)
* Script to get the latest graphql service schema
* Server Mock build with the graphql schema

## Purposes

The purpose of this package is to have in a single place all the graphql operations we can do to Univision GraphQL service. Also, to be able to test those operations in a reliable way ensuring an up to date synchronization between the operations we have locally and the operations the service can accept.

Another of the purposes of this package is to expose a mock server for the Univision GraphQL service. As a requirement, that mock server needs to be synchronized with the online services. The mock servers can be used internally for testing or externally in the development process of other applications using this package.

## Scripts

* `yarn schemas` - This script will download the schema.json of the Univision graphql service (configured in *./scripts/config.js*) and store it inside *./serviceMock/schemas* folder using SDL syntax. That *univision.graphql* file is used to build the mock server.
* `NODE_ENV=production yarn build` - If you need to test this package in the React Native apps, this script will build the package so you can publish a beta version of it with `yarn publish --tag beta`. Please add a suffix to the package version to distinguish it from Release versions: `<major>.<minor>.<patch>-rn.<feature name>.<sequence number>`

## Conventions

### For new GraphQL operation we should

Define the operation in Queries or Mutations folder inside *src/requests*. Once you have created the operation file you must create a new test case for that operation. To do that test you must query the Mock Server with the new operation. That mock server will have the same interface as the real service has because they will be sharing the same schema.graphql.

Please notice that you should provide a test for that operation even if the test coverage is 100% after adding the new operation.
