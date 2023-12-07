import Store from '../../../store/store';
import setPageData from '../../../store/actions/page-actions';
import paginateWidget from './pagination';
import request from '../request';

jest.mock('../request', () => jest.fn());
jest.mock('../../datetime', () => ({
  getTimestamp: () => 'test',
}));

const pageUri = 'http://localhost/';

describe('pagination', () => {
  beforeEach(() => {
    Store.dispatch(setPageData({
      config: {
        syndicator: {
          widget: 'https://syndicator.univision.com/web-api/widget',
        },
      },
    }));
  });

  it('should build the right URL for the request', async () => {
    await paginateWidget({ id: 1 }, { offset: 10, limit: 20, pageUri });
    expect(request).toHaveBeenCalledWith({
      uri: 'https://syndicator.univision.com/web-api/widget?wid=1&offset=10&limit=20&url=http://localhost/&mrpts=test',
    });
  });
  it('should build the right URL for the request in nextjs', async () => {
    await paginateWidget({ id: 1 }, {
      offset: 10,
      limit: 20,
      pageUri,
    });
    expect(request).toHaveBeenCalledWith({
      uri: 'https://syndicator.univision.com/web-api/widget?wid=1&offset=10&limit=20&url=http://localhost/&mrpts=test',
    });
  });
  it('should build the right URL for the request with default limit value', async () => {
    await paginateWidget({ id: 1 }, { offset: 10 });
    expect(request).toHaveBeenCalledWith({
      uri: 'https://syndicator.univision.com/web-api/widget?wid=1&offset=10&limit=20&url=http://localhost/&mrpts=test',
    });
  });
});
