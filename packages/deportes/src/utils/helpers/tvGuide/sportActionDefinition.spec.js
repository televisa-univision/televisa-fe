import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import { NETWORK_UNIMAS, SPORT } from '@univision/fe-commons/dist/constants/tvGuide';
import { TV_GUIDE_FETCH_SPORT_EVENTS } from '@univision/fe-commons/dist/store/actions/tvguide/action-tv-guide-types';
import Store from '@univision/fe-commons/dist/store/store';
import sportActionDefinition from './sportActionDefinition';

Store.getState = jest.fn();
const date = '2018-12-07T05:00:00.000Z';
const channel = NETWORK_UNIMAS;

jest.mock('@univision/shared-components/dist/extractors/matchesExtractor', () => jest.fn());
jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchSportApi: jest.fn(),
}));

beforeEach(() => {
  Store.getState.mockReturnValue({
    tvGuide: {
      date,
      channel,
    },
  });
  matchesExtractor.mockReturnValue([{ channel: NETWORK_UNIMAS }]);
});

describe('sportActionDefinition channel, date, endDate and buildFetchUrl', () => {
  it('should return the right channel, date and buildFetchUrl', () => {
    const currentDate = new Date(sportActionDefinition.date);
    const tomorrow = new Date(
      new Date(currentDate).setDate(new Date(currentDate).getDate() + 1)
    ).toISOString();
    // Avoid hour different dependency
    expect(new Date(sportActionDefinition.date).getFullYear()).toBe(2018);
    expect(sportActionDefinition.constructor.channel).toBe(channel);
    expect(sportActionDefinition.endDate).toEqual(tomorrow);
    expect(sportActionDefinition.buildFetchUrl().indexOf(`endDate=${encodeURIComponent(tomorrow)}`)).toBe(164);
  });
});

describe('sportActionDefinition extractor', () => {
  it('should return empty array if not items in data', () => {
    expect(sportActionDefinition.extractor(null)).toEqual([]);
  });
  it('should return empty array if error on extractor', () => {
    matchesExtractor.mockImplementation(() => { throw new Error('oh my'); });
    expect(sportActionDefinition.extractor({})).toEqual([]);
  });
});

describe('sportActionDefinition action', () => {
  it('should return function if able to build fetch url', () => {
    expect(sportActionDefinition.action().type).toBe(TV_GUIDE_FETCH_SPORT_EVENTS);
  });
});

describe('sportActionDefinition buildFetchUrl', () => {
  it('should return empty arry if wrong events', () => {
    expect(sportActionDefinition.getEventsByChannel(null)).toEqual([]);
  });
  it('should return the events related to that channel', () => {
    const events = [{ channels: [NETWORK_UNIMAS] }];
    expect(sportActionDefinition.getEventsByChannel(events)).toEqual(events);
  });
});

describe('sportActionDefinition tag events', () => {
  it('should return the right events', () => {
    const events = [
      {
        channels: [NETWORK_UNIMAS],
        type: SPORT,
        date: '2018-11-11T01:00:00.000',
      },
    ];
    const taggedEvents = sportActionDefinition.tagEvents(events);
    const firstEvent = taggedEvents[0];
    expect(firstEvent.type).toEqual(SPORT);
    expect(firstEvent.time).toBeDefined();
  });
  it('should not return time if no date', () => {
    const events = [
      {
        channels: [NETWORK_UNIMAS],
        type: SPORT,
      },
    ];
    const taggedEvents = sportActionDefinition.tagEvents(events);
    const firstEvent = taggedEvents[0];
    expect(firstEvent.time).not.toBeDefined();
  });
  it('should not return time if wrong date', () => {
    const events = [
      {
        channels: [NETWORK_UNIMAS],
        type: SPORT,
        date: 'abc',
      },
    ];
    const taggedEvents = sportActionDefinition.tagEvents(events);
    const firstEvent = taggedEvents[0];
    expect(firstEvent.time).not.toBeDefined();
  });
});
