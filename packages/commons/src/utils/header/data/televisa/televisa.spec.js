import televisa from '.';

import lasestrellas from '../lasestrellas';

describe('lasestrellas data object', () => {
  it('should return default data', () => {
    const data = televisa();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for lasestrellas header', () => {
    const data = lasestrellas();
    expect(data).toBeDefined();
  });
});
