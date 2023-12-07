import React from 'react';
import { shallow, mount } from 'enzyme';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import bracketsExtractor from '@univision/shared-components/dist/extractors/bracketsExtractor';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import * as SportsTracker from '@univision/fe-commons/dist/utils/tracking/tealium/sports/SportsTracker';
import tournamentData from '../../../utils/mocks/tournamentCopaOro.json';
import tournamentLive from '../../../utils/mocks/tournamentLiveMatches.json';
import groupstandings from '../../../utils/mocks/groupStandings.json';
import standingsData from '../../../utils/mocks/standingsBrackets.json';
import tournamentUFC from '../../../utils/mocks/tournamentUFC.json';
import copaMxData from '../../../utils/mocks/copaMxBrackets.json';

import Brackets from '.';

const store = configureStore();
const props1 = {
  data: {
    tournamentData: bracketsExtractor(tournamentData),
    standingsData: standingsExtractor(standingsData),
  },
  getBrackets: () => {
  },
  settings: {
    soccerLeague: {
      seasonId: '2019',
      soccerCompetition: {
        name: 'Copa Oro',
        id: '7',
      },
    },
  },
};

const props2 = {
  data: {
    tournamentData: bracketsExtractor(tournamentUFC),
    standingsData: standingsExtractor(groupstandings),
  },
  getBrackets: () => {},
};

const props3 = {
  data: {
    tournamentData: bracketsExtractor(copaMxData),
    standingsData: standingsExtractor(groupstandings),
  },
  settings: {
    noStandings: true,
    inBracketsPhase: true,
  },
  getBrackets: () => {},
};

const liveProps = {
  data: {
    tournamentData: bracketsExtractor(tournamentLive),
    standingsData: standingsExtractor(groupstandings),
  },
};

const incompleteProps = {
  data: {
    tournamentData: bracketsExtractor(tournamentData),
    standingsData: [],
  },
};

const wrongData = {
  data: {},
};

jest.useFakeTimers();

const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;

storeHelpers.getDevice = jest.fn();
storeHelpers.getPageUrl = jest.fn();

jest.mock('@univision/fe-commons/dist/utils/tracking/tealium/sports/SportsTracker', () => {
  return {
    track: jest.fn(),
    events: {
      pageView: jest.fn(),
    },
  };
});

