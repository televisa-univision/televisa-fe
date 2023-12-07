import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { proxySelector, userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ViewOrLink from '@univision/shared-components/dist/components/v2/ViewOrLink';
import TextUVN from '@univision/shared-components/dist/components/v2/TextUVN';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import TeamWithScore from '@univision/shared-components/dist/components/v3/ScoreCard/Team';
import TimeText from '@univision/shared-components/dist/components/v3/ScoreCard/TimeText';

import ScoreCardBadge from '../../cards/SquareCards/SquareCard/SquareScoreCard/ScoreCardBadge';
import Styles from './SingleWidget.styles';
import Link from '../../Link';
import WidgetTitle from '../WidgetTitle';
import Picture from '../../Picture';
import { getDataTeams, getPropsMatch, getScoreSoccerMatch } from './utils/helpers';

const PictureContent = styled(Picture)`${Styles.pictureContentMatchCard}`;
const PictureBackground = styled(Picture)`${Styles.pictureBackground}`;
const AspectRatioWrapper = styled.div`${Styles.aspectRatioWrapper}`;
const MainWrapper = styled.div`${Styles.mainWrapper}`;
const LinkTitleMatch = styled(Link)`${Styles.linkTitleMatch}`;
const Content = styled.div`${Styles.content}`;
const CompetitionText = styled(TextUVN).attrs({
  fontName: 'robotoFlex',
  isCondensed: true,
})`
${Styles.competitionText};
`;
const Title = styled.h3.attrs({
  className: 'uvs-font-b-bold',
})`${Styles.title}`;
const Wrapper = styled.div`
${Styles.wrapper}
`;

const WrapperStatus = styled.div`
${Styles.wrapperStatus}
`;

const MatchImageWrapper = styled(Link)`
${Styles.matchImageWrapper}
`;

const RowStyled = styled(ViewOrLink)`
${Styles.row}
${Styles.mediaScreen}
`;
const OverlayWrapper = styled.div`
${Styles.overlayWrapper}
`;

const CardOverlayImage = styled.div`
${Styles.cardOverlayImage}
`;

const CardOverlayText = styled.div`
${Styles.cardOverlayText}
`;

const ScoreCardBadgeStatus = styled(ScoreCardBadge)`
${Styles.scoreCardBadge}
`;

/**
 * Single Widget Component for soccermatch
 * @param {Object} props - component props
 * @returns {JSX}
 */
const SoccerMatchCard = ({
  commonStyleProps,
  device,
  forceMobile,
  image,
  imageRatio,
  imageUrl,
  isDarkTheme,
  league,
  singleWidgetData,
  theme,
  titleLink,
  widgetTitle,
  widgetTracking,
}) => {
  const [scoreTeams, setScoreTeams] = useState([]);
  const [matchSettings, setMatchSettings] = useState({
    statusMatch: null,
  });
  const userLocation = useSelector(userLocationSelector);

  const proxyUri = useSelector(proxySelector);
  const teams = getDataTeams(singleWidgetData);
  const {
    cardLabel,
    matchId,
    matchTime,
    title,
    type,
    uri,
  } = singleWidgetData;
  useEffect(() => {
    /**
   * get score match
   */
    const requestScoreMatch = async () => {
      const scoreMatch = await getScoreSoccerMatch(matchId, proxyUri);
      const propsMatch = await getPropsMatch(matchId, proxyUri);

      setScoreTeams(scoreMatch);
      setMatchSettings(propsMatch);
    };
    requestScoreMatch();
  }, [matchId, proxyUri]);

  let statusMatch = null;
  teams.home.scoreValue = scoreTeams && scoreTeams[0]?.scoreValue;
  teams.away.scoreValue = scoreTeams && scoreTeams[1]?.scoreValue;
  statusMatch = matchSettings?.statusMatch;
  const scoreData = {
    hasLiveStream: matchSettings?.hasLiveStream,
    status: statusMatch,
    hasBroadcastEvent: matchSettings?.hasBroadcastEvent,
    hasMcpLiveStreamId: matchSettings?.hasMcpLiveStreamId,
  };
  return (
    <div>
      <WidgetTitle title={widgetTitle} singleCard titleLink={titleLink} />
      <AspectRatioWrapper forceMobile={forceMobile} isDarkTheme={isDarkTheme}>
        <MainWrapper {...commonStyleProps} forceMobile={forceMobile}>
          <Content {...commonStyleProps} forceMobile={forceMobile}>
            <Link href={uri} onClick={widgetTracking}>
              <OverlayWrapper>
                <CardOverlayImage type={type} />
              </OverlayWrapper>
              <PictureContent
                type={type}
                alt={title}
                image={image}
                overrideImageUrl={getRenditionUrl(
                  imageUrl,
                  imageRatio
                )}
                overrideImageBounds={imageRatio}
              />
            </Link>
          </Content>
          <MatchImageWrapper
            useExplicitNavigation
            href={uri}
          >
            <OverlayWrapper>
              <CardOverlayText type={type} isTextWrapper />
            </OverlayWrapper>
            <Wrapper>
              <PictureBackground
                type={type}
                alt={title}
                image={image}
                overrideImageUrl={getRenditionUrl(
                  imageUrl,
                  imageRatio
                )}
                overrideImageBounds={imageRatio}
                isBlurred
              />
              <WrapperStatus className="row">
                <ScoreCardBadgeStatus
                  cardLabel={cardLabel}
                  device={device}
                  matchTime={matchTime}
                  matchId={matchId}
                  matchUrl={uri}
                  theme={theme}
                  scoreData={scoreData}
                  isWorldCupMVP
                  isMatchCard
                  userLocation={userLocation}
                />
                <CompetitionText isBold>{league.name}</CompetitionText>
              </WrapperStatus>
              <Title {...commonStyleProps}>
                <LinkTitleMatch
                  href={uri}
                  type={type}
                  onClick={widgetTracking}
                  isDarkTheme={isDarkTheme}
                >
                  {title}
                </LinkTitleMatch>
              </Title>
              <RowStyled className="col-xs-6 col-sm-9 col-md-7" center isCell>
                <TeamWithScore name={teams.home} status={statusMatch} score singleCard />
                <TimeText status={statusMatch} type={'cell'} singleCard />
                <TeamWithScore
                  name={teams.away}
                  status={statusMatch}
                  score
                  reverse
                  singleCard
                />
              </RowStyled>
            </Wrapper>
          </MatchImageWrapper>
        </MainWrapper>
      </AspectRatioWrapper>
    </div>
  );
};

SoccerMatchCard.propTypes = {
  commonStyleProps: PropTypes.object,
  device: PropTypes.string,
  forceMobile: PropTypes.bool,
  image: PropTypes.object,
  imageRatio: PropTypes.object,
  imageUrl: PropTypes.string,
  isDarkTheme: PropTypes.bool,
  league: PropTypes.object,
  singleWidgetData: PropTypes.object,
  statusMatch: PropTypes.string,
  theme: PropTypes.object,
  titleLink: PropTypes.object,
  widgetTitle: PropTypes.string,
  widgetTracking: PropTypes.func,
};

export default SoccerMatchCard;
