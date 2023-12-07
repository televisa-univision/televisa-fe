import delicioso from '.';

describe('delicioso data object', () => {
  it('should return default data', () => {
    const data = delicioso();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
});
