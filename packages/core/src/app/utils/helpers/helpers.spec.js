import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';
import * as clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import * as contentFetch from '@univision/fe-commons/dist/utils/api/content/fetch';
import * as globalNavLinks from '@univision/fe-components-base/dist/components/Navigation/GlobalNav/data/links';

import * as helpers from './helpers';

jest.mock('@univision/fe-commons/dist/config/features/content', () => ({
  isSpaEnabled: () => true,
  shouldForceSpa: () => false,
}));

const mockSharingOptions = {
  facebook: { url: 'http://uni.vi/s9sh100K6rz' },
  twitter: { url: 'http://uni.vi/s9sh100K6rz' },
  mail: { body: 'test content http://uni.vi/s9sh100K6rz' },
  whatsapp: { url: 'http://uni.vi/s9sh100K6rz' },
};

jest.mock('@univision/fe-commons/dist/utils/api/content/fetch', () => jest.fn());

describe('getSharingValues', () => {
  it('should change the sharing option urls if shortUrl is defined', () => {
    const slideData = {
      caption: 'test',
      image: {
        uid: '123',
      },
      shortUrl: 'http://uni.vi/s9sh100K6tw',
    };
    const response = helpers.getSharingValues(mockSharingOptions, slideData);
    expect(response.facebook.url).toEqual(slideData.shortUrl);
    expect(response.twitter.url).toEqual(slideData.shortUrl);
  });
  it('should works if mail is empty', () => {
    mockSharingOptions.mail = {};
    const slideData = {
      caption: 'test',
      image: {
        uid: '123',
      },
      shortUrl: 'http://uni.vi/s9sh100K6tw',
    };
    const response = helpers.getSharingValues(mockSharingOptions, slideData);
    expect(response.facebook.url).toEqual(slideData.shortUrl);
    expect(response.twitter.url).toEqual(slideData.shortUrl);
  });
});

describe('cleanSearchQuery', () => {
  it('should return clean query', () => {
    expect(helpers.cleanSearchQuery('Los beatles la banda de los mejores en su tiempo')).toEqual('beatles banda mejores tiempo');
    expect(helpers.cleanSearchQuery('the beatles is the best band of all time')).toEqual('beatles best band time');
    expect(helpers.cleanSearchQuery('la nfl')).toEqual('nfl');
    expect(helpers.cleanSearchQuery('the nfl')).toEqual('nfl');
    expect(helpers.cleanSearchQuery(null)).toEqual('');
  });
});

