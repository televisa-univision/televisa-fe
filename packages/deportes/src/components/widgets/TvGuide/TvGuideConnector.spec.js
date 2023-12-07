import {
  getAllEvents,
  setDate,
  setChannel,
  setContent,
} from '@univision/fe-commons/dist/store/actions/tvguide/all-actions';

import {
  sortEvents,
  filterEvents,
  prioritizeSportCard,
  mapStateToProps,
  mapDispatchToProps,
  areStatePropsEqual,
  registerActions,
} from './TvGuideConnector';
import sportActionDefinition from '../../../utils/helpers/tvGuide/sportActionDefinition';
import showsActionDefinition from '../../../utils/helpers/tvGuide/showsActionDefinition';
import udnActionDefinition from '../../../utils/helpers/tvGuide/udnActionDefinition';

jest.mock('../../../utils/helpers/tvGuide/sportActionDefinition', () => ({
  __esModule: true,
  default: {
    action: jest.fn(),
  },
}));
jest.mock('../../../utils/helpers/tvGuide/showsActionDefinition', () => ({
  __esModule: true,
  default: {
    action: jest.fn(),
  },
}));
jest.mock('../../../utils/helpers/tvGuide/udnActionDefinition', () => ({
  __esModule: true,
  default: {
    action: jest.fn(),
  },
}));

jest.mock('@univision/fe-commons/dist/store/actions/tvguide/all-actions', () => ({
  getAllEvents: jest.fn(),
  setDate: jest.fn(),
  setChannel: jest.fn(),
  setContent: jest.fn(),
}));

const events = [
  {
    name: 'a',
    time: 1544182200000,
    type: 'shows',
    d: 30,
  },
  {
    name: 'b',
    time: 1544184000000,
    type: 'shows',
    d: 30,
  },
  {
    name: 'c',
    date: 1544185800000,
    time: 1544185800000,
    type: 'sport',
    isLive: false,
  },
  {
    name: 'd',
    time: 1544185800000,
    type: 'shows',
    d: 120,
  },
];

describe('sortEvents', () => {
  it('should return the sorted by time', () => {
    expect(sortEvents(events)[0].name).toBe('a');
    expect(sortEvents(events)[3].name).toBe('d');
  });
  it('should return empty array if not valid event', () => {
    expect(sortEvents({})).toEqual([]);
  });
});

describe('filterEvents', () => {
  const constantDate = new Date('2018-12-07T12:00:00.000Z').getTime();
  const nextConstantDate = new Date('2018-12-08T12:00:00.000Z').getTime();
  const RealDate = Date;
  afterEach(() => {
    global.Date = RealDate;
  });

  it('should return the array events filter when date is Today', () => {
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    Object.assign(Date, RealDate);
    const now = new Date().getTime();
    const state = {
      tvGuide: {
        channel: 'univision',
        ready: true,
        date: now,
        contentType: 'all',
        events: [
          {
            name: 'a',
            time: now - 1800000,
            type: 'shows',
            d: 29,
          },
          {
            name: 'b',
            time: now,
            type: 'shows',
            d: 29,
          },
          {
            name: 'c',
            date: now + 1800000,
            time: now + 1800000,
            type: 'sport',
          },
          {
            name: 'd',
            time: now + 1800000,
            type: 'shows',
            d: 120,
          },
        ],
      },
    };
    expect(filterEvents(state)).toHaveLength(2);
  });
  it('should return the array events filter when date isn´t Today', () => {
    global.Date = jest.fn(() => new RealDate(nextConstantDate));

    const state2 = {
      tvGuide: {
        channel: 'univision',
        ready: true,
        date: constantDate,
        contentType: 'all',
        events,
      },
    };
    expect(filterEvents(state2)).toHaveLength(3);
  });
  it('should return empty array if not valid event', () => {
    expect(filterEvents({})).toEqual([]);
  });
});

describe('prioritizeSportCard', () => {
  it('should return true when is sport card', () => {
    expect(prioritizeSportCard(events[2], 'all')).toEqual(true);
  });
  it('should return false when isn`t sport card', () => {
    expect(prioritizeSportCard(events[1], 'all')).toEqual(false);
  });
});

describe('mapStateToProps', () => {
  it('should return the righ object', () => {
    const state = {
      tvGuide: {
        ready: true,
        events,
      },
    };
    expect(mapStateToProps(state, { testprops: 'abc' }).testprops).toBe('abc');
    expect(mapStateToProps({
      ...state,
      tvGuide: {
        ...state.tvGuide,
        ready: false,
      },
    }).events).toHaveLength(0);
  });
});

describe('mapStateToProps', () => {
  it('should return the righ object', () => {
    const state = {
      tvGuide: {
        ready: true,
        events,
      },
    };
    expect(mapStateToProps(state, { testprops: 'abc' }).testprops).toBe('abc');
    expect(mapStateToProps({
      ...state,
      tvGuide: { ...state.tvGuide, ready: false },
    }).events).toHaveLength(0);
  });
});

describe('mapDispatchToProps', () => {
  const dispatch = jest.fn();
  it('should call getAllEvents with the right arguments if actions defined', () => {
    sportActionDefinition.action.mockReturnValue('my action object');
    showsActionDefinition.action.mockReturnValue('my action object');
    udnActionDefinition.action.mockReturnValue('my action object');
    const porpsObj = mapDispatchToProps(dispatch);
    porpsObj.getAllEvents();
    expect(getAllEvents.mock.calls[0][0].length).toBe(3);
  });
  it('should call dispatch with the right arguments', () => {
    const porpsObj = mapDispatchToProps(dispatch);
    const date = '01-10-2010';
    porpsObj.setDate(date);
    expect(setDate.mock.calls[0][0]).toBe(date);
    const channel = 'abc';
    porpsObj.setChannel(channel);
    expect(setChannel.mock.calls[0][0]).toBe(channel);
    const content = 'abc';
    porpsObj.setContent(content);
    expect(setContent.mock.calls[0][0]).toBe(content);
  });
});

describe('areStatePropsEqual', () => {
  it('should return the righ value', () => {
    expect(areStatePropsEqual({ ready: true }, { ready: true })).toBeFalsy();
    expect(areStatePropsEqual({ contentType: 'abc' }, { contentType: 'efg' })).toBeFalsy();
  });
});

describe('registerActions', () => {
  it('should return empty array', () => {
    sportActionDefinition.action.mockReturnValueOnce(null);
    showsActionDefinition.action.mockReturnValueOnce(null);
    udnActionDefinition.action.mockReturnValueOnce(null);
    expect(registerActions()).toHaveLength(0);
  });
});
