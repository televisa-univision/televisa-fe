import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

import {
  areInSameUnivisionDomain,
  getKey,
  truncate,
} from '@univision/fe-commons/dist/utils/helpers';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { pageUriSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import {
  LIST,
  SQUARE,
  VERTICAL,
} from '@univision/fe-commons/dist/constants/cardTypes';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Icon from '@univision/fe-icons/dist/components/Icon';
import PlayStationButton from '@univision/fe-local/dist/components/connected/PlayStationButton/PlayStationButton';

import { isListCard, isSquareCard, isVerticalCard } from '../helpers';

import Button from '../../Button';
import SquareCardSizer from '../SquareCards/SquareCardSizer';
import Link from '../../Link';
import Title from '../../Title';

import Styles from './RadioCard.styles';

const DESCRIPTION_MAX_LENGTH_LIST = 30;
const DESCRIPTION_MAX_LENGTH_SQUARE = 80;
const DESCRIPTION_MAX_LENGTH_VERTICAL = 20;

const StyledCardSizer = styled(SquareCardSizer)`
  ${Styles.cardSizer}
`;

const RadioCardBackgroundOverlay = styled.div`
  ${Styles.radioCardBackgroundOverlay}
`;
const RadioCardBackgroundImage = styled.div`
  ${Styles.radioCardBackgroundImage}
`;
const RadioCardContainer = styled.div`
  ${Styles.radioCardContainer}
`;
const RadioCardDescription = styled(Title).attrs({
  className: 'uvs-font-c-regular',
})`
  ${Styles.radioCardDescription}
`;
const RadioCardMeta = styled(Title).attrs({
  className: 'uvs-font-a-light',
})`
  ${Styles.radioCardMeta}
`;
const RadioCardImageContainer = styled.div`
  ${Styles.radioCardImageContainer}
`;
const RadioCardPlayButtonContainer = styled.div`
  ${Styles.radioCardPlayButtonContainer}
`;
const RadioCardLogoContainer = styled.div`
  ${Styles.radioCardLogoContainer}
`;
const RadioCardLogoLink = styled(Link)`
  ${Styles.radioCardLogoLink}
`;
const RadioCardPlayButton = styled(Button)`
  ${Styles.radioCardPlayButton}
`;
const RadioCardPlayButtonLabel = styled(Title).attrs({
  className: 'uvs-font-a-regular',
})`
  ${Styles.radioCardPlayButtonLabel}
`;
const RadioCardPodcastLength = styled(Title).attrs({
  className: 'uvs-font-a-regular',
})`
  ${Styles.radioCardPodcastLength}
`;
const RadioCardTitle = styled(Title)`
  ${Styles.radioCardTitle}
`;
const RadioInteractionArea = styled.div`
  ${Styles.radioInteractionArea}
`;

/**
 * Radio card
 * @param {Object} abacast stream links
 * @param {Object} alternativeLogo alternative logo color
 * @param {string} className custom class
 * @param {string} description of the radio station or podcast
 * @param {bool} hasFavorite true if has favorite icon
 * @param {Object} image of radio station of podcast
 * @param {Object} localMarket local market information
 * @param {number} podcastLength number of tracks in podcast
 * @param {array} reactions the reactions array
 * @param {Object} sharing is sharing enabled
 * @param {Object|Array} style custom style
 * @param {Object} theme the theme object
 * @param {string} title of the radio station or podcast
 * @param {string} type of card
 * @param {string} uid content id
 * @param {string} uri page uri
 * @param {Object} widgetContext widget contextual data
 * @returns {JSX}
 */
const RadioCard = ({
  abacast,
  alternativeLogo,
  className,
  description,
  hasFavorite,
  image,
  isDark = true,
  localMarket,
  nowPlayingId,
  podcastLength,
  reactions,
  sharing,
  style,
  theme,
  title,
  type,
  uid,
  uri,
  widgetContext,
  zoneId,
  ...rest
}) => {
  const trackClick = useCallback(
    CardTracker.onClickHandler({ uid, title }, widgetContext),
    [uid, title, widgetContext]
  );
  const localMarketTitle = localMarket?.title;
  const pageUri = useSelector(pageUriSelector);
  const radioImage = getKey(image, 'renditions.original.href', '');
  const radioLogoImageUrl = getKey(
    alternativeLogo,
    'renditions.original.href',
    ''
  );
  const radioUri = useMemo(() => {
    return areInSameUnivisionDomain(pageUri, uri) ? uri : null;
  }, [pageUri, uri]);
  const commonProps = {
    title,
    description,
    uid,
    uri,
    widgetContext,
    isDark,
    trackClick,
    image,
    theme,
  };

  /**
 * Returns the description character limit per card type
 * @returns {number}
 */
  const getDescMaxChars = () => {
    let maxChars = 0;
    if (isListCard(type)) maxChars = DESCRIPTION_MAX_LENGTH_LIST;
    if (isSquareCard(type)) maxChars = DESCRIPTION_MAX_LENGTH_SQUARE;
    if (isVerticalCard(type)) maxChars = DESCRIPTION_MAX_LENGTH_VERTICAL;
    return maxChars;
  };
  const truncateSettings = {
    checkFeature: false,
    maxChars: getDescMaxChars(type),
  };

  const radioPlayButton = (
    <PlayStationButton
      abacast={abacast}
      alternativeLogo={alternativeLogo}
      image={image}
      key={`playbtn-${radioUri}`}
      stationTitle={title}
      type="plain"
      uid={uid}
      uri={uri}
      zoneId={zoneId}
      {...rest}
    >
      <RadioCardPlayButton type={type}>
        <Icon name="playnocircleLegacy" size="xsmall" fill={WHITE} />
      </RadioCardPlayButton>
    </PlayStationButton>
  );

  const radioLogo = (
    <RadioCardLogoContainer key={`logo-${radioUri}`} logo={radioLogoImageUrl} type={type}>
      <RadioCardLogoLink
        href={radioUri}
        onClick={trackClick}
      />
    </RadioCardLogoContainer>
  );

  return (
    <StyledCardSizer
      actionBarType={theme?.actionBarType}
      className={className}
      contentId={uid}
      hasActionBar={isSquareCard(type)}
      hasFavorite={hasFavorite}
      reactions={reactions}
      sharing={sharing}
      sharingOptions={sharing?.options || {}}
      type={type}
      {...commonProps}
    >
      <RadioCardContainer style={style} type={type}>
        <RadioCardImageContainer image={radioImage} type={type}>
          <RadioCardPlayButtonContainer>
            {isVerticalCard(type) && radioLogo}
            {isListCard(type) && [radioLogo, radioPlayButton, (
              <RadioCardPlayButtonLabel key={`playbtn-label-${radioUri}`} type={type}>
                {localization.get('listen')}
              </RadioCardPlayButtonLabel>
            )]}
          </RadioCardPlayButtonContainer>
          {!isSquareCard(type) && <RadioCardBackgroundOverlay flat />}
        </RadioCardImageContainer>
        <RadioInteractionArea type={type}>
          {isSquareCard(type) && radioLogo}
          <Link
            className="uvs-font-a-bold"
            href={radioUri}
            onClick={trackClick}
            useExplicitNavigation
          >
            <RadioCardTitle type={type}>{title}</RadioCardTitle>
          </Link>
          <RadioCardDescription type={type}>
            {isSquareCard(type)
              ? truncate(`${description} ${localMarketTitle ? `• ${localMarketTitle}` : ''}`, truncateSettings)
              : truncate(description, truncateSettings)}
          </RadioCardDescription>
          {isListCard(type) && localMarketTitle && (
            <RadioCardMeta type={type}>
              {localMarketTitle}
            </RadioCardMeta>
          )}
          {podcastLength && (
            <RadioCardPodcastLength type={type}>
              {podcastLength} {localization.get('songs')}
            </RadioCardPodcastLength>
          )}
          {!isListCard(type) && radioPlayButton}
        </RadioInteractionArea>
        {isSquareCard(type) && (
          <RadioCardBackgroundOverlay type={type} />
        )}
        {!isListCard(type) && (
          <RadioCardBackgroundImage
            image={getKey(image, 'renditions.original.href')}
          />
        )}
      </RadioCardContainer>
    </StyledCardSizer>
  );
};

RadioCard.propTypes = {
  abacast: PropTypes.object,
  alternativeLogo: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object,
  }),
  className: PropTypes.string,
  description: PropTypes.string,
  hasFavorite: PropTypes.bool,
  isDark: PropTypes.bool,
  image: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
  }).isRequired,
  localMarket: PropTypes.shape({
    title: PropTypes.string,
    zipCodes: PropTypes.arrayOf(PropTypes.string),
  }),
  nowPlayingId: PropTypes.number,
  podcastLength: PropTypes.number,
  reactions: PropTypes.array,
  sharing: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  theme: PropTypes.object,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([LIST, SQUARE, VERTICAL]).isRequired,
  uid: PropTypes.string,
  uri: PropTypes.string,
  widgetContext: PropTypes.object,
  zoneId: PropTypes.number,
};

export default RadioCard;
