import {
  TV_GUIDE_FETCH_ALL_EVENTS,
  TV_GUIDE_FETCH_SPORT_EVENTS,
  TV_GUIDE_FETCH_SHOWS_EVENTS,
  TV_GUIDE_FETCH_UDN_EVENTS,
  TV_GUIDE_SET_DATE,
  TV_GUIDE_SET_CHANNEL,
  TV_GUIDE_SET_CONTENT_TYPE,
} from '../../actions/tvguide/action-tv-guide-types';
import { NETWORK_UNIVISION } from '../../../constants/tvGuide';
import tvGuideReducer, { fullfilledSetter } from './tvguide-reducer';

const sampleState = {
  events: [
    // data from different sources
  ],
  date: '2018-12-06T19:16:26.504Z',
  contentType: 'all',
  channel: 'univision',
  ready: false,
};
describe('tv guide reducer', () => {
  it('should returns the right state', () => {
    expect(tvGuideReducer(sampleState)).toEqual(sampleState);
    expect(tvGuideReducer(sampleState, {
      type: `${TV_GUIDE_FETCH_ALL_EVENTS}_PENDING`,
    }).ready).toBeFalsy();
    expect(tvGuideReducer(sampleState, {
      type: `${TV_GUIDE_FETCH_ALL_EVENTS}_REJECTED`,
    }).ready).toBeTruthy();
    expect(tvGuideReducer(sampleState, {
      type: `${TV_GUIDE_FETCH_SPORT_EVENTS}_FULFILLED`,
      payload: 'hello',
      meta: {
        instance: {
          extractor: () => [{ type: 'test' }],
        },
      },
    }).events[0].type).toBe('test');
    expect(tvGuideReducer(sampleState, {
      type: `${TV_GUIDE_FETCH_SHOWS_EVENTS}_FULFILLED`,
      payload: 'hello',
      meta: {
        instance: {
          extractor: () => [{ type: 'test' }],
        },
      },
    }).events[0].type).toBe('test');
    expect(tvGuideReducer(sampleState, {
      type: `${TV_GUIDE_FETCH_UDN_EVENTS}_FULFILLED`,
      payload: 'hello',
      meta: {
        instance: {
          extractor: () => [{ type: 'test' }],
        },
      },
    }).events[0].type).toBe('test');
  });
  const date = '01-10-1000';
  expect(tvGuideReducer(sampleState, {
    type: TV_GUIDE_SET_DATE,
    date,
  }).date).toBe(date);
  const channel = 'udn';
  expect(tvGuideReducer(sampleState, {
    type: TV_GUIDE_SET_CHANNEL,
    channel,
  }).channel).toBe(channel);
  const contentType = 'games';
  expect(tvGuideReducer(sampleState, {
    type: TV_GUIDE_SET_CONTENT_TYPE,
    contentType,
  }).contentType).toBe(contentType);
  expect(tvGuideReducer(sampleState, {
    type: 'wrong type',
    channel,
  }).channel).toBe(NETWORK_UNIVISION);
  expect(tvGuideReducer().channel).toBe(NETWORK_UNIVISION);
});

describe('fullfilledSetter', () => {
  it('should return null if wrong action', () => {
    expect(fullfilledSetter(null, sampleState)).toBe(sampleState);
  });
});
