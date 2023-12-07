import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';
import {
  hasKey,
  locationRedirect,
} from '@univision/fe-commons/dist/utils/helpers';
import { getPageUrl } from '@univision/fe-commons/dist/store/storeHelpers';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isEqual from '@univision/fe-utilities/helpers/common/isEqual';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';

import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import Store from '@univision/fe-commons/dist/store/store';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import SportsTracker from '@univision/fe-commons/dist/utils/tracking/tealium/sports/SportsTracker';
import ScoreCell from '@univision/shared-components/dist/components/v2/ScoreCell';
import ScoreCard from '@univision/shared-components/dist/components/v3/ScoreCard';
import Carousel from '@univision/fe-components-base/dist/components/Carousel';
import Sponsor from '@univision/fe-components-base/dist/components/Sponsor';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Button from '@univision/shared-components/dist/components/v2/Button';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import { MX, US } from '@univision/fe-commons/dist/constants/userLocation';

import { getTudnUrl } from '../../../utils/helpers';
import Microdata from '../../utils/Microdata';
import ScoreCellsArrow from './ScoreCellsArrow';
import CalienteCTA from '../../base/CalienteCTA';

import Styles from './ScoreCells.styles';

const FullWidthStyled = styled(FullWidth)`${Styles.fullWidth}`;
const CarouselStyled = styled(Carousel)`${Styles.carousel}`;
const CalienteCTAStyled = styled(CalienteCTA)`${Styles.calienteCTA}`;
const ContainerRowStyled = styled.div`${Styles.containerRow}`;
const ContainerColStyled = styled.div`${Styles.containerCol}`;
const CellContainerStyled = styled.div`${Styles.cellContainer}`;
const ViewButtonStyled = styled.div`${Styles.viewButton}`;
const SeeAllContainerStyled = styled.div`${Styles.seeAllContainer}`;
const SeeAllTudnStyled = styled(Button)`${Styles.seeAllTudn}`;
const ScoreCellWrapperStyled = styled.div`${Styles.scoreCellWrapper}`;
const ScoreCellStyled = styled(ScoreCell)`${Styles.scoreCell}`;
const ScoreCardStyled = styled(ScoreCard)`${Styles.scoreCard}`;
const SponsorStyled = styled(Sponsor)`${Styles.sponsor}`;
const ViewMoreButtonStyled = styled(Button)`${Styles.viewMoreButton}`;

const MATCH_STATUS = ['live', 'pre', 'post'];

/**
 * ScoreCells Component
 * @returns {JSX}
 */
class ScoreCells extends Component {
  /**
   * Returns the number of cards
   * @param {Array} data - cards data
   * @returns {number}
   */
  static numberOfItems(data) {
    return isValidArray(data) ? data.length : 0;
  }

  /**
   * getMicroData method
   * @param {Object} card - card object
   * @returns {JSX}
   */
  static getMicroData(card) {
    const home = getKey(card, 'home');
    const away = getKey(card, 'away');
    const microData = {
      date: card.date,
      stadiumName: card.stadiumName,
      teams: { home, away },
      url: card.url,
      leagueName: card.leagueName,
      image: getKey(card, 'home.imageURI') || getKey(card, 'away.imageURI'),
    };

    return <Microdata data={microData} />;
  }

  /**
   * adTracking Method
   * @returns {function}
   */
  static adTracking() {
    return (event) => {
      event.preventDefault();
      WidgetTracker.track(WidgetTracker.events.engagement, {
        target: 'scorecell-sponsorclick',
      });
    };
  }

  /**
   * Show all handler
   * @param {Object} event - a native JS event
   * @access public
   */
  static showAllHandler(event) {
    event.preventDefault();
    WidgetTracker.track(
      WidgetTracker.events.engagement,
      {
        target: 'scorecells-vertodos',
      },
      locationRedirect(getTudnUrl('https://www.tudn.com/futbol/partidos-de-futbol-para-hoy-en-vivo'))
    );
  }

  /**
   * Tracks Caliente CTA callback
   * @param {Object} card - card object
   * @returns {function}
   */
  static trackCalienteCta(card) {
    const { key } = card;
    const data = {
      key,
      title: global?.window?.location?.href,
    };

    return () => {
      SportsTracker.track(
        SportsTracker.events.caliente,
        data,
      );
    };
  }

  /**
   * Main constructor
   * @param {Object} props - component props
   */
  constructor(props) {
    super(props);
    const { device } = props;
    this.mobileScrollPosition = 0;
    this.timer = null;
    this.isMobile = device === 'mobile';
    this.pageUrl = getPageUrl(Store);
    this.adTracking = this.constructor.adTracking.bind(this);
    this.matchStatusAction = this.matchStatusAction.bind(this);
    this.showAllHandler = this.constructor.showAllHandler.bind(this);
    this.toggleShowAll = this.toggleShowAll.bind(this);
    this.state = {
      showAll: false,
    };
    this.carousel = React.createRef();
  }

