import * as bodyScrollLock from 'body-scroll-lock';

import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Store from '@univision/fe-commons/dist/store/store';
import { TUDN_MVPD_POPUP, TUDN_MVPD_POPUP_FORM } from '@univision/fe-deportes/dist/constants';
import * as popUpActions from '@univision/fe-commons/dist/store/actions/popups-actions';

import { PIP_PLAYER_ID, FREE_PREVIEW_POPUP } from '@univision/fe-commons/dist/constants/video';
import * as helpers from '.';
import { mockResponse } from './mockData.json';

jest.mock('body-scroll-lock', () => ({
  disableBodyScroll: jest.fn(),
  clearAllBodyScrollLocks: jest.fn(),
}));
jest.mock('@univision/fe-components-base/dist/components/Picture/getRatioImages', () => (() => ({
  md: 'medium.jpg',
  sm: 'small.jpg',
})));
jest.mock('@univision/fe-commons/dist/assets/images/playlist-thumb-dark.png', () => ({ __esModule: true, default: 'dark.png' }));
jest.mock('@univision/fe-commons/dist/utils/api/request', () => ({ requestWithBasicAuth: jest.fn(async () => mockResponse.success) }));

const FMG = jest.fn();

global.window ??= Object.create(window);

let items;

describe('geoFilterVideos', () => {
  const videos = [
    {
      accessRules: [{
        access: 'private',
        conditions: [{
          scope: 'country',
          value: 'US',
        }],
      }],
    },
    {
      accessRules: [{
        access: 'private',
        conditions: [{
          scope: 'country',
          value: 'MX',
        }],
      }],
    },
    {
      accessRules: [{
        access: 'private',
        conditions: [{
          scope: 'country',
          value: 'MX',
        }, {
          scope: 'country',
          value: 'US',
        }],
      }],
    },
  ];

  it('should filter US Videos if location is MX', () => {
    expect(helpers.geoFilterVideos(videos, 'MX', true)).toHaveLength(2);
  });

  it('should not filter videos if location is not MX', () => {
    expect(helpers.geoFilterVideos(videos, 'US', true)).toHaveLength(3);
  });
});

describe('isVideoAccessRuleAllowed', () => {
  const conditions = [
    { scope: 'country', value: 'US' },
    { scope: 'country', value: 'PR' },
  ];

  it('should allow access if no access rules', () => {
    expect(helpers.isVideoAccessRuleAllowed([], 'MX')).toEqual(true);
  });

  it('should allow access if no user location', () => {
    expect(helpers.isVideoAccessRuleAllowed([], undefined)).toEqual(true);
  });

  it('should deny access if access is not defined', () => {
    expect(
      helpers.isVideoAccessRuleAllowed(
        [
          {
            access: '',
            conditions,
          },
        ],
        'MX'
      )
    ).toEqual(true);
  });

  it('should allow access if public rule does not match user location', () => {
    expect(
      helpers.isVideoAccessRuleAllowed(
        [
          {
            access: 'public',
            conditions,
          },
        ],
        'MX'
      )
    ).toEqual(true);
  });

  it('should allow access if private rule does match user location', () => {
    expect(
      helpers.isVideoAccessRuleAllowed(
        [
          {
            access: 'private',
            conditions,
          },
        ],
        'US'
      )
    ).toEqual(true);
  });

  it('should deny access if public rule does match user location', () => {
    expect(
      helpers.isVideoAccessRuleAllowed(
        [
          {
            access: 'public',
            conditions,
          },
        ],
        'US'
      )
    ).toEqual(false);
  });

  it('should deny access if private rule does not match user location', () => {
    expect(
      helpers.isVideoAccessRuleAllowed(
        [
          {
            access: 'private',
            conditions,
          },
        ],
        'MX'
      )
    ).toEqual(false);
  });
});

