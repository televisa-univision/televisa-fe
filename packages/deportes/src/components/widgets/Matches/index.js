import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';
import NavWrapper from '@univision/shared-components/dist/components/v2/NavWrapper';
import TabName from '@univision/shared-components/dist/components/v2/TabName';
import Button from '@univision/shared-components/dist/components/v2/Button';
import Sponsor from '@univision/fe-components-base/dist/components/Sponsor';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import SportsTracker from '@univision/fe-commons/dist/utils/tracking/tealium/sports/SportsTracker';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import dfpManager from '@univision/fe-commons/dist/utils/ads/dfpManager';
import Store from '@univision/fe-commons/dist/store/store';
import { UEFA, CORE } from '@univision/fe-commons/dist/constants/personalization';
import { getDevice, getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import {
  cleanUrl,
  camelCase,
  isEqual,
  getUniqKey,
  isValidArray,
  isValidObject,
  hasKey,
  getKey,
  locationRedirect,
} from '@univision/fe-commons/dist/utils/helpers';
import features from '@univision/fe-commons/dist/config/features';

import {
  WOOD_SMOKE,
} from '@univision/fe-utilities/styled/constants';
import {
  getLeagueId,
  getLeagueShortName,
  getLeagueAbbrName,
  getActiveLeagueUri,
  getSeasonId,
  getTudnUrl,
} from '../../../utils/helpers';
import StatWrapper from '../../base/StatWrapper';
import LeagueDropdown from '../../base/LeagueDropdown';
import getSponsor from './MatchesSponsor.config';
import {
  ACTIVE_TAB,
  ACTIVE_DROPDOWN,
  TYPE_FULL,
  TYPE_COLLAPSED,
  DIRECTION_NEXT,
  DIRECTION_PREV,
  TRACK_TARGETS,
} from './constants';
import MatchesEvents from './MatchesEvents';
import Styles from './Matches.styles';

const TitleWrapperStyled = styled(TitleWrapper)`${Styles.titleWrapper}`;
const StatWrapperStyled = styled(StatWrapper)`${Styles.wrapper}`;
const WidgetTitleStyled = styled(WidgetTitle)`${Styles.title}`;
const SponsorStyled = styled(Sponsor)`${Styles.sponsor}`;
const NavWrapperStyled = styled(NavWrapper)`${Styles.nav}`;
const ContentStyled = styled.div`${Styles.content}`;
const TabsStyled = styled.div`${Styles.tabs}`;

/**
 * Matches component for soccer events
 * @access public
 * @extends {React.Component}
 */
class Matches extends React.Component {
  /**
   * Get title based on round type
   * @param {array} events - Events to check
   * @param {number} activeWeek - Current week
   * @param {string} leagueId - Current league
   * @returns {string}
   */
  static renderTitle(events, activeWeek, leagueId) {
    // Using default rounds value
    let title = localization.get('rounds');
    if (!isValidArray(events) || !events[0]) {
      return title;
    }
    const event = events[0];
    const round = event.round === 'Round of 32' && leagueId === '6' ? 'Unl' : '';
    const roundTerm = localization.get(camelCase(`phase-${event.round}-${round}`), {
      fallback: event.round,
    });
    if (
      !event.round
      || event.round === 'Round'
      || (event.round === roundTerm && event.round !== 'Final')
    ) {
      if (activeWeek) {
        title = localization.get('weekOf', { locals: { week: activeWeek } });
      }
    } else {
      title = roundTerm;
      if (event.fixture) {
        title += ` - ${event.fixture}`;
      }
    }
    return title;
  }

  /**
   * bind methods and setup component
   * @param {Object} props - the component props
   * @constructor
   */
  constructor(props) {
    super(props);

    const { leagues } = this;
    const { soccerTeamSeason } = props.settings;
    const teamId = getKey(soccerTeamSeason, 'teamId');
    const device = getDevice(Store);

    this.changeLeagueHandler = this.changeLeagueHandler.bind(this);
    this.reminderHandler = this.reminderHandler.bind(this);
    this.matchHandler = this.matchHandler.bind(this);
    this.weekHandler = this.weekHandler.bind(this);
    this.setAdSlot = this.setAdSlot.bind(this);

    // For internal control
    this.theme = getTheme(Store);
    this.isMobile = device === 'mobile';
    this.isTablet = device === 'tablet';
    this.availableWeeks = [];
    this.firstWeek = null;
    this.showError = true;
    this.refreshAd = false;
    this.slotAdId = null;
    this.direction = null;
    this.firstLoad = true;
    this.shouldTrackLeague = false;
    this.isVixEnabled = features.widgets.isVixEnabled();

    // Define the possible state data
    const state = {
      active: {
        tab: false,
        dropdown: false,
        team: false,
        data: {},
      },
      activeWeek: null,
      hasRequest: false,
      remind: [],
    };

    if (teamId) {
      state.active = {
        ...state.active,
        team: true,
        data: soccerTeamSeason,
      };
    } else if (isValidArray(leagues)) {
      state.active = {
        tab: true,
        dropdown: false,
        data: leagues[0],
        team: false,
      };
    }

    // final state
    this.state = state;
  }

  /**
   * Update soccer matches data after component was mount
   * @access public
   */
  componentDidMount() {
    const { settings } = this.props;
    const displayType = getKey(settings, 'displayType.value', TYPE_COLLAPSED);
    const queryData = {};

    if (displayType === TYPE_FULL) {
      this.paging = { prev: { last: false } };
      this.initDate = new Date();
      queryData.date = this.initDate;
    }

    this.fetchMatches(queryData, {
      fallbackPrev: true,
    });
  }

  /**
   * Check if the component should update when have valid data
   * or the props/state changed
   * @param {Object} nextProps - the new props data
   * @param {Object} nextState - the new state for this component
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      (hasKey(nextProps, 'matches.error') && this.showError)
      || !isEqual(nextState, this.state, true)
      || !isEqual(nextProps, this.props)
    );
  }

  /**
   * When the component is updated check if need to repositin de user view
   * and clean variable to allow a new fetch or if profile changed update the active league
   * @param {Object} prevProps - the previous props data
   * @param {Object} prevState - the previous state data
   * @access public
   */
  componentDidUpdate(prevProps, prevState) {
    const {
      firstWeek,
      availableWeeks,
      firstLoad,
      direction,
      leagues,
      props: { profile: newProfile, matches },
      state: { activeWeek, active, hasRequest },
    } = this;
    const { profile: prevProfile, matches: preMatches } = prevProps;
    const { active: prevActive } = prevState;
    const isSameLeague = isEqual(active, prevActive);
    const shouldSetWeek = (firstLoad || !activeWeek) && isSameLeague;
    const shouldShowLast = getKey(matches, 'showLast') || !isValidArray(getKey(preMatches, 'events', []));

    if (newProfile && newProfile !== prevProfile && isValidArray(leagues)) {
      this.setActiveLeague(leagues[0]);
    }
    // set week if is first or after request complete
    if (shouldSetWeek) {
      const week = shouldShowLast ? availableWeeks[availableWeeks.length - 1] : firstWeek;
      this.setActiveWeek(week);
    } else if (hasRequest && isSameLeague) {
      this.setActiveWeek(this.getNewWeek(direction));
    }

    // extend paging data
    if (isSameLeague && this.paging && isValidObject(matches)) {
      const newPaging = matches.paging || {};

      this.paging = {
        prev: newPaging.prev || this.paging.prev,
        next: newPaging.next || this.paging.next,
      };
    }
  }

  /**
   * Get competition leagues list
   * @access public
   * @returns {Object[]}
   */
  get leagues() {
    const { settings, profile } = this.props;
    const leagues = getKey(settings, 'highlightedCompetitionSeasons') || [];
    const altLeagues = getKey(settings, 'highlightedAlternativeCompetitionSeasons') || [];

    return profile === UEFA ? altLeagues : leagues;
  }

  /**
   * Get it should show the tabs
   * @access public
   * @returns {Object[]}
   */
  get showTabs() {
    const { leagues, state: { active } } = this;
    return !active.team && isValidArray(leagues) && leagues.length >= 2;
  }

  /**
   * Get the newWeek from direction increment/decrease
   * @param {string} direction - if is the next/prev week
   * @access public
   * @returns {number}
   */
  getNewWeek(direction) {
    const { activeWeek } = this.state;
    const week = Number(activeWeek);
    const weekIndex = this.availableWeeks.indexOf(week);
    const isPrev = direction === DIRECTION_PREV;
    let count = 1;

    if (isPrev) {
      count = -1;
    }
    if (weekIndex >= 0) {
      return this.availableWeeks[weekIndex + count];
    }
    return null;
  }

  /**
   * Helper to collect round events
   * @access public
   * @returns {Object[]}
   */
  getWeekEvents() {
    const {
      props: { matches, isWorldCup },
      state: { activeWeek },
    } = this;
    const { events } = matches || {};
    let firstWeek;
    let weekEvents = [];
    this.firstWeek = null;
    this.availableWeeks = [];

    if (!isValidArray(events)) {
      return [];
    }

    if (isWorldCup) {
      return events;
    }

    // Filtering to collect the round events
    weekEvents = events.filter((eventData) => {
      const { teams, week } = eventData;
      const currentWeek = Number(week);

      if (!this.availableWeeks.includes(currentWeek)) {
        this.availableWeeks.push(currentWeek);
      }
      if (
        (activeWeek && currentWeek !== activeWeek)
          || (firstWeek && currentWeek !== firstWeek)
          || !hasKey(teams, 'home.id')
          || !hasKey(teams, 'away.id')
      ) {
        return false;
      }
      firstWeek = currentWeek;
      this.firstWeek = firstWeek;
      return true;
    });
    return weekEvents;
  }

  /**
   * Set active league per type and fetch the content
   * @param {Object} league - the active league data
   * @param {string} type - if tab/dropdown is the active value
   * @access public
   */
  setActiveLeague(league, type = ACTIVE_TAB) {
    const { active } = this.state;
    const { isWorldCup } = this.props;
    this.paging = { prev: { last: false } };
    if (!active.team) {
      this.setState({
        activeWeek: null,
        hasRequest: true,
        active: {
          [type]: true,
          data: league,
        },
      }, () => {
        this.showError = true; // reset to show error per league
        this.firstLoad = true;
        this.shouldTrackLeague = true;
        this.fetchMatches(null, {
          fallbackPrev: true,
          isWorldCup,
        });
      });
    }
  }

  /**
   * Set active week
   * @param {number} week - active week
   * @access public
   */
  setActiveWeek(week) {
    const { activeWeek } = this.state;
    if (week && activeWeek !== week) {
      this.setState({
        activeWeek: week,
        hasRequest: false,
      }, () => {
        if (!this.firstLoad || this.shouldTrackLeague) {
          this.trackView();
        }
      });
    }
  }

  /**
   * Set ad slot ID to internal instance
   * @param {string} slotId - ad slot id
   * @access public
   */
  setAdSlot(slotId) {
    this.slotAdId = slotId;
  }

  /**
   * Check if the events data has errors
   * @access public
   * @returns {boolean}
   */
  hasDataErrors() {
    const { matches } = this.props;
    return !isValidObject(matches) || !Array.isArray(matches.events)
      || (matches.error && getKey(matches.error, 'statusCode') !== 404);
  }

  /**
   * Get nav content
   * @access public
   * @returns {JSX}
   */
  navContent() {
    const { leagues, state: { active } } = this;
    const leaguesTabs = leagues.slice(0, 2);

    return leaguesTabs.map((tab) => {
      const leagueId = getLeagueId(tab);
      const isActive = active.tab && getLeagueId(active.data) === leagueId;
      return (
        <Button
          key={getUniqKey(`tab${leagueId}`)}
          type="nav"
          isActive={isActive}
          className="navItem"
          onPress={event => this.changeLeagueHandler(event, tab, ACTIVE_TAB)}
          isTudn
          useUpperCase
        >
          {this.isMobile ? getLeagueAbbrName(tab) : getLeagueShortName(tab)}
        </Button>
      );
    });
  }

  /**
   * Get loader content per direction
   * @param {string} direction - the loader direction
   * @access public
   * @returns {JSX}
   */
  loaderContent(direction) {
    const position = ['left', 'right'];
    const isWorldCupMVP = features.deportes.isWorldCupMVP();
    return (
      <TabName
        className={Styles.tudn}
        isTudn
        position={direction === DIRECTION_PREV ? position[0] : position[1]}
        onPress={this.weekHandler(direction)}
        theme={isWorldCupMVP ? {
          primary: WOOD_SMOKE,
        } : {}}
        data-loader={direction}
      />
    );
  }

  /**
   * Get matches from action with default query
   * @param {Object} query - additional query parameters
   * @param {Object} options - the data options such as previous events or the fetch direction
   * @access public
   */
  fetchMatches(query, options) {
    const { getMatches, isWorldCup } = this.props;
    const { active } = this.state;
    const seasonKey = getSeasonId(active.data);
    const queryData = Object.assign(
      { seasonKey },
      active.team
        ? {
          teamKey: getKey(active.data, 'teamId'),
        }
        : {
          competitionKey: getLeagueId(active.data),
        },
      query
    );
    getMatches(queryData, {
      ...options,
      isWorldCup,
    });
  }

  /**
   * Handler to load more soccer events depending of direction
   * @param {string} direction - the direction to load past/futire soccer events
   * @access public
   */
  loadMoreHandler(direction) {
    const { hasRequest } = this.state;
    const { matches } = this.props;
    const { events } = matches || {};
    const defaultPaging = { last: false };
    let paging;
    if (hasRequest || !events || !this.paging) {
      return;
    }

    if (direction === DIRECTION_PREV) {
      paging = this.paging.prev || defaultPaging;
    } else if (direction === DIRECTION_NEXT) {
      paging = this.paging.next || defaultPaging;
    }
    // save last direction
    this.direction = direction;

    if (paging && !paging.last) {
      // Calculate the next page
      const queryData = {
        offset: (paging.size && paging.size * (paging.number + 1)) || 0,
        date: this.initDate,
      };

      this.refreshAd = true;
      this.setState({ hasRequest: true });
      this.fetchMatches(queryData, {
        direction,
        events,
      });
    }
  }

  /**
   * Get the handler to fetch the next event week
   * @param {string} direction - if is the next/prev week
   * @access public
     @returns {Function}
   */
  weekHandler(direction) {
    return (event) => {
      event.preventDefault();
      this.firstLoad = false;
      const newWeek = this.getNewWeek(direction);
      if (!this.availableWeeks.includes(newWeek)) {
        this.loadMoreHandler(direction);
      } else {
        // set refreshable ad only if already have week
        this.refreshAd = true;
        this.setActiveWeek(newWeek);
      }
    };
  }

  /**
   * Get active league by element type (tab/dropdown)
   * @param {Object} event - a native JS event
   * @param {Object} league - data of current selected league
   * @param {string} type - a valid selection type (tab/dropdown)
   * @access public
   */
  changeLeagueHandler(event, league, type) {
    event.preventDefault();
    this.refreshAd = true;
    this.setActiveLeague(league, type);
  }

  /**
   * Returns the handler for the match card
   * @param {string} match - the match event data
   * @access public
   * @returns {Function}
   */
  matchHandler(match) {
    if (!hasKey(match, 'status')) {
      return null;
    }

    return (event) => {
      const { active } = this.state;
      const isLive = match.status === 'live';
      const trackTarget = isLive ? TRACK_TARGETS.live : TRACK_TARGETS.resume;
      const uri = getTudnUrl(cleanUrl(match.soccerMatchContentURL || match.url))
      || getTudnUrl(getActiveLeagueUri(active.data));
      event.preventDefault();

      if (!global.window || !uri) {
        return;
      }

      WidgetTracker.track(
        WidgetTracker.events.engagement, {
          target: trackTarget,
        }, locationRedirect(uri)
      );
    };
  }

  /**
   * Returns the handler for matches notifications
   * @param {string} matchId - the match event ID to enabled notifications
   * @access public
   * @returns {Function}
   */
  reminderHandler(matchId) {
    const { settings } = this.props;

    if (!settings.reminder) {
      return null;
    }

    return (event) => {
      const { remind } = this.state;

      event.preventDefault();

      if (remind.indexOf(matchId) === -1) {
        remind.push(matchId);

        WidgetTracker.track(WidgetTracker.events.engagement, {
          target: TRACK_TARGETS.remindEnable,
        });
        this.setState({
          remind,
        });
      }
    };
  }

  /**
   * Fire page tracking view
   */
  trackView() {
    const { activeWeek } = this.state;
    const { matches } = this.props;
    const { analytics } = matches || {};
    SportsTracker.track(SportsTracker.events.pageView, analytics, {
      weekOverwrite: localization.get('weekOf', { locals: { week: activeWeek } }),
    });
  }

  /**
   * Helper to handle ad rendering logic
   * @param {array} weekEvents - Week events
   * @access public
   * @returns {JSX}
   */
  renderAd(weekEvents) {
    // Minimum number of events needed to inject an ad to avoid more than one ad in vewport
    const minEventsNumber = 2;
    // Widget inline ad only if more than x events per round
    if (weekEvents.length >= minEventsNumber) {
      return (
        <div className={Styles.inlineAd}>
          {adHelper.getAd(AdTypes.TOP_AD_NO_FLEX, {
            isLazyLoaded: false,
            onRegisterSlot: this.setAdSlot,
          })}
        </div>
      );
    }
    return null;
  }

  /**
   * Render the Matches widget
   * @returns {JSX}
   */
  render() {
    // to avoid multicall of getter
    const {
      isMobile,
      isTablet,
      leagues,
      matchHandler,
      refreshAd,
      reminderHandler,
      state: {
        active,
        activeWeek,
        hasRequest,
        remind,
      },
      showTabs,
      slotAdId,
      theme,
      props: {
        settings,
        isWorldCup,
      },

    } = this;
    let navContent = null;
    const weekEvents = this.getWeekEvents();
    const hasError = this.hasDataErrors();
    const renderAd = this.renderAd(weekEvents);
    const eventsReady = activeWeek && isValidArray(weekEvents);
    const showLoading = !activeWeek && hasRequest;
    const sponsorAd = getSponsor(getLeagueId(active.data), true);
    const isValidSponsor = isValidObject(sponsorAd);
    const useSponsor = getKey(settings, 'useSponsor');
    const isWorldCupMVP = features.deportes.isWorldCupMVP();

    if (showTabs) {
      navContent = this.navContent();
      navContent.push(
        <LeagueDropdown
          isTudn
          key={getUniqKey('tabDropdown')}
          isBlack
          leagues={leagues.slice(2)}
          currentLeague={active.dropdown ? getLeagueId(active.data) : '0'}
          onChange={(event, league) => this.changeLeagueHandler(event, league, ACTIVE_DROPDOWN)}
        />
      );
    }

    // show error only if not have previous data
    if (this.showError && !hasError) {
      this.showError = false;
    }

    // if should refresh ads
    if (slotAdId && refreshAd) {
      dfpManager.refreshAds(slotAdId);
      this.refreshAd = false;
    }

    return (
      <div className="row uvs-widget matches">
        <StatWrapperStyled
          className={classnames(
            { col: !isMobile }
          )}
        >
          <TitleWrapperStyled
            isTudn
            showTabs={showTabs}
            isValidSponsor={isValidSponsor}
            isWorldCupMVP={isWorldCupMVP}
          >
            <WidgetTitleStyled
              isTudn
              isValidSponsor={isValidSponsor}
              isWorldCupMVP={isWorldCupMVP}
            >
              {isWorldCup ? localization.get('calendar') : localization.get('results')}
            </WidgetTitleStyled>
            {isValidSponsor && useSponsor
            && (
              <SponsorStyled
                logo={sponsorAd.logo}
                sponsorBy=""
                isValidSponsor={isValidSponsor}
              />
            )}
            <NavWrapperStyled
              isTudn
              isValidSponsor={isValidSponsor}
            >
              {navContent}
            </NavWrapperStyled>
          </TitleWrapperStyled>
          <ContentStyled showTabs={showTabs}>
            {!isWorldCup && (
              <TabsStyled>
                {this.loaderContent(DIRECTION_PREV)}
                <TabName
                  content={Matches.renderTitle(
                    weekEvents,
                    activeWeek,
                    getLeagueId(active.data)
                  )}
                  isActive
                  isTudn
                />
                {this.loaderContent(DIRECTION_NEXT)}
              </TabsStyled>
            )}
            {eventsReady && renderAd}
            <MatchesEvents
              isTudn
              isWorldCupMVP={isWorldCupMVP}
              isMobile={isMobile}
              isTablet={isTablet}
              isVixEnabled={this.isVixEnabled}
              matchHandler={matchHandler}
              remind={remind}
              reminderHandler={reminderHandler}
              showError={this.showError}
              showLoading={showLoading}
              showTabs={showTabs}
              weekEvents={weekEvents}
              theme={theme}
            />
          </ContentStyled>
        </StatWrapperStyled>
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Object} settings - additional settings for the component
 * @property {boolean} [settings.reminder=false] - if true allow load more soccer event on scroll
 * @property {string} [settings.displayType.value] - the type of display to render
 * @property {Object[]} [settings.highlightedCompetitionSeasons] - the league's data from BS,
 * if have 2 or more league's show the tabs
 * @property {Object[]} [settings.highlightedAlternativeCompetitionSeasons] - the altenative leagues
   for specific profile
 * @property {Object} [settings.soccerTeamSeason] - the team data from BS
 * @property {string} profile - personalization profile
 * @property {Object} matches - the matches data from store
 * @property {Object[]} matches.events - the soccer event from extractor
 * @property {(Object|boolean)} matches.error - if teh response has error from sport API
 * @property {Object} matches.analytics - the soccer analytics data from sports API
 * @property {Object} matches.showLast - if is true show last event instead of first/today event
 * @property {Function} getMatches - the redux action to get matches data
 */
Matches.propTypes = {
  settings: PropTypes.shape({
    reminder: PropTypes.bool,
    displayType: PropTypes.shape({
      value: PropTypes.oneOf([TYPE_FULL, TYPE_COLLAPSED]),
    }),
    highlightedCompetitionSeasons: PropTypes.arrayOf(
      PropTypes.shape({
        seasonId: PropTypes.string,
        soccerCompetition: PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.string,
          league: PropTypes.shape({
            coverage: PropTypes.string,
          }),
        }),
      })
    ),
    highlightedAlternativeCompetitionSeasons: PropTypes.arrayOf(
      PropTypes.shape({
        seasonId: PropTypes.string,
        soccerCompetition: PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.string,
          league: PropTypes.shape({
            coverage: PropTypes.string,
          }),
        }),
      })
    ),
    soccerTeamSeason: PropTypes.shape({
      teamId: PropTypes.string,
      soccerCompetitionSeason: PropTypes.shape({
        seasonId: PropTypes.string,
      }),
    }),
  }),
  // redux props/actions
  profile: PropTypes.string,
  matches: PropTypes.shape({
    events: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.any,
    analytics: PropTypes.object,
    paging: PropTypes.object,
    showLast: PropTypes.bool,
  }),
  getMatches: PropTypes.func.isRequired,
  isWorldCup: PropTypes.bool,
};

Matches.defaultProps = {
  settings: {
    reminder: false,
    displayType: {
      value: TYPE_FULL,
    },
    highlightedCompetitionSeasons: [],
    highlightedAlternativeCompetitionSeasons: [],
    useSponsor: false,
  },
  profile: CORE,
  matches: {
    events: [],
    paging: {
      prev: {},
      next: {},
    },
    error: false,
  },
};

export default Matches;
