import Store from '@univision/fe-commons/dist/store/store';
import * as fetchApi from '@univision/fe-commons/dist/utils/api/fetchApi';
import searchActionDefinitions from './searchActionDefinitions';
import config from '.';

const query = 'test';
const dateFilter = 'today';
const filter = 'all';
const page = '1';
const sort = 'relevance';

Store.getState = jest.fn(() => ({
  search: {
    query,
    dateFilter,
    filter,
    page,
    sort,
  },
}));

fetchApi.fetchSearchApi = jest.fn();

/** @test {searchActionDefinitions} */
describe('searchActionDefinitions tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('searchActionDefinitions query, dateFilter, filter, pageNumber and buildParams', () => {
    it('should return the right query, dateFilter, filter, pageNumber ', () => {
      expect(searchActionDefinitions.query).toBe(query);
      expect(searchActionDefinitions.filter).toBe(filter);
      expect(searchActionDefinitions.dateFilter).toBe(dateFilter);
      expect(searchActionDefinitions.pageNumber).toBe(page);
      expect(searchActionDefinitions.pageSize).toBe(config.settings.pageSize);
      expect(searchActionDefinitions.buildParams()).toEqual({
        d: dateFilter,
        p: page,
        q: query,
        t: filter,
        o: sort,
        s: config.settings.pageSize,
      });
    });

    it('should return the right params from URL query', () => {
      Store.getState.mockReturnValue({
        page: {
          requestParams: {
            o: 'date',
            t: 'artcile',
            d: 'year',
            q: 'test from query',

          },
        },
      });
      expect(searchActionDefinitions.buildParams()).toEqual({
        o: 'date',
        t: 'artcile',
        d: 'year',
        q: 'test from query',
        p: undefined,
        s: 21,
      });
    });

    it('should returns page size 20 on SSR', () => {
      delete global.window;
      expect(searchActionDefinitions.buildParams().s).toBe(10);
    });
  });

  describe('searchActionDefinitions extractor', () => {
    it('should return empty array if not items in data', () => {
      const data = searchActionDefinitions.extractor(null);
      expect(data).toHaveProperty('results', []);
    });

    it('should return 0 if no total pages in data', () => {
      const data = searchActionDefinitions.extractor(null);
      expect(data).toHaveProperty('totalPages', 0);
    });

    it('should return 0 if no results in data', () => {
      const data = searchActionDefinitions.extractor(null);
      expect(data).toHaveProperty('totalResults', 0);
    });
  });

  describe('searchActionDefinition fetchResults', () => {
    it('should return function if able to build params', () => {
      const buildParamsSpy = jest.spyOn(searchActionDefinitions, 'buildParams');
      const fetchReults = searchActionDefinitions.fetchResults();
      expect(fetchReults).toHaveProperty('payload');
      expect(fetchReults).toHaveProperty('meta', searchActionDefinitions);
      expect(buildParamsSpy).toHaveBeenCalled();
      expect(fetchApi.fetchSearchApi).toHaveBeenCalled();
    });
  });
});
