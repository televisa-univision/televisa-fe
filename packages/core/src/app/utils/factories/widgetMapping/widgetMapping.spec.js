import widgetMapping, { setSSRModuleHint } from './index';

describe('widgetMapping', () => {
  it('should import all mappings', async () => {
    const imports = Object.values(widgetMapping);
    const promises = imports.map(mapping => mapping.loader());
    await Promise.all(promises).then((result) => {
      expect(result.length).toBe(imports.length);
    }).catch((error) => {
      fail(error);
    });
  });
});

describe('setSSRModuleHint', () => {
  it('should set the module name using string', () => {
    const widgets = { test: {} };
    setSSRModuleHint(widgets, 'test');
    expect(widgets).toEqual({
      test: {
        modules: ['test'],
      },
    });
  });

  it('should set the module name using array', () => {
    const widgets = { test: {} };
    setSSRModuleHint(widgets, ['test']);
    expect(widgets).toEqual({
      test: {
        modules: ['test'],
      },
    });
  });
});
