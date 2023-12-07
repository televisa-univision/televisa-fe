import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import {
  locationRedirect,
} from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import ScoreCell from '@univision/shared-components/dist/components/v2/ScoreCell';
import BracketWrapper from '@univision/shared-components/dist/components/v2/BracketWrapper';
import SportsTracker from '@univision/fe-commons/dist/utils/tracking/tealium/sports/SportsTracker';

import { getTudnUrl } from '../../../../utils/helpers';
import Styles from './TournamentPhase.styles';
import Microdata from '../../../utils/Microdata';

const BRACKETS = 'brackets';
const ROUND_OF_16_PHASE = 'phaseRoundOf16';
const QUARTER_FINALS_PHASE = 'phaseQuarterFinals';
const SEMI_FINALS_PHASE = 'phaseSemiFinals';
const FINALS_PHASE = 'phaseFinal';
const MATCH_STATUS = ['live', 'post', 'pre'];
const LARGE_BREAKPOINTS = ['lg', 'xl'];

const BracketWrapperStyled = styled(BracketWrapper)`${Styles.bracket}`;
const ScoreCellStyled = styled(ScoreCell)`${Styles.cell}`;
const TournamentWrapper = styled.div`${Styles.tournamentWrapper}`;
const PhaseStyled = styled.div`${Styles.phase}`;
const PhaseInner = styled.div`${Styles.phaseInner}`;
const PhaseTitle = styled.div`${Styles.phaseTitle}`;
const FinalWrapper = styled.div`${Styles.finalWrapper}`;
const FinalsBanner = styled.div`${Styles.finalsBanner}`;

/**
 * TournamentPhase Component
 * @returns {JSX}
 */
class TournamentPhase extends Component {
  /**
   * getMicroData method
   * @param {Object} card - card object
   * @returns {JSX}
   */
  static getMicroData(card) {
    const { home, away } = card || {};
    const microData = isValidObject(card) ? {
      date: card.date,
      stadiumName: card.stadiumName,
      teams: { home, away },
      url: card.url,
      leagueName: card.leagueName,
      image: getKey(home, 'imageURI') || getKey(away, 'imageURI'),
    } : {};

    return <Microdata data={microData} />;
  }

  /**
   * matchStatusAction method
   * @param {Object} card - card object
   * @param {bool} isMobile - if in mobile
   * @returns {?function}
   */
  static matchStatusAction(card, isMobile) {
    const { status, url } = card;
    if (url && MATCH_STATUS.includes(status)) {
      const matchTrack = {
        data: card, type: BRACKETS,
      };
      if (isMobile) {
        return (event) => {
          event.preventDefault();
          SportsTracker.track(
            SportsTracker.events.match,
            matchTrack,
            locationRedirect(getTudnUrl(card.url))
          );
        };
      }
      return () => {
        SportsTracker.track(
          SportsTracker.events.match,
          matchTrack
        );
      };
    }

    return null;
  }

  /**
   * Main constructor
   * @param {Object} props - component props
   */
  constructor(props) {
    super(props);
    this.matchStatusAction = this.constructor.matchStatusAction.bind(this);
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
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      tournament, active, isMobile,
    } = this.props;
    const { constructor: { currentBreakPoint } } = this;
    const isRoundOf16Active = active === ROUND_OF_16_PHASE;
    const isQuartersActive = active === QUARTER_FINALS_PHASE;
    const isSemisActive = active === SEMI_FINALS_PHASE;
    const isFinalActive = active === FINALS_PHASE;
    const isTablet = currentBreakPoint === 'sm';
    const isMd = currentBreakPoint === 'md';
    const desktopHide = isTablet || isMd;
    const useBracketRight = isMobile || desktopHide;
    const useFinalConnectors = !isMobile || LARGE_BREAKPOINTS.includes(currentBreakPoint);

    if (!isValidObject(tournament)) {
      return null;
    }

    const hasRoundOf16 = isValidArray(tournament.roundOf16);
    const hasQuarters = isValidArray(tournament.quarterFinals);
    const hasSemiFinals = isValidArray(tournament.semiFinals);
    const hasFinals = isValidArray(tournament.finals);

