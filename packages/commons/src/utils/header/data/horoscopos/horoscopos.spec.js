import Store from '../../../../store/store';
import setPageData from '../../../../store/actions/page-actions';

import horoscopos from '.';

import horoscoposMockData from './__mocks__/horoscopos.data.json';

describe('horoscopos data object', () => {
  it('should return default data', () => {
    const data = horoscopos();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });

  it('should match the correct home for this section (`/horoscopos`)', () => {
    Store.dispatch(setPageData({ data: horoscoposMockData }));

    const data = horoscopos(horoscoposMockData);

    expect(data.title.link).toMatch(/\/horoscopos$/);
  });
});