describe('Brackets component tests', () => {
  beforeEach(() => {
    storeHelpers.getDevice.mockReturnValue('mobile');
  });
  afterAll(() => {
    jest.clearAllTimers();
  });
  it('returns null if the component has incomplete props', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<Brackets {...incompleteProps} />);
    expect(wrapper.getElement()).toBeNull();
  });
  it('renders as expected with default props', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = mount(<Brackets />);
    expect(wrapper.find('Brackets__FullWidthStyled')).toHaveLength(1);
  });
  it('renders as expected on desktop', () => {
    storeHelpers.getDevice.mockReturnValue('desktop');
    const wrapper = shallow(<Brackets {...props2} />);
    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
    expect(wrapper.find('TournamentPhase')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(2);
  });
  it('should call toggleActiveTab when groups phase button is clicked on Desktop', () => {
    storeHelpers.getDevice.mockReturnValue('desktop');
    const wrapper = shallow(<Brackets {...props1} />);
    const toggleActiveTabSpy = jest.spyOn(wrapper.instance(), 'toggleActiveTab');
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    wrapper.find('.firstButton').simulate('press', mockEvent);
    expect(toggleActiveTabSpy).toHaveBeenCalledWith('groupPhase');
    expect(trackerSpy).not.toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call toggleActiveTab when brackets button is clicked on Desktop', () => {
    storeHelpers.getDevice.mockReturnValue('desktop');
    const wrapper = shallow(<Brackets {...props1} />);
    const toggleActiveTabSpy = jest.spyOn(wrapper.instance(), 'toggleActiveTab');
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    wrapper.find('.secondButton').simulate('press', mockEvent);
    expect(toggleActiveTabSpy).toHaveBeenCalledWith('brackets');
    expect(trackerSpy).not.toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call toggleActiveTab on Desktop with live events and no getBrackets defined', () => {
    storeHelpers.getDevice.mockReturnValue('desktop');
    const wrapper = shallow(<Brackets {...tournamentLive} />);
    const toggleActiveTabSpy = jest.spyOn(wrapper.instance(), 'toggleActiveTab');
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    wrapper.find('.secondButton').simulate('press', mockEvent);
    expect(toggleActiveTabSpy).toHaveBeenCalledWith('brackets');
    expect(trackerSpy).not.toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should call getBrackets function if called from group phase', () => {
    storeHelpers.getDevice.mockReturnValue('desktop');
    const getBracketsMock = jest.fn();
    const wrapper = shallow(<Brackets
      data={props1.data}
      getBrackets={getBracketsMock}
      settings={{
        inBracketsPahse: false,
        soccerLeague: {
          seasonId: '2019',
          soccerCompetition: {
            name: 'Copa Oro',
            id: '7',
          },
        },
      }}
    />);
    const toggleActiveTabSpy = jest.spyOn(wrapper.instance(), 'toggleActiveTab');
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    wrapper.find('.firstButton').simulate('press', mockEvent);
    expect(wrapper.state('activeTab')).toEqual('groupPhase');
    wrapper.find('.secondButton').simulate('press', mockEvent);
    expect(toggleActiveTabSpy).toHaveBeenCalledWith('brackets');
    expect(trackerSpy).not.toHaveBeenLastCalledWith(expect.any(Object));
    expect(getBracketsMock).toHaveBeenCalled();
  });
  it('should track view when change tab is called', () => {
    storeHelpers.getDevice.mockReturnValue('desktop');
    const wrapper = shallow(<Brackets
      data={props1.data}
      getBrackets={() => {}}
      settings={{
        inBracketsPahse: false,
        soccerLeague: {
          seasonId: '2019',
          soccerCompetition: {
            name: 'Copa Oro',
            id: '7',
          },
        },
      }}
    />);

    const toggleActiveTabSpy = jest.spyOn(wrapper.instance(), 'toggleActiveTab');

    wrapper.find('.firstButton').simulate('press', mockEvent);
    wrapper.setProps({ ...props2 });

    expect(toggleActiveTabSpy).toHaveBeenCalled();
  });
  it('renders as expected on mobile', () => {
    store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = shallow(<Brackets {...props2} />);
    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
    expect(wrapper.find('Brackets__MobileNav')).toHaveLength(1);
    expect(wrapper.find('TournamentPhase')).toHaveLength(1);
  });
  it('renders as expected with no groupPhase/standings with only nav for mobile', () => {
    const wrapper = shallow(<Brackets {...props3} />);
    expect(wrapper.find('.uvs-widget')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(4);
  });
  it('should call toggleActiveTab when mobile nav button is clicked', () => {
    const wrapper = shallow(<Brackets {...props1} />);
    const toggleActiveTabSpy = jest.spyOn(wrapper.instance(), 'toggleActiveTab');
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');

    wrapper.find('Button').at(1).simulate('press', mockEvent);
    expect(toggleActiveTabSpy).toHaveBeenCalledWith('phaseQuarterFinals');
    expect(trackerSpy).not.toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should init a timer on Mount', () => {
    const wrapper = shallow(<Brackets {...liveProps} getBrackets={() => {}} />);
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().timer).toBeDefined();
  });
  it('calls update after 60 seconds when component mounts if it has live events', () => {
    const wrapper = mount(<Brackets {...liveProps} getBrackets={() => {}} />);
    const timeTest = jest.fn();
    const instance = wrapper.instance();
    instance.updateBrackets = timeTest;
    instance.componentDidMount();
    expect(timeTest).not.toBeCalled();
    jest.runTimersToTime(60000);
    expect(timeTest).toBeCalled();
  });
  it('calls timer cancel on unmount', () => {
    const wrapper = mount(<Brackets {...liveProps} getBrackets={() => {}} />);
    const timeTest = jest.fn();
    wrapper.instance().timer.cancel = timeTest;
    wrapper.unmount();
    expect(timeTest).toBeCalled();
  });
  it('returns null if has bad data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<Brackets {...wrongData} />);
    expect(wrapper.getElement()).toBeNull();
  });
  it('should call SportsTracker.track with correct analyticsData when data is present with standingsData', () => {
    // Mock data with standingsData
    const mockData = {
      standingsData: {
        analytics: { someData: 'standingsDataAnalytics' },
      },
      tournamentData: {},
    };

    // Create the wrapper with the mock data
    const wrapper = shallow(<Brackets {...props1} data={mockData} />);
    const instance = wrapper.instance();
    const { props } = instance;
    // Call the trackView method
    instance.trackView();
    expect(Object.keys(props.data.tournamentData).length).toBe(0);
    expect(props.data.standingsData.analytics.someData)
      .toEqual(
        mockData.standingsData.analytics.someData
      );
    // Expect that SportsTracker.track was called with the correct event and analyticsData
    expect(SportsTracker.track)
      .toHaveBeenCalledWith(
        SportsTracker.events.pageView,
        mockData.standingsData.analytics
      );
  });
  it('should call SportsTracker.track with correct analyticsData when data is present with tournamentData', () => {
    // Mock data with standingsData
    const mockData = {
      standingsData: {},
      tournamentData: {
        analytics: { someData: 'tournamentDataAnalytics' },
      },
    };

    // Create the wrapper with the mock data
    const wrapper = shallow(<Brackets {...props1} data={mockData} />);
    const instance = wrapper.instance();
    const { props } = instance;
    // Call the trackView method
    instance.trackView();
    expect(Object.keys(props.data.standingsData).length).toBe(0);
    expect(props.data.tournamentData.analytics.someData)
      .toEqual(mockData.tournamentData.analytics.someData);
    // Expect that SportsTracker.track was called with the correct event and analyticsData
    expect(SportsTracker.track)
      .toHaveBeenCalledWith(
        SportsTracker.events.pageView,
        mockData.tournamentData.analytics
      );
  });
  it('should call SportsTracker.track with undefined analyticsData', () => {
    // Mock data with standingsData
    const mockData = {
      standingsData: null,
      tournamentData: null,
    };

    // Create the wrapper with the mock data
    const wrapper = shallow(<Brackets {...props1} data={mockData} />);
    const instance = wrapper.instance();
    const { props } = instance;
    // Call the trackView method
    instance.trackView();
    expect(props.data.standingsData).toBeNull();
    expect(props.data.tournamentData).toBeNull();
    // Expect that SportsTracker.track was called with undefined analyticsData
    expect(SportsTracker.track).toHaveBeenCalledWith(SportsTracker.events.pageView, undefined);
  });
});

