import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import HeaderScoreCard from '@univision/shared-components/dist/components/v2/HeaderScoreCard';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import LogOutBar from '@univision/fe-components-base/dist/components/LogOutBar';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import {
  locationRedirect,
} from '@univision/fe-commons/dist/utils/helpers';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import features from '@univision/fe-commons/dist/config/features';
import { US } from '@univision/fe-commons/dist/constants/userLocation';

import { getSoccerMatchNavLinks } from '../../../utils/layoutWidgets/matchCenter/soccerMatchNavDefinitions';
import {
  getActiveLeagueUri,
  getLeagueCoverage,
  getLeagueAbbrName,
  getLeagueShortName,
  getTudnUrl,
  filterChannels,
} from '../../../utils/helpers';
import localization from '../../../utils/localization';
import Microdata from '../../utils/Microdata';
import ApiError from '../../base/ApiError';
import SoccerMatchNav from '../../base/SoccerMatchNav';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import Styles from './MatchCenterOpening.styles';

const TRACK_TARGETS = {
  team: 'opening-mc-equipo',
  remindEnable: 'opening-mc-enable',
  remindDisable: 'opening-mc-disable',
  league: 'opening-mc-liga',
  player: 'mcopening_playerclick',
};
const getSize = Symbol('getSize');

const MessageStyled = styled(ApiError)`${Styles.message}`;
const HeaderScoreCardStyled = styled(HeaderScoreCard)`${Styles.scoreCard}`;
const ContainerStyled = styled(FullWidth)`${Styles.container}`;
const WrapperStyled = styled.div`${Styles.wrapper}`;

/**
 * MatchCenterOpening component for sports match center section
 * @access public
 * @extends {React.Component}
 */
class MatchCenterOpening extends React.PureComponent {
  /**
   * Get the size to scoreCard
   * @access private
   * @returns {string}
   */
  static [getSize]() {
    const innerWidth = getKey(global.window, 'innerWidth');
    let size = 'small';

    // pseudo responsive
    if (innerWidth >= 1024) {
      size = 'large';
    } else if (innerWidth >= 768) {
      size = 'medium';
    }
    return size;
  }

  /**
   * Returns the handler for the player tracking
   * @access public
   */
  static playerHandler() {
    WidgetTracker.track(
      WidgetTracker.events.engagement,
      {
        target: TRACK_TARGETS.player,
      },
    );
  }

  /**
   * bind methods and setup component
   * @param {Object} props - the component props
   * @param {Object} context - react context from parent component
   * @access public
   * @constructor
   */
  constructor(props, context) {
    super(props, context);

    this.resizeHandler = this.resizeHandler.bind(this);
    this.teamHandler = this.teamHandler.bind(this);
    this.leagueHandler = this.leagueHandler.bind(this);
    this.scorersHandler = this.scorersHandler.bind(this);
    this.isMobile = props.device === 'mobile';
    this.timer = null;
    this.state = {
      size: 'small',
      remind: [],
      scorersOpen: false,
    };
    this.debounceResize = debounce(this.resizeHandler, 250).bind(this);
    this.isVixEnabled = features.widgets.isVixEnabled();
  }

  /**
   * Listen resize window event and fetch match data
   * @access public
   */
  componentDidMount() {
    this.setUpdate();
    window.addEventListener('resize', this.debounceResize);
  }

  /**
   * Check if the status of the soccer event change
   * to set interval according of that status
   * @param {Object} prevProps - the previous props component
   * @access public
   */
  componentDidUpdate(prevProps) {
    const status = getKey(this.props, 'match.status', null);
    const prevStatus = getKey(prevProps, 'match.status', null);

    if (prevStatus !== status) {
      // Set update interval acording of status
      this.setUpdate();
    }
  }

  /**
   * Remove resize listen event
   * @access public
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceResize);
    this.stopUpdate();
  }

  /**
   * Set the update interval to refresh the soccer match event information
   * @access public
   */
  setUpdate() {
    this.setState({
      size: this.constructor[getSize](),
    });
    const { settings, getMatch, match } = this.props;
    const status = getKey(match, 'status');
    const matchId = getKey(settings, 'matchId');
    const interval = status === 'live' ? 30 : 90;

    if (this.timer) {
      this.stopUpdate();
    } else {
      // Update immediately on mount
      getMatch(matchId);
    }

    if (status === 'post') {
      return;
    }

    // Update match date every 90 seconds
    this.timer = setInterval(() => {
      getMatch(matchId);
    }, interval * 1000);
  }