describe('preFetchContent', () => {
  beforeEach(() => {
    setPageData({});
    jest.resetAllMocks();
  });
  it('should do nothing if not SPA', () => {
    Store.dispatch(setPageData({
      isSpa: false,
    }));
    expect(helpers.prefetchContent()).toBe(null);
  });

  it('should try to prefetch for SPA', () => {
    Store.dispatch(setPageData({
      isSpa: true,
    }));
    expect(helpers.prefetchContent()).not.toBe(null);
  });

  it('should fetch the global nav links', () => {
    Store.dispatch(setPageData({
      isSpa: true,
    }));
    expect(helpers.prefetchContent()).toContain('/noticias');
    expect(helpers.prefetchContent()).toContain('/radio');
  });

  it('should not fetch the global nav links if its an invalid array', () => {
    Store.dispatch(setPageData({
      isSpa: true,
    }));
    spyOn(globalNavLinks, 'default').and.returnValue(null);
    expect(helpers.prefetchContent()).not.toContain('/radio');
  });

  it('should fetch the sub nav links', () => {
    Store.dispatch(setPageData({
      navigationCount: 0,
      isSpa: true,
      navData: {
        links: {
          primary: [{
            link: '/subnav',
          }, {
            link: '/radio/subnav',
          }],
        },
      },
    }));
    expect(helpers.prefetchContent()).toContain('/radio/subnav');
  });

  it('should fetch maximum 5 sub nav links', () => {
    Store.dispatch(setPageData({
      navigationCount: 0,
      isSpa: true,
      navData: {
        links: {
          primary: [
            {
              link: '/radio/subnav-1',
            },
            {
              link: '/radio/subnav-2',
            },
            {
              link: '/radio/subnav-3',
            },
            {
              link: '/radio/subnav-4',
            },
            {
              link: '/radio/subnav-5',
            },
            {
              link: '/radio/subnav-6',
            },
          ],
        },
      },
    }));
    expect(helpers.prefetchContent()).toContain('/radio/subnav-5');
    expect(helpers.prefetchContent()).not.toContain('/subnav-6');
  });

  it('it should fetch the links of the first meaningful widget.', () => {
    const tempStore = {
      navigationCount: 0,
      isSpa: true,
      data: {
        type: 'section',
        widgets: [
          {
            type: 'Test',
            contents: [],
          },
          {
            type: 'Test',
            contents: [
              { uri: '/radio/content-1' },
              { uri: '/no-radio/content-2' },
            ],
          },
          {
            type: 'Test-2',
            contents: [
              { uri: '/radio/content-2' },
            ],
          },
        ],
      },
    };
    Store.dispatch(setPageData(tempStore));
    const fetchedLinks = helpers.prefetchContent();
    expect(fetchedLinks).toContain('/radio/content-1');
    expect(fetchedLinks).toContain('/no-radio/content-2');
    expect(fetchedLinks).not.toContain('/radio/content-2');
    // Out of SPA
    Store.dispatch(setPageData({ ...tempStore, navigationCount: 20000 }));
    const fetchedLinks2 = helpers.prefetchContent();
    expect(fetchedLinks2).not.toContain('/no-radio/content-2');
  });

  it('it should fetch the links of the first meaningful widget + the non fully meaningful widgets.', () => {
    Store.dispatch(setPageData({
      navigationCount: 0,
      isSpa: true,
      data: {
        type: 'section',
        widgets: [
          {
            type: 'AllBannerMovingBanner',
            contents: [
              { uri: '/radio/content-2' },
            ],
          },
          {
            type: 'Test',
            contents: [
              { uri: '/radio/content-1' },
            ],
          },
        ],
      },
    }));
    const fetchedLinks = helpers.prefetchContent();
    expect(fetchedLinks).toContain('/radio/content-1');
    expect(fetchedLinks).toContain('/radio/content-2');
  });

  it('it not should fetch the links of the first meaningful widget if the page is not a section.', () => {
    Store.dispatch(setPageData({
      navigationCount: 0,
      isSpa: true,
      data: {
        type: 'article',
        widgets: [
          {
            type: 'Test',
            contents: [
              { uri: '/content-1' },
            ],
          },
        ],
      },
    }));
    const fetchedLinks = helpers.prefetchContent();
    expect(fetchedLinks).not.toContain('/content-1');
  });

  it('it not should fetch the links if content has a type `externallink`', () => {
    Store.dispatch(setPageData({
      navigationCount: 0,
      isSpa: true,
      data: {
        type: 'section',
        widgets: [{
          contents: [{
            type: 'externallink',
            uri: '/content-1',
          }],
        }],
      },
    }));
    const fetchedLinks = helpers.prefetchContent();
    expect(fetchedLinks).not.toContain('/content-1');
  });

  it('should handle any unexpected exception.', () => {
    const error = new Error('Test');
    Store.dispatch(setPageData({
      navigationCount: 0,
      isSpa: true,
    }));
    const loggingMock = jest.spyOn(clientLogging, 'default');
    jest.spyOn(contentFetch, 'default').mockImplementation(() => { throw error; });
    helpers.prefetchContent();
    expect(loggingMock).toHaveBeenCalledWith(
      new Error(`prefetchContent method error - ${error.message}`),
      'prefetchContent method error'
    );
  });

  it('should fetch links from new header', () => {
    Store.dispatch(setPageData({
      navigationCount: 0,
      isSpa: true,
      data: {
        type: 'section',
      },
    }));
    Store.dispatch(setHeaderConf({
      links: [
        {
          link: '/radio/new-header-link',
        },
      ],
    }));
    const fetchedLinks = helpers.prefetchContent();
    expect(fetchedLinks).toContain('/radio/new-header-link');
  });

  it('should fetch links from new header on article', () => {
    Store.dispatch(setPageData({
      navigationCount: 0,
      isSpa: true,
      data: {
        type: 'article',
      },
    }));
    Store.dispatch(setHeaderConf({
      links: [
        {
          link: '/radio/new-header-link',
        },
      ],
    }));
    const fetchedLinks = helpers.prefetchContent();
    expect(fetchedLinks).toContain('/shows');
  });
});
