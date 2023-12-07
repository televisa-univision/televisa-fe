import fs from 'fs';
import config from './config';
import { generateSchemas } from './generateSchemas';
import introspectionQuery from './introspectionQuery';
import schemaJsonExample from './example-schema.json';
import cconsole from '../src/utils/console';


jest.mock('./introspectionQuery');
jest.mock('fs');

let generatorConfig;

describe('generateSchemas', () => {
  beforeEach(() => {
    generatorConfig = JSON.parse(JSON.stringify(config));
  });

  it('should generate an error if services metadata is invalid', () => {
    return expect(generateSchemas({ graphqlServicesMeta: [{}] })).rejects.toBeInstanceOf(Error);
  });

  it('should print an error if introspection schema is invalid ', async () => {
    expect.assertions(1);

    const mockConsole = jest.spyOn(cconsole, 'error').mockImplementationOnce(() => {});
    introspectionQuery.mockImplementationOnce(() => Promise.resolve({ data: 'Invalid Schema' }));
    await generateSchemas(generatorConfig);

    expect(mockConsole).toHaveBeenCalled();
    mockConsole.mockReset();
  });

  it('should create .graphql file if introspection schema is valid ', async () => {
    expect.assertions(2);

    introspectionQuery.mockImplementationOnce(() => Promise.resolve({ data: schemaJsonExample }));
    fs.writeFile.mockImplementationOnce((x, y, callback) => { callback(); });
    const mockConsole = jest.spyOn(cconsole, 'success').mockImplementationOnce(() => {});
    await generateSchemas(generatorConfig);

    expect(fs.writeFile).toHaveBeenCalled();
    expect(mockConsole).toHaveBeenCalled();
    mockConsole.mockReset();
  });

  it('should log an error if writing .graphql file fails ', async () => {
    expect.assertions(2);

    introspectionQuery.mockImplementationOnce(() => Promise.resolve({ data: schemaJsonExample }));
    fs.writeFile.mockImplementationOnce((x, y, callback) => { callback(new Error('Write file Test Error')); });
    const mockConsole = jest.spyOn(cconsole, 'error').mockImplementationOnce(() => {});
    await generateSchemas(generatorConfig);
    expect(fs.writeFile).toHaveBeenCalled();
    expect(mockConsole).toHaveBeenCalled();
    mockConsole.mockReset();
  });
});
