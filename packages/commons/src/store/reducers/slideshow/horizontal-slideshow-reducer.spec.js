import deepFreeze from 'deep-freeze';
import reducer from './horizontal-slideshow-reducer';
import {
  SET_INITIAL_HORIZONTAL_SLIDESHOWS,
  SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX,
  SET_STICKY_SLIDESHOW,
} from '../../actions/slideshow/horizontal-slideshow-action-types';
import {
  FETCH_PAGE_DATA_PENDING,
  FETCH_PAGE_DATA_FULFILLED,
  FETCH_PAGE_DATA_REJECTED,
  SYNC_STORE,
} from '../../actions/action-types';

jest.mock('../../store', () => ({}));

const initialState = {
  currentSlideshowIndex: 0,
  errorFetchingNextSlideshow: false,
  fetchingNextSlideshow: false,
  slideshows: [],
  isStickySlideshow: false,
};
deepFreeze(initialState);

describe('Horizontal Slideshow Reducer', () => {
  it('should return current state if action is not recognized', () => {
    const reduced = reducer(initialState, { type: 'blah' });

    expect(reduced).toEqual(initialState);
  });

  it('should use default initial state if state parameter is undefined', () => {
    const reduced = reducer(undefined, { type: 'blah' });

    expect(reduced).toEqual(initialState);
  });

  it('should set initial horizontal slideshows', () => {
    const initialSlideshows = [{ uri: '/my-first-slideshow' }, { uri: '/my-second-slideshow' }];
    const action = {
      type: SET_INITIAL_HORIZONTAL_SLIDESHOWS,
      payload: initialSlideshows,
    };
    const expected = {
      ...initialState,
      slideshows: initialSlideshows,
    };
    deepFreeze(action);
    const reduced = reducer(initialState, action);

    expect(reduced).toEqual(expected);
  });

  it('should set current horizontal slideshow index', () => {
    const indexToSet = 3;
    const action = {
      type: SET_CURRENT_HORIZONTAL_SLIDESHOW_INDEX,
      payload: indexToSet,
    };
    deepFreeze(action);
    const expected = {
      ...initialState,
      currentSlideshowIndex: indexToSet,
      wentForward: true,
    };
    const reduced = reducer(initialState, action);

    expect(reduced).toEqual(expected);
  });

  it('should set stickySlideshow flag', () => {
    const action = {
      type: SET_STICKY_SLIDESHOW,
      payload: true,
    };
    deepFreeze(action);
    const expected = {
      ...initialState,
      fetchingNextSlideshow: true,
      isStickySlideshow: true,
    };
    const reduced = reducer(initialState, action);

    expect(reduced).toEqual(expected);
  });

  it('should set loading state while fetching next slideshow', () => {
    const sampleState = {
      ...initialState,
      errorFetchingNextSlideshow: true,
    };
    const action = {
      type: FETCH_PAGE_DATA_PENDING,
      meta: { page: 'horizontal slideshow' },
    };
    const expected = {
      ...sampleState,
      errorFetchingNextSlideshow: false,
      fetchingNextSlideshow: true,
    };
    deepFreeze(sampleState);
    deepFreeze(action);
    const reduced = reducer(sampleState, action);

    expect(reduced).toEqual(expected);
  });

  it('should return current state if a page other than horizontal slideshow is being fetched', () => {
    const action = { type: FETCH_PAGE_DATA_PENDING };
    deepFreeze(action);
    const reduced = reducer(initialState, action);

    expect(reduced).toEqual(initialState);
  });

  it('should add fetched slideshow to the state', () => {
    const sampleState = {
      ...initialState,
      errorFetchingNextSlideshow: true,
      fetchingNextSlideshow: true,
      slideshows: [{ uri: '/my-first-slideshow' }],
    };
    const fetchedSlideshow = { uri: '/my-new-fetched-slideshow' };
    const action = {
      type: FETCH_PAGE_DATA_FULFILLED,
      payload: { data: fetchedSlideshow },
      meta: { page: 'horizontal slideshow' },
    };
    const expected = {
      ...sampleState,
      currentSlideshowIndex: 1,
      errorFetchingNextSlideshow: false,
      fetchingNextSlideshow: false,
      slideshows: [...sampleState.slideshows, fetchedSlideshow],
    };
    deepFreeze(sampleState);
    deepFreeze(action);
    const reduced = reducer(sampleState, action);

    expect(reduced).toEqual(expected);
  });

  it('should return current state if a page other than horizontal slideshow was fetched', () => {
    const action = {
      type: FETCH_PAGE_DATA_FULFILLED,
      payload: { uri: '/some-other-page' },
    };
    deepFreeze(action);
    const reduced = reducer(initialState, action);

    expect(reduced).toEqual(initialState);
  });

  it('should set error state when fetching next slideshow fails', () => {
    const sampleState = {
      ...initialState,
      fetchingNextSlideshow: true,
    };
    const action = {
      type: FETCH_PAGE_DATA_REJECTED,
      meta: { page: 'horizontal slideshow' },
    };
    const expected = {
      ...sampleState,
      errorFetchingNextSlideshow: true,
      fetchingNextSlideshow: false,
    };
    deepFreeze(sampleState);
    deepFreeze(action);
    const reduced = reducer(sampleState, action);

    expect(reduced).toEqual(expected);
  });

  it('should return current state if fetching a page other than horizontal slideshow fails', () => {
    const action = { type: FETCH_PAGE_DATA_REJECTED };
    deepFreeze(action);
    const reduced = reducer(initialState, action);

    expect(reduced).toEqual(initialState);
  });

  it('should return the initial state when next page data has not slideshowType = horizontal', () => {
    const action = {
      type: SYNC_STORE,
      data: { page: { appVersion: 2 } },
    };
    deepFreeze(action);
    const reduced = reducer(initialState, action);

    expect(reduced).toEqual(initialState);
  });

  it('should reset state if content type is not slideshow', () => {
    const action = {
      type: SYNC_STORE,
      data: { page: { appVersion: 2, data: { type: 'section' } } },
    };
    const state = {
      ...initialState,
      nextSlideshow: [{}, {}],
    };

    deepFreeze(action);
    const reduced = reducer(state, action);

    expect(reduced).toEqual(initialState);
  });

  it('should reset state if auto request param is included', () => {
    const action = {
      type: SYNC_STORE,
      data: { page: { appVersion: 2, requestParams: { auto: true } } },
    };
    const state = {
      ...initialState,
      nextSlideshow: [{}, {}],
    };

    deepFreeze(action);
    const reduced = reducer(state, action);

    expect(reduced).toEqual(initialState);
  });

  it('should set fetchingNextSlideshow = false on sync store', () => {
    const action = {
      type: SYNC_STORE,
      data: { page: { appVersion: 2, data: { type: 'slideshow' } } },
    };
    const state = {
      ...initialState,
      nextSlideshow: [{}, {}],
    };

    deepFreeze(action);
    const reduced = reducer(state, action);

    expect(reduced).toEqual({
      ...state,
      fetchingNextSlideshow: false,
    });
  });
});
