import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  WHITE,
  DARKER_GREY,
} from '@univision/fe-utilities/styled/constants';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { SLIDESHOW } from '@univision/fe-commons/dist/constants/contentTypes';

import { getSquareCardContentType } from '../../../../helpers';
import Link from '../../../../../Link';
import Sponsor from '../../../../../Sponsor';
import Styles from './SquareCTA.styles';

const ContentSponsor = styled(Sponsor)`
  ${Styles.sponsor}
`;
const IconArticleStyled = styled(Icon).attrs({ name: 'articleCta', size: 12 })`
  ${Styles.articleIcon}
`;
const PublishedWrapper = styled(Link).attrs({ className: 'uvs-font-c-regular' })`
  ${Styles.published}
`;
const IconSlideStyled = styled(Icon).attrs({ name: SLIDESHOW, fill: WHITE, size: 10 })`
  ${Styles.slideIcon}
`;
const PlayIconStyled = styled(Icon).attrs({ name: 'playnocircle', fill: WHITE })`
  ${Styles.playIcon}
`;
const PlayButton = styled(motion.div)`${Styles.playContainer}`;

/**
 * Square CTA
 * @param {!Object} props - Props for this component
 * @param {string} [props.advertisementBrand] - the advertisement brand
 * @param {array} [props.authors] - content authors
 * @param {string} [props.className] - Class name modifier class
 * @param {string} [props.durationString] - the video duration
 * @param {array} [props.hierarchy] - the hierarchy of the content
 * @param {bool} [props.isDark = false] - true if it is in dark mode
 * @param {number} [props.readTime] - the approximate reading time for article
 * @param {number} [props.slideCount] - Total images in this slide show
 * @param {Object} [props.sponsor] - sponsor info
 * @param {style} [props.style] - Modifier style
 * @param {string} [props.updateDate] - update date for article
 * @param {string} [props.uri] - the card uri
 * @access public
 * @returns {JSX}
 */
const SquareCTA = ({
  advertisementBrand,
  authors,
  className,
  durationString,
  hierarchy,
  isDark,
  readTime,
  size,
  slideCount,
  sponsor,
  style,
  trackClick,
  type,
  uri,
  widgetContext,
}) => {
  const cardType = getSquareCardContentType(type);
  const cardThemeData = isValidArray(hierarchy)
    ? hierarchy[0]?.uri : uri;
  const cardTheme = getThemeFromVertical(cardThemeData);
  const authorFullName = isValidArray(authors)
    ? authors[0]?.fullName : null;
  return isValidValue(size) && isValidValue(type) ? (
    <PublishedWrapper
      className={className}
      size={size}
      style={style}
      isDark={isDark}
      href={uri}
      onClick={trackClick}
      type={type}
      isSponsor
      useExplicitNavigation
      isWorldCupMVP={widgetContext?.isWorldCupMVP}
    >
      {(cardType.isArticle && readTime) && (
        <>
          <IconArticleStyled fill={isDark ? WHITE : DARKER_GREY} />
          {localization.get('readTime', { locals: { readTime } })}
        </>
      )}
      {cardType.isAdvertising
        && localization.get('byAdvertisement', { locals: { advertisement: advertisementBrand || 'Publicidad' } })
      }
      {sponsor && (
        <ContentSponsor
          sponsorBy={localization.get('sponsorBy')}
          logo={sponsor?.image?.renditions?.original?.href}
          link={sponsor?.link}
        />
      )}
      {cardType.isSlideshow && (
        <>
          <IconSlideStyled />
          {`${slideCount} ${localization.get('contents')}`}
        </>
      )}
      {cardType.isVideo && (
        <>
          <PlayButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            theme={cardTheme}
            size={size}
          >
            <PlayIconStyled
              size={size === LARGE ? 8 : 6}
            />
          </PlayButton>
          {`${durationString}`}
        </>
      )}
      {
        (cardType.isHoroscope && authorFullName)
        && `${localization.get('by')}: ${authorFullName}`
      }
    </PublishedWrapper>
  ) : null;
};

SquareCTA.propTypes = {
  advertisementBrand: PropTypes.string,
  authors: PropTypes.array,
  className: PropTypes.string,
  durationString: PropTypes.string,
  hierarchy: PropTypes.array,
  isDark: PropTypes.bool,
  readTime: PropTypes.number,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  slideCount: PropTypes.number,
  sponsor: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  trackClick: PropTypes.func,
  type: PropTypes.string,
  uri: PropTypes.string,
  widgetContext: PropTypes.object,
};

SquareCTA.defaultProps = {
  isDark: false,
};

export default SquareCTA;