describe('considerVideoFallback', () => {
  const accessRules = [
    {
      name: 'ONLY_MEX',
      access: 'private',
      match: 'any',
      conditions: [
        {
          scope: 'country',
          value: 'MX',
          rangeStart: null,
          rangeEnd: null,
        },
      ],
    },
  ];
  const videoFallback = {
    userLocation: 'MX',
    mcpOrigin: 'MX',
    accessRules,
    videoFallback: null,
  };
  const rawVideoDataAllowed = {
    userLocation: 'MX',
    mcpOrigin: 'MX',
    accessRules,
    videoFallback,
  };
  const rawVideoDataNotAllowed = {
    userLocation: 'US',
    mcpOrigin: 'MX',
    accessRules,
    videoFallback,
  };
  const rawVideoDataNotAllowedAndFallback = {
    userLocation: 'US',
    mcpOrigin: 'MX',
    accessRules,
    videoFallback: null,
  };

  it('should not consider video fallback', () => {
    expect(helpers.considerVideoFallback(rawVideoDataAllowed)).toEqual(rawVideoDataAllowed);
  });

  it('should consider video fallback', () => {
    expect(helpers.considerVideoFallback(rawVideoDataNotAllowed)).toEqual(videoFallback);
  });

  it('should not consider video fallback because is not defined', () => {
    expect(helpers.considerVideoFallback(rawVideoDataNotAllowedAndFallback))
      .toEqual(rawVideoDataNotAllowedAndFallback);
  });
});

describe('parsePlaylistItems', () => {
  beforeEach(() => {
    global.window.FMG = FMG;
    items = [{
      mcpid: 123,
      auth: true,
      parent: {
        title: 'test',
      },
      durationString: '03:10',
      title: 'test title',
      permalink: 'https://test.com',
    }];
  });

  it('should return empty array if not valid data passed', () => {
    expect(helpers.parsePlaylistItems()).toHaveLength(0);
    expect(helpers.parsePlaylistItems(null)).toHaveLength(0);
    expect(helpers.parsePlaylistItems([])).toHaveLength(0);
  });

  it('should return video fallback when feature flag is enabled', () => {
    const videoFallback = {
      mcpid: 456,
      auth: true,
      parent: {
        title: 'test 2',
      },
      durationString: '03:10',
      title: 'test title 2',
      permalink: 'https://test 2.com',
    };
    items[0].userLocation = 'US';
    items[0].mcpOrigin = 'MX';
    items[0].accessRules = [
      {
        name: 'ONLY_MEX',
        access: 'private',
        match: 'any',
        conditions: [
          {
            scope: 'country',
            value: 'MX',
            rangeStart: null,
            rangeEnd: null,
          },
        ],
      },
    ];
    items[0].videoFallback = videoFallback;
    const [data] = helpers.parsePlaylistItems(items, true);
    expect(data.mcpid).toEqual(456);
  });

  it('should return undefined if any identifier is not available', () => {
    items = [{
      mcpid: undefined,
      auth: true,
      parent: {
        title: 'test',
      },
      durationString: '03:10',
      title: 'test title',
      permalink: 'https://test.com',
    }];
    const videoFallback = {
      mcpid: undefined,
      auth: true,
      parent: {
        title: 'test 2',
      },
      durationString: '03:10',
      title: 'test title 2',
      permalink: 'https://test 2.com',
    };
    items[0].userLocation = 'MX';
    items[0].mcpOrigin = 'MX';
    items[0].accessRules = [
      {
        name: 'ONLY_MEX',
        access: 'private',
        match: 'any',
        conditions: [
          {
            scope: 'country',
            value: 'MX',
            rangeStart: null,
            rangeEnd: null,
          },
        ],
      },
    ];
    items[0].videoFallback = videoFallback;
    const [data] = helpers.parsePlaylistItems(items, true);
    expect(data.mcpid).toEqual(undefined);
  });

  it('truncates long titles', () => {
    items[0].title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et leo et tortor commodo';
    const [data] = helpers.parsePlaylistItems(items);
    expect(data.shortTitle.substr(-3)).toEqual('...');
  });

  it('uses the title as shortTitle if it has less than 75 chars', () => {
    items[0].title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const [data] = helpers.parsePlaylistItems(items);
    expect(data.shortTitle).toEqual(items[0].title);
  });

  it('should handle undefined titles', () => {
    items[0].title = null;
    const [data] = helpers.parsePlaylistItems(items);
    expect(data.shortTitle).not.toBeDefined();
  });

  it('should use permalink as uri', () => {
    const item = helpers.parsePlaylistItems(items)[0];
    expect(item.uri).toEqual('https://test.com');
  });

  it('should set rating to TV-PG if soccer match', () => {
    items[0].matchId = 1234;
    const [data] = helpers.parsePlaylistItems(items);
    expect(data.rating).toEqual('TV-PG');
  });

  it('should set type livestream if live', () => {
    items[0].videoType = 'livestream';
    delete items[0].durationString;
    const [data] = helpers.parsePlaylistItems(items);
    expect(data.type).toEqual('livestream');
    expect(data.durationString).toEqual('live');
  });

  it('should set authRequired', () => {
    items[0].authRequired = true;
    const [data] = helpers.parsePlaylistItems(items);
    expect(data.authRequired).toEqual(true);
  });

  it('gets proper action id from keywords', () => {
    items.push(null);
    items[0].keywords = [
      'actionId.202034',
    ];
    const [data] = helpers.parsePlaylistItems(items);

    expect(data.actionId).toEqual('202034');
  });

  it('does not get proper action id from keywords if no valid value', () => {
    items[0].keywords = [
      '',
    ];
    const [data] = helpers.parsePlaylistItems(items);
    expect(data.actionId).toBeUndefined();
  });
});

