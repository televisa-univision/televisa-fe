import * as pageCategories from '../../constants/pageCategories';
import Store from '../../store/store';
import setPageData from '../../store/actions/page-actions';

import getHeaderConf from './headerConf';
import mockData from './data/mock.json';

jest.mock('./data/famosos/mapping', () => ({
  entretenimiento: { data: 'value' },
}));

describe('getHeaderConf suite', () => {
  it('should get the generic conf by default', () => {
    const conf = getHeaderConf({}, '');
    expect(conf).toEqual(expect.any(Object));
    expect(conf.title).toBeDefined();
  });
  it('should get the generic conf when a page category is not found', () => {
    const data = mockData.univision;
    const pageCategory = pageCategories.MADDEN_CHAMPIOSHIP_SERIES;
    Store.dispatch(setPageData({ data, pageCategory }));
    const conf = getHeaderConf(data, pageCategory, Store);
    expect(conf).toEqual(expect.any(Object));
    expect(conf.title).toBeDefined();
    expect(conf.title.name).toBe(mockData.univision.title);
  });
  it('should get the univision conf', () => {
    const data = mockData.univision;
    const pageCategory = pageCategories.UNIVISION;
    Store.dispatch(setPageData({ data, pageCategory }));
    const conf = getHeaderConf(data, pageCategory, Store);
    expect(conf).toEqual(expect.any(Object));
    expect(conf.title.name).toBe(mockData.univision.title);
  });
  it('should get the noticias content conf', () => {
    const data = mockData.noticiasContent;
    const pageCategory = pageCategories.NEWS;
    Store.dispatch(setPageData({ data, pageCategory }));
    const conf = getHeaderConf(data, pageCategory, Store);

    expect(conf.activePath).toBe(mockData.noticiasContent.uri);
  });
  it('should return an empty conf when the nav is not a function', () => {
    const data = mockData.famosos;
    const pageCategory = pageCategories.ENTERTAINMENT;
    Store.dispatch(setPageData({ data, pageCategory }));
    const conf = getHeaderConf(data, pageCategory, Store);
    expect(conf).toBeNull();
  });
});
