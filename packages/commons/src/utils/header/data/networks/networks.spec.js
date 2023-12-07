import unimas from './unimas';
import galavision from './galavision';

describe('Unimas data object', () => {
  it('should return default data', () => {
    const data = unimas();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});

describe('galavision data object', () => {
  it('should return default data', () => {
    const data = galavision();
    expect(data.title).toBeDefined();
    expect(data.title.name).toBeNull();
    expect(data.title.logo).toEqual(expect.any(String));
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});
