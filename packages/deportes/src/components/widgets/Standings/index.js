import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  locationRedirect,
} from '@univision/fe-commons/dist/utils/helpers';
import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';
import NavWrapperV2 from '@univision/shared-components/dist/components/v2/NavWrapper';
import Button from '@univision/shared-components/dist/components/v2/Button';
import tudnTheme from '@univision/fe-commons/dist/themes/tudn';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import SportsTracker from '@univision/fe-commons/dist/utils/tracking/tealium/sports/SportsTracker';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import AdProxy from '@univision/fe-commons/dist/components/ads/dfp/AdProxy';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import isEqual from '@univision/fe-utilities/helpers/common/isEqual';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import Icon from '@univision/shared-components/dist/components/Icon';
import styled from 'styled-components';
import { BLACK } from '@univision/fe-icons/dist/constants/colors';
import { DEEP_SEA } from '@univision/fe-utilities/styled/constants';
import {
  getLeagueId,
  getLeagueName,
  getLeagueShortName,
  getLeagueAbbrName,
  getActiveLeagueUri,
  getTudnUrl,
} from '../../../utils/helpers';
import StatWrapper from '../../base/StatWrapper';
import LeagueDropdown from '../../base/LeagueDropdown';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import standingHeader from '../../../config/WidgetHeaderConfig/widgetHeader.config';
import soccerMatchNavDefinitions from '../../../utils/layoutWidgets/matchCenter/soccerMatchNavDefinitions';
import CONFIG, {
  LIGA_MX_APERTURA, LIGA_MX_CLAUSURA, FLEXIBLE,
} from './StandingsLayout/StandingsMapping/StandingsConfig';
import StandingsStyle from './Standings.styles';
import StandingsLayout from './StandingsLayout';
import Styles from './Standings.scss';

const NavWrapperMvp = styled(NavWrapperV2)`${StandingsStyle.navWrapperMvp}`;

const ButtonMvp = styled(Button)`${StandingsStyle.buttonMvp}`;
const ButtonResultMvp = styled(Button)`${StandingsStyle.buttonResultMvp}`;
const ButtonPositionMvp = styled(Button)`${StandingsStyle.buttonPositionMvp}`;
/**
 * Standings layout view
 */
class Standings extends Component {
  /**
   * Setup the state
   * @param {Object} props for this component
   * @param {Object} context react context from parent component
   */
  constructor(props, context) {
    super(props, context);
    const competitions = this.getCompetitionLeagues();

    this.state = {
      active: {
        league: isValidArray(competitions) && competitions[0],
      },
    };

    this.isMobile = props.device === 'mobile';
    this.firstLoad = true;
    this.changeLeague = this.changeLeague.bind(this);
    this.showAllHandler = this.showAllHandler.bind(this);
    this.getCompetitionLeagues = this.getCompetitionLeagues.bind(this);
    this.showResultsHandler = this.showResultsHandler.bind(this);
    this.showRelegationHandler = this.showRelegationHandler.bind(this);
  }