describe('getActiveLegEvents', () => {
  const RealDate = Date;
  const matches = [
    { fixture: 'Ida', date: '2018-01-29T21:10:00Z' },
    { fixture: 'Vuelta', date: '2018-02-02T21:10:00Z' },
  ];
  afterEach(() => {
    global.Date = RealDate;
  });
  it('should return data passed if not valid array', () => {
    expect(Brackets.getActiveLegEvents([])).toEqual([]);
  });
  it('should return data if not valid objects in array', () => {
    expect(Brackets.getActiveLegEvents(['1', '2'])).toEqual(['1', '2']);
  });
  it('should return games with first leg fixture if within date range', () => {
    const constantDate = new Date('2018-01-29T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActiveLegEvents(matches)).toEqual([{ fixture: 'Ida', date: '2018-01-29T21:10:00Z' }]);
  });
  it('should return games with second leg fixture if within date range', () => {
    const constantDate = new Date('2018-02-02T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActiveLegEvents(matches)).toEqual([{ fixture: 'Vuelta', date: '2018-02-02T21:10:00Z' }]);
  });
  it('should return first leg games if date is before either leg events', () => {
    const constantDate = new Date('2018-01-06T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActiveLegEvents(matches)).toEqual([{ fixture: 'Ida', date: '2018-01-29T21:10:00Z' }]);
  });
});

describe('getActivePhase', () => {
  const RealDate = Date;
  const data = {
    roundOf16: [{ date: '2018-01-02T21:10:00Z' }],
    quarterFinals: [{ date: '2018-01-03T21:10:00Z' }],
    semiFinals: [{ date: '2018-01-04T21:10:00Z' }],
    finals: [{ date: '2018-01-05T21:10:00Z' }],
  };
  afterEach(() => {
    global.Date = RealDate;
  });
  it('should return group phase if current date does not matches any tournament phases', () => {
    const constantDate = new Date('2018-01-01T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActivePhase(data, false)).toEqual('groupPhase');
  });
  it('should return roundOf 16 phase if current date matches round of 16 phase', () => {
    const roundOf16Date = new Date('2018-01-02T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(roundOf16Date))
    );
    expect(Brackets.getActivePhase(data, false)).toEqual('phaseRoundOf16');
  });
  it('should return quarter finals phase if current date matches quarter finals phase', () => {
    const constantDate = new Date('2018-01-03T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActivePhase(data, false)).toEqual('phaseQuarterFinals');
  });
  it('should return semi finals phase if current date matches semi finals phase', () => {
    const constantDate = new Date('2018-01-04T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActivePhase(data, false)).toEqual('phaseSemiFinals');
  });
  it('should return finals phase if current date matches finals phase', () => {
    const constantDate = new Date('2018-01-05T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActivePhase(data, false)).toEqual('phaseFinal');
  });
  it('should return brackets phase if current date matches  phase', () => {
    store.dispatch(setPageData({
      device: 'desktop',
    }));
    const constantDate = new Date('2018-02-05T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActivePhase(data, false)).toEqual('brackets');
  });
  it('should return brackets phase if reciev true in settings phase', () => {
    store.dispatch(setPageData({
      device: 'desktop',
    }));
    const constantDate = new Date('2018-01-01T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActivePhase(data, true)).toEqual('brackets');
  });
  it('should return round of 16 phase if recieve true inBracketPhase and in mobile', () => {
    store.dispatch(setPageData({
      device: 'mobile',
    }));
    const constantDate = new Date('2018-01-01T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    expect(Brackets.getActivePhase(data, true)).toEqual('phaseRoundOf16');
  });
  it('should return quarter finals phase if recieve true inBracketPhase and in mobile', () => {
    store.dispatch(setPageData({
      device: 'mobile',
    }));
    const constantDate = new Date('2018-01-01T21:10:00Z');
    global.Date = jest.fn(
      (...props) => (props.length
        ? new RealDate(...props)
        : new RealDate(constantDate))
    );
    data.roundOf16 = [];
    expect(Brackets.getActivePhase(data, true)).toEqual('phaseQuarterFinals');
  });
});

describe('sortData', () => {
  const data = bracketsExtractor(copaMxData);
  it('should return data ordered for copa mx', () => {
    expect(Brackets.sortData(data.roundOf16, '775')).toEqual(expect.arrayContaining([expect.objectContaining(
      {
        away: {
          abbreviatedName: 'CFC',
          fullName: 'Celaya',
          id: '6668',
          imageURI: 'https://cdn7.uvnimg.com/univision-media/image/upload/v1531872549/prod/sports/teams_logos/6668.svg',
          isWinner: false,
          scoreValue: {
            firstLeg: 3,
            penalty: null,
            score: 0,
          },
          url: '/deportes/futbol/celaya',
        },
      }
    )]));
  });
});
