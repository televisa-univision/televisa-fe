import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import {
  isEqual,
} from '@univision/fe-commons/dist/utils/helpers';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import createTimer from '@univision/fe-commons/dist/utils/timer';
import Store from '@univision/fe-commons/dist/store/store';
import SportsTracker from '@univision/fe-commons/dist/utils/tracking/tealium/sports/SportsTracker';
import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';
import NavWrapper from '@univision/shared-components/dist/components/v2/NavWrapper';
import Button from '@univision/shared-components/dist/components/v2/Button';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import {
  getLeagueId,
} from '../../../utils/helpers';
import getSortOrder from './BracketsOrder.config';
import TournamentPhase from './TournamentPhase';
import GroupPhase from './GroupPhase';
import Styles from './Brackets.styles';

const ROUND_OF_16_PHASE = 'phaseRoundOf16';
const QUARTER_FINALS_PHASE = 'phaseQuarterFinals';
const SEMI_FINALS_PHASE = 'phaseSemiFinals';
const FINALS_PHASE = 'phaseFinal';
const GROUP_PHASE = 'groupPhase';
const TOURNAMENT_PHASE = 'brackets';
const MOBILE_NAV = [GROUP_PHASE, ROUND_OF_16_PHASE, QUARTER_FINALS_PHASE,
  SEMI_FINALS_PHASE, FINALS_PHASE];

const HeaderWrapper = styled.div`${Styles.headerWrapper}`;
const FullWidthStyled = styled(FullWidth)`${Styles.container}`;
const TitleWrapperStyled = styled(TitleWrapper)`${Styles.title}`;
const NavContainer = styled.div`${Styles.navWrapper}`;
const NavWrapperStyled = styled(NavWrapper)`${Styles.nav}`;
const MobileNav = styled.div`${Styles.mobileNav}`;
const ContentStyled = styled.div`${Styles.content}`;

/**
 * Brackets Component
 * @returns {JSX}
 */
class Brackets extends Component {
  /**
   * Returns the number of cards
   * @param {Array} data - cards data
   * @returns {number}
   */
  static numberOfItems(data) {
    return isValidArray(data) ? data.length : 0;
  }

  /**
   * Returns the number of events
   * @param {Array} data - cards data
   * @returns {Object}
   */
  static getFirstItem(data) {
    return isValidArray(data) ? data[0] : {};
  }

