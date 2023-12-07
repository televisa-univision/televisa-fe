import entretenimiento from '.';

describe('entretenimiento data object', () => {
  it('should return default data', () => {
    const data = entretenimiento();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should render correctly when this is a vertical landing page', () => {
    const data = entretenimiento({ uri: '/entretenimiento' });
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});
