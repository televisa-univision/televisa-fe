import React from 'react';
import { shallow, mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import * as helpers from '@univision/fe-commons/dist/utils/helpers';

import LeagueDropdown from '../../base/LeagueDropdown';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import Standings from '.';
import data from '../../../utils/mocks/standings.json';
import groupData from '../../../utils/mocks/groupStandings.json';
import leagues from '../../../utils/mocks/leagues.json';
import altLeagues from '../../../utils/mocks/altLeagues.json';

// Jest Mocks
jest.useFakeTimers();

let otherLeague;
let settings;
let settings2;
let settings3;
let props;
let props2;
let props3;
let propsError;
let relSettings;
let fullSettings;

const simulate = {};
const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;
helpers.locationRedirect = jest.fn();

window.addEventListener = jest.fn((event, cb) => {
  simulate[event] = cb;
});

beforeEach(() => {
  props = {
    getStandings: () => {},
    standings: standingsExtractor(data),
  };
  props2 = {
    standings: standingsExtractor(data),
  };
  propsError = {
    getStandings: () => {},
    standings: { error: true },
  };
  props3 = {
    getStandings: () => {},
    standings: standingsExtractor(groupData),
  };
  settings = {
    displayType: {
      value: 'Collapsed',
    },
    highlightedCompetitionSeasons: leagues,
    highlightedAlternativeCompetitionSeasons: leagues,
  };
  otherLeague = [
    {
      seasonId: '2017',
      seasonName: 'Season 2016/2017',
      soccerCompetition: {
        code: 'ES_PL',
        league: {
          name: 'UEFA Champions League',
          id: 'l.uefa.org.champions',
          uri: 'http://sports.dev.y.univision.com/deportes/futbol/uefa-champions-league',
        },
        name: 'UEFA Champions League',
        id: '5',
      },
    },
  ];
  settings3 = {
    displayType: {
      value: 'Flexible',
    },
    highlightedCompetitionSeasons: leagues,
  };
  settings2 = {
    displayType: {
    },
  };
  relSettings = {
    hasRelegation: true,
    displayType: {
      value: 'Full',
    },
    highlightedCompetitionSeasons: leagues,
    highlightedAlternativeCompetitionSeasons: leagues,
  };
  fullSettings = {
    hasRelegation: false,
    displayType: {
      value: 'Full',
    },
    highlightedCompetitionSeasons: leagues,
    highlightedAlternativeCompetitionSeasons: leagues,
  };
});

describe('Standings tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    helpers.locationRedirect.mockClear();
  });
  it('renders as expected', () => {
    const wrapper = mount(<Standings {...props} settings={settings} />);
    expect(wrapper.find('.standings')).toHaveLength(1);
  });
  it('renders as expected isWorldCupMVP', () => {
    const wrapper = mount(<Standings
      {...props}
      widgetContext={{ isWorldCupMVP: true }}
      settings={settings}
    />);
    expect(wrapper.find('.standings')).toHaveLength(1);
  });
  it('should renders ad type from widget settings', () => {
    const settingsWithAd = {
      ...settings,
      widgetAd: {
        type: 'Ad Test',
      },
    };
    const wrapper = shallow(<Standings {...props} settings={settingsWithAd} />);
    expect(wrapper.find('.uvs-ad-widget')).toHaveLength(1);
  });
  it('should render a LeagueDropdown', () => {
    const wrapper = mount(<Standings {...props} settings={settings} />);
    expect(wrapper.find('LeagueDropdown')).toHaveLength(1);
  });
  it('should not Render clickable if not collapsed', () => {
    const wrapper = mount(<Standings
      {...props}
      settings={{ ...settings, displayType: { value: 'Full' } }}
    />);
    expect(wrapper.find('.button')).toHaveLength(3);
  });
  it('should call changeLeague when clicked', () => {
    const wrapper = mount(<Standings {...props} settings={settings} />);
    const trackViewSpy = jest.spyOn(wrapper.instance(), 'trackView');
    expect(wrapper.state('active')).toEqual({ league: leagues[0] });
    wrapper.instance().changeLeague('click', {
      seasonId: '2017',
      seasonName: 'Season 2016/2017',
      soccerCompetition: {
        code: 'ES_PL',
        league: {
          name: 'UEFA Champions League',
          id: 'l.uefa.org.champions',
          uri: 'http://sports.dev.y.univision.com/deportes/futbol/uefa-champions-league',
        },
        name: 'UEFA Champions League',
        id: '5',
      },
    });
    expect(wrapper.state('active')).toEqual({ league: otherLeague[0] });
    expect(trackViewSpy).toHaveBeenCalledTimes(0);
    trackViewSpy.mockClear();
  });
  it('should update component when there is an error', () => {
    const wrapper = mount(<Standings {...props} settings={settings} />);
    wrapper.setProps({
      ...propsError,
    });
    expect(wrapper.find('.noInfo')).toHaveLength(1);
  });
  it('should not render if flexible and there error', () => {
    const wrapper = mount(<Standings
      {...propsError}
      settings={{
        displayType: {
          value: 'Flexible',
        },
        highlightedCompetitionSeasons: leagues,
        highlightedAlternativeCompetitionSeasons: altLeagues,
      }}
    />);
    expect(wrapper.find('.noInfo')).toHaveLength(0);
  });
  it('should calls changeLeague when tab button is clicked', () => {
    const change = jest.fn();
    const wrapper = mount(<Standings {...props} settings={settings} />);
    wrapper.instance().changeLeague = change;
    wrapper.find('.firstButton').at(0).props().onPress();
    expect(change).toHaveBeenCalled();
  });
  it('should calls changeLeague when tab button is clicked', () => {
    const change = jest.fn();
    const wrapper = mount(<Standings {...props} settings={settings} />);
    wrapper.instance().changeLeague = change;
    wrapper.find('.firstButton').at(0).props().onPress();
    expect(change).toHaveBeenCalled();
  });
  it('should calls changeLeague when tab button is clicked', () => {
    const change = jest.fn();
    const wrapper = mount(<Standings {...props} settings={settings} />);
    wrapper.instance().changeLeague = change;
    wrapper.find('.secondButton').at(0).props().onPress();
    expect(change).toHaveBeenCalled();
  });
  it('should calls changeLeague when leagueDropdown is changed', () => {
    const change = jest.fn();
    const wrapper = mount(<Standings {...props} settings={settings} />);
    wrapper.instance().changeLeague = change;
    wrapper.find('LeagueDropdown').at(0).props().onChange();
    expect(change).toHaveBeenCalled();
  });
  it('should calls refresh ads function when the league changes', () => {
    const refreshSelectiveAd = jest.fn();
    const wrapper = mount(
      <Standings
        {...props}
        settings={settings}
        refreshSelectiveAd={refreshSelectiveAd}
      />
    );
    wrapper.find('.firstButton').at(0).props().onPress();
    expect(refreshSelectiveAd).toHaveBeenCalled();
  });
  it('should have use the short league name in the leagueDropdown', () => {
    const wrapper = mount(<Standings {...props} settings={settings} device="mobile" />);
    expect(wrapper.find('.secondButton').at(0).text()).toBe('UEFA');
  });
  it('should render a LeagueDropdown when tudn flag is true', () => {
    Store.dispatch(setPageData({
      requestParams: { tudn: 'true' },
    }));
    const wrapper = mount(<Standings {...props} settings={settings} />);
    expect(wrapper.find(LeagueDropdown).props().isTudn).toBe(true);
  });
  it('should calls changeLeague when leagueDropdown is changed and tudn flag is true', () => {
    Store.dispatch(setPageData({
      requestParams: { tudn: 'true' },
    }));
    const change = jest.fn();
    const wrapper = mount(<Standings {...props} settings={settings} />);
    wrapper.instance().changeLeague = change;
    wrapper.find('LeagueDropdown').at(0).props().onChange();
    expect(change).toHaveBeenCalled();
  });
  it('should calls changeLeague when is clicked even if not have standings data', () => {
    const wrapper = mount(
      <Standings
        standings={null}
        getStandings={props.getStandings}
        settings={settings}
      />
    );
    const changeLeagueSpy = jest.spyOn(wrapper.instance(), 'changeLeague');
    wrapper.find('.firstButton').at(0).props().onPress();
    expect(changeLeagueSpy).toHaveBeenCalled();
  });
  it('should fire event when trackView gets called', () => {
    const wrapper = mount(
      <Standings
        standings={null}
        getStandings={props.getStandings}
        settings={settings}
      />
    );
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    wrapper.instance().trackView();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('should track view when changeLeague is called', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = mount(<Standings {...props} settings={settings} />);
    wrapper.instance().changeLeague('click', otherLeague[0]);
    wrapper.setProps({ ...props3, settings });
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
  it('renders error message if error received', () => {
    const wrapper = mount(<Standings {...propsError} settings={settings2} />);
    expect(wrapper.find('.noInfo')).toHaveLength(1);
  });
  it('calls getStandings in when it mounts', () => {
    const getSt = jest.fn();
    const wrapper = mount(<Standings getStandings={getSt} {...props2} settings={settings} />);
    wrapper.instance().componentDidMount();
    expect(getSt).toHaveBeenCalled();
  });
  it('should not call getStandings if it does not exist', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<Standings getStandings={null} {...props2} settings={settings} />);
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().props.getStandings).toBeNull();
  });
  it('renders in match center', () => {
    const wrapper = mount(<Standings {...props} settings={settings} />);
    expect(wrapper.find('.standings')).toHaveLength(1);
  });
  it('should no render', () => {
    const wrapper = mount(<Standings {...propsError} settings={settings3} />);
    expect(wrapper).toEqual({});
  });
  it('should call showAll handler and redirect', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const showAllHandlerSpy = jest.spyOn(Standings.prototype, 'showAllHandler');
    const wrapper = mount(<Standings {...props} settings={settings} />);

    wrapper.find('.button').at(0).props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(showAllHandlerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('/futbol/liga-mx/posiciones')));

    showAllHandlerSpy.mockRestore();
  });
  it('should call showAll handler but does not redirect if no league uri present', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const showAllHandlerSpy = jest.spyOn(Standings.prototype, 'showAllHandler');
    const leaguesData = leagues.slice();
    leaguesData.unshift({
      seasonId: '2017',
      seasonName: 'Season 2016/2017',
      soccerCompetition: {
        name: 'UEFA Champions League',
        id: '5',
        league: {
          name: 'UEFA Champions League',
        },
      },
    });
    const wrapper = mount(<Standings
      {...props}
      settings={{
        displayType: {
          value: 'Collapsed',
        },
        highlightedCompetitionSeasons: leaguesData,
      }}
    />);

    wrapper.find('.button').at(0).props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(showAllHandlerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).not.toHaveBeenCalled();
    expect(helpers.locationRedirect).not.toHaveBeenCalled();

    showAllHandlerSpy.mockRestore();
  });

  it('should call showResults handler and redirect', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const showResultsHandlerSpy = jest.spyOn(Standings.prototype, 'showResultsHandler');
    const wrapper = shallow(<Standings {...props} settings={settings} />);

    wrapper.find('.resultsButton').at(0).props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(showResultsHandlerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('/futbol/liga-mx/resultados')));
    showResultsHandlerSpy.mockRestore();
  });

  it('should call showResults handler but does not redirect if no league uri present', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const showResultsHandlerSpy = jest.spyOn(Standings.prototype, 'showResultsHandler');
    const leaguesData = leagues.slice();
    leaguesData.unshift({
      seasonId: '2017',
      seasonName: 'Season 2016/2017',
      soccerCompetition: {
        name: 'UEFA Champions League',
        id: '5',
      },
    });
    const wrapper = shallow(<Standings
      {...props}
      settings={{
        displayType: {
          value: 'Collapsed',
        },
        highlightedCompetitionSeasons: leaguesData,
      }}
    />);

    window.location.href = '';
    wrapper.find('.resultsButton').props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(showResultsHandlerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).not.toHaveBeenCalled();
    expect(helpers.locationRedirect).not.toHaveBeenCalled();

    showResultsHandlerSpy.mockRestore();
  });
  it('should render alternative leagues with uefa profile', () => {
    const wrapper = mount(<Standings
      {...props}
      settings={{
        displayType: {
          value: 'Collapsed',
        },
        highlightedCompetitionSeasons: leagues,
        highlightedAlternativeCompetitionSeasons: altLeagues,
      }}
      profile="uefa"
    />);
    expect(wrapper.find('.firstButton').at(0).text()).toBe('UEFA CHAMPIONS LEAGUE');
  });
  it('should render core leagues with core profile', () => {
    const wrapper = mount(<Standings
      {...props}
      settings={{
        displayType: {
          value: 'Collapsed',
        },
        highlightedCompetitionSeasons: leagues,
        highlightedAlternativeCompetitionSeasons: altLeagues,
      }}
      profile="core"
    />);

    expect(wrapper.find('.firstButton').at(0).text()).toBe('LIGA MX');
  });
  it('renders as expected with has relegation and has button to standings table', () => {
    const wrapper = mount(<Standings {...props} settings={relSettings} />);
    expect(wrapper.find('.standings')).toHaveLength(1);
    expect(wrapper.find('.resultsButton').at(0).text()).toBe('VER POSICIONES');
  });
  it('should call showAllHandler in relegation table and redirect', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const showAllHandlerSpy = jest.spyOn(Standings.prototype, 'showAllHandler');
    const wrapper = shallow(<Standings {...props} settings={relSettings} />);

    wrapper.find('.resultsButton').at(0).props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(showAllHandlerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('/futbol/liga-mx/posiciones')));
    showAllHandlerSpy.mockRestore();
  });
  it('renders as expected with full display type and has button to relegation table', () => {
    const wrapper = mount(<Standings {...props} settings={fullSettings} />);
    expect(wrapper.find('.standings')).toHaveLength(1);
    expect(wrapper.find('.resultsButton').at(0).text()).toBe('TABLA DE DESCENSO');
  });
  it('should call showRelegationHandler handler and redirect', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const showRelegationHandlerSpy = jest.spyOn(Standings.prototype, 'showRelegationHandler');
    const wrapper = shallow(<Standings {...props} settings={fullSettings} />);
    wrapper.find('.resultsButton').at(0).props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(showRelegationHandlerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(helpers.locationRedirect).toBeCalledWith(expect.stringMatching(new RegExp('/futbol/liga-mx/descenso')));
    showRelegationHandlerSpy.mockRestore();
  });
  it('should call relegation handler but does not redirect if no league uri present', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const showRelegationHandlerSpy = jest.spyOn(Standings.prototype, 'showRelegationHandler');
    const leaguesData = leagues.slice();
    leaguesData.unshift({
      seasonId: '2017',
      seasonName: 'Season 2016/2017',
      soccerCompetition: {
        name: 'Liga MX',
        id: '199',
      },
    });
    const wrapper = mount(<Standings
      {...props}
      settings={{
        displayType: {
          value: 'Full',
        },
        highlightedCompetitionSeasons: leaguesData,
      }}
    />);

    wrapper.find('.resultsButton').at(0).props().onPress(mockEvent);
    jest.runOnlyPendingTimers();

    expect(showRelegationHandlerSpy).toHaveBeenCalledTimes(1);
    expect(trackerSpy).not.toHaveBeenCalled();
    expect(helpers.locationRedirect).not.toHaveBeenCalled();

    showRelegationHandlerSpy.mockRestore();
  });
  it('should render in full and no relegation button if in a league other than Liga MX', () => {
    const leaguesData = leagues.slice();
    leaguesData.unshift({
      seasonId: '2017',
      seasonName: 'Season 2016/2017',
      soccerCompetition: {
        name: 'UEFA Champions League',
        id: '5',
      },
    });
    const wrapper = mount(<Standings
      {...props}
      settings={{
        displayType: {
          value: 'Full',
        },
        highlightedCompetitionSeasons: leaguesData,
      }}
    />);
    expect(wrapper.find('.resultsButton')).toHaveLength(0);
  });
  it('should use the short copy for relegation button on mobile', () => {
    const wrapper = mount(<Standings {...props} settings={fullSettings} device="mobile" />);
    expect(wrapper.find('.resultsButton').at(0).text()).toBe('DESCENSO');
  });
  it('should use the short copy for posiciones button on mobile', () => {
    const wrapper = mount(<Standings {...props} settings={relSettings} device="mobile" />);
    expect(wrapper.find('.resultsButton').at(0).text()).toBe('POSICIONES');
  });
  it('renders as expected with full display type and has button to relegation table with tudn theme', () => {
    Store.dispatch(setPageData({
      requestParams: { tudn: 'true' },
    }));
    const wrapper = mount(<Standings {...props} settings={fullSettings} />);
    expect(wrapper.find('WidgetTitle').props().isTudn).toBe(true);
  });
  it('renders as expected with full display type and tudn theme', () => {
    Store.dispatch(setPageData({
      requestParams: { tudn: 'true' },
    }));
    const wrapper = mount(<Standings {...props} settings={relSettings} />);
    expect(wrapper.find('WidgetTitle').props().isTudn).toBe(true);
  });
  it('should register nav item if have context and available data', () => {
    const setNavigationItemMock = jest.fn();
    const wrapper = mount(
      <SoccerMatchNavContext.Provider value={{ setNavigationItem: setNavigationItemMock }}>
        <Standings {...props} settings={settings} />
      </SoccerMatchNavContext.Provider>
    );

    expect(wrapper.find('.standings')).toHaveLength(1);
    expect(setNavigationItemMock).toHaveBeenCalledTimes(1);
  });

  it('should register nav item if have context and available data with isWorldCupMVP', () => {
    const setNavigationItemMock = jest.fn();
    const wrapper = mount(
      <SoccerMatchNavContext.Provider value={{ setNavigationItem: setNavigationItemMock }}>
        <Standings {...props} settings={settings} device="mobile" widgetContext={{ isWorldCupMVP: true }} />
      </SoccerMatchNavContext.Provider>
    );

    expect(wrapper.find('.standings')).toHaveLength(1);
    expect(setNavigationItemMock).toHaveBeenCalledTimes(1);
  });
});

describe('Standings updateLeague', () => {
  it('should call changeLeague if profile change', () => {
    const wrapper = shallow(<Standings {...props} settings={settings} />);
    const changeLeagueSpy = jest.spyOn(wrapper.instance(), 'changeLeague');
    wrapper.setProps({ profile: 'uefa' });
    expect(changeLeagueSpy).toHaveBeenCalled();
  });
  it('should not call changeLeague if profile change and highlightedAlternativeCompetitionSeasons is not defined', () => {
    const wrapper = shallow(<Standings
      {...props}
      settings={{}}
    />);
    const changeLeagueSpy = jest.spyOn(wrapper.instance(), 'changeLeague');
    wrapper.setProps({ profile: 'uefa' });
    expect(changeLeagueSpy).not.toHaveBeenCalled();
  });
});

describe('Standings Trackview', () => {
  it('should fire event with empty object if no analytics present', () => {
    const wrapper = mount(
      <Standings
        standings={null}
        getStandings={props.getStandings}
        settings={settings}
      />
    );
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    wrapper.instance().trackView();
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
  });
});
