import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { SQUARE_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/squareCard';

import Picture from '../../../../Picture';
import Link from '../../../../Link';
import Styles from './SquareArticleImage.styles';

const BackgroundOverlay = styled.div`
  ${Styles.backgroundOverlay}
`;

const SquareImageWrapper = styled(Link)`
  ${Styles.squareImageWrapper}
`;

const Filter = styled('div')`
  ${Styles.filter}
`;

const StyledPicture = styled(Picture)`
  ${Styles.picture}
`;

/**
 * Square SquareArticleImage
 * @param {Object} props Component props
 * @param {Object} [props.image] - Image object for the background of the card
 * @param {Object} [props.isLiveblog] - to know if it is liveblob
 * @param {Object} [props.schedule] - schedule object
 * @param {string} [props.size] - the card size
 * @param {string} [props.title] - Name of the Promo
 * @param {function} [props.trackClick] - the tracking function
 * @param {string} [props.type] - content type,
 * @param {string} [props.uri] - URL for the full promo page
 * @returns {JSX}
 */
const SquareArticleImage = ({
  image,
  isLiveblog,
  size,
  title,
  trackClick,
  type,
  uri,
}) => {
  const imageRatio = SQUARE_CARD_RATIOS[size];
  return (
    <SquareImageWrapper
      useExplicitNavigation
      href={uri}
      onClick={trackClick}
      type={type}
    >
      <StyledPicture
        alt={title}
        image={image}
        overrideImageUrl={getRenditionUrl(
          getKey(image, 'renditions.original', {}),
          imageRatio
        )}
        overrideImageBounds={imageRatio}
      />
      {isLiveblog ? <BackgroundOverlay /> : <Filter />}
    </SquareImageWrapper>
  );
};

SquareArticleImage.propTypes = {
  isLiveblog: PropTypes.bool,
  image: PropTypes.shape({
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  title: PropTypes.string,
  trackClick: PropTypes.func,
  type: PropTypes.string,
  uri: PropTypes.string,
};

export default SquareArticleImage;
