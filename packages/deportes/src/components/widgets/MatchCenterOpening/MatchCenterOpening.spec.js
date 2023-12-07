import React from 'react';
import debounce from 'lodash.debounce';
import { mount, shallow } from 'enzyme';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import matchCenterExtractor from '@univision/shared-components/dist/extractors/matchCenterExtractor';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import features from '@univision/fe-commons/dist/config/features';

import soccerMatchNavDefinitions from '../../../utils/layoutWidgets/matchCenter/soccerMatchNavDefinitions';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import mockMatch from '../../../utils/mocks/match.json';
import MatchCenterOpening from '.';

const defaultProps = {
  settings: {
    matchId: '919268',
  },
  match: {},
};
const simulate = {};
const mockActions = {
  getMatch: jest.fn(),
};
const mockEvent = {
  preventDefault: jest.fn(),
};

const scorerProps = {
  scorersAway: [
    { id: 1, player: 'Paul Pogba', minutesElapsed: '20' },
    { id: 3, player: 'Octavio Rivero', minutesElapsed: '40' },
  ],
  scorersHome: [
    {
      id: 2, player: 'James Milner', minutesElapsed: '15', playerUrl: 'http://www.tudn.com/jugadores/james-milner',
    },
    { id: 4, player: 'James Milner', minutesElapsed: '18' },
  ],
};

/**
 * Create a new MatchCenterOpening widget
 * @param {Object} props - additional props for creation
 * @param {function} createType - the function creation
 * @access private
 * @returns {JSX}
 */
const makeMatchCenterOpening = (props = {}, createType = shallow) => {
  let createTypeFn = createType;
  let newProps = props;

  if (helpers.isValidFunction(props)) {
    createTypeFn = props;
    newProps = {};
  }
  const element = (
    <MatchCenterOpening
      {...Object.assign({}, defaultProps, newProps, mockActions)}
    />
  );
  return createTypeFn(element);
};

// Jest Mocks
window.addEventListener = jest.fn((event, cb) => {
  simulate[event] = cb;
});

jest.useFakeTimers();
jest.mock('lodash.debounce', () => jest.fn(fn => fn));
helpers.locationRedirect = jest.fn();

