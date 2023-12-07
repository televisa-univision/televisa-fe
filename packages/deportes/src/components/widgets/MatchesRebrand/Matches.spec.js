import React from 'react';
import { mount, shallow } from 'enzyme';

import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import BreakPoint from '@univision/fe-commons/dist/utils/breakpoint/breakPointMediator';
import { CORE, UEFA } from '@univision/fe-commons/dist/constants/personalization';
import matchesExtractor from '@univision/shared-components/dist/extractors/matchesExtractor';
import features from '@univision/fe-commons/dist/config/features';
import * as redux from 'react-redux';
import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import mockMatches from '../../../utils/mocks/matches.json';
import eventGroupsMock from '../../../utils/mocks/eventGroups.json';
import leagues from '../../../utils/mocks/leagues.json';
import altLeagues from '../../../utils/mocks/altLeagues.json';
import Matches from '.';
import eventGroupMock from '../SoccerLive/eventsGroupMock.json';
import eventMock from './__mocks__/eventsMock.json';
/* global jsdom */

let matches = {
  events: [],
  error: false,
};
const actions = {
  getMatches: jest.fn(),
  getAllEvents: jest.fn(),
};

const teamData = {
  soccerTeamSeason: {
    teamName: 'Colombia',
    teamId: '832',
    soccerCompetitionSeason: {
      seasonId: '2014',
      seasonName: 'Season 2014/2015',
    },
  },
};

const simulate = {};
const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;

// Jest Mocks
jest.useFakeTimers();
helpers.isInViewport = jest.fn(() => true);
helpers.locationRedirect = jest.fn();
BreakPoint.getDevice = jest.fn(() => 'mobile');
features.deportes.isWorldCupMVP = jest.fn();

window.addEventListener = jest.fn((event, cb) => {
  simulate[event] = cb;
});

/**
 * Create a new Matches widget
 * @param {Object} props - additional props for creation
 * @param {function} createType - the creation type (mount/shallow)
 * @access private
 * @returns {JSX}
 */
const makeMatches = (props = {}, createType = shallow) => {
  let createTypeFn = createType;
  let extraProps = props;
  if (helpers.isValidFunction(props)) {
    createTypeFn = props;
    extraProps = {};
  }
  const element = (
    <Matches
      {...Object.assign({
        settings: {
          highlightedCompetitionSeasons: leagues,
        },
        getMatches: actions.getMatches,
        getAllEvents: actions.getAllEvents,
        matches,
        eventGroups: eventGroupsMock,
        ready: true,
        maxItemsReached: false,
      }, extraProps)}
    />
  );
  return createTypeFn(element);
};

