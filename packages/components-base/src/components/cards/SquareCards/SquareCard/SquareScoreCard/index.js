import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { proxySelector, userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import MatchCardScore from '@univision/shared-components/dist/components/v3/MatchCardScore';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { MATCH_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/matchCard';
import { SPRING_GREEN } from '@univision/fe-utilities/styled/constants';

import { getScoreData, getLeagueLinkData } from './scoreCardUtils';
import Link from '../../../../Link';
import Picture from '../../../../Picture';
import ScoreCardBadge from './ScoreCardBadge';
import Styles from './SquareScoreCard.styles';
import { getPropsMatch } from '../../../../widgets/SingleWidget/utils/helpers';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const ScoreWrapper = styled.div`
  ${Styles.scoreWrapper}
`;
const MatchImageWrapper = styled(Link)`
  ${Styles.matchImageWrapper}
`;
const BackgroundOverlay = styled.div`
  ${Styles.backgroundOverlay}
`;
const PictureStyled = styled(Picture)`
  ${Styles.picture}
`;
const ScoreBadgeWrapper = styled.div`
  ${Styles.badgeWrapper}`;

/**
 * Square ScoreCard
 * @param {!Object} props - component props
 * @param {Object} [props.awayTeamSeason] - the away team object
 * @param {string} [props.cardLabel] - the card label manually set from bex
 * @param {string} [props.device] - page current device
 * @param {Object} [props.fetchedMatch] - the match data (from fetched action)
 * @param {function} [props.getMatch] - the action function for fetch match data
 * @param {Object} [props.homeTeamSeason] - the home team object
 * @param {Object} [props.image] - the card image
 * @param {bool} [props.isDark = false] - true if card is under dark theme
 * @param {bool} [props.isListCard = false] - true if it is to render as list card
 * @param {bool} [props.isTextOnly = false] - true if it is for text only card
 * @param {Object} [props.liveStreamData] - the data from live stream card
 * @param {Object} [props.matchData] - the data form scorecells
 * @param {number} [props.matchId] - the match id
 * @param {string} [props.matchTime] . the match start time
 * @param {bool} [props.shouldFetchMatch] - if should call fetch dispatch action
 * @param {Object} [props.soccerCompetitionSeason] - the soccer competition object
 * @param {string} [props.title] - the card title
 * @param {Object} [props.theme] - the theme object
 * @param {string} [props.uri] - the card uri
 * @param {string} [props.uid] - the card uid
 * @param {string} [props.updateDate] - the latest update of teh card
 * @param {Object} [props.widgetContext] - the card widget context
 * @returns {JSX}
 */
const SquareScoreCard = ({
  awayTeamSeason,
  cardLabel,
  device,
  fetchedMatch,
  getMatch,
  homeTeamSeason,
  image,
  isDark,
  isListCard,
  isTextOnly,
  liveStreamData,
  matchData,
  matchId,
  matchTime,
  shouldFetchMatch,
  soccerCompetitionSeason,
  theme,
  title,
  trackClick,
  size,
  updateDate,
  uri,
  uid,
  widgetContext: { id, isWorldCupMVP },
}) => {
  const scoreData = getScoreData(
    matchData,
    soccerCompetitionSeason,
    homeTeamSeason,
    awayTeamSeason,
    liveStreamData,
    fetchedMatch,
    updateDate,
  );
  const proxyUri = useSelector(proxySelector);
  const [matchSettings, setMatchSettings] = useState({
    statusMatch: null,
  });
  useEffect(() => {
    /**
   * get score match
   */
    const requestScoreMatch = async () => {
      const propsMatch = await getPropsMatch(matchId, proxyUri);
      setMatchSettings(propsMatch);
    };
    requestScoreMatch();
  }, [matchId, proxyUri]);
  const scoreDataBadge = {
    hasLiveStream: matchSettings?.hasLiveStream,
    status: matchSettings?.statusMatch,
    hasBroadcastEvent: matchSettings?.hasBroadcastEvent,
    hasMcpLiveStreamId: matchSettings?.hasMcpLiveStreamId,
  };
  const matchUrl = scoreData?.url || uri;
  // eslint-disable-next-line react/prop-types
  const matchHierarchy = soccerCompetitionSeason?.soccerCompetition?.league?.hierarchy;
  const linkData = getLeagueLinkData(soccerCompetitionSeason);
  const scoreCardSize = isListCard ? 'listCard' : `${size}Card`;
  const userLocation = useSelector(userLocationSelector);
  const scoreBadge = (
    <ScoreCardBadge
      cardLabel={cardLabel}
      device={device}
      liveStreamData={liveStreamData}
      matchHierarchy={matchHierarchy}
      matchId={matchId}
      matchTime={matchTime}
      matchUrl={matchUrl}
      scoreData={scoreDataBadge}
      size={size}
      isListCard={isListCard}
      theme={theme}
      isWorldCupMVP={isWorldCupMVP}
      userLocation={userLocation}
      isMatchCard
    />
  );
  /**
   * Check if it should fetch match and call redux action to fetch the match
   */
  useEffect(() => {
    if (isValidFunction(getMatch) && shouldFetchMatch) {
      const options = {
        insertInContent: true,
        contentId: uid,
        widgetId: id,
      };
      getMatch(matchId, options);
    }
  }, [getMatch, matchId, uid, id, shouldFetchMatch]);

  const imageRatio = MATCH_CARD_RATIOS[size];
  const propsMVP = isWorldCupMVP ? {
    isTudn: true,
    defaultColor: SPRING_GREEN,
  } : {};

  return (
    <Wrapper size={size} isListCard={isListCard}>
      {!isListCard && (
        <>
          <MatchImageWrapper
            useExplicitNavigation
            href={uri}
            onClick={trackClick}
            size={size}
          >
            <PictureStyled
              alt={title}
              image={image}
              overrideImageUrl={getRenditionUrl(
                getKey(image, 'renditions.original', {}),
                imageRatio
              )}
              overrideImageBounds={imageRatio}
            />
            <BackgroundOverlay />
          </MatchImageWrapper>
          {scoreBadge}
        </>
      )}
      {isListCard && !isTextOnly && (
        <ScoreBadgeWrapper>
          {scoreBadge}
        </ScoreBadgeWrapper>
      )}
      <ScoreWrapper size={size} isListCard={isListCard}>
        <MatchCardScore
          {...scoreData}
          leagueLink={linkData.href}
          size={scoreCardSize}
          isDark={isDark}
          isListCard={isListCard}
          {...propsMVP}
        />
      </ScoreWrapper>
    </Wrapper>
  );
};

SquareScoreCard.propTypes = {
  awayTeamSeason: PropTypes.object,
  cardLabel: PropTypes.string,
  device: PropTypes.string,
  homeTeamSeason: PropTypes.object,
  image: PropTypes.shape({
    credit: PropTypes.string,
    renditions: PropTypes.object,
  }),
  isDark: PropTypes.bool,
  isListCard: PropTypes.bool,
  isTextOnly: PropTypes.bool,
  liveStreamData: PropTypes.object,
  matchData: PropTypes.object,
  matchId: PropTypes.number,
  matchTime: PropTypes.string,
  soccerCompetitionSeason: PropTypes.shape({
    soccerCompetition: PropTypes.shape({
      name: PropTypes.string,
      league: PropTypes.shape({
        uri: PropTypes.string,
        logo: PropTypes.shape({
          renditions: PropTypes.object,
        }),
      }),
    }),
  }),
  theme: PropTypes.string,
  title: PropTypes.string,
  trackClick: PropTypes.func,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  uri: PropTypes.string,
  uid: PropTypes.string,
  updateDate: PropTypes.string,
  widgetContext: PropTypes.object,
  // redux props
  fetchedMatch: PropTypes.object,
  getMatch: PropTypes.func.isRequired,
  shouldFetchMatch: PropTypes.bool,
};

SquareScoreCard.defaultProps = {
  isDark: false,
  isListCard: false,
  isTextOnly: false,
  shouldFetchMatch: false,
  widgetContext: {},
};

export default SquareScoreCard;