  /**
   * Stop the update interval
   */
  stopUpdate() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Get match element content
   * @access public
   * @returns {JSX}
   */
  matchContent() {
    const {
      match,
      pageCategory,
      settings,
      userLocation,
    } = this.props;
    const { remind, size, scorersOpen } = this.state;

    const isWorldCupMVP = features.deportes.isWorldCupMVP();
    if (!match || (match.error && getKey(match.error, 'statusCode') !== 404)) {
      return <MessageStyled />;
    }

    if (!hasKey(match, 'teams.home.id') || !hasKey(match, 'teams.away.id')) {
      return <MessageStyled message={localization.get('noInfo')} />;
    }

    const { teams } = match;
    const compact = getKey(settings, 'compact', false);
    const league = getKey(settings, 'soccerCompetitionSeason');
    const leagueName = this.isMobile ? getLeagueAbbrName(league) : getLeagueShortName(league);
    const leagueLink = { href: getTudnUrl(getActiveLeagueUri(league)) };
    const teamLink = {
      home: { href: getTudnUrl(teams.home.url) },
      away: { href: getTudnUrl(teams.away.url) },
    };
    const reminderAction = this.reminderHandler(match.id);
    const isReminderActive = remind.indexOf(match.id) !== -1;

    let opacity = 1;

    if (compact) {
      opacity = 0;
    }

    return (
      <>
        <Microdata data={match} />
        <HeaderScoreCardStyled
          isTudn
          countdown
          size={size}
          type="matchCenter"
          fixture={match.fixture}
          teams={teams}
          date={match.date}
          status={match.status}
          channels={filterChannels({
            channels: match.channels,
            isVixEnabled: this.isVixEnabled,
            userLocation,
            isWorldCupMVP,
          })}
          coverage={match.coverage}
          week={match.week}
          locale={localization.getCurrentLanguage()}
          elapsedTime={match.elapsedTime}
          previousOutcomes={match.previousOutcomes}
          leagueName={leagueName}
          teamsOnPress={this.teamHandler}
          teamsLink={teamLink}
          reminderOnPress={reminderAction}
          isReminderActive={isReminderActive}
          scrollOpacity={opacity}
          leagueLink={leagueLink}
          leagueOnPress={this.leagueHandler}
          leaguePhase={match.leaguePhase}
          isCompact={compact}
          isMobile={this.isMobile}
          useAbbreviatedRound={this.isMobile || isWorldCupMVP}
          scorersOnPress={this.scorersHandler}
          scorersIsOpen={scorersOpen}
          scorersHome={match.scorersHome}
          scorersAway={match.scorersAway}
          playerOnPress={this.constructor.playerHandler}
          isWorldCupMVP={isWorldCupMVP}
        />
        {isValidValue(settings?.matchId) && (
          <SoccerMatchNavContext.Consumer>
            {({ navigationItems }) => {
              return (
                <SoccerMatchNav
                  navLinks={getSoccerMatchNavLinks(navigationItems, {
                    coverage: getLeagueCoverage(settings),
                    hasLiveStream: match.hasLiveStream,
                    pageCategory,
                  })}
                />
              );
            }}
          </SoccerMatchNavContext.Consumer>
        )}
        <LogOutBar variant="light" />
      </>
    );
  }

  /**
   * Handler for screen resize
   * @access public
   */
  resizeHandler() {
    const size = this.constructor[getSize]();
    const { size: stateSize } = this.state;
    if (size !== stateSize) {
      this.setState({
        size,
      });
    }
  }

  /**
   * Returns the handler for the team action
   * @param {Object} event - the JS click event
   * @param {Object} team - the team clicked data
   * @access public
   */
  teamHandler(event, team) {
    const league = getKey(this.props, 'settings.soccerCompetitionSeason');
    const coverage = getLeagueCoverage(league);
    const uri = coverage === 'Performance' ? team.url : getActiveLeagueUri(league);

    event.preventDefault();

    if (!global.window || !uri) {
      return;
    }

    WidgetTracker.track(
      WidgetTracker.events.engagement,
      {
        target: TRACK_TARGETS.team,
      },
      locationRedirect(getTudnUrl(uri))
    );
  }

  /**
   * Show the rest of the scorers on mobile
   * @access public
   */
  scorersHandler() {
    this.setState(({ scorersOpen }) => ({ scorersOpen: !scorersOpen }));
    WidgetTracker.track(WidgetTracker.events.engagement, { target: 'opening-mc-scorers' });
  }

  /**
   * Returns the handler for the league action
   * @param {Object} event - the JS click event
   * @access public
   */
  leagueHandler(event) {
    const league = getKey(this.props, 'settings.soccerCompetitionSeason');
    const uri = getActiveLeagueUri(league);

    event.preventDefault();

    if (!global.window || !uri) {
      return;
    }

    WidgetTracker.track(
      WidgetTracker.events.engagement,
      {
        target: TRACK_TARGETS.league,
      },
      locationRedirect(uri)
    );
  }

  /**
   * Returns the handler for match notifications
   * @param {string} matchId - the match event ID to enabled notifications
   * @access public
   * @returns {Function}
   */
  reminderHandler(matchId) {
    const reminder = getKey(this.props, 'settings.reminder');

    if (!reminder) {
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
   * Render the MatchCenterOpening widget
   * @returns {JSX}
   */
  render() {
    return (
      <ContainerStyled>
        <WrapperStyled className="uvs-widget match-opening">{this.matchContent()}</WrapperStyled>
      </ContainerStyled>
    );
  }
}

/**
 * propTypes
 * @property {Object} settings - the widget settings
 * @property {boolean} settings.compact - enable or disabled the compact version
 * @property {boolean} settings.reminder - enable or disabled match notifications
 * @property {number} settings.matchId - the ID of soccer match event
 * @property {Object} settings.soccerCompetitionSeason - the soccer competition data
 * @property {string} device - page device from widget factory
 * @property {function} getMatch - the action function for fetch match data
 * @property {Object} match - the match data (parse or future redux)
 * @property {string} pageCategory - current page category from state
 */
MatchCenterOpening.propTypes = {
  settings: PropTypes.shape({
    compact: PropTypes.bool,
    reminder: PropTypes.bool,
    matchId: PropTypes.number,
    soccerCompetitionSeason: PropTypes.object,
  }),
  device: PropTypes.string,
  // redux props
  getMatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  pageCategory: PropTypes.string,
  userLocation: PropTypes.string,
};

MatchCenterOpening.defaultProps = {
  settings: {
    compact: false,
    reminder: false,
  },
  match: {},
  userLocation: US,
};

export default MatchCenterOpening;