  /**
   * Evaluate the current breakpoint and returns it
   * @returns {string}
   */
  static get currentBreakPoint() {
    const width = getKey(global, 'window.innerWidth', 0);

    // We're using if instead of switch based on browsers performance tests
    // http://jsfiddle.net/some/HKdug/
    if (width >= 480 && width < 768) {
      return 'xs';
    }
    if (width >= 768 && width < 1024) {
      return 'sm';
    }
    if (width >= 1024 && width < 1280) {
      return 'md';
    }
    if (width >= 1280 && width < 1440) {
      return 'lg';
    }
    if (width >= 1440) {
      return 'xl';
    }

    return 'xxs';
  }

  /**
   * Sorts a data array by a provided sorting order and then
   * by status priority
   * @param {Object} data - score cell data
   * @param {Array} sortingOrder - order to sort matches
   * @returns {Array}
   */
  static filterDataByStatus(data, sortingOrder) {
    if (!isValidArray(data)) {
      return [];
    }

    const sortingLength = MATCH_STATUS.length + 1;
    let sortedData;

    // Sort by highlighted competition seasons first if available
    if (isValidArray(sortingOrder)) {
      const sortingOrderLength = sortingOrder.length + 1;
      sortedData = data.sort((a, b) => {
        const indexA = sortingOrder.indexOf(a?.leagueKey);
        const indexB = sortingOrder.indexOf(b?.leagueKey);
        const sortA = indexA < 0 ? sortingOrderLength : indexA;
        const sortB = indexB < 0 ? sortingOrderLength : indexB;
        return sortA - sortB;
      });
    }

    // Sort by status then
    sortedData = data.sort((a, b) => {
      const indexA = MATCH_STATUS.indexOf(a?.status);
      const indexB = MATCH_STATUS.indexOf(b?.status);
      const sortA = indexA < 0 ? sortingLength : indexA;
      const sortB = indexB < 0 ? sortingLength : indexB;

      return sortA - sortB;
    });

    return sortedData;
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    if (hasKey(this, 'props.getScoreCells')) {
      const { getScoreCells } = this.props;
      getScoreCells();
      this.setupInterval();
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
      Array.isArray(getKey(nextProps, 'data'))
      && (!isEqual(nextState, this.state, true) || !isEqual(nextProps, this.props))
    );
  }

  /**
   * Check if component updated props and no timer is available to set up interval
   * @param {Object} prevProps - Preview props
   */
  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (!isEqual(data, prevProps.data) && !this.timer) {
      this.setupInterval();
    }
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /**
   * hasLiveMatches methods, returns true if one of the scorecell has a live match
   * @returns {bool}
   */
  get hasLiveMatches() {
    const {
      constructor: { numberOfItems },
      props: { data },
    } = this;
    const numberOfCells = numberOfItems(data);

    if (numberOfCells > 0) {
      return data.some(datum => datum.status === 'live');
    }

    return false;
  }

  /**
   * Gets score cell data, groups them by status (live, upcoming, finished).
   * If highlighted competition seasons are configured, it will sort each group
   * by the order provided
   */
  get scoreCellData() {
    const { data, settings: { highlightedCompetitionSeasons } } = this.props;
    const sortingOrder = isValidArray(highlightedCompetitionSeasons)
      && highlightedCompetitionSeasons.map(hc => hc?.soccerCompetition?.id).filter(Boolean);

    const sortedData = this.constructor.filterDataByStatus(data, sortingOrder);

    return sortedData;
  }

  /**
   * Setup timer that calls {#startInverval}
   */
  setupInterval() {
    const {
      constructor: { numberOfItems },
      props: { data, interval },
      hasLiveMatches,
    } = this;
    const numberOfCells = numberOfItems(data);
    const timer = hasLiveMatches ? 30 : interval;
    if (numberOfCells > 0) {
      this.timer = setInterval(this.startInterval.bind(this, hasLiveMatches), timer * 1000);
    }
  }

  /**
   * Calls getScoreCells with a timer
   * @param {bool} oldLiveMatches - hasLiveMatches on initial setup
   */
  startInterval(oldLiveMatches) {
    const { getScoreCells } = this.props;

    getScoreCells();

    if (this.hasLiveMatches && !oldLiveMatches) {
      clearInterval(this.timer);
      this.timer = null;
      this.setupInterval();
    }
  }