describe('getImagesForVideoSDK', () => {
  let content;
  beforeEach(() => {
    content = [{
      mcpid: '123',
      image: {
        renditions: {
          original: 'abc',
        },
      },
    }];
  });
  it('returns integer for mcpid', () => {
    const [data] = helpers.getImagesForVideoSDK(content);
    expect(data.mcpId).toEqual('123');
  });
  it('returns empty array if content is null', () => {
    const data = helpers.getImagesForVideoSDK(null);
    expect(data).toEqual([]);
  });
  it('returns empty array if content is undefined', () => {
    const data = helpers.getImagesForVideoSDK(undefined);
    expect(data).toEqual([]);
  });
  it('returns correct sizes for image and cover', () => {
    const [data] = helpers.getImagesForVideoSDK(content);
    expect(data.image).toEqual('small.jpg');
    expect(data.cover).toEqual('medium.jpg');
  });
});

describe('getPlaceholderImage', () => {
  it('should load image dynamically', async () => {
    Store.dispatch(setPageData({ theme: { variant: 'dark' } }));
    const image = await helpers.getPlaceholderImage();
    expect(image).toEqual('dark.png');
  });

  it('should load image dynamically when "theme" variant', async () => {
    Store.dispatch(setPageData({ theme: { variant: 'theme' } }));
    const image = await helpers.getPlaceholderImage();
    expect(image).toEqual('dark.png');
  });
});

describe('generateVideoPlayerId', () => {
  it('should generate random video player id with prefix', () => {
    const videoPlayerId = helpers.generateVideoPlayerId();
    expect(videoPlayerId).toContain('player');
  });

  it('should generate random video player id with no prefix', () => {
    const videoPlayerId = helpers.generateVideoPlayerId(false);
    expect(videoPlayerId).not.toContain('player');
  });
});

describe('enableEnhancementAutoplay', () => {
  let pageData;
  it('should not enable autoplay if video lead available', () => {
    pageData = {
      data: {
        lead: {
          type: 'video',
        },
      },
    };

    Store.dispatch(setPageData({ ...pageData }));
    expect(helpers.enableEnhancementAutoplay('123')).toBeFalsy();
  });

  it('should not enable autoplay if no article body available', () => {
    pageData = {
      data: {
        lead: {
          type: 'image',
        },
      },
    };

    Store.dispatch(setPageData({ ...pageData }));
    expect(helpers.enableEnhancementAutoplay('123')).toBeFalsy();
  });

  it('should not enable autoplay if mcpId not matches any enhancement', () => {
    pageData = {
      data: {
        lead: {
          type: 'image',
        },
        body: [{ type: 'enhancement', objectData: { mcpid: '456', type: 'video' } }],
      },
    };

    Store.dispatch(setPageData({ ...pageData }));
    expect(helpers.enableEnhancementAutoplay('123')).toBeFalsy();
  });

  it('should enable autoplay if mcpId matches first enhacement', () => {
    pageData = {
      data: {
        lead: {
          type: 'image',
        },
        body: [{ type: 'enhancement', objectData: { mcpid: '456', type: 'video' } }],
      },
    };

    Store.dispatch(setPageData({ ...pageData }));
    expect(helpers.enableEnhancementAutoplay('456')).toBeTruthy();
  });
});