  /**
   * Update standings data after component was mount
   */
  componentDidMount() {
    const {
      props: { getStandings },
      state: { active },
    } = this;

    if (isValidFunction(getStandings)) {
      getStandings({
        leagueId: getLeagueId(active.league),
        leagueSeasonId: getKey(active, 'league.seasonId'),
      });
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
    const errorOrData = hasKey(nextProps, 'standings.error') || isValidArray(getKey(nextProps, 'standings.sections'));

    return (
      errorOrData && (!isEqual(nextState, this.state, true) || !isEqual(nextProps, this.props))
    );
  }

  /**
   * Hook to allow personalization after verifying if profile change
   * @param {Object} prevProps - Preview props
   */
  componentDidUpdate(prevProps) {
    const { profile, standings } = this.props;
    // Typical usage (don't forget to compare props):
    if (!isEqual(profile, prevProps.profile)) {
      this.updateLeague();
    }
    if (!isEqual(standings, prevProps.standings) && !this.firstLoad) {
      this.trackView();
    }
  }

  /**
   * Get Competition Leagues
   * @access public
   * @returns {array}
   */
  getCompetitionLeagues() {
    const { settings, profile } = this.props;
    const coreLeagues = getKey(settings, 'highlightedCompetitionSeasons') || [];
    const altLeagues = getKey(settings, 'highlightedAlternativeCompetitionSeasons') || [];
    const displayType = getKey(settings, 'displayType.value') || '';
    if (profile === 'uefa' && displayType === 'Collapsed' && isValidArray(altLeagues)) {
      return altLeagues;
    }
    return coreLeagues;
  }

  /**
   * Helper to update competition
   */
  updateLeague() {
    const competitions = this.getCompetitionLeagues();
    if (isValidArray(competitions)) {
      this.changeLeague(null, competitions[0]);
    }
  }

  /**
   * Change active league
   * @param {Object} event the js event
   * @param {Object} league data of current selected league
   */
  changeLeague(event, league) {
    const {
      getStandings,
      refreshSelectiveAd,
    } = this.props;
    this.setState({
      active: { league },
    });
    const query = { leagueId: getLeagueId(league), leagueSeasonId: league.seasonId };
    this.firstLoad = false;
    getStandings(query);
    if (isValidFunction(refreshSelectiveAd)) {
      refreshSelectiveAd();
    }
  }

  /**
   * Show all standings
   * @param {Object} event - a native JS event
   * @access public
   */
  showAllHandler(event) {
    const { active } = this.state;
    const uri = getTudnUrl(getActiveLeagueUri(active.league));

    event.preventDefault();

    if (getKey(global, 'window') && uri) {
      WidgetTracker.track(
        WidgetTracker.events.engagement,
        {
          target: 'standings-vertodos',
        },
        locationRedirect(`${uri}/posiciones`)
      );
    }
  }

  /**
   * Show results handler
   * @param {Object} event - a native JS event
   * @access public
   */
  showResultsHandler(event) {
    const { active } = this.state;
    const uri = getTudnUrl(getActiveLeagueUri(active.league));

    event.preventDefault();

    if (getKey(global, 'window') && uri) {
      WidgetTracker.track(
        WidgetTracker.events.engagement,
        {
          target: 'standings-verresultados',
        },
        locationRedirect(`${uri}/resultados`),
      );
    }
  }

  /**
   * Show Relegation Table
   * @param {Object} event - a native JS event
   * @access public
   */
  showRelegationHandler(event) {
    const { active } = this.state;
    const uri = getTudnUrl(getActiveLeagueUri(active.league));

    event.preventDefault();

    if (getKey(global, 'window') && uri) {
      WidgetTracker.track(
        WidgetTracker.events.engagement,
        {
          target: 'standings-descenso',
        },
        locationRedirect(`${uri}/descenso`)
      );
    }
  }

  /**
   * Fire page tracking view
   */
  trackView() {
    const { standings } = this.props;
    const { analytics } = standings || {};
    SportsTracker.track(SportsTracker.events.pageView, analytics);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      props: { settings, standings },
      state: { active },
      context,
    } = this;
    const { widgetContext } = this.props;
    const { isWorldCupMVP } = widgetContext || {};
    const theme = tudnTheme();
    const leagueId = getLeagueId(active.league);
    const displayType = getKey(settings, 'displayType.value') || '';
    const hasRelegation = getKey(settings, 'hasRelegation') || false;
    const leagues = this.getCompetitionLeagues();
    const getLeagueNameFn = this.isMobile ? getLeagueAbbrName : getLeagueShortName;
    const leaguesCut = 2;
    const showTabs = isValidArray(leagues) && leagues.length > 3;
    const inLigaMx = LIGA_MX_APERTURA === leagueId || LIGA_MX_CLAUSURA === leagueId;
    const config = CONFIG[leagueId] || CONFIG.default;
    const isFlexible = displayType === FLEXIBLE;
    const validStandings = standings && !standings.error;

    if (isFlexible && !validStandings) {
      return null;
    }
    if (context?.setNavigationItem) {
      context.setNavigationItem(soccerMatchNavDefinitions.STANDINGS);
    }

    let glossary = hasRelegation ? standingHeader(localization.get('relegation'))
      : standingHeader(localization.get('tournament'));
    glossary = glossary.filter((content, idx) => (idx > 1)).map((content, id) => (
      <div
        key={content[0]}
        className={classnames({
          [Styles.hideMobile]: ((id === 6 || id === 7) && !hasRelegation)
          || (id > 5 || id === 3) && config.hasPointsPerGame,
          [Styles.hide]: id === 1 && !config.hasPointsPerGame,
        })}
      >
        <span className={classnames('uvs-font-a-bold', Styles.uppercase)}>{content[0]}:</span>
        <span className={Styles.meaning}>{content[1]}</span>
      </div>
    ));
    const NavWrapper = isWorldCupMVP ? NavWrapperMvp : NavWrapperV2;
    const ButtonCup = isWorldCupMVP ? ButtonMvp : Button;
    const ButtonResult = isWorldCupMVP ? ButtonResultMvp : Button;
    const ButtonPosition = isWorldCupMVP ? ButtonPositionMvp : Button;
    return (
      <>
        <div className="row no-gutters uvs-widget standings">
          <StatWrapper className={classnames({
            col: !this.isMobile,
            [Styles.topMargin]: this.isMobile,
          })}
          >
            <TitleWrapper
              isTudn
              theme={theme}
              className={classnames(
                Styles.titleWrapper,
                Styles.tudn,
                {
                  [Styles.titleNoPadding]: showTabs,
                }
              )}
            >
              <WidgetTitle isTudn isLowerCase={isWorldCupMVP} fontColor={isWorldCupMVP && DEEP_SEA}>
                {hasRelegation ? localization.get('relegationTable')
                  : localization.get('standings')
                }
              </WidgetTitle>
              {displayType === 'Collapsed' && showTabs && (
                <NavWrapper className={Styles.nav} mvp={isWorldCupMVP} isTudn>
                  <ButtonCup
                    type="nav"
                    isTudn
                    isActive={leagueId === getLeagueId(leagues[0])}
                    onPress={event => this.changeLeague(event, leagues[0])}
                    className="firstButton"
                    useUpperCase
                  >
                    {getLeagueNameFn(leagues[0])}
                  </ButtonCup>
                  <ButtonCup
                    type="nav"
                    isTudn
                    isActive={leagueId === getLeagueId(leagues[1])}
                    onPress={event => this.changeLeague(event, leagues[1])}
                    className="secondButton"
                    useUpperCase
                  >
                    {getLeagueNameFn(leagues[1])}
                  </ButtonCup>
                  <LeagueDropdown
                    isTudn
                    isWorldCupMVP={isWorldCupMVP}
                    isBlack
                    leagues={leagues.slice(leaguesCut)}
                    onChange={(event, league) => this.changeLeague(event, league)}
                    currentLeague={leagueId}
                  />
                </NavWrapper>
              )}
            </TitleWrapper>

            {validStandings ? (
              <StandingsLayout
                data={standings}
                showButton={displayType === 'Flexible'}
                leagueName={getLeagueName(active.league)}
                leagueId={leagueId}
                isWorldCupMVP={isWorldCupMVP}
                showAll={displayType === 'Full'}
                hasRelegation={hasRelegation}
              />
            ) : (
              <div className={Styles.noInfo}>{localization.get('noInfo')}</div>
            )}
            <div className={classnames(Styles.footerWrapper, {
              [Styles.hideFooter]: displayType === 'Flexible',
              [Styles.fullFooter]: !inLigaMx && displayType === 'Full',
            })}
            >
              {displayType === 'Collapsed' && (
                <div className={Styles.footer}>
                  <ButtonResult
                    type="secondary"
                    onPress={this.showResultsHandler}
                    className={Styles.resultsButton}
                    isTudn
                  >
                    {this.isMobile ? localization.get('results') : localization.get('viewResults')}
                  </ButtonResult>
                  {
                    isWorldCupMVP
                      ? (
                        <ButtonPosition
                          type={'seeMore'}
                          onPress={this.showAllHandler}
                          className={classnames('positionmvp', Styles.button)}
                          isTudn
                          useIcon={!isWorldCupMVP}
                        >
                          {this.isMobile ? localization.get('standings').toUpperCase() : localization.get('viewStandings').toUpperCase()}
                          <Icon name={'arrowRight'} fill={BLACK} size={24} />

                        </ButtonPosition>
                      ) : (
                        <Button
                          type="primary"
                          onPress={this.showAllHandler}
                          className={Styles.button}
                          isTudn
                        >
                          {this.isMobile ? localization.get('standings') : localization.get('viewStandings')}
                        </Button>
                      )
                  }

                </div>
              )}
              {displayType === 'Full' && (inLigaMx) && (
                <div className={Styles.footer}>
                  {hasRelegation
                    ? (
                      <Button
                        type="secondary"
                        onPress={this.showAllHandler}
                        className={Styles.resultsButton}
                        isTudn
                      >
                        {this.isMobile
                          ? localization.get('standings')
                          : localization.get('viewStandings')}
                      </Button>
                    )
                    : (
                      <Button
                        type="secondary"
                        onPress={this.showRelegationHandler}
                        className={Styles.resultsButton}
                        isTudn
                      >
                        {this.isMobile
                          ? localization.get('relegation')
                          : localization.get('relegationTable')}
                      </Button>
                    )
                  }
                  <Button
                    type="primary"
                    onPress={this.showResultsHandler}
                    className={Styles.button}
                    isTudn
                  >
                    {this.isMobile ? localization.get('results') : localization.get('viewResults')}
                  </Button>
                </div>
              )}
              <div className={Styles.glossary}>
                {glossary}
              </div>
            </div>
          </StatWrapper>
        </div>
        <AdProxy className="uvs-ad-widget" {...settings?.widgetAd} />
      </>
    );
  }
}

