import { NETWORK_UNIMAS, NETWORK_UDN, SHOWS } from '@univision/fe-commons/dist/constants/tvGuide';
import { TV_GUIDE_FETCH_SHOWS_EVENTS } from '@univision/fe-commons/dist/store/actions/tvguide/action-tv-guide-types';
import Store from '@univision/fe-commons/dist/store/store';
import showsActionDefinition from './showsActionDefinition';

Store.getState = jest.fn();
const date = '01:01:1900';
const channel = NETWORK_UNIMAS;

jest.mock('@univision/fe-commons/dist/utils/api/request', () => jest.fn());

beforeEach(() => {
  Store.getState.mockReturnValue({
    tvGuide: {
      date,
      channel,
    },
  });
});

describe('showsActionDefinition channel, date and buildFetchUrl', () => {
  it('should return the right channel, date and buildFetchUrl', () => {
    expect(showsActionDefinition.constructor.date).toBe(date);
    expect(showsActionDefinition.constructor.channel).toBe(channel);
    expect(showsActionDefinition.buildFetchUrl()).toBe('https://neulionsmbnyc-a.akamaihd.net/u/univisionnow2/epg/export/unimasny/1900/01/01.json');
  });
});

describe('showsActionDefinition extractor', () => {
  it('should return empty array if not items in data', () => {
    expect(showsActionDefinition.extractor(null)).toEqual([]);
  });
});

describe('showsActionDefinition extractor', () => {
  it('should return empty array if not items in data', () => {
    expect(showsActionDefinition.extractor(null)).toEqual([]);
  });
});

describe('showsActionDefinition action', () => {
  it('should return null if not able to build fetch url', () => {
    Store.getState.mockReturnValue({
      tvGuide: {
        date,
        channel: NETWORK_UDN,
      },
    });
    expect(showsActionDefinition.action()).toBe(null);
  });
  it('should return function if able to build fetch url', () => {
    expect(showsActionDefinition.action().type).toBe(TV_GUIDE_FETCH_SHOWS_EVENTS);
  });
});

describe('showsActionDefinition tag events', () => {
  it('should return the right events', () => {
    const events = [
      {
        type: SHOWS,
        sl: '2018-11-11T01:00:00.000',
      },
    ];
    const taggedEvents = showsActionDefinition.constructor.tagEvents(events);
    const firstEvent = taggedEvents[0];
    expect(firstEvent.type).toEqual(SHOWS);
    expect(firstEvent.time).toBeDefined();
  });
  it('should not return time if no date', () => {
    const events = [
      {
        type: SHOWS,
      },
    ];
    const taggedEvents = showsActionDefinition.constructor.tagEvents(events);
    const firstEvent = taggedEvents[0];
    expect(firstEvent.time).not.toBeDefined();
  });
  it('should not return time if wrong date', () => {
    const events = [
      {
        type: SHOWS,
        sl: 'abc',
      },
    ];
    const taggedEvents = showsActionDefinition.constructor.tagEvents(events);
    const firstEvent = taggedEvents[0];
    expect(firstEvent.time).not.toBeDefined();
  });
});
