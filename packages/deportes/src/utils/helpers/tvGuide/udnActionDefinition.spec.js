import { NETWORK_UDN, NETWORK_DIGITAL } from '@univision/fe-commons/dist/constants/tvGuide';
import { TV_GUIDE_FETCH_UDN_EVENTS } from '@univision/fe-commons/dist/store/actions/tvguide/action-tv-guide-types';
import Store from '@univision/fe-commons/dist/store/store';
import data from '../../mocks/udn.json';
import udnActionDefinition from './udnActionDefinition';

Store.getState = jest.fn();
const date = '2018-12-07T12:00:00.000Z';
const channel = NETWORK_UDN;

jest.mock('@univision/fe-commons/dist/utils/api/request', () => jest.fn());

beforeEach(() => {
  const mockWindow = {
    location: {},
  };

  // Use jest.spyOn to mock the global window object
  const windowSpy = jest.spyOn(global, 'window', 'get');
  windowSpy.mockImplementation(() => mockWindow);

  Store.getState.mockReturnValue({
    tvGuide: {
      date,
      channel,
    },
  });
});

describe('udnActionDefinition channel, date and buildFetchUrl', () => {
  const constantDate = new Date('2018-12-07T12:00:00.000Z');
  const RealDate = Date;
  afterEach(() => {
    global.Date = RealDate;
  });
  it('should return the right channel, date and buildFetchUrl', () => {
    global.Date = jest.fn(
      () => new RealDate(constantDate)
    );
    expect(udnActionDefinition.constructor.date).toBe(date);
    expect(udnActionDefinition.constructor.channel).toBe(channel);
    expect(udnActionDefinition.buildFetchUrl()).toBe('/udn-tv-guide');
    expect(udnActionDefinition.constructor.weekDay).toBe('Friday');
    expect(udnActionDefinition.constructor.domain).toBe(channel);
  });
});

describe('udnActionDefinition action', () => {
  it('should return null if not able to build fetch url', () => {
    Store.getState.mockReturnValue({
      tvGuide: {
        date,
        channel: NETWORK_DIGITAL,
      },
    });
    expect(udnActionDefinition.action()).toBe(null);
  });
  it('should return function if able to build fetch url', () => {
    expect(udnActionDefinition.action().type).toBe(TV_GUIDE_FETCH_UDN_EVENTS);
  });
});

describe('udnActionDefinition formatted events', () => {
  it('should return object', () => {
    const dta2 = data.slice(0, 1);
    const mondayData = udnActionDefinition.formatEvents(dta2).Monday;
    expect(mondayData.length).toBe(24);
    expect(mondayData[5].type).toBe('shows');
  });
  it('should return empty object if array not made of objects', () => {
    const dta2 = ['test', 'test'];
    expect(udnActionDefinition.formatEvents(dta2)).toEqual({});
  });
});

describe('udnActionDefinition extractor', () => {
  it('should return empty array if not items in data', () => {
    expect(udnActionDefinition.extractor(null)).toEqual([]);
  });
  it('should return empty array events when data does match', () => {
    const dta2 = data.slice(0, 2);
    expect(udnActionDefinition.extractor(dta2)).toEqual([]);
  });
});

describe('udnActionDefinition setUnixTime', () => {
  it('should return null if time provided is not valid', () => {
    expect(udnActionDefinition.setUnixTime('2')).toEqual(null);
  });
});

describe('udnActionDefinition getEventsByDate', () => {
  const wEvents = {
    Friday: [
      { test: 'test' },
    ],
  };
  it('should return null if time provided is not valid', () => {
    expect(udnActionDefinition.getEventsByDate(wEvents)).toEqual([{ test: 'test' }]);
  });
});

describe('udnActionDefinition convertTo24h', () => {
  it('should return null if wrong time provided', () => {
    expect(udnActionDefinition.convertTo24('test')).toEqual(null);
  });
  it('should return null if wrong time format provided', () => {
    expect(udnActionDefinition.convertTo24('30 am')).toEqual(null);
  });
  it('should return correct time format for 10pm to 22h', () => {
    expect(udnActionDefinition.convertTo24('10:00 PM')).toEqual({ h: 22, m: '00' });
  });
  it('should return correct time format', () => {
    expect(udnActionDefinition.convertTo24('12:00 AM')).toEqual({ h: '00', m: '00' });
  });
});

describe('udnActionDefinition buildFetchUrl', () => {
  it('should return localhost domain if in storybook', () => {
    const mockWindow = {
      location: {
        host: 'localhost:601',
      },
    };
    // Use jest.spyOn to mock the global window object
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockImplementation(() => mockWindow);
    expect(udnActionDefinition.buildFetchUrl()).toBe('http://localhost:8080/udn-tv-guide');
  });
});

describe('udnActionDefinition checkIfLive', () => {
  const constantDate = new Date('2018-12-07T21:15:00Z').setHours(17, 15);
  const RealDate = Date;
  beforeEach(() => {
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    Object.assign(Date, RealDate);
  });
  afterEach(() => {
    global.Date = RealDate;
  });
  it('should return true if now time is within the range between hours', () => {
    Store.getState.mockReturnValue({
      tvGuide: {
        date: new Date(),
        channel,
      },
    });
    expect(udnActionDefinition.checkIfLive('5:00 pm', '6:00 pm')).toBe(true);
    expect(udnActionDefinition.checkIfLive('20:00 pm', '')).toBe(null);
  });
});

describe('udnActionDefinition getShowImage', () => {
  it('should return default image if show image not on json file', () => {
    expect(udnActionDefinition.getShowImage('Title')).toEqual('https://cdn3.uvnimg.com/07/06/bac3bf6b4d09bc2383772e377c4c/udn-guide-default.png');
  });
  it('should return url string if show image is available on json', () => {
    expect(udnActionDefinition.getShowImage('Contacto Deportivo')).toEqual('https://cdn4.uvnimg.com/55/3c/db9b14a042a3b53b134d9688e881/contacto-deportivo.png');
  });
});