/**
 * @property {string} device - current page device from widget factory
 * @property {object} settings - widget settings from definition/factory
 * @property {array} [settings.highlightedCompetitionSeasons] - Default competitions for nav bar
 * @property {array} [settings.highlightedAlternativeCompetitionSeasons] - Alternative competitions
 * @property {string} [settings.displayType] - to display widget Full, collapsed or flexible
 * @property {bool} [settings.hasRelegation] - is league has relegation average
 * @property {bool} [settings.widgetAd] - ad options/settings to render inside widget
 * @property {string} [settings.widgetAd.type] - ad type that should be render
 * @property {object} standings - standings data
 * @property {object[]} standings.sections - deatil standings sections
 * @property {object} standings.analytics - tracking data from sport API
 * @property {function} [refreshSelectiveAd] - function to fire refresh ads from WidthSelectiveAd
 * @property {function} getStandings - function to get standings data with redux
 * @property {string} profile - personalization profile
 */
Standings.propTypes = {
  device: PropTypes.string,
  settings: PropTypes.shape({
    highlightedCompetitionSeasons: PropTypes.arrayOf(
      PropTypes.shape({
        seasonId: PropTypes.string,
        soccerCompetition: PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        }),
      })
    ),
    highlightedAlternativeCompetitionSeasons: PropTypes.arrayOf(
      PropTypes.shape({
        seasonId: PropTypes.string,
        soccerCompetition: PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        }),
      })
    ),
    displayType: PropTypes.shape({
      value: PropTypes.oneOf(['Full', 'Collapsed', 'Flexible']),
    }),
    hasRelegation: PropTypes.bool,
    widgetAd: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
  standings: PropTypes.shape({
    sections: PropTypes.arrayOf(PropTypes.object),
    analytics: PropTypes.object,
    error: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
  refreshSelectiveAd: PropTypes.func,
  getStandings: PropTypes.func.isRequired,
  profile: PropTypes.string,
  widgetContext: PropTypes.object,
};

Standings.defaultProps = {
  settings: {
    hasRelegation: false,
  },
  standings: {
    error: false,
    sections: [],
  },
  profile: 'core',
};

Standings.contextType = SoccerMatchNavContext;

export default Standings;