describe('checkPreauthorizedResources', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not dispatch any popup if the user is allowed', () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    helpers.checkPreauthorizedResources({ isAllowed: true });
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch form popup if the user is not allowed and packageAllowed is false', () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    helpers.checkPreauthorizedResources({
      isAllowed: false,
      packageAllowed: false,
      userChannels: ['channel'],
    });
    expect(dispatchSpy).toHaveBeenCalledWith(TUDN_MVPD_POPUP_FORM);
  });

  it('should dispatch default popup if the user is not allowed but empty channels', () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    helpers.checkPreauthorizedResources({
      isAllowed: false,
      packageAllowed: true,
      userChannels: [],
    });
    expect(dispatchSpy).toHaveBeenCalledWith(TUDN_MVPD_POPUP);
  });

  it('should not dispatch any popup if the user is not allowed but have packages and channels', () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    helpers.checkPreauthorizedResources({
      isAllowed: false,
      packageAllowed: true,
      userChannels: ['channel'],
    });
    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});

describe('lockUnlockBody', () => {
  it('calls disableBodyScroll', () => {
    const div = document.createElement('div');
    div.class = `${PIP_PLAYER_ID}-fixed .responsive-playlist-inner`;
    spyOn(global.document, 'querySelector').and.returnValue(div);
    helpers.lockUnlockBody(true);
    expect(bodyScrollLock.disableBodyScroll).toBeCalled();
  });
  it('calls clearAllBodyScrollLocks', () => {
    helpers.lockUnlockBody(false);
    expect(bodyScrollLock.clearAllBodyScrollLocks).toBeCalled();
  });
});

describe('getVideoLanguageParams', () => {
  it('gets correct param', () => {
    const mock = jest.spyOn(URLSearchParams.prototype, 'get').mockImplementationOnce(() => 'en');
    const lang = helpers.getVideoLanguageParams();
    expect(lang).toEqual('en');
    mock.mockRestore();
  });
  it('calls clearAllBodyScrollLocks', () => {
    const mock = jest.spyOn(URLSearchParams.prototype, 'get').mockImplementationOnce(() => {
      throw new Error();
    });
    const lang = helpers.getVideoLanguageParams();
    expect(lang).toEqual(null);
    mock.mockRestore();
  });
});

describe('setVideoLanguageParams', () => {
  it('sets correct video language', () => {
    const replaceSpy = jest.spyOn(window.history, 'replaceState');
    helpers.setVideoLanguageParams('es');
    expect(replaceSpy).toBeCalled();
    expect(window.location.search).toEqual('?lang=es');
    replaceSpy.mockRestore();
  });
  it('does not set correct params when bad url is passed', () => {
    delete global.window.location;
    global.window ??= Object.create(window);
    const url = 'test';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    const replaceSpy = jest.spyOn(window.history, 'replaceState');
    helpers.setVideoLanguageParams('es');
    expect(replaceSpy).not.toBeCalled();
    global.window ??= Object.create(window);
  });
});

describe('checkFreeVideoPreview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not dispatch any popup if is not free preview', () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    helpers.checkFreeVideoPreview(false);
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch any popup if is not free preview', () => {
    const dispatchSpy = jest.spyOn(popUpActions, 'showPopup');
    helpers.checkFreeVideoPreview(true);
    expect(dispatchSpy).toHaveBeenCalledWith(FREE_PREVIEW_POPUP);
  });
});
