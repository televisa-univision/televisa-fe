import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  getKey,
  truncate,
} from '@univision/fe-commons/dist/utils/helpers';
import stripHtmlTags from '@univision/fe-utilities/helpers/string/stripHtmlTags';
import {
  HALF_PORTRAIT,
  LANDSCAPE,
  PORTRAIT,
  RECTANGLE,
  SQUARE,
} from '@univision/fe-commons/dist/constants/cardTypes';
import { LONGFORM } from '@univision/fe-commons/dist/constants/labelTypes';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { STANDARD } from '@univision/fe-commons/dist/constants/contentPriorities';

import { SHOW_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/showCard';
import Title from '../../Title';
import Image from '../../Image';
import Link from '../../Link';
import Label from '../../Label';
import {
  isHalfPortraitCard,
  isPortraitOrLandscapeCard,
  isRectangleCard,
  isSquareCard,
} from '../helpers';
import Styles from './ShowCard.styles';
import CardSizer from '../CardSizer';
import Picture from '../../Picture';

const AirTime = styled.div`
  ${Styles.airTime}
`;
const ShowCardLabel = styled.div`
  ${Styles.ShowCardLabel}
`;
const Background = styled(Picture)`
  ${Styles.background}
`;
const BackgroundOverlay = styled.div`
  ${Styles.backgroundOverlay}
`;
const BackgroundWrapper = styled.div`
  ${Styles.backgroundWrapper}
`;
const Cta = styled(Link).attrs({ className: 'uvs-font-c-regular' })`
  ${Styles.cta}
`;
const Description = styled.div.attrs({ className: 'uvs-font-a-medium' })`
  ${Styles.description}
`;
const Logo = styled(Link).attrs({ className: 'uvs-font-b-bold' })`
  ${Styles.logo}
`;
const LogoImage = styled(Image)`
  ${Styles.logoImage}
`;
const ShowInfo = styled.div`
  ${Styles.showInfo}
`;
const ShowCardTitle = styled(Title)`
  ${Styles.title}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;

/**
 * Show Card
 * @returns {JSX}
 */
const ShowCard = ({
  airTime,
  cardTheme: theme,
  cardLabel,
  className,
  contentPriority,
  description,
  hasAdSkin,
  headerLogo,
  sharing,
  showCardArtwork,
  style,
  title,
  type,
  uid,
  uri,
  widgetContext,
}) => {
  const trackClick = CardTracker.onClickHandler({ uid, title }, widgetContext);

  return (
    <CardSizer className={className} style={style} type={type} sharing={sharing}>
      <Wrapper>
        <BackgroundWrapper type={type} onClick={trackClick}>
          <Background
            image={showCardArtwork}
            overrideImageUrl={getRenditionUrl(getKey(showCardArtwork, 'renditions.original', {}), SHOW_CARD_RATIOS[type])}
            type={type}
          />
          <Link useExplicitNavigation href={uri}><BackgroundOverlay type={type} /></Link>
        </BackgroundWrapper>
        <ShowInfo type={type}>
          {isPortraitOrLandscapeCard(type) && cardLabel && (
            <ShowCardLabel>
              <Label
                contentPriority={contentPriority}
                label={cardLabel}
                type={LONGFORM}
              />
            </ShowCardLabel>
          )}
          <Logo useExplicitNavigation href={uri} type={type} onClick={trackClick}>
            <LogoImage
              src={getKey(headerLogo, 'renditions.original.href')}
              type={type}
            />
          </Logo>
          {airTime && (isHalfPortraitCard(type) || isSquareCard(type) || isRectangleCard(type)) && (
            <AirTime type={type}>{airTime}</AirTime>
          )}
          {isPortraitOrLandscapeCard(type) && (
            <ShowCardTitle hasAdSkin={hasAdSkin} size="" type={type}>
              <Link
                className={getKey(
                  theme, `headlineFont.${type}`,
                  getKey(theme, 'headlineFont.default', 'uvs-font-b-bold')
                )}
                href={uri}
                onClick={trackClick}
                type={type}
                useExplicitNavigation
              >
                {truncate(title, {
                  maxChars: 125,
                  checkFeature: false,
                })}
              </Link>
            </ShowCardTitle>
          )}{' '}
          {isSquareCard(type) && (
            <Description type={type}>
              <Link
                href={uri}
                onClick={trackClick}
                type={type}
                useExplicitNavigation
              >
                {truncate(stripHtmlTags(description), {
                  maxChars: 150,
                  checkFeature: false,
                })}
              </Link>
            </Description>
          )}
          {(isPortraitOrLandscapeCard(type) || isSquareCard(type)) && !hasAdSkin && (
            <Cta useExplicitNavigation href={uri} type={type} onClick={trackClick}>
              <Icon name="playnocircleLegacy" size="xxsmall" fill={WHITE} />
              {localization.get('viewShow')}
            </Cta>
          )}
        </ShowInfo>
      </Wrapper>
    </CardSizer>
  );
};

ShowCard.propTypes = {
  airTime: PropTypes.string,
  cardTheme: PropTypes.object,
  cardLabel: PropTypes.string,
  className: PropTypes.string,
  contentPriority: PropTypes.string,
  description: PropTypes.string,
  hasAdSkin: PropTypes.bool,
  headerLogo: PropTypes.shape({
    renditions: PropTypes.shape({
      original: PropTypes.shape({
        href: PropTypes.string,
      }),
    }),
  }),
  sharing: PropTypes.object,
  showCardArtwork: PropTypes.shape({
    renditions: PropTypes.object,
  }),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  title: PropTypes.string,
  type: PropTypes.oneOf([
    HALF_PORTRAIT,
    LANDSCAPE,
    PORTRAIT,
    RECTANGLE,
    SQUARE,
  ]),
  uri: PropTypes.string,
  uid: PropTypes.string,
  widgetContext: PropTypes.object,
};

ShowCard.defaultProps = {
  cardTheme: {},
  contentPriority: STANDARD,
  hasAdSkin: false,
  type: PORTRAIT,
};

export default ShowCard;