  /**
   * Returns the events sorted by league order or ordered by date
   * @param {Array} data - cards data
   * @param {string} leagueId - the soccer competition Id
   * @returns {Array}
   */
  static sortData(data, leagueId) {
    const order = getSortOrder(leagueId);
    if (isValidArray(data)) {
      const sortedArray = [...data];
      if (isValidObject(order)) {
        return sortedArray.sort((a, b) => {
          return order[a.key] - order[b.key];
        });
      }
      return sortedArray.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
    return [];
  }

  /**
   * Returns active leg events
   * @param {Array} data - events data
   * @returns {Array}
   */
  static getActiveLegEvents(data) {
    if (isValidArray(data)) {
      const firstLegEvents = data.filter(events => events.fixture === 'Ida' || !events.fixture);
      const secondLegEvents = data.filter(events => events.fixture === 'Vuelta' || !events.fixture);
      const firstLegEvent = this.getFirstItem(firstLegEvents);
      const secondLegEvent = this.getFirstItem(secondLegEvents);
      const nowDate = new Date().getTime();
      if (isValidObject(firstLegEvent) && isValidObject(secondLegEvent)) {
        const firstLegStart = new Date(firstLegEvent.date).getTime();
        const secondLegStart = new Date(secondLegEvent.date).getTime();
        if ((nowDate < firstLegStart || firstLegStart <= nowDate) && nowDate < secondLegStart) {
          return firstLegEvents;
        }
        return secondLegEvents;
      }
      return data;
    }
    return data;
  }

  /**
   * getActivePhase method, gets current active phase of tournament
   * @param {Object} data - the tournament data
   * @param {bool} inBracketsPhase - if in brackets Phase
   * @returns {string}
   */
  static getActivePhase(data, inBracketsPhase) {
    const {
      roundOf16, quarterFinals, semiFinals, finals,
    } = data;
    let phase = GROUP_PHASE;
    const state = Store.getState();
    const mobile = deviceSelector(state) === 'mobile';
    const nowDate = new Date().getTime();
    const firstOfRoundOf16 = this.getFirstItem(roundOf16);
    const firstOfQuarterFinals = this.getFirstItem(quarterFinals);
    const firstOfSemiFinals = this.getFirstItem(semiFinals);
    const firstOfFinals = this.getFirstItem(finals);
    if (inBracketsPhase) {
      phase = isValidArray(roundOf16) ? ROUND_OF_16_PHASE : QUARTER_FINALS_PHASE;
    }
    if (isValidObject(firstOfRoundOf16)) {
      const eightsStart = new Date(firstOfRoundOf16.date).getTime();
      if (eightsStart <= nowDate) {
        phase = ROUND_OF_16_PHASE;
      }
    }
    if (isValidObject(firstOfQuarterFinals)) {
      const quartersStart = new Date(firstOfQuarterFinals.date).getTime();
      if (quartersStart <= nowDate) {
        phase = QUARTER_FINALS_PHASE;
      }
    }
    if (isValidObject(firstOfSemiFinals)) {
      const semiStart = new Date(firstOfSemiFinals.date).getTime();
      if (semiStart <= nowDate) {
        phase = SEMI_FINALS_PHASE;
      }
    }
    if (isValidObject(firstOfFinals)) {
      const finalStart = new Date(firstOfFinals.date).getTime();
      if (finalStart <= nowDate) {
        phase = FINALS_PHASE;
      }
    }
    if (!mobile && (phase === ROUND_OF_16_PHASE || phase === QUARTER_FINALS_PHASE
        || phase === SEMI_FINALS_PHASE || phase === FINALS_PHASE)) {
      phase = TOURNAMENT_PHASE;
    }
    return phase;
  }

  /**
   * Main constructor
   * @param {Object} props - component props
   */
  constructor(props) {
    super(props);
    const state = Store.getState();
    const { data: { tournamentData }, settings: { inBracketsPhase } } = this.props;
    this.timer = null;
    this.isMobile = deviceSelector(state) === 'mobile';
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
    this.getTournamnetEvents = this.getTournamnetEvents.bind(this);
    this.navContent = this.navContent.bind(this);
    this.brackets = this.getTournamnetEvents(tournamentData);
    this.state = {
      activeTab: this.constructor.getActivePhase(this.brackets, inBracketsPhase),
    };
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    const {
      props: { getBrackets },
      state: { activeTab },
    } = this;
    this.timer = createTimer(60, this.updateBrackets);
    if (getBrackets) {
      getBrackets(activeTab);
    }
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
      Array.isArray(getKey(nextProps, 'data.tournamentData.roundOf16'))
      && Array.isArray(getKey(nextProps, 'data.standingsData.sections'))
      && (!isEqual(nextState, this.state, true) || !isEqual(nextProps, this.props))
    );
  }

  /**
   * If props updated props fire corresponding track view
   * @param {Object} prevProps - Preview props
   */
  componentDidUpdate(prevProps) {
    const { data: { standingsData, tournamentData } } = this.props;
    if (!isEqual(standingsData, prevProps.data?.standingsData)
      || !isEqual(tournamentData, prevProps.data?.tournamentData)) {
      this.trackView();
    }
  }

  /**
   * Remove interval and listener
   */
  componentWillUnmount() {
    this.timer.cancel();
  }

