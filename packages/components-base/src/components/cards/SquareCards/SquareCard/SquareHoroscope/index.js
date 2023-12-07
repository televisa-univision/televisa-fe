import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { HOROSCOPE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/horoscopeCard';

import Link from '../../../../Link';
import Picture from '../../../../Picture';
import HoroscopeBadge from './HoroscopeBadge';
import Styles from './SquareHoroscope.styles';

const ImageWrapper = styled(Link)`
  ${Styles.imageWrapper}
`;
const BadgeContainer = styled.div`
  ${Styles.badgeContainer}
`;
const PictureStyled = styled(Picture)`
  ${Styles.picture}
`;
const PictureMask = styled.div`
  ${Styles.pictureMask}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;

/**
 * Square Horoscope card
 * @param {Object} props - props of the component
 * @property {array} props.authors - content authors
 * @property {Object} props.horoscopeData - content horoscope data from article
 * @property {Object} props.image - content image
 * @property {string} props.size - card size
 * @property {string} props.title - content title
 * @property {func} props.trackClick - click tracking callback
 * @property {string} props.uri - content uri
 * @returns {JSX}
 */
const SquareHoroscope = ({
  authors,
  horoscopeData,
  image,
  size,
  title,
  trackClick,
  uri,
}) => {
  const imageRatio = HOROSCOPE_CARD_RATIOS[size];
  return (
    <Wrapper>
      <ImageWrapper
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
        <PictureMask />
      </ImageWrapper>
      <BadgeContainer size={size}>
        <HoroscopeBadge
          size={size}
          authors={authors}
          uri={uri}
          trackClick={trackClick}
          {...horoscopeData}
        />
      </BadgeContainer>
    </Wrapper>
  );
};

SquareHoroscope.propTypes = {
  authors: PropTypes.array,
  horoscopeData: PropTypes.object,
  image: PropTypes.shape({
    credit: PropTypes.string,
    renditions: PropTypes.object,
  }),
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  title: PropTypes.string,
  trackClick: PropTypes.func,
  uri: PropTypes.string,
};

export default SquareHoroscope;