  /**
   * matchStatusAction method
   * @param {Object} card - card object
   * @returns {?function}
   */
  matchStatusAction(card) {
    const { userLocation } = this.props;
    const { status, url } = card;
    if (url && MATCH_STATUS.includes(status)) {
      const matchTrack = {
        data: card,
      };
      if (this.isMobile) {
        return (event) => {
          event.preventDefault();
          if (userLocation === MX) {
            SportsTracker.track(
              SportsTracker.events.momios,
              {
                key: card?.key,
                title: card?.leagueName,
              }
            );
          }
          SportsTracker.track(
            SportsTracker.events.match,
            matchTrack,
            locationRedirect(getTudnUrl(card.url))
          );
        };
      }
      return () => {
        if (userLocation === MX) {
          SportsTracker.track(
            SportsTracker.events.momios,
            {
              key: card?.key,
              title: card?.leagueName,
            }
          );
        }

        SportsTracker.track(
          SportsTracker.events.match,
          matchTrack
        );
      };
    }

    return null;
  }

  /**
   * Show the rest of the scorcells on mobile
   */
  toggleShowAll() {
    this.setState(({ showAll }) => ({ showAll: !showAll }));
    const { showAll } = this.state;
    WidgetTracker.track(
      WidgetTracker.events.engagement, { target: showAll ? 'scorecells-vermaspartidos' : 'scorecells-vermenospartidos' }
    );
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      constructor: { currentBreakPoint, numberOfItems },
      isMobile,
      props: {
        className,
        data,
        widgetContext: { isWorldCupMVP },
        sponsor,
        userLocation,
      },
      state: { showAll },
      scoreCellData,
    } = this;
    const theme = themes.sports;
    const numberOfCells = numberOfItems(data);
    if (!isValidArray(scoreCellData)) {
      return null;
    }

    const hasSponsor = isValidValue(sponsor);
    let useCarousel = false;
    const sponsorOffset = hasSponsor ? 1 : 0;
    const itemsToBeDisplayed = {
      xs: 1,
      sm: 3 - sponsorOffset,
      md: 4 - sponsorOffset,
      lg: 5 - sponsorOffset,
      xl: 5 - sponsorOffset,
    };
    if (currentBreakPoint !== 'xxs' && currentBreakPoint !== 'xs') {
      switch (currentBreakPoint) {
        case 'sm': {
          if (hasSponsor) {
            useCarousel = numberOfCells > 2;
          } else {
            useCarousel = numberOfCells > 3;
          }
          break;
        }
        case 'md': {
          useCarousel = numberOfCells > 3;
          break;
        }
        default: {
          useCarousel = numberOfCells > 4;
        }
      }
    }

    const cellData = isMobile && numberOfCells > 8 ? scoreCellData.slice(0, 8) : scoreCellData;
    const cells = cellData.map((card, ind) => (
      <ScoreCellWrapperStyled
        inCarousel={useCarousel && !isMobile}
        withPadding={ind === numberOfCells - 1}
        hidden={ind > 1 && !showAll && isMobile}
        mobileWrapper={isMobile && numberOfCells === 1}
        alignRight={ind % 2 !== 0 && isMobile}
        key={card.key}
        isWorldCupMVP={isWorldCupMVP}
        hasCalienteCta={card?.calienteMetadata && userLocation === MX}
      >
        {!isWorldCupMVP && (
          <ScoreCellStyled
            customWidth={isMobile || useCarousel}
            {...card}
            link={!isMobile ? { href: getTudnUrl(card.url), target: '_blank' } : null}
            onPress={this.matchStatusAction(card)}
            isTudn
          />
        )}
        {isWorldCupMVP && (
          <>
            <ScoreCardStyled
              {...card}
              teams={{
                away: card?.away,
                home: card?.home,
              }}
              type="cell"
              inCarousel={useCarousel}
              link={!isMobile ? { href: getTudnUrl(card.url), target: '_blank' } : null}
              onPress={this.matchStatusAction(card)}
              isTudn
            />
            {card?.calienteMetadata && userLocation === MX && (
              <CalienteCTAStyled
                {...card.calienteMetadata}
                onClick={this.constructor.trackCalienteCta(card)}
                isBetOpen={card.calienteMetadata?.isBetOpen && card?.status !== 'post'}
              />
            )}
          </>
        )}
        {this.constructor.getMicroData(card)}
      </ScoreCellWrapperStyled>
    ));

    const seeMore = (
      <SeeAllContainerStyled
        key="button-seeAll"
        hidden={isMobile && !showAll}
        isWorldCupMVP={isWorldCupMVP}
      >
        <SeeAllTudnStyled
          type="primary"
          onPress={this.showAllHandler}
          isOutlined={!isWorldCupMVP}
          isTudn
          useIcon={!isMobile}
          isWorldCupMVP={isWorldCupMVP}
        >
          {isMobile ? localization.get('seeAllGames') : localization.get('seeAll')}
        </SeeAllTudnStyled>
      </SeeAllContainerStyled>
    );

    if (useCarousel && !isMobile) {
      cells.push(seeMore);
    } else if (isMobile && numberOfCells > 1) {
      cells.push(seeMore);
    }

