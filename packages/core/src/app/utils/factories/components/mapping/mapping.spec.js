import componentsMapping from '.';

describe('Components mapping', () => {
  it('should import all mappings', async () => {
    const imports = Object.values(componentsMapping);
    const promises = imports.map(mapping => mapping());
    await Promise.all(promises).then((result) => {
      expect(result.length).toBe(imports.length);
    }).catch((error) => {
      fail(error);
    });
  });
});