  /**
   * hasLiveMatches methods, corecell in tournament data has a live match
   * @param {Object} data - the tournamnet events ata
   * @returns {Object}
   */
  getTournamnetEvents(data) {
    const {
      settings: { soccerLeague },
    } = this.props;
    const leagueId = getLeagueId(soccerLeague);
    if (isValidObject(data)) {
      const {
        roundOf16, quarterFinals, semiFinals, finals,
      } = data;
      const roundOf16Events = this.constructor.numberOfItems(roundOf16);
      const quarterFinalsEvents = this.constructor.numberOfItems(quarterFinals);
      const semiFinalsEvents = this.constructor.numberOfItems(semiFinals);
      const finalsEvents = this.constructor.numberOfItems(finals);
      const sortedRoundOf16 = this.constructor.sortData(roundOf16, leagueId);
      const sortedQuarterFinals = this.constructor.sortData(
        quarterFinals, leagueId
      );
      const sortedSemiFinals = this.constructor.sortData(semiFinals, leagueId);
      const sortedFinals = this.constructor.sortData(finals, leagueId);
      return {
        roundOf16: roundOf16Events > 8
          ? this.constructor.getActiveLegEvents(sortedRoundOf16)
          : sortedRoundOf16,
        quarterFinals: quarterFinalsEvents > 4
          ? this.constructor.getActiveLegEvents(sortedQuarterFinals)
          : sortedQuarterFinals,
        semiFinals: semiFinalsEvents > 2
          ? this.constructor.getActiveLegEvents(sortedSemiFinals)
          : sortedSemiFinals,
        finals: finalsEvents > 1
          ? this.constructor.getActiveLegEvents(sortedFinals)
          : sortedFinals,
      };
    }
    return {
      roundOf16: [],
      quarterFinals: [],
      semiFinals: [],
      finals: [],
    };
  }

  /**
   * hasRoundOf16 methods, returns true if there are round of 16 matches
   * @returns {bool}
   */
  get hasRoundOf16() {
    const {
      data: {
        tournamentData: {
          roundOf16,
        },
      },
    } = this.props;

    return isValidArray(roundOf16);
  }

  /**
   * hasLiveMatches methods, returns true if one of the events in tournament data has a live match
   * @returns {boolean}
   */
  get hasLiveMatches() {
    const {
      data: {
        tournamentData: {
          roundOf16, quarterFinals, semiFinals, finals,
        },
      },
    } = this.props;
    const matches = [...roundOf16, ...quarterFinals, ...semiFinals, ...finals];
    if (this.constructor.numberOfItems(matches) > 0) {
      return matches.some(datum => datum.status === 'live');
    }

    return false;
  }

  /**
   * Update brackets data if has live events
   */
  updateBrackets = () => {
    const {
      props: { getBrackets },
      state: { activeTab },
      hasLiveMatches,
    } = this;
    if (hasLiveMatches && getBrackets) {
      getBrackets(activeTab);
    }
  };

  /**
   * Toggles active navigation type
   * @param {string} tab - name of active tab
   */
  toggleActiveTab(tab) {
    const {
      props: { getBrackets },
      state: { activeTab },
    } = this;
    const inGroupPhase = activeTab === GROUP_PHASE;
    if (getBrackets) {
      if (inGroupPhase && tab !== GROUP_PHASE || !inGroupPhase && tab === GROUP_PHASE) {
        getBrackets(tab);
      }
    }
    this.setState({
      activeTab: tab,
    });
  }

