import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import { SPORT } from '@univision/fe-commons/dist/constants/tvGuide';
import { TV_GUIDE_FETCH_SPORT_EVENTS } from '@univision/fe-commons/dist/store/actions/tvguide/action-tv-guide-types';
import Store from '@univision/fe-commons/dist/store/store';
import agendaActionDefinition from './agendaActionDefinition';

Store.getState = jest.fn();
const date = '2018-12-07T05:00:00.000Z';

jest.mock('@univision/shared-components/dist/extractors/matchesExtractor', () => jest.fn());
jest.mock('@univision/fe-commons/dist/utils/api/fetchApi', () => ({
  fetchSportApi: jest.fn(),
}));

beforeEach(() => {
  Store.getState.mockReturnValue({
    tvGuide: {
      date,
    },
  });
  matchesExtractor.mockReturnValue([]);
});

describe('agendaActionDefinition extractor', () => {
  it('should return empty array if not items in data', () => {
    expect(agendaActionDefinition.extractor(null)).toEqual([]);
  });
  it('should return empty array if error on extractor', () => {
    matchesExtractor.mockImplementation(() => { throw new Error('oh my'); });
    expect(agendaActionDefinition.extractor({})).toEqual([]);
  });
});

describe('agendaActionDefinition action', () => {
  it('should return function if able to build fetch url', () => {
    expect(agendaActionDefinition.action().type).toBe(TV_GUIDE_FETCH_SPORT_EVENTS);
  });
});

describe('agendaActionDefinition tag events', () => {
  it('should return the right events', () => {
    const events = [
      {
        type: SPORT,
        date: '2018-11-11T01:00:00.000',
      },
    ];
    const taggedEvents = agendaActionDefinition.constructor.tagEvents(events);
    const firstEvent = taggedEvents[0];
    expect(firstEvent.type).toEqual(SPORT);
    expect(firstEvent.time).toBeDefined();
  });
  it('should not return time if no date', () => {
    const events = [
      {
        type: SPORT,
      },
    ];
    const taggedEvents = agendaActionDefinition.constructor.tagEvents(events);
    const firstEvent = taggedEvents[0];
    expect(firstEvent.time).not.toBeDefined();
  });
  it('should not return time if wrong date', () => {
    const events = [
      {
        type: SPORT,
        date: 'abc',
      },
    ];
    const taggedEvents = agendaActionDefinition.constructor.tagEvents(events);
    const firstEvent = taggedEvents[0];
    expect(firstEvent.time).not.toBeDefined();
  });
});