    return (
      <FullWidthStyled
        breakpoints={['lg', 'md', 'sm', 'xs', 'xxs']}
        className={className}
      >
        <div className="uvs-container">
          <ContainerRowStyled className="row uvs-widget">
            <ContainerColStyled
              className={classnames('col', {
                'col-sm-9': hasSponsor,
              })}
            >
              {useCarousel && !isMobile
                ? (
                  <CarouselStyled
                    itemsToBeDisplayed={itemsToBeDisplayed}
                    switchToDesktop={480}
                    ref={this.carousel}
                    leftArrow={<ScoreCellsArrow />}
                    rightArrow={<ScoreCellsArrow isRight />}
                    offsetMargin={0}
                    separator={isWorldCupMVP ? 5 : 0}
                    partialShowing={!isWorldCupMVP}
                  >
                    {cells}
                  </CarouselStyled>
                )
                : (
                  <CellContainerStyled
                    mobileOneCell={isMobile && numberOfCells === 1}
                    mobileMoreCell={isMobile && numberOfCells > 1}
                    isWorldCupMVP={isWorldCupMVP}
                  >
                    {cells}
                  </CellContainerStyled>
                )
              }
              {numberOfCells > 2 && isMobile && (
                <div className="row no-gutters">
                  <ViewButtonStyled className="col">
                    <ViewMoreButtonStyled
                      type="loadMore"
                      alignment="center"
                      onPress={this.toggleShowAll}
                      icon={showAll ? 'arrowUp' : 'arrowDown'}
                      theme={theme}
                      className="toggleAll"
                      isTudn
                      isWorldCupMVP={isWorldCupMVP}
                    >
                      {showAll
                        ? localization.get('viewLessGames')
                        : localization.get('viewMoreGames')}
                    </ViewMoreButtonStyled>
                  </ViewButtonStyled>
                </div>
              )}
            </ContainerColStyled>
            {hasSponsor && (
              <div className="col-sm-3">
                <SponsorStyled {...sponsor} onClick={this.adTracking()} />
              </div>
            )}
          </ContainerRowStyled>
        </div>
      </FullWidthStyled>
    );
  }
}

/**
 * @property {Object} settings - widget settings
 * @property {Object[]} [settings.highlightedCompetitionSeasons] - competitions for sorting cells
 * @property {Object[]} data - scoreCells data
 * @property {Object} sponsor - the score cells sponsor
 * @property {number} interval - refresh time of widget
 * @property {Function} getScoreCells - the redux action to get score cells data
 * @property {string} profile - personalization profile
 * @property {string} className - modifier class
 */
ScoreCells.propTypes = {
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
  }),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      leagueAbbreviation: PropTypes.string,
      leagueName: PropTypes.string,
      leaguePhase: PropTypes.string,
      fixture: PropTypes.string,
      status: PropTypes.oneOf(['pre', 'live', 'post', 'postponed', 'delayed', 'canceled']),
      leagueKey: PropTypes.string,
      home: PropTypes.shape({
        fullName: PropTypes.string,
        abbreviatedName: PropTypes.string,
        imageURI: PropTypes.string.isRequired,
        lastMatches: PropTypes.array,
        scoreValue: PropTypes.shape({
          score: PropTypes.number,
          penalty: PropTypes.number,
        }),
      }).isRequired,
      away: PropTypes.shape({
        fullName: PropTypes.string,
        abbreviatedName: PropTypes.string,
        imageURI: PropTypes.string.isRequired,
        lastMatches: PropTypes.array,
        scoreValue: PropTypes.shape({
          score: PropTypes.number,
          penalty: PropTypes.number,
        }).isRequired,
      }),
      date: PropTypes.string,
      elapsedTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      isAbbreviated: PropTypes.bool,
      reminderAction: PropTypes.func,
      isReminderActive: PropTypes.bool,
      size: PropTypes.oneOf(['small', 'medium', 'large']),
      matchStatusAction: PropTypes.func,
      url: PropTypes.string,
      stadiumName: PropTypes.string,
      week: PropTypes.string,
    })
  ).isRequired,
  device: PropTypes.string,
  sponsor: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    logo: PropTypes.string,
  }),
  interval: PropTypes.number,
  isHomePage: PropTypes.bool,
  widgetContext: PropTypes.shape({
    isWorldCupMVP: PropTypes.bool,
  }),
  // Redux props/actions
  getScoreCells: PropTypes.func,
  profile: PropTypes.string,
  className: PropTypes.string,
  userLocation: PropTypes.string,
};

ScoreCells.defaultProps = {
  device: 'mobile',
  interval: 90,
  isHomePage: false,
  settings: {
    highlightedCompetitionSeasons: [],
  },
  userLocation: US,
  widgetContext: {},
};

export default ScoreCells;
