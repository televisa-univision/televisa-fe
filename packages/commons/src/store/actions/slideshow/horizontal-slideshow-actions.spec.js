import dfpManager from '../../../utils/ads/dfpManager';
import * as history from '../../../utils/helpers/history';
import * as horizontalSlideshowActions from './horizontal-slideshow-actions';
import * as horizontalSlideshowActionTypes from './horizontal-slideshow-action-types';
import * as pageActions from '../page-actions';
import * as types from '../action-types';
import * as searchActionTypes from '../search/action-search-types';
import * as fetchContent from '../../../utils/api/content/fetch';
import mockData from './mockSlideshowData.json';
import mockStore from '../../__mocks__/store';
import getStyledTheme from '../../../components/ThemeProvider/helpers';

describe('Horizontal Slideshow Actions', () => {
  const initialState = {
    page: {
      data: mockData.data,
      domain: mockData.domain,
    },
    horizontalSlideshow: {
      currentSlideshowIndex: 0,
      errorFetchingNextSlideshow: false,
      fetchingNextSlideshow: false,
      slideshows: [],
    },
  };
  const initialSlideshows = [
    mockData.data,
    {
      uri: mockData.data.nextSlideshows[0].url,
      mainImage: mockData.data.nextSlideshows[0].mainImage,
      title: mockData.data.nextSlideshows[0].title,
    },
    {
      uri: mockData.data.nextSlideshows[1].url,
      mainImage: mockData.data.nextSlideshows[1].mainImage,
      title: mockData.data.nextSlideshows[1].title,
    },
    {
      uri: mockData.data.nextSlideshows[2].url,
      mainImage: mockData.data.nextSlideshows[2].mainImage,
      title: mockData.data.nextSlideshows[2].title,
    },
    {
      uri: mockData.data.nextSlideshows[3].url,
      mainImage: mockData.data.nextSlideshows[3].mainImage,
      title: mockData.data.nextSlideshows[3].title,
    },
  ];
  const headerConf = {
    activePath: null,
    brandedNavLogoUri: '/',
    contentType: undefined,
    links: [],
    shouldRenderMVPD: false,
    slideshowType: undefined,
    subNavType: 'contentSubNav',
    title: {
      link: null,
      logo: null,
      name: undefined,
      target: '_self',
    },
  };
  const store = mockStore(initialState);

  beforeAll(() => {
    jsdom.reconfigure({
      url: 'https://www.univision.com/test',
    });
  });

  afterEach(() => {
    store.clearActions();
    jest.restoreAllMocks();
  });

  describe('setInitialSlideshows()', () => {
    it('should dispatch action with initial slideshows as the payload', () => {
      const expectedPayload = initialSlideshows;
      const expectedAction = {
        type: horizontalSlideshowActionTypes.SET_INITIAL_HORIZONTAL_SLIDESHOWS,
        payload: expectedPayload,
      };

      store.dispatch(horizontalSlideshowActions.setInitialSlideshows());

      const actions = store.getActions();
      expect(actions).toEqual([expectedAction]);
    });

    it('should not dispatch action with initial slideshows as the payload', () => {
      initialState.page.data = {};

      store.dispatch(horizontalSlideshowActions.setInitialSlideshows());

      const actions = store.getActions();
      expect(actions).toEqual([{ payload: [{}], type: 'SET_INITIAL_HORIZONTAL_SLIDESHOWS' }]);
    });
  });

  describe('setStickySlideshowFlag', () => {
    it('should dispatch action setStickySlideshowFlag with the expected value', () => {
      const expected = store.dispatch(horizontalSlideshowActions.setStickySlideshowFlag(true));

      expect(expected.payload).toBe(true);
    });
  });

  describe('goToPreviousSlideshow()', () => {
    it('should throw an error if already on first slideshow', () => {
      const sampleStore = mockStore({
        ...initialState,
        horizontalSlideshow: {
          ...initialState.horizontalSlideshow,
          currentSlideshowIndex: 0,
        },
      });

      expect(() => sampleStore.dispatch(horizontalSlideshowActions.goToPreviousSlideshow()))
        .toThrowError(
          new Error('Failed to go to previous slideshow: no more slideshows available')
        );
      expect(sampleStore.getActions()).toEqual([]);
    });

    it('should correctly update the slideshow page data when going to previous slideshow', () => {
      const sampleStore = mockStore({
        ...initialState,
        horizontalSlideshow: {
          ...initialState.horizontalSlideshow,
          currentSlideshowIndex: 1,
          slideshows: initialSlideshows,
        },
      });
      const replaceStateSpy = jest.spyOn(history, 'replaceState')
        .mockImplementation(() => { });
      const destroyAdsSpy = jest.spyOn(dfpManager, 'destroyAds');
      const currentState = sampleStore.getState();
      const expectedActions = [
        {
          type: horizontalSlideshowActionTypes.SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX,
          payload: 0,
        },
        {
          type: types.SET_PAGE_DATA,
          data: {
            data: currentState.horizontalSlideshow.slideshows[0],
          },
        },
      ];

      sampleStore.dispatch(horizontalSlideshowActions.goToPreviousSlideshow());

      const actions = sampleStore.getActions();
      expect(actions).toEqual(expectedActions);
      expect(replaceStateSpy).toHaveBeenCalledTimes(1);
      expect(destroyAdsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('goToNextSlideshow()', () => {
    it('should throw an error if already on the final slideshow', () => {
      const sampleStore = mockStore({
        ...initialState,
        horizontalSlideshow: {
          ...initialState.horizontalSlideshow,
          currentSlideshowIndex: 4,
          slideshows: initialSlideshows,
        },
      });
      expect.assertions(2);

      sampleStore.dispatch(horizontalSlideshowActions.goToNextSlideshow())
        .catch((err) => {
          expect(err).toEqual(
            new Error('Failed to go to next slideshow: no more slideshows available')
          );
        });
      expect(sampleStore.getActions()).toEqual([]);
    });

    it('should correctly fetch and update data for next slideshow', async () => {
      const sampleStore = mockStore({
        ...initialState,
        horizontalSlideshow: {
          ...initialState.horizontalSlideshow,
          currentSlideshowIndex: 0,
          slideshows: initialSlideshows,
        },
      });
      const nextSlideshowRes = {
        value: mockData.data.nextSlideshows[1],
      };
      const searchData = {
        test: 'test',
      };
      const fetchContentSpy = jest.spyOn(fetchContent, 'default')
        .mockReturnValue(Promise.resolve({
          page: {
            data: nextSlideshowRes,
            pageCategory: undefined,
            theme: {
              alphaGradient: 'linear-gradient(to top, rgba(58, 58, 58, 0.95) 0%, rgba(58, 58, 58, 0) 50%)',
              custom: {
                a: '#23a2ee',
                'a:hover': '#23a2ee',
              },
              horizontalGradient: 'linear-gradient(to right, #3a3a3a 0%, #000000 100%)',
              primary: '#3a3a3a',
              secondary: '#000000',
              solidGradient: 'linear-gradient(to bottom, #3a3a3a 0%, #000000 100%)',
            },
          },
          headerConf,
          search: searchData,
        }));
      const replaceStateSpy = jest.spyOn(history, 'replaceState')
        .mockImplementation(() => { });
      const destroyAdsSpy = jest.spyOn(dfpManager, 'destroyAds');
      const expectedActions = [
        {
          type: types.FETCH_PAGE_DATA_PENDING,
          meta: { page: 'horizontal slideshow', initiator: 'slideshow-stitching' },
        },
        {
          type: types.SET_PAGE_DATA,
          data: {
            data: nextSlideshowRes,
            pageCategory: undefined,
            theme: {
              alphaGradient: 'linear-gradient(to top, rgba(58, 58, 58, 0.95) 0%, rgba(58, 58, 58, 0) 50%)',
              custom: {
                a: '#23a2ee',
                'a:hover': '#23a2ee',
              },
              horizontalGradient: 'linear-gradient(to right, #3a3a3a 0%, #000000 100%)',
              primary: '#3a3a3a',
              secondary: '#000000',
              solidGradient: 'linear-gradient(to bottom, #3a3a3a 0%, #000000 100%)',
            },
            requestParams: {},
          },
        },
        {
          conf: headerConf,
          type: 'SET_HEADER_CONF',
        },
        {
          type: searchActionTypes.SEARCH_SET_DATA,
          data: searchData,
        },
        {
          type: 'SET_CLOSED_HAMBURGER_MENU',
        },
        {
          type: types.TRIGGER_BEFORE_SPA_TRANSITION,
        },
        {
          type: types.FETCH_PAGE_DATA_FULFILLED,
          payload: {
            data: nextSlideshowRes,
          },
          meta: { page: 'horizontal slideshow', initiator: 'slideshow-stitching' },
        },
        {
          type: types.SET_PAGE_DATA,
          data: { data: nextSlideshowRes },
        },
      ];
      expect.assertions(4);

      await sampleStore.dispatch(horizontalSlideshowActions.goToNextSlideshow());

      const actions = sampleStore.getActions();
      expect(actions).toMatchObject(expectedActions);
      expect(fetchContentSpy).toHaveBeenCalledTimes(1);
      expect(replaceStateSpy).toHaveBeenCalledTimes(1);
      expect(destroyAdsSpy).toHaveBeenCalledTimes(1);
    });

    it('should correctly update data for next slideshow if it was already fetched', async () => {
      const nextSlideshowData = {
        uri: mockData.data.nextSlideshows[0].url,
        ...mockData.data.nextSlideshows[0],
      };
      const sampleStore = mockStore({
        ...initialState,
        horizontalSlideshow: {
          ...initialState.horizontalSlideshow,
          currentSlideshowIndex: 0,
          slideshows: [
            mockData.data,
            nextSlideshowData,
          ],
        },
      });
      const fetchContentSpy = jest.spyOn(fetchContent, 'default');
      const replaceStateSpy = jest.spyOn(history, 'replaceState')
        .mockImplementation(() => { });
      const destroyAdsSpy = jest.spyOn(dfpManager, 'destroyAds');
      const expectedActions = [
        {
          type: horizontalSlideshowActionTypes.SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX,
          payload: 1,
        },
        {
          type: types.SET_PAGE_DATA,
          data: { data: nextSlideshowData },
        },
      ];
      expect.assertions(4);

      await sampleStore.dispatch(horizontalSlideshowActions.goToNextSlideshow());

      const actions = sampleStore.getActions();
      expect(actions).toEqual(expectedActions);
      expect(fetchContentSpy).not.toHaveBeenCalled();
      expect(replaceStateSpy).toHaveBeenCalledTimes(1);
      expect(destroyAdsSpy).toHaveBeenCalledTimes(1);
    });

    it('should default the next slideshow to an empty object if next slideshow index is out of bounds', async () => {
      const sampleStore = mockStore({
        ...initialState,
        horizontalSlideshow: {
          ...initialState.horizontalSlideshow,
          currentSlideshowIndex: 5, // out of bounds index
          slideshows: initialSlideshows,
        },
      });
      const fetchPageDataSpy = jest.spyOn(pageActions, 'fetchPageData');

      expect.assertions(2);

      expect(() => sampleStore.dispatch(horizontalSlideshowActions.goToNextSlideshow()))
        .not.toThrow();

      expect(fetchPageDataSpy).toHaveBeenCalledWith(undefined, {
        themeFn: getStyledTheme,
        meta: { page: 'horizontal slideshow', initiator: 'slideshow-stitching' },
      });
    });

    it('should default next page data to empty if no data is fetched', async () => {
      const sampleStore = mockStore({
        ...initialState,
        horizontalSlideshow: {
          ...initialState.horizontalSlideshow,
          currentSlideshowIndex: 0,
          slideshows: initialSlideshows,
        },
      });
      const fetchContentSpy = jest.spyOn(fetchContent, 'default')
        .mockReturnValue(Promise.resolve(null));
      const replaceStateSpy = jest.spyOn(history, 'replaceState')
        .mockImplementation(() => { });
      const destroyAdsSpy = jest.spyOn(dfpManager, 'destroyAds');
      const expectedActions = [
        {
          type: types.FETCH_PAGE_DATA_PENDING,
          meta: { page: 'horizontal slideshow', initiator: 'slideshow-stitching' },
        },
        {
          type: types.FETCH_PAGE_DATA_FULFILLED,
          payload: { data: null },
          meta: { page: 'horizontal slideshow', initiator: 'slideshow-stitching' },
        },
        {
          type: types.SET_PAGE_DATA,
          data: { data: {} },
        },
      ];
      expect.assertions(4);

      await sampleStore.dispatch(horizontalSlideshowActions.goToNextSlideshow());

      const actions = sampleStore.getActions();
      expect(actions).toMatchObject(expectedActions);
      expect(fetchContentSpy).toHaveBeenCalledTimes(1);
      expect(replaceStateSpy).toHaveBeenCalledTimes(1);
      expect(destroyAdsSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('goToNextorPreviousSlideshow', () => {
    it('should correctly update the slideshow page data when going to previous slideshow', () => {
      const sampleStore = mockStore({
        ...initialState,
        horizontalSlideshow: {
          ...initialState.horizontalSlideshow,
          currentSlideshowIndex: 1,
          slideshows: initialSlideshows,
        },
      });
      const expectedActions = [
        {
          type: horizontalSlideshowActionTypes.SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX,
          payload: 0,
        },
        {
          type: horizontalSlideshowActionTypes.SET_STICKY_SLIDESHOW,
          payload: true,
        },
      ];

      sampleStore.dispatch(
        horizontalSlideshowActions.goToNextorPreviousSlideshow({ isGoingForward: false })
      );

      const actions = sampleStore.getActions();
      expect(actions).toEqual(expectedActions);
    });

    it('should correctly update the slideshow page data when going to next slideshow', () => {
      const sampleStore = mockStore({
        ...initialState,
        horizontalSlideshow: {
          ...initialState.horizontalSlideshow,
          currentSlideshowIndex: 1,
          slideshows: initialSlideshows,
        },
      });
      const expectedActions = [
        {
          type: horizontalSlideshowActionTypes.SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX,
          payload: 2,
        },
        {
          type: horizontalSlideshowActionTypes.SET_STICKY_SLIDESHOW,
          payload: true,
        },
      ];

      sampleStore.dispatch(horizontalSlideshowActions.goToNextorPreviousSlideshow());

      const actions = sampleStore.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