describe('Matches widget tests', () => {
  beforeEach(() => {
    Store.dispatch(setPageData({}));
    jsdom.reconfigure({
      url: 'https://www.tudn.com',
    });
    helpers.locationRedirect.mockClear();
    matches = {
      ...matches,
      ...matchesExtractor(helpers.cloneDeep(mockMatches)),
    };
    actions.getMatches.mockClear();
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
    jest.clearAllMocks();
    jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());
    jest.spyOn(selectors, 'userLocationSelector').mockReturnValue('US');
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  it('should be rendered first tab with event', () => {
    const wrapper = makeMatches({
      settings: {
        highlightedCompetitionSeasons: leagues,
        highlightedAlternativeCompetitionSeasons: altLeagues,
      },
      matches: {
        ...matches,
        ready: true,
      },
    }, mount);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('ScoreCard')).toHaveLength(8);
  });

  it('should be rendered', () => {
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchesRebrand__ContentStyled')).toHaveLength(1);
    expect(wrapper.find('ScoreCard')).toHaveLength(2);
  });

  it('should be rendered with flag isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchesRebrand__ContentStyled')).toHaveLength(1);
  });

  it('should be rendered with flag isWorldCupMVP and props soccerlive', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = makeMatches({
      eventGroups: [],
      maxItemsReached: false,
      ready: true,
      matches: null,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);

    expect(wrapper.find('ApiError')).toHaveLength(1);
  });
  it('should be rendered with flag isWorldCupMVP and props soccerlive', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = makeMatches({
      eventGroups: eventGroupMock,
      maxItemsReached: false,
      ready: true,
      matches: null,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);

    expect(wrapper.find('ApiError')).toHaveLength(1);
  });
  it('should be rendered with flag isWorldCupMVP and props soccerlive', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = makeMatches({
      eventGroups: eventGroupMock,
      maxItemsReached: false,
      ready: true,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);

    expect(wrapper.state('active').data).toEqual(leagues[0]);
    expect(actions.getMatches).toHaveBeenCalled();
  });
  it('should be rendered with flag isWorldCupMVP and props soccerlive', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = makeMatches({
      eventGroups: eventGroupMock,
      maxItemsReached: false,
      ready: false,
      matches: {},
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);

    expect(wrapper.state('active').data).toEqual(leagues[0]);
    expect(actions.getMatches).toHaveBeenCalled();
  });
  it('should be rendered with flag isWorldCupMVP and props soccerlive', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = makeMatches({
      eventGroups: eventGroupMock,
      maxItemsReached: false,
      ready: false,
      matches,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);

    expect(wrapper.state('active').data).toEqual(leagues[0]);
    expect(actions.getMatches).toHaveBeenCalled();
  });
  it('should be rendered with flag isWorldCupMVP and props soccerlive', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = makeMatches({
      maxItemsReached: false,
      ready: true,
      matches,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);

    expect(wrapper.state('active').data).toEqual(leagues[0]);
    expect(actions.getMatches).toHaveBeenCalled();
  });
  it('should render error when have wrong matches data', () => {
    const wrapper = makeMatches({
      matches: null,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);

    expect(wrapper.find('ApiError')).toHaveLength(1);
  });

  it('should show the tabs with leagues for "uefa" profile', () => {
    const wrapper = makeMatches({
      profile: UEFA,
      settings: {
        highlightedAlternativeCompetitionSeasons: altLeagues,
      },
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const active = wrapper.state('active');
    expect(active.data).toEqual(altLeagues[0]);
  });

  it('should set active league when profile is updated', () => {
    const wrapper = makeMatches({
      settings: {
        highlightedCompetitionSeasons: leagues,
        highlightedAlternativeCompetitionSeasons: altLeagues,
      },
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');
    const setActiveLeagueSpy = jest.spyOn(wrapper.instance(), 'setActiveLeague');

    wrapper.setProps({ profile: UEFA });
    expect(setActiveLeagueSpy).toHaveBeenLastCalledWith(altLeagues[0]);
    expect(fetchMatchesSpy).toHaveBeenCalled();
    expect(wrapper.state('active').data).toEqual(altLeagues[0]);
  });

  it('should not set active league when is team and profile is updated', () => {
    const wrapper = makeMatches({
      settings: {
        ...teamData,
        highlightedAlternativeCompetitionSeasons: leagues,
        highlightedCompetitionSeasons: leagues,
      },
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');
    const setActiveLeagueSpy = jest.spyOn(wrapper.instance(), 'setActiveLeague');

    wrapper.setProps({ profile: UEFA });
    expect(setActiveLeagueSpy).toHaveBeenCalled();
    expect(fetchMatchesSpy).not.toHaveBeenCalled();
    expect(wrapper.state('active').data).toEqual(teamData.soccerTeamSeason);
  });

  it('should call matches for league', () => {
    const wrapper = makeMatches(mount);
    jest.spyOn(wrapper.instance(), 'changeLeagueHandler');
    jest.spyOn(wrapper.instance(), 'trackView');

    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);

    expect(wrapper.state('active').data).toEqual(leagues[0]);
    expect(actions.getMatches).toHaveBeenCalled();
  });

  it('should have a value selected in the dropdown', () => {
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(1).simulate('click', mockEvent);
    expect(wrapper.state('active')).toHaveProperty('dropdown', true);
    expect(wrapper.state('active')).toHaveProperty('data.soccerCompetition.id', '5');
  });

  it('should have use the short league name in the dropdown', () => {
    const wrapper = makeMatches(mount);
    Store.dispatch(setPageData({
      device: 'desktop',
    }));
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('option').at(0).text()).toBe('MX');
  });

  it('should call change handler when a tab is clicked', () => {
    const wrapper = makeMatches();
    const getLiveEventsSpy = jest.spyOn(wrapper.instance(), 'getLiveEvents');
    const trackViewSpy = jest.spyOn(wrapper.instance(), 'trackView');

    wrapper.find('.navItem').at(0).simulate('press', mockEvent);
    expect(getLiveEventsSpy).toHaveBeenCalledWith(mockEvent);
    expect(trackViewSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state('active')).toHaveProperty('tab', true);
    expect(wrapper.state('active')).toHaveProperty('data', 'Próximos');

    getLiveEventsSpy.mockClear();
    trackViewSpy.mockClear();
  });

  it('should call change handler when a dropdown is clicked', () => {
    const props = {
      matches,
    };
    const wrapper = makeMatches(props, mount);
    const changeLeagueHandlerSpy = jest.spyOn(wrapper.instance(), 'changeLeagueHandler');
    const trackViewSpy = jest.spyOn(wrapper.instance(), 'trackView');

    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    expect(changeLeagueHandlerSpy).toHaveBeenCalledWith(mockEvent, leagues[0], 'dropdown');
    expect(trackViewSpy).toHaveBeenCalledTimes(0);
    expect(wrapper.state('active')).toHaveProperty('dropdown', true);
    expect(wrapper.state('active')).toHaveProperty('data', leagues[0]);

    changeLeagueHandlerSpy.mockClear();
    trackViewSpy.mockClear();
  });

  it('should call change handler when a dropdown is clicked in Full version', () => {
    const props = {
      matches,
      settings: {
        highlightedCompetitionSeasons: leagues,
        displayType: {
          value: 'Full',
        },
      },
    };
    const wrapper = makeMatches(props, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const changeLeagueHandlerSpy = jest.spyOn(wrapper.instance(), 'changeLeagueHandler');

    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    expect(changeLeagueHandlerSpy).toHaveBeenCalledWith(mockEvent, leagues[0], 'dropdown');
    expect(wrapper.state('active')).toHaveProperty('dropdown', true);
    expect(wrapper.state('active')).toHaveProperty('data', leagues[0]);
    expect(wrapper.instance().initDate).toBeDefined();

    changeLeagueHandlerSpy.mockClear();
  });

  it('should call matchStatus handler and redirect to match URL in post event', () => {
    matches.events[0].status = 'post';
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const matchHandler = jest.spyOn(Matches.prototype, 'matchHandler');
    const wrapper = makeMatches({ matches }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const matchElement = wrapper.find('.match').at(0);

    matchElement.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(matchHandler).toHaveBeenCalledWith(matches.events[0]);
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('/futbol/uefa-champions-league')));
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      promo_name: 'matches-resumen',
    }));

    matchHandler.mockRestore();
    trackerSpy.mockRestore();
  });

  it('should call matchStatus handler and redirect to match URL in live event', () => {
    matches.events[0].status = 'live';
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const matchHandlerSpy = jest.spyOn(Matches.prototype, 'matchHandler');
    const wrapper = makeMatches({ matches }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const matchElement = wrapper.find('.match').at(0);

    matchElement.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(matchHandlerSpy).toHaveBeenCalledWith(matches.events[0]);
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('/futbol/uefa-champions-league')));
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      promo_name: 'matches-envivo',
    }));

    matchHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });

  it('should call matchStatus handler but not redirect if not have league uri', () => {
    const matchesTest = {
      events: [
        {
          url: null,
          status: 'live',
        },
      ],
      error: false,
    };
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const matchHandlerSpy = jest.spyOn(Matches.prototype, 'matchHandler');
    const wrapper = makeMatches({
      matchesTest,
      settings: {
        highlightedCompetitionSeasons: [
          {
            seasonId: '2017',
            seasonName: 'Season 2016/2017',
            soccerCompetition: {
              name: 'UEFA Champions League',
              id: '5',
            },
          },
        ],
      },
    }, mount);

    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const matchElement = wrapper.find('.match').at(0);

    matchElement.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(matchHandlerSpy).toHaveBeenCalledWith(matches.events[0]);

    matchHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });

  it('should not have matchStatus handler with wrong data', () => {
    matches.events[0].status = null;
    const wrapper = makeMatches({ matches }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const matchElement = wrapper.find('.match').at(0);

    expect(matchElement.props().onPress).toBeNull();
  });

  it('should call reminder handler when is clicked', () => {
    matches.events[0] = {};
    const props = {
      matches,
      settings: {
        reminder: true,
      },
    };
    const trackerSpy = spyOn(Tracker, 'fireEvent');
    const reminderHandlerSpy = jest.spyOn(Matches.prototype, 'reminderHandler');
    const wrapper = makeMatches(mount);

    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.setProps(props);
    const reminderElement = wrapper.find('.match').at(0);

    reminderElement.props().reminderOnPress(mockEvent);

    expect(reminderHandlerSpy).toHaveBeenCalledWith('964758');
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(wrapper.state('remind')).toContain('964758');

    // Call again to ensure only append one event by ID
    reminderElement.props().reminderOnPress(mockEvent);
    expect(wrapper.state('remind')).toEqual(['964758']);

    reminderHandlerSpy.mockRestore();
  });

  it('should be rendered with reminder enabled', () => {
    const props = {
      matches,
      settings: {
        reminder: true,
      },
    };
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.setProps(props);

    const { reminderOnPress } = wrapper.instance();

    expect(wrapper.find('ScoreCard').props).toHaveProperty('reminderOnPress', reminderOnPress);
  });

  it('should not show all matches button when display type is "Full"', () => {
    const wrapper = makeMatches({
      matches,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('.button')).toHaveLength(0);
  });

  it('should not render "SocoreCard" with invalid alignment', () => {
    matches.events[0].teams.home = {};

    const wrapper = makeMatches({
      matches,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('MatchesRebrand__ContentStyled')).toHaveLength(1);
    expect(wrapper.find('ScoreCard')).toHaveLength(1);
  });

  it('should not render "SocoreCard" with empty matches', () => {
    matches.events = [];

    const wrapper = makeMatches({
      matches,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('MatchesRebrand__ContentStyled')).toHaveLength(1);
    expect(wrapper.find('ScoreCard')).toHaveLength(0);
  });

  it('should not render "SocoreCard" with wrong events', () => {
    matches.events = null;

    const wrapper = makeMatches({
      matches,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('MatchesRebrand__ContentStyled')).toHaveLength(1);
    expect(wrapper.find('ScoreCard')).toHaveLength(0);
  });

  it('should not render "ScoreCard" without teams data', () => {
    matches.events[0].teams = null;
    const wrapper = makeMatches({
      matches,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('MatchesRebrand__ContentStyled')).toHaveLength(1);
    expect(wrapper.find('ScoreCard')).toHaveLength(1);
  });

  it('should render scoreCard with "medium" size', () => {
    Store.dispatch(setPageData({
      device: 'mobile',
    }));
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('ScoreCard').at(0).props()).toHaveProperty('size', 'small');
  });

  it('should show fallback message when not have matches events', () => {
    const wrapper = makeMatches({
      matches: {
        error: {
          statusCode: 404,
        },
      },
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('MatchesEvents')).toHaveLength(1);
  });
  it('should show fallback message when not have matches events matches error', () => {
    const wrapper = makeMatches(mount);
    const props = {
      matches: {
        error: {
          statusCode: 500,
        },
      },
    };
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.setProps(props);
    expect(wrapper.find('ApiError')).toHaveLength(1);
  });

  it('should show error message when have a unexpected error', () => {
    const wrapper = makeMatches({
      matches: {
        error: true,
      },
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('ApiError')).toHaveLength(1);
    expect(wrapper.find('ApiError').text()).toEqual('Ha ocurrido un error. Por favor regrese más tarde.');
  });

  it('should show fallback message when have a unexpected error and previous right data', () => {
    const wrapper = makeMatches({ matches }, mount);
    wrapper.setProps({
      matches: {
        error: true,
      },
    });
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('ApiError')).toHaveLength(1);
    expect(wrapper.find('ApiError').text()).toEqual('Ha ocurrido un error. Por favor regrese más tarde.');
  });

  it('should not fetch matches if have request or not have paging data', () => {
    const loadMoreHandlerSpy = jest.spyOn(Matches.prototype, 'loadMoreHandler');
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');

    wrapper.setState({ hasRequest: true });
    wrapper.instance().paging = null;
    wrapper.find('TabName[data-loader="prev"]').props().onPress(mockEvent);

    expect(loadMoreHandlerSpy).toHaveBeenCalled();
    expect(fetchMatchesSpy).not.toHaveBeenCalled();

    fetchMatchesSpy.mockRestore();
    loadMoreHandlerSpy.mockRestore();
  });

  it('should call loadMore handler and fetch the next week', (done) => {
    const loadMoreHandlerSpy = jest.spyOn(Matches.prototype, 'loaderContent');
    const wrapper = makeMatches(mount);
    const props = {
      settings: {
        displayType: {
          value: 'Full',
        },
      },
    };
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.setProps(props);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');
    wrapper.find('TabName[data-loader="next"]').props().onPress(mockEvent);
    jest.mock('lodash/debounce', () => jest.fn(fn => fn));
    process.nextTick(() => {
      expect(loadMoreHandlerSpy).toHaveBeenCalled();
      fetchMatchesSpy.mockRestore();
      loadMoreHandlerSpy.mockRestore();
      done();
    });
  });

  it('should call loadMore handler and fetch the prev week', () => {
    const loadMoreHandlerSpy = jest.spyOn(Matches.prototype, 'loadMoreHandler');
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');
    wrapper.setProps({
      matches: {
        paging: {
          next: { last: false },
        },
        events: matches.events,
      },
    });

    wrapper.instance().availableWeeks = [];
    wrapper.find('TabName[data-loader="prev"]').props().onPress(mockEvent);

    expect(loadMoreHandlerSpy).toHaveBeenCalled();
    expect(wrapper.state().hasRequest).toBe(true);
    expect(fetchMatchesSpy).toHaveBeenCalledWith(expect.objectContaining({
      offset: expect.any(Number),
    }), expect.objectContaining({
      direction: 'prev',
      events: expect.any(Array),
    }));

    fetchMatchesSpy.mockRestore();
    loadMoreHandlerSpy.mockRestore();
  });

  it('should call loadMore handler and fetch the next week ', () => {
    const loadMoreHandlerSpy = jest.spyOn(Matches.prototype, 'loadMoreHandler');
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');
    wrapper.setProps({
      matches: {
        paging: {
          next: { last: false },
        },
        events: matches.events,
      },
    });

    wrapper.instance().availableWeeks = [];
    wrapper.find('TabName[data-loader="next"]').props().onPress(mockEvent);

    expect(loadMoreHandlerSpy).toHaveBeenCalled();
    expect(wrapper.state().hasRequest).toBe(false);
    expect(fetchMatchesSpy).toHaveBeenCalledWith(expect.objectContaining({
      offset: expect.any(Number),
    }), expect.objectContaining({
      direction: 'next',
      events: expect.any(Array),
    }));

    fetchMatchesSpy.mockRestore();
    loadMoreHandlerSpy.mockRestore();
  });

  it('should call loadMore handler and fetch the next week pag default ', () => {
    const loadMoreHandlerSpy = jest.spyOn(Matches.prototype, 'loadMoreHandler');
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');
    wrapper.setProps({
      matches: {
        paging: {},
        events: matches.events,
      },
    });

    wrapper.instance().availableWeeks = [];
    wrapper.find('TabName[data-loader="next"]').props().onPress(mockEvent);

    expect(loadMoreHandlerSpy).toHaveBeenCalled();
    expect(wrapper.state().hasRequest).toBe(false);
    expect(fetchMatchesSpy).toHaveBeenCalledWith(expect.objectContaining({
      offset: expect.any(Number),
    }), expect.objectContaining({
      direction: 'next',
      events: expect.any(Array),
    }));

    fetchMatchesSpy.mockRestore();
    loadMoreHandlerSpy.mockRestore();
  });

  it('should call loadMore handler and fetch if not have events', () => {
    const loadMoreHandlerSpy = jest.spyOn(Matches.prototype, 'loadMoreHandler');
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.setProps({
      matches: {
        events: [],
      },
      settings: {
        displayType: {
          value: 'Full',
        },
      },
    });
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');
    wrapper.find('TabName[data-loader="prev"]').props().onPress(mockEvent);

    expect(loadMoreHandlerSpy).toHaveBeenCalled();
    expect(wrapper.state().hasRequest).toBe(true);

    wrapper.setProps({ matches });
    wrapper.update();

    fetchMatchesSpy.mockRestore();
    loadMoreHandlerSpy.mockRestore();
  });

  it('should show the next week and not fetch if have available data', () => {
    const loadMoreHandlerSpy = jest.spyOn(Matches.prototype, 'loadMoreHandler');
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.setState({ activeWeek: 8 });
    wrapper.find('TabName[data-loader="next"]').props().onPress(mockEvent);

    expect(loadMoreHandlerSpy).not.toHaveBeenCalled();
    expect(wrapper.state().hasRequest).toBe(false);
    expect(wrapper.state().activeWeek).toBe(7);

    loadMoreHandlerSpy.mockRestore();
  });

  it('should not fetch matches if loadMore handler is called with wrong position', () => {
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const instance = wrapper.instance();
    const fetchMatchesSpy = jest.spyOn(instance, 'fetchMatches');

    instance.loadMoreHandler();

    expect(wrapper.state().hasRequest).toBe(false);
    expect(fetchMatchesSpy).not.toHaveBeenCalled();

    fetchMatchesSpy.mockRestore();
  });

  it('should set last week if the props "showLast" is true', () => {
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.setProps({
      matches: {
        ...matches,
        showLast: true,
      },
    });
    const { availableWeeks } = wrapper.instance();
    expect(wrapper.state().activeWeek).toBe(availableWeeks[availableWeeks.length - 1]);
  });

  it('should fetch matches with paging size', () => {
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');

    wrapper.instance().paging = { prev: { size: 50, number: 1, last: false } };
    wrapper.instance().loadMoreHandler('prev');

    expect(fetchMatchesSpy).toHaveBeenCalledWith(expect.objectContaining({
      offset: 100,
    }), expect.objectContaining({
      direction: 'prev',
      events: expect.any(Array),
    }));

    fetchMatchesSpy.mockRestore();
  });

  it('should fetch matches with default paging value', () => {
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');

    wrapper.instance().paging = { prev: null, next: null };
    wrapper.instance().loadMoreHandler('prev');

    expect(fetchMatchesSpy).toHaveBeenCalledWith(expect.objectContaining({
      offset: 0,
    }), expect.objectContaining({
      direction: 'prev',
    }));
    wrapper.instance().hasRequest = false;
    fetchMatchesSpy.mockClear();

    wrapper.instance().loadMoreHandler('next');
  });

  it('should not fetch matches if is the last page', () => {
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');

    wrapper.instance().paging = { prev: { last: true } };
    wrapper.instance().loadMoreHandler('prev');

    expect(wrapper.state().hasRequest).toBe(false);
    expect(fetchMatchesSpy).not.toHaveBeenCalled();

    fetchMatchesSpy.mockRestore();
  });

  it('should not fetch when events data is null', () => {
    const wrapper = makeMatches({
      matches: null,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const fetchMatchesSpy = jest.spyOn(wrapper.instance(), 'fetchMatches');

    wrapper.instance().loadMoreHandler('prev');

    expect(fetchMatchesSpy).not.toHaveBeenCalled();
  });

  it('should setActiveWeek and track from last week if activeWeek is empty', () => {
    const wrapper = makeMatches({ matches: { events: [] } }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const instance = wrapper.instance();
    const setActiveWeekSpy = jest.spyOn(instance, 'setActiveWeek');
    const trackViewSpy = jest.spyOn(instance, 'trackView');
    wrapper.instance().firstLoad = false;
    wrapper.setProps({
      matches,
    });
    expect(setActiveWeekSpy).toHaveBeenCalled();
    expect(trackViewSpy).toHaveBeenCalled();
  });

  it('should call setActiveWeek on weekHandler if have active/valid week number', (done) => {
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const instance = wrapper.instance();
    const setActiveWeekSpy = jest.spyOn(instance, 'setActiveWeek');
    const loadMoreHandlerSpy = jest.spyOn(instance, 'loadMoreHandler');

    wrapper.setState({ activeWeek: 7 });
    jest.mock('lodash/debounce', () => jest.fn(fn => fn));
    process.nextTick(() => {
      setActiveWeekSpy.mockClear();
      loadMoreHandlerSpy.mockClear();
      wrapper.find('TabName[data-loader="prev"]').props().onPress(mockEvent);

      expect(wrapper.state().hasRequest).toBe(false);
      expect(setActiveWeekSpy).toHaveBeenCalledWith(8);
      expect(loadMoreHandlerSpy).not.toHaveBeenCalled();
      done();
    });
  });

  it('should call trackView even if not have right data', () => {
    const wrapper = makeMatches({
      matches: null,
    }, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const trackViewSpy = jest.spyOn(wrapper.instance(), 'trackView');
    wrapper.instance().firstLoad = false;
    wrapper.instance().setActiveWeek(2);
    expect(trackViewSpy).toHaveBeenCalled();
  });

  it('should render correctly on tablet size', () => {
    Store.dispatch(setPageData({
      device: 'tablet',
    }));
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper).toHaveLength(1);
  });
  it('should render correctly with slotad and refresh ad true', () => {
    const wrapper = makeMatches(mount);
    wrapper.instance().slotAdId = true;
    wrapper.instance().refreshAd = true;
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper).toHaveLength(1);
  });
  it('should display ad if more than 2 events in the week', (done) => {
    const events = mockMatches['sports-content'].schedule[0]['sports-event'];
    const setAdSlotSpy = jest.spyOn(Matches.prototype, 'setAdSlot');
    const mockMatchesExtended = {
      'sports-content': {
        schedule: [
          {
            'sports-event': [
              ...events,
              ...Array(3).fill(events[0]),
            ],
          },
        ],
      },
    };
    const wrapper = makeMatches(mount, { matches: matchesExtractor(mockMatchesExtended) });
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.setState({ activeWeek: 8 });
    jest.runOnlyPendingTimers();
    process.nextTick(() => {
      expect(wrapper.find('AdWrapper')).toHaveLength(1);
      expect(setAdSlotSpy).toHaveBeenCalledWith(expect.stringMatching('div-gpt-ad-*'));
      expect(wrapper.instance().slotAdId).not.toBeNull();
      done();
    });
  });

  it('should display MLS ad if league is MLS', () => {
    const props = {
      matches,
      settings: {
        highlightedCompetitionSeasons: [altLeagues[3]],
        displayType: {
          value: 'Full',
        },
        useSponsor: true,
      },
    };
    const wrapper = makeMatches(props, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('Sponsor')).toHaveLength(1);
  });
  it('renders rebranded components as expected with tudn theme', () => {
    const wrapper = makeMatches(mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('TabName').first().props().isTudn).toBe(true);
    expect(wrapper.find('Button').first().props().isTudn).toBe(true);
  });
  it('should call get tudn uri', () => {
    matches.events[0].url = null;
    matches.events[0].status = 'post';
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const matchHandlerSpy = jest.spyOn(Matches.prototype, 'matchHandler');
    const wrapper = makeMatches({
      matches,
    }, mount);

    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const matchElement = wrapper.find('.match').at(0);

    matchElement.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(matchHandlerSpy).toHaveBeenCalledWith(matches.events[0]);
    const active = wrapper.state('active');
    expect(active.data).toEqual(leagues[0]);
    matchHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });
  it('should call get tudn  without uri', () => {
    matches.events[0].url = null;
    matches.events[0].status = 'post';
    leagues[0].soccerCompetition.league.uri = null;
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const matchHandlerSpy = jest.spyOn(Matches.prototype, 'matchHandler');
    const wrapper = makeMatches({
      matches,
    }, mount);

    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    const matchElement = wrapper.find('.match').at(0);

    matchElement.props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(matchHandlerSpy).toHaveBeenCalledWith(matches.events[0]);
    const active = wrapper.state('active');
    expect(active.data).toEqual(leagues[0]);
    matchHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });
  it('should has data error', () => {
    const matchTest = {
      events: [],
      error: {
        statusCode: 500,
      },
    };
    matches = {
      ...matchTest,
      ...matchesExtractor(helpers.cloneDeep(mockMatches)),
    };
    const wrapper = makeMatches(mount);
    wrapper.setProps(matches);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    expect(wrapper.find('MatchesEvents')).toHaveLength(1);
  });
  it('should be rendered first tab without teamId and valid leagues', () => {
    const props = {
      settings: {
        soccerTeamSeason: {
          teamId: null,
        },
        highlightedCompetitionSeasons: leagues,
        profile: UEFA,
      },
    };
    const wrapper = makeMatches(props, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);

    wrapper.setProps(props);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchesEvents')).toHaveLength(1);
  });
  it('should be rendered first tab without teamId and valid leagues', () => {
    const props = {
      settings: {
        soccerTeamSeason: {
          teamId: null,
        },
        highlightedCompetitionSeasons: [],
        profile: UEFA,
      },
    };
    const wrapper = makeMatches(props, mount);
    expect(wrapper).toHaveLength(1);
  });
  it('should be rendered first tab without teamId', () => {
    const props = {
      settings: {
        soccerTeamSeason: {
          teamName: 'Colombia',
          teamId: null,
          soccerCompetitionSeason: {
            seasonId: '2014',
            seasonName: 'Season 2014/2015',
          },
        },
        highlightedAlternativeCompetitionSeasons: leagues,
        highlightedCompetitionSeasons: leagues,
        profile: CORE,
      },
    };
    const wrapper = makeMatches(props, mount);
    wrapper.find('LeagueDropdown').find('button').at(1).simulate('click', mockEvent);
    wrapper.find('.dropDownList').childAt(0).simulate('click', mockEvent);
    wrapper.setProps(props);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchesEvents')).toHaveLength(1);
  });
  it('should not render "toggle button" wirh ended matches', () => {
    matches.events = eventMock.events;
    const wrapper = makeMatches({
      matches: {
        ...matches,
        ready: true,
      },
    }, mount);
    wrapper.setState({ showEndedMatches: true });
    expect(wrapper.find('ShowEndedMatchesButton')).toHaveLength(1);
  });
  it('should render "toggle button" and click it', () => {
    matches.events = eventMock.events;
    const wrapper = makeMatches({
      matches: {
        ...matches,
        ready: true,
      },
    }, mount);
    wrapper.setState({ showEndedMatches: true });
    expect(wrapper.find('ShowEndedMatchesButton')).toHaveLength(1);
    wrapper.find('ShowEndedMatchesButton').find('button').at(0).simulate('click', mockEvent);
  });
  // Unit testing to increase coverage
  describe('setActiveWeek', () => {
    let trackViewSpy;

    beforeEach(() => {
      trackViewSpy = jest.spyOn(Matches.prototype, 'trackView')
        .mockImplementation(jest.fn());
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should call trackView when changing week and shouldTrackLeague is true', () => {
      const wrapper = makeMatches(mount);
      const instance = wrapper.instance();
      instance.firstLoad = false;
      instance.shouldTrackLeague = true;
      instance.setActiveWeek(2);

      expect(trackViewSpy).toHaveBeenCalled();
    });

    it('should not call trackView when changing week shouldTrackLeague is false', () => {
      const wrapper = makeMatches(mount);
      const instance = wrapper.instance();
      instance.firstLoad = true;
      instance.shouldTrackLeague = false;
      instance.setActiveWeek(2);

      expect(trackViewSpy).not.toHaveBeenCalled();
    });
  });

  describe('fetchMatches', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should query teams when a team is active in the nav', () => {
      const wrapper = makeMatches(mount);
      const instance = wrapper.instance();
      instance.setState({
        active: {
          team: true,
          data: {
            teamId: 1,
            seasonId: 1,
          },
        },
      });
      instance.fetchMatches({}, null);

      expect(actions.getMatches).toHaveBeenCalledWith(
        expect.objectContaining({ teamKey: 1 }),
        null
      );
    });

    it('should query by soccer competition', () => {
      const wrapper = makeMatches(mount);
      const instance = wrapper.instance();
      instance.setState({
        active: {
          team: false,
          data: {
            teamId: 1,
            seasonId: 1,
            soccerCompetition: { id: 1 },
          },
        },
      });
      instance.fetchMatches({}, null);

      expect(actions.getMatches).toHaveBeenCalledWith(
        expect.objectContaining({ competitionKey: 1 }),
        null
      );
    });
  });
});

describe('renderTitle', () => {
  it('should render right round type', () => {
    expect(Matches.renderTitle([{ round: 'Round' }], 1, '6')).toBe('Jornada 1');
    expect(Matches.renderTitle([], null, '1')).toBe('Jornadas');
    expect(Matches.renderTitle([{ round: null }], 2, '199')).toBe('Jornada 2');
    expect(Matches.renderTitle([{ round: 'Test' }], null, '5')).toBe('Jornadas');
    expect(Matches.renderTitle([
      { round: 'Quarter-Finals', fixture: 'Vuelta' },
    ], null, '5')).toBe('Cuartos de final - Vuelta');
    expect(Matches.renderTitle([{ round: 'Semi-Finals' }], null, '5')).toBe('Semifinal');
    expect(Matches.renderTitle([{ round: 'Round of 32' }], 19, '6')).toBe('16avos de final');
  });
});