    const eights = hasRoundOf16 ? tournament.roundOf16.map((card, idx) => (
      <BracketWrapperStyled
        isTop={idx % 2 === 0}
        isBottom={idx % 2 !== 0}
        layout={idx > 3 && !useBracketRight ? 'left' : 'right'}
        hasBracketRight={useBracketRight || idx < 4}
        hasBracketLeft={!useBracketRight && idx > 3}
        key={card.key}
      >
        <ScoreCellStyled
          {...card}
          link={!isMobile ? { href: getTudnUrl(card.url), target: '_blank' } : null}
          onPress={this.matchStatusAction(card, isMobile)}
          type="bracket"
          isTudn
        />
        {this.constructor.getMicroData(card)}
      </BracketWrapperStyled>
    )) : [];

    const quarter = hasQuarters ? tournament.quarterFinals.map((card, idx) => (
      <BracketWrapperStyled
        isTop={idx % 2 === 0}
        isBottom={idx % 2 !== 0}
        layout={idx > 1 && !useBracketRight ? 'left' : 'right'}
        hasBracketRight={(useBracketRight || idx < 2) && !isRoundOf16Active}
        hasBracketLeft={!useBracketRight && idx > 1}
        hasConnectorLeft={(useBracketRight || idx < 2) && !isQuartersActive && hasRoundOf16}
        hasConnectorRight={!useBracketRight && idx > 1 && hasRoundOf16}
        size={isMobile ? 'small' : 'medium'}
        key={card.key}
        isQuarters
        isBracketMobile={isRoundOf16Active}
      >
        <ScoreCellStyled
          {...card}
          link={!isMobile ? { href: getTudnUrl(card.url), target: '_blank' } : null}
          onPress={this.matchStatusAction(card, isMobile)}
          type="bracket"
          isTudn
        />
        {this.constructor.getMicroData(card)}
      </BracketWrapperStyled>
    )) : [];

    const semi = hasSemiFinals ? tournament.semiFinals.map((card, idx) => (
      <BracketWrapperStyled
        key={card.key}
        isTop={idx % 2 === 0 && useBracketRight}
        isBottom={idx % 2 !== 0 || !useBracketRight}
        layout={idx > 0 && !useBracketRight ? 'left' : 'right'}
        hasBracketRight={(useBracketRight || idx < 1) && !isQuartersActive}
        hasBracketLeft={!useBracketRight && idx > 0}
        hasConnectorLeft={(useBracketRight || idx < 1) && !isSemisActive}
        hasConnectorRight={!useBracketRight && idx > 0}
        isSemis
        isBracketMobile={isQuartersActive}
        size={currentBreakPoint === 'md' || isTablet ? 'large' : 'small'}
      >
        <ScoreCellStyled
          {...card}
          link={!isMobile ? { href: getTudnUrl(card.url), target: '_blank' } : null}
          onPress={this.matchStatusAction(card, isMobile)}
          type="bracket"
          isTudn
        />
        {this.constructor.getMicroData(card)}
      </BracketWrapperStyled>
    )) : [];

    const finalGame = hasFinals ? tournament.finals.map(card => (
      <BracketWrapperStyled
        key={card.key}
        hasConnectorLeft={!useBracketRight ? useFinalConnectors : useBracketRight && !isFinalActive}
        hasConnectorRight={useFinalConnectors}
      >
        <ScoreCellStyled
          {...card}
          link={!isMobile ? { href: getTudnUrl(card.url), target: '_blank' } : null}
          onPress={this.matchStatusAction(card, isMobile)}
          type="bracket"
          isTudn
        />
        {this.constructor.getMicroData(card)}
      </BracketWrapperStyled>
    )) : [];

    const allRoundOf16Matches = eights.filter((a, b) => b < 8);
    const allQuarterFinalsMatches = quarter.filter((a, b) => b < 4);
    const allSemiFinalsMatches = semi.filter((a, b) => b < 2);

