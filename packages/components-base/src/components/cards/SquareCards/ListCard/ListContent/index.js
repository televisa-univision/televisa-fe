import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';

import {
  DARKER_GREY,
  WHITE,
} from '@univision/fe-utilities/styled/constants';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import features from '@univision/fe-commons/dist/config/features';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Picture from '../../../../Picture';
import * as ratios from '../../../../Picture/aspectRatios';
import Styles from './ListContent.styles';
import Sponsor from '../../../../Sponsor';

const ContentSponsor = styled(Sponsor)`
  ${Styles.sponsor}
`;
const CtaWrapper = styled('div')`
  ${Styles.ctaWrapper}
`;
const PublishedWrapper = styled('div').attrs({ className: 'uvs-font-c-regular' })`
  ${Styles.publishedWrapper}
`;
const IconArticleStyled = styled(Icon).attrs({ name: 'articleCta', size: 12 })`
  ${Styles.articleIcon}
`;
const IconArticleStyledMVP = styled(Icon).attrs({ name: 'textAlignLeft', size: 12 })`
  ${Styles.articleIcon}
`;
const IconSlideStyled = styled(Icon).attrs({ name: 'slideshow', size: 10 })`
  ${Styles.ctaIcon}
`;
const PlayIconStyled = styled(Icon).attrs(({ isWorldCupMVP }) => (isWorldCupMVP ? { name: 'playcircle', size: 16 } : { name: 'playnocircle', size: 10 }))`
  ${Styles.ctaIcon}
`;
const LogoWrapper = styled.div`
  ${Styles.logoWrapper}
`;

/**
 * Render card icons
 * @param {Object} props to handle icon to be shown
 * @returns {JSX}
 */
export const renderIconLabel = ({
  advertisementBrand,
  cardType,
  ctIsValid,
  durationString,
  isDark,
  isStoryCard,
  isTextOnly,
  isWorldCupMVP,
  hasFlavor,
  iconColor,
  layout,
  readTime,
  slideCount,
  sponsor,
}) => {
  const sponsorBy = layout === VERTICAL ? '' : localization.get('sponsorBy');
  if (isStoryCard && !(layout === VERTICAL && cardType.isLiveblog)) {
    return (
      <>
        <>
          {ctIsValid && isWorldCupMVP ? (
            <IconArticleStyledMVP fill={iconColor} />
          ) : (
            <IconArticleStyled fill={iconColor} />
          )}
          {readTime && localization.get('readTime', { locals: { readTime } })}
        </>
        {sponsor && (
          <ContentSponsor
            sponsorBy={sponsorBy}
            isDark={isDark}
            isSponsor
            isTextOnly={isTextOnly}
            layout={layout}
            link={sponsor?.link}
            logo={sponsor?.image?.renditions?.original?.href}
          />
        )}
      </>
    );
  }

  if (cardType.isAdvertising) {
    return localization.get('byAdvertisement', { locals: { advertisement: advertisementBrand || localization.get('advertisement') } });
  }

  if (cardType.isSlideshow) {
    return (
      <>
        <IconSlideStyled fill={iconColor} />
        {`${slideCount} ${localization.get('contents')}`}
      </>
    );
  }

  if (cardType.isVideo || cardType.isLivestream || hasFlavor) {
    return (
      <>
        <PlayIconStyled fill={iconColor} isWorldCupMVP={isWorldCupMVP} />
        {hasFlavor ? localization.get('watchNow') : (cardType.isVideo && durationString)}
      </>
    );
  }

  return null;
};

/**
 * List Content
 * @param {!Object} props - Props for this component
 * @param {string} [props.advertisementBrand] - the advertisement brand
 * @param {array} [props.cardType] - List of images
 * @param {string} [props.durationString] - the video duration
 * @param {array} [props.hierarchy] - the hierarchy of the content
 * @param {Object} [props.image] - the card image
 * @param {bool} [props.isDark = false] - true if it is in dark mode
 * @param {string} [props.hasFlavor] - has flavor to be shown
 * @param {bool} [props.logo] - Content logo if the card is a promo channel
 * @param {Object} [props.publishDate] - Component publishDate
 * @param {number} [props.slideCount] - the total slides count of the slide show
 * @param {Object} [props.sponsor] - sponsor info
 * @param {number} [props.readTime] - the approximate reading time for article
 * @param {number} [props.theme] - the theme of the parent
 * @access public
 * @returns {JSX}
 */
const ListContent = (props) => {
  const {
    advertisementBrand,
    cardType,
    ctIsValid,
    durationString,
    isDark,
    hasFlavor,
    isTextOnly,
    isWorldCupMVP,
    layout,
    logo,
    publishDate,
    readTime,
    slideCount,
    sponsor,
    theme,
  } = props;
  let iconColor = WHITE;
  if (isTextOnly || layout === VERTICAL || theme?.turnDark) {
    iconColor = isDark ? WHITE : DARKER_GREY;
  }
  const isStoryCard = cardType.isArticle || cardType.isLiveblog;
  return (
    <>
      {(!cardType.isCrossVerticalPromo || hasFlavor) && (
      <CtaWrapper hasFlavor={hasFlavor}>
        <PublishedWrapper
          isDark={isDark}
          layout={layout}
          isTextOnly={isTextOnly}
          turnDark={theme?.turnDark}
          isWorldCupMVP={features.deportes.isWorldCupMVP()}
        >
          {renderIconLabel({
            advertisementBrand,
            cardType,
            ctIsValid,
            durationString,
            isDark,
            isStoryCard,
            iconColor,
            isTextOnly,
            isWorldCupMVP,
            hasFlavor,
            layout,
            publishDate,
            readTime,
            slideCount,
            sponsor,
          })}
        </PublishedWrapper>
      </CtaWrapper>
      )}
      {cardType.isCrossVerticalPromo && logo && (
      <LogoWrapper>
        <Picture
          aspectRatio={ratios.ASPECT_RATIO_ORIGINAL}
          image={logo}
        />
      </LogoWrapper>
      )}
    </>
  );
};

ListContent.propTypes = {
  advertisementBrand: PropTypes.string,
  cardType: PropTypes.object,
  ctIsValid: PropTypes.bool,
  durationString: PropTypes.string,
  isDark: PropTypes.bool,
  isTextOnly: PropTypes.bool,
  isWorldCupMVP: PropTypes.bool,
  hasFlavor: PropTypes.bool,
  layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  logo: PropTypes.object,
  readTime: PropTypes.number,
  slideCount: PropTypes.number,
  sponsor: PropTypes.object,
  publishDate: PropTypes.object,
  theme: PropTypes.object,
};
renderIconLabel.propTypes = {
  advertisementBrand: PropTypes.string,
  ctIsValid: PropTypes.bool,
  durationString: PropTypes.string,
  isDark: PropTypes.bool,
  isTextOnly: PropTypes.bool,
  isStoryCard: PropTypes.bool,
  isWorldCupMVP: PropTypes.bool,
  hasFlavor: PropTypes.bool,
  cardType: PropTypes.object,
  iconColor: PropTypes.string,
  layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  readTime: PropTypes.number,
  slideCount: PropTypes.number,
  sponsor: PropTypes.object,
};

export default ListContent;
