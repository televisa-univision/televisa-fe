import widgetMapping from '.';

describe('widgetMapping', () => {
  it('should import all mappings', async () => {
    const imports = Object.values(widgetMapping);
    const promises = imports.map(mapping => Promise.resolve(mapping.loader));
    expect(Promise.all(promises)).resolves.toHaveLength(imports.length);
  });
});