// Test cases
describe('MatchCenterOpening widget tests', () => {
  afterAll(() => {
    jest.clearAllTimers();
    debounce.mockClear();
  });

  beforeEach(() => {
    global.innerWidth = 1024;
    helpers.locationRedirect.mockClear();
    debounce.mockClear();
    clearInterval.mockClear();
    mockActions.getMatch.mockClear();
    defaultProps.match = JSON.parse(JSON.stringify(matchCenterExtractor(mockMatch)));
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
  });

  it('should be rendered', () => {
    const wrapper = makeMatchCenterOpening();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchCenterOpening__ContainerStyled')).toHaveLength(1);
    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled')).toHaveLength(1);
    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props()).toHaveProperty('fixture', null);
    expect(mockActions.getMatch).toHaveBeenCalledTimes(1);
  });

  it('should be rendered the compact version', () => {
    defaultProps.match.fixture = 'Ida';
    const wrapper = makeMatchCenterOpening(Object.assign({
      settings: {
        compact: true,
      },
    }, defaultProps.settings), mount);

    const opening = wrapper.find('MatchCenterOpening__HeaderScoreCardStyled');
    expect(wrapper).toHaveLength(1);
    expect(opening.props()).toHaveProperty('isCompact', true);
    expect(opening).toHaveStyleRule('margin');
  });

  it('should render the Microdata', () => {
    const wrapper = makeMatchCenterOpening();

    expect(wrapper.find('Microdata')).toHaveLength(1);
  });

  it('should be rendered correctly without settings', () => {
    const wrapper = makeMatchCenterOpening({
      settings: null,
      match: defaultProps.match,
    });

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('MatchCenterOpening__ContainerStyled')).toHaveLength(1);
    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled')).toHaveLength(1);
    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props()).toHaveProperty('fixture', null);
  });

  it('should be rendered without fixture when not have event type', () => {
    defaultProps.match.status = 'pre';
    defaultProps.match.type = null;
    const wrapper = makeMatchCenterOpening(mount);

    wrapper.update();
    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props()).toHaveProperty('fixture', null);
  });

  it('should be rendered a fallback error message when no have match data', () => {
    const wrapper = makeMatchCenterOpening({ match: null }, mount);

    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled')).toHaveLength(0);
    expect(wrapper.find('ApiError')).toHaveLength(1);
    expect(wrapper.find('ApiError').text()).toBe('Ha ocurrido un error. Por favor regrese más tarde.');
  });

  it('should be rendered a fallback error message when have error from API', () => {
    const wrapper = makeMatchCenterOpening({ match: { error: true } }, mount);

    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled')).toHaveLength(0);
    expect(wrapper.find('ApiError')).toHaveLength(1);
    expect(wrapper.find('ApiError').text()).toBe('Ha ocurrido un error. Por favor regrese más tarde.');
  });

  it('should be rendered a fallback message when have wrong team data', () => {
    defaultProps.match.teams.home = {};
    const wrapper = makeMatchCenterOpening(mount);

    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled')).toHaveLength(0);
    expect(wrapper.find('ApiError')).toHaveLength(1);
    expect(wrapper.find('ApiError').text()).toBe('Información no disponible');
  });

  it('should call reminder handler when is clicked', () => {
    const { matchId } = defaultProps.settings;
    const reminderHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'reminderHandler');
    const wrapper = makeMatchCenterOpening({
      settings: {
        reminder: true,
      },
    }, mount);

    wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props().reminderOnPress(mockEvent);

    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props()).toHaveProperty('reminderOnPress', expect.any(Function));
    expect(reminderHandlerSpy).toHaveBeenCalledWith(matchId);
    expect(wrapper.state('remind')).toContain(matchId);

    // Call again to ensure only append one event by ID
    wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props().reminderOnPress(mockEvent);
    expect(wrapper.state('remind')).toEqual([matchId]);

    reminderHandlerSpy.mockRestore();
  });

  it('should call team handler and redirect to team URL if have performance covegare', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const teamHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'teamHandler');
    const wrapper = makeMatchCenterOpening({
      match: defaultProps.match,
      settings: {
        soccerCompetitionSeason: {
          seasonId: '2017',
          seasonName: 'Season 2016/2017',
          soccerCompetition: {
            name: 'UEFA Champions League',
            id: '5',
            league: {
              coverage: 'Performance',
            },
          },
        },
      },
    }, mount);
    const matchElement = wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').at(0);

    matchElement.props().teamsOnPress(mockEvent, defaultProps.match.teams.home);
    jest.runOnlyPendingTimers();

    expect(teamHandlerSpy).toHaveBeenCalled();
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('/futbol/newcastle-united')));

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      promo_name: 'opening-mc-equipo',
    }));

    teamHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });

  it('should call team handler but not redirect if not have valid uri', () => {
    defaultProps.match.url = null;
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const teamHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'teamHandler');
    const wrapper = makeMatchCenterOpening({
      match: defaultProps.match,
      settings: {
        soccerCompetitionSeason: {
          seasonId: '2017',
          seasonName: 'Season 2016/2017',
          soccerCompetition: {
            name: 'UEFA Champions League',
            id: '5',
          },
        },
      },
    });
    const matchElement = wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').at(0);

    matchElement.props().teamsOnPress(mockEvent, {});
    jest.runOnlyPendingTimers();

    expect(teamHandlerSpy).toHaveBeenCalled();
    expect(trackerSpy).not.toHaveBeenCalled();
    expect(helpers.locationRedirect).not.toHaveBeenCalled();

    teamHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });

  it('should call league handler and redirect to league URL', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const leagueHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'leagueHandler');
    const wrapper = makeMatchCenterOpening({
      match: defaultProps.match,
      settings: {
        soccerCompetitionSeason: {
          seasonId: '2017',
          seasonName: 'Season 2016/2017',
          soccerCompetition: {
            name: 'UEFA Champions League',
            id: '5',
            league: {
              coverage: 'Performance',
              activeSoccerCompetitionURL: 'https://www.tudn.com/futbol/uefa-champions-league/*',
            },
          },
        },
      },
    }, mount);

    const matchElement = wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').at(0);
    matchElement.props().leagueOnPress(mockEvent, defaultProps.match.league);
    jest.runOnlyPendingTimers();

    expect(leagueHandlerSpy).toHaveBeenCalled();
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('/futbol/uefa-champions-league')));

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      promo_name: 'opening-mc-liga',
    }));

    leagueHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });

  it('should call league handler but not redirect if not have valid uri', () => {
    defaultProps.match.url = null;
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const leagueHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'leagueHandler');
    const wrapper = makeMatchCenterOpening({
      match: defaultProps.match,
      settings: {
        soccerCompetitionSeason: {
          seasonId: '2017',
          seasonName: 'Season 2016/2017',
          soccerCompetition: {
            name: 'UEFA Champions League',
            id: '5',
          },
        },
      },
    });
    const matchElement = wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').at(0);

    matchElement.props().leagueOnPress(mockEvent, {});
    jest.runOnlyPendingTimers();

    expect(leagueHandlerSpy).toHaveBeenCalled();
    expect(trackerSpy).not.toHaveBeenCalled();
    expect(helpers.locationRedirect).not.toHaveBeenCalled();

    leagueHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });

  it('should call scorerhandler and update state', () => {
    global.innerWidth = 320;
    defaultProps.match.scorersHome = scorerProps.scorersHome;
    defaultProps.match.scorersAway = scorerProps.scorersAway;
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const scorersHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'scorersHandler');
    const wrapper = makeMatchCenterOpening({
      match: defaultProps.match,
      settings: {
        soccerCompetitionSeason: {
          seasonId: '2017',
          seasonName: 'Season 2016/2017',
          soccerCompetition: {
            name: 'UEFA Champions League',
            id: '5',
          },
        },
      },
    }, mount);
    const matchElement = wrapper.find('ScorerList').at(0);
    expect(wrapper.state('scorersOpen')).toBe(false);
    matchElement.props().onPress(mockEvent, {});
    jest.runOnlyPendingTimers();

    expect(scorersHandlerSpy).toHaveBeenCalled();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      promo_name: 'opening-mc-scorers',
    }));
    expect(wrapper.state('scorersOpen')).toBe(true);
    scorersHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });

  it('should not update innerWidth state when the window size is the same', () => {
    const resizeHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'resizeHandler');
    const wrapper = makeMatchCenterOpening(mount);
    const setStateSpy = jest.spyOn(wrapper.instance(), 'setState');

    setStateSpy.mockClear();
    simulate.resize(); // force resize event
    wrapper.update();

    expect(wrapper.state('size')).toBe('large');
    expect(resizeHandlerSpy).toHaveBeenCalledTimes(1);
    expect(setStateSpy).not.toHaveBeenCalled();
    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props()).toHaveProperty('size', 'large');

    resizeHandlerSpy.mockRestore();
  });

  it('should call resizeHandler on small resolutions', () => {
    const resizeHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'resizeHandler');
    const wrapper = makeMatchCenterOpening(mount);

    global.innerWidth = 500;
    simulate.resize();
    wrapper.update();

    expect(resizeHandlerSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state('size')).toBe('small');
    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props()).toHaveProperty('size', 'small');

    resizeHandlerSpy.mockRestore();
  });

  it('should call resizeHandler on medium resolutions', () => {
    const resizeHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'resizeHandler');
    const wrapper = makeMatchCenterOpening(mount);

    global.innerWidth = 768;
    simulate.resize();
    wrapper.update();

    expect(resizeHandlerSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state('size')).toBe('medium');
    expect(wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props()).toHaveProperty('size', 'medium');

    resizeHandlerSpy.mockRestore();
  });

  it('should remove resize event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const wrapper = makeMatchCenterOpening();

    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();

    removeEventListenerSpy.mockRestore();
  });

  it('should call the update interval every 90 seconds when have pre status', () => {
    const interval = 90 * 1000;
    const wrapper = makeMatchCenterOpening();

    expect(mockActions.getMatch).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), interval);
    expect(mockActions.getMatch).toHaveBeenCalledWith('919268');
    expect(wrapper.instance().timer).toBeDefined();
  });

  it('should set the interval to 30 seconds when have live status', () => {
    const interval = 30 * 1000;
    const wrapper = makeMatchCenterOpening();
    const setUpdateSpy = jest.spyOn(wrapper.instance(), 'setUpdate');

    clearInterval.mockClear();
    wrapper.setProps({
      match: { status: 'live' },
    });

    expect(wrapper.instance().timer).toBeDefined();
    expect(setUpdateSpy).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), interval);
  });

  it('should set the interval to 90 seconds when have post status', () => {
    const wrapper = makeMatchCenterOpening();
    const setUpdateSpy = jest.spyOn(wrapper.instance(), 'setUpdate');

    clearInterval.mockClear();
    setInterval.mockClear();
    wrapper.setProps({
      match: { status: 'post' },
    });

    expect(wrapper.instance().timer).toBeDefined();
    expect(setUpdateSpy).toHaveBeenCalledTimes(1);
    expect(clearInterval).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(setInterval).not.toHaveBeenCalled();
  });

  it('should call clearInterval on unmount if have active timer', () => {
    const wrapper = makeMatchCenterOpening();

    clearInterval.mockClear();
    wrapper.unmount();

    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it('should not call clearInterval on unmount if not have active timer', () => {
    const wrapper = makeMatchCenterOpening();

    clearInterval.mockClear();
    wrapper.instance().timer = null;
    wrapper.unmount();

    expect(clearInterval).not.toHaveBeenCalled();
  });

  it('should call Tracker when reminder handler is clicked', () => {
    const { matchId } = defaultProps.settings;
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const reminderHandlerSpy = jest.spyOn(MatchCenterOpening.prototype, 'reminderHandler');
    const wrapper = makeMatchCenterOpening({
      settings: {
        reminder: true,
      },
    }, mount);

    wrapper.find('MatchCenterOpening__HeaderScoreCardStyled').props().reminderOnPress(mockEvent);

    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'engagement',
      promo_name: 'opening-mc-enable',
    }));
    expect(reminderHandlerSpy).toHaveBeenCalledWith(matchId);
    expect(wrapper.state('remind')).toContain(matchId);

    reminderHandlerSpy.mockRestore();
    trackerSpy.mockRestore();
  });
  it('should render correctly on mobile size', () => {
    const wrapper = makeMatchCenterOpening({
      device: 'mobile',
      match: defaultProps.match,
      settings: {
        soccerCompetitionSeason: {
          seasonId: '2017',
          seasonName: 'Season 2016/2017',
          soccerCompetition: {
            name: 'UEFA Champions League',
            id: '5',
            league: {
              abbreviation: 'UCL',
              coverage: 'Performance',
            },
          },
        },
      },
    }, mount);

    expect(wrapper).toHaveLength(1);
  });
  it('should render correctly on desktop', () => {
    const navigationItems = {
      [soccerMatchNavDefinitions.PREMATCH.type]: soccerMatchNavDefinitions.PREMATCH,
    };
    const wrapper = mount(
      <SoccerMatchNavContext.Provider value={{ navigationItems }}>
        {makeMatchCenterOpening({
          device: 'desktop',
          match: defaultProps.match,
          settings: {
            matchId: 1,
            soccerCompetitionSeason: {
              seasonId: '2017',
              seasonName: 'Season 2016/2017',
              soccerCompetition: {
                name: 'UEFA Champions League',
                id: '5',
                league: {
                  coverage: 'Performance',
                },
              },
            },
          },
        }, mount)}
      </SoccerMatchNavContext.Provider>
    );

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SoccerMatchNav')).toHaveLength(1);
  });
  it('should not render navigation if no valid match id', () => {
    Store.dispatch(setPageData({
      data: {
        matchId: null,
      },
    }));
    const wrapper = makeMatchCenterOpening({
      device: 'desktop',
      match: defaultProps.match,
      settings: {
        soccerCompetitionSeason: {
          seasonId: '2017',
          seasonName: 'Season 2016/2017',
          soccerCompetition: {
            name: 'UEFA Champions League',
            id: '5',
            league: {
              coverage: 'Performance',
            },
          },
        },
      },
    }, mount);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('SoccerMatchNav')).toHaveLength(0);
  });
  it('should call player tracker with correct engagement event', () => {
    global.innerWidth = 1440;
    defaultProps.match.scorersHome = scorerProps.scorersHome;
    defaultProps.match.scorersAway = scorerProps.scorersAway;
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = makeMatchCenterOpening({
      match: defaultProps.match,
      settings: {
        soccerCompetitionSeason: {
          seasonId: '2017',
          seasonName: 'Season 2016/2017',
          soccerCompetition: {
            name: 'UEFA Champions League',
            id: '5',
          },
        },
      },
    }, mount);
    wrapper.find('ScorerList Link').first().simulate('click', mockEvent);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      event: 'engagement',
      event_action: 'mcopening_playerclick',
    }));
    jest.runOnlyPendingTimers();
    trackerSpy.mockRestore();
  });
});