    return (isMobile ? (
      <TournamentWrapper>
        <PhaseStyled isActive={isRoundOf16Active}>
          <PhaseInner isPhaseResults={isRoundOf16Active}>
            {hasRoundOf16 && allRoundOf16Matches}
          </PhaseInner>
          <PhaseInner isPhaseReuslts={isRoundOf16Active}>
            {hasQuarters && allQuarterFinalsMatches}
          </PhaseInner>
        </PhaseStyled>
        <PhaseStyled isActive={isQuartersActive}>
          <PhaseInner>
            {hasQuarters && allQuarterFinalsMatches}
          </PhaseInner>
          <PhaseInner>
            {hasSemiFinals && allSemiFinalsMatches}
          </PhaseInner>
        </PhaseStyled>
        <PhaseStyled isActive={isSemisActive}>
          <PhaseInner>
            {hasSemiFinals && allSemiFinalsMatches}
          </PhaseInner>
          <PhaseInner>
            {hasFinals && finalGame}
          </PhaseInner>
        </PhaseStyled>
        <PhaseStyled
          isActive={isFinalActive}
          isFull={isFinalActive}
        >
          <PhaseInner isFull={isFinalActive}>
            <FinalsBanner>
              {localization.get('grandFinals')}
            </FinalsBanner>
            {hasFinals
            && (
              <FinalWrapper>
                {finalGame}
              </FinalWrapper>
            )}
          </PhaseInner>
        </PhaseStyled>
      </TournamentWrapper>
    )
      : (
        <TournamentWrapper>
          <PhaseStyled hide={!hasRoundOf16}>
            <PhaseTitle className="uvs-font-a-bold">
              {localization.get(`${ROUND_OF_16_PHASE}Nav`)}
            </PhaseTitle>
            {hasRoundOf16 && useBracketRight
              ? allRoundOf16Matches
              : eights.filter((a, b) => b < 4)
            }
          </PhaseStyled>
          <PhaseStyled isQuarters>
            <PhaseTitle className="uvs-font-a-bold">
              {localization.get(`${QUARTER_FINALS_PHASE}Nav`)}
            </PhaseTitle>
            {hasQuarters && useBracketRight
              ? allQuarterFinalsMatches
              : quarter.filter((a, b) => b < 2)}
          </PhaseStyled>
          <PhaseStyled>
            <PhaseTitle className="uvs-font-a-bold">
              {localization.get(SEMI_FINALS_PHASE)}
            </PhaseTitle>
            {hasSemiFinals && useBracketRight ? allSemiFinalsMatches : semi[0]}
          </PhaseStyled>
          <PhaseStyled isFinals>
            <PhaseTitle className="uvs-font-a-bold">
              {localization.get(FINALS_PHASE)}
            </PhaseTitle>
            <FinalsBanner>
              {localization.get('grandFinals')}
            </FinalsBanner>
            {hasFinals && finalGame}
          </PhaseStyled>
          <PhaseStyled desktopHide={desktopHide}>
            <PhaseTitle className="uvs-font-a-bold">
              {localization.get(SEMI_FINALS_PHASE)}
            </PhaseTitle>
            {semi[1]}
          </PhaseStyled>
          <PhaseStyled desktopHide={desktopHide}>
            <PhaseTitle className="uvs-font-a-bold">
              {localization.get(`${QUARTER_FINALS_PHASE}Nav`)}
            </PhaseTitle>
            {hasQuarters && quarter.filter((a, b) => b > 1 && b < 4)}
          </PhaseStyled>
          <PhaseStyled desktopHide={desktopHide} hide={!hasRoundOf16}>
            <PhaseTitle className="uvs-font-a-bold">
              {localization.get(`${ROUND_OF_16_PHASE}Nav`)}
            </PhaseTitle>
            {hasRoundOf16 && eights.filter((a, b) => b > 3 && b < 8)}
          </PhaseStyled>
        </TournamentWrapper>
      )
    );
  }
}

/**
 * @property {Object} tournament - tournament phase data
 * @property {Object[]} [tournament.roundOf16] - round of 16 matches data
 * @property {Object[]} [tournament.quarterFinals] - quarter finals matches data
 * @property {Object[]} [settings.semiFinals] - semifinals matches data
 * @property {Object[]} [tournament,finals] - finals matches data
 * @property {string} active - the active round of the tournament
 * @property {string} className - modifier class
 * @property {bool} isTudn - tudn theme support
 */
TournamentPhase.propTypes = {
  tournament: PropTypes.shape({
    roundOf16: PropTypes.array,
    quarterFinals: PropTypes.array,
    semiFinals: PropTypes.array,
    finals: PropTypes.array,
  }),
  active: PropTypes.string,
  isMobile: PropTypes.bool,
  className: PropTypes.string,
  isTudn: PropTypes.bool,
};

TournamentPhase.defaultProps = {
  active: '',
  isTudn: false,
};

export default TournamentPhase;