  /**
   * Get nav content
   * @param {bool} hasRoundOf16 - if tournament has round of 16
   * @returns {array}
   */
  navContent(hasRoundOf16) {
    const { activeTab } = this.state;
    const { settings: { noStandings } } = this.props;
    let nav = hasRoundOf16 ? MOBILE_NAV : MOBILE_NAV
      .filter(phase => phase !== ROUND_OF_16_PHASE);
    nav = !noStandings ? nav : nav.filter(phase => phase !== GROUP_PHASE);
    return nav
      .map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Button
            key={`tab${tab}`}
            type="nav"
            isActive={isActive}
            className={Styles.navItem}
            onPress={() => this.toggleActiveTab(tab)}
            isTudn
            useUpperCase
          >
            {localization.get(tab)}
          </Button>
        );
      });
  }

  /**
   * Fire page tracking view
   */
  trackView() {
    const { data } = this.props;
    let analyticsData;

    if (data && (data.standingsData || data.tournamentData)) {
      analyticsData = data.standingsData.analytics || data.tournamentData.analytics;
    }

    SportsTracker.track(SportsTracker.events.pageView, analyticsData);
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      data: { tournamentData, standingsData }, className, settings: { soccerLeague, noStandings },
    } = this.props;
    const { activeTab } = this.state;
    const theme = themes.sports;
    const leagueId = isValidObject(soccerLeague) ? getLeagueId(soccerLeague) : '0';
    if (!isValidObject(tournamentData) || !isValidObject(standingsData)) {
      return null;
    }
    const tournament = this.getTournamnetEvents(tournamentData);
    const mobile = this.isMobile;

    return (
      <ErrorBoundary>
        <FullWidthStyled className={Styles.container} breakpoints={['xs', 'xxs']}>
          <div className={classnames('uvs-widget row brackets', className, { 'no-gutters': mobile })}>
            <div className="col">
              <HeaderWrapper>
                <TitleWrapperStyled
                  theme={theme}
                  isTudn
                >
                  <WidgetTitle isTudn>
                    {localization.get('brackets')}
                  </WidgetTitle>
                </TitleWrapperStyled>
              </HeaderWrapper>
              <NavContainer>
                <NavWrapperStyled
                  isTudn
                  withScroll={mobile}
                >
                  {mobile ? (
                    <MobileNav>{this.navContent(this.hasRoundOf16)}</MobileNav>
                  ) : (
                    !noStandings
                    && (
                      <div>
                        <Button
                          type="nav"
                          isActive={activeTab === GROUP_PHASE}
                          onPress={() => this.toggleActiveTab(GROUP_PHASE)}
                          className="firstButton"
                          isTudn
                          useUpperCase
                        >
                          {localization.get(GROUP_PHASE)}
                        </Button>
                        <Button
                          type="nav"
                          isActive={activeTab === TOURNAMENT_PHASE}
                          onPress={() => this.toggleActiveTab(TOURNAMENT_PHASE)}
                          className="secondButton"
                          isTudn
                          useUpperCase
                        >
                          {localization.get(TOURNAMENT_PHASE)}
                        </Button>
                      </div>
                    )
                  )}
                </NavWrapperStyled>
              </NavContainer>
              <ContentStyled>
                {activeTab === GROUP_PHASE ? (
                  <GroupPhase
                    data={standingsData}
                    leagueId={leagueId}
                    isTudn
                  />
                ) : (
                  <TournamentPhase
                    tournament={tournament}
                    isMobile={mobile}
                    active={activeTab}
                    isTudn
                  />
                )}
              </ContentStyled>
            </div>
          </div>
        </FullWidthStyled>
      </ErrorBoundary>
    );
  }
}

/**
 * @property {Object} settings - widget settings
 * @property {string} [settings.displayType.value] - the type of display to render
 * @property {string} [settings.inBracketsPhase] - if true to show brackets on first load
 * @property {string} [settings.noStandings] - if true not show standings tab/content
 * @property {string} [settings.soccerLeague] - the soccerLeague data
 * @property {Object} [data.tournamentData] - tournament/brackets data
 * @property {Object} [data.standingsData] - standings/brackets data
 * @property {string} className - modifier class
 * @property {Function} getBrackets - the redux action to get brackets data
 */
Brackets.propTypes = {
  settings: PropTypes.shape({
    displayType: PropTypes.shape({
      value: PropTypes.oneOf(['FULL', 'COLLAPSED']),
    }),
    inBracketsPhase: PropTypes.bool,
    noStandings: PropTypes.bool,
    soccerLeague: PropTypes.shape({
      seasonId: PropTypes.string,
      soccerCompetition: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
    }),
  }),
  data: PropTypes.shape({
    standingsData: PropTypes.object,
    tournamentData: PropTypes.shape({
      roundOf16: PropTypes.array,
      quarterFinals: PropTypes.array,
      semiFinals: PropTypes.array,
      finals: PropTypes.array,
      analytics: PropTypes.shape({}),
    }),
  }),
  className: PropTypes.string,
  // Redux props/actions
  getBrackets: PropTypes.func,
};

Brackets.defaultProps = {
  settings: {
    highlightedCompetitionSeasons: [],
    inBracketsPhase: false,
    noStandings: false,
  },
  data: {
    tournamentData: {
      roundOf16: [],
      quarterFinals: [],
      semiFinals: [],
      finals: [],
    },
    standingsData: {
      sections: [],
    },
  },
};

export default Brackets;
