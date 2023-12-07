import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import truncateString from '@univision/fe-utilities/helpers/string/truncateString';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import Team from '@univision/shared-components/dist/components/v3/Team';

import soccerPersonAvatar from '@univision/fe-commons/dist/assets/images/tudn/soccer-person-avatar.svg';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { PERSONA_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/personaCard';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import Title from '../../../../Title';
import Link from '../../../../Link';
import Picture from '../../../../Picture';
import SquarePersonFooter from '../SquarePerson/SquarePersonFooter';
import Styles from './SquareSoccerPerson.styles';

const TITLE_TRUNCATE_LENGTH = 30;
const TEAM_EVENT = 'Playercard_team';
const LEAGUE_EVENT = 'Playercard_league';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const PlayerContent = styled.div`
  ${Styles.playerContent}
`;
const PlayerContainer = styled.div`
  ${Styles.playerContainer}
`;
const PlayerInfoContainer = styled.div`
  ${Styles.playerInfoContainer}
`;
const LogoContainer = styled.div`
  ${Styles.logoContainer}
`;
const Separator = styled.div`
  ${Styles.separator}
`;
const PlayerPictureContainer = styled.div`
  ${Styles.playerPictureContainer}
`;
const PlayerPictureWrapper = styled.div`
  ${Styles.playerPictureWrapper}
`;
const PlayerPictureOverlay = styled.div`
  ${Styles.personCardPictureOverlay}
`;
const PlayerPicture = styled(Picture)`
  ${Styles.playerPicture}
`;
const PlayerPosition = styled.div`
  ${Styles.playerPosition}
`;
const PlayerName = styled(Title)`
  ${Styles.playerName}
`;
const Position = styled.div`
  ${Styles.position}
`;
const PositionNumber = styled.div`
  ${Styles.positionNumber}
`;
const TeamStyled = styled(Team)`
  ${Styles.team}
`;
const FooterStyled = styled(SquarePersonFooter)`
  ${Styles.footer}
`;

/**
 * Check if should re-render the component based on props changes
 * @param {Object} prevProps - react previous props component
 * @param {Object} nextProps - react new props component
 * @returns {boolean}
 */
function areEqualProps(prevProps, nextProps) {
  return prevProps?.uri === nextProps?.uri && prevProps?.size === nextProps?.size;
}

/**
 * Square Soccer Person
 * @param {Object} props component props
 * @param {Object} [props.image] - renditions for soccer person image
 * @param {bool} [props.isDark] - if card is dark
 * @param {string} [props.position] - the position the soccer person plays as
 * @param {string} [props.positionNumber] - the position number of the soccer person
 * @param {string} [props.size] - size of the card
 * @param {Object} [props.socialNetworks] - object with social networks fro the person
 * @param {string} [props.teamSeason] - the team the soccer person belongs to
 * @param {string} [props.title] - soccer person name/title
 * @param {string} [props.trackClick] - the tracking function
 * @param {Object} [props.uri] - the soccer person uri
 * @returns {JSX}
 */
const SquareSoccerPerson = (props) => {
  const {
    image,
    isDark,
    position,
    positionNumber,
    size,
    socialNetworks,
    teamSeason,
    title,
    trackClick,
    uri,
  } = props;
  const { teamLogo, soccerCompetitionSeason } = teamSeason || {};
  const useFallback = !isValidValue(image?.title) || image?.title.match(/fallback/i);
  const league = soccerCompetitionSeason?.soccerCompetition?.league;
  const self = useRef({
    team: {
      fullName: '',
      imageURI: teamLogo?.renditions?.original?.href,
    },
    league: {
      fullName: '',
      imageURI: league?.logo?.renditions?.original?.href,
    },
  });

  /**
   * For tracking click on team player card
   */
  const teamOnPress = useCallback(() => {
    WidgetTracker.track(
      WidgetTracker.events.engagement,
      {
        target: TEAM_EVENT,
      },
    );
  }, []);
  /**
   * For tracking click on league player card
   */
  const leagueOnPress = useCallback(() => {
    WidgetTracker.track(
      WidgetTracker.events.engagement,
      {
        target: LEAGUE_EVENT,
      },
    );
  }, []);

  return (
    <Wrapper size={size}>
      <PlayerContent>
        <PlayerContainer size={size}>
          <PlayerPictureContainer size={size}>
            <PlayerPictureWrapper size={size}>
              <Link useExplicitNavigation href={uri} onClick={trackClick}>
                <PlayerPicture
                  alt={title}
                  image={image}
                  size={size}
                  overrideImageUrl={useFallback ? soccerPersonAvatar
                    : getRenditionUrl(
                      getKey(image, 'renditions.original', {}),
                      PERSONA_CARD_RATIOS.square
                    )}
                  overrideImageBounds={PERSONA_CARD_RATIOS.square}
                />
                <PlayerPictureOverlay />
              </Link>
            </PlayerPictureWrapper>
          </PlayerPictureContainer>
          <PlayerInfoContainer size={size}>
            <PlayerName isDark={isDark} size={size}>
              <Link
                useExplicitNavigation
                className="uvs-font-b-bold"
                href={uri}
                onClick={trackClick}
              >
                {truncateString(
                  title,
                  {
                    maxChars: TITLE_TRUNCATE_LENGTH,
                    append: '...',
                    onlyFullWords: true,
                  }
                )}
              </Link>
            </PlayerName>
            {position && positionNumber && (
              <PlayerPosition size={size}>
                <Position isDark={isDark} className="uvs-font-c-bold">
                  {position}
                </Position>
                <Separator isSmall />
                <PositionNumber isDark={isDark} className="uvs-font-b-bold">
                  {positionNumber}
                </PositionNumber>
              </PlayerPosition>
            )}
            <LogoContainer>
              <TeamStyled
                name={self.current.team}
                isCompact
                size={MEDIUM}
                link={{ href: teamSeason?.uri }}
                onPress={teamSeason?.uri && teamOnPress}
              />
              {self.current?.league?.imageURI && (
                <>
                  <Separator />
                  <TeamStyled
                    name={self.current.league}
                    isCompact
                    size={MEDIUM}
                    onPress={leagueOnPress}
                    link={{ href: league?.uri }}
                  />
                </>
              )}
            </LogoContainer>
          </PlayerInfoContainer>
        </PlayerContainer>
        <FooterStyled
          size={size}
          options={{
            uri,
            social: socialNetworks || {},
            trackClick,
            isDark,
          }}
        />
      </PlayerContent>
    </Wrapper>
  );
};

SquareSoccerPerson.propTypes = {
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }),
  isDark: PropTypes.bool,
  position: PropTypes.string,
  positionNumber: PropTypes.number,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  socialNetworks: PropTypes.shape({
    facebook: PropTypes.object,
    twitter: PropTypes.object,
    instagram: PropTypes.object,
  }),
  teamSeason: PropTypes.object,
  title: PropTypes.string,
  trackClick: PropTypes.func,
  uri: PropTypes.string.isRequired,
};

export default React.memo(SquareSoccerPerson, areEqualProps);
export { areEqualProps };
