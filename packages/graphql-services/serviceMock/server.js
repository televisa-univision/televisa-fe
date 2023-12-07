import {
  mockServer,
} from 'graphql-tools';
import buildMockServer from './buildMockServer';
import schema from './schemas/univision.graphql';
import schemaMock from './schemaMock';

const graphqlMockServer = mockServer(schema, schemaMock);

export default buildMockServer(graphqlMockServer);
