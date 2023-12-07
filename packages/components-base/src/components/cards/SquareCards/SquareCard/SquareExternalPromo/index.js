import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import defaultImage from '@univision/fe-commons/dist/assets/images/default-card-image.png';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { PROMO_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/promoCard';

import Picture from '../../../../Picture';
import Link from '../../../../Link';
import Styles from './SquareExternalPromo.styles';

const SquareImageWrapper = styled(Link)`
  ${Styles.squareImageWrapper}
`;
const PromoBackgroundOverlay = styled.div`
  ${Styles.promoBackgroundOverlay}
`;
const PromoBackgroundPicture = styled(Picture)`
  ${Styles.promoBackgroundPicture}
`;
const PromoSchedule = styled.div`
  ${Styles.promoSchedule}
`;

/**
 * Square SquareExternalPromo
 * @param {Object} props Component props
 * @param {bool} [props.isConectaFeed] - true if consumer content is Conecta
 * @param {Object} [props.image] - Image object for the background of the card
 * @param {Object} [props.schedule] - schedule object
 * @param {string} [props.size] - the card size
 * @param {string} [props.title] - Name of the Promo
 * @param {function} [props.trackClick] - the tracking function
 * @param {string} [props.type] - content type,
 * @param {string} [props.uri] - URL for the full promo page
 * @returns {JSX}
 */
const SquareExternalPromo = ({
  isConectaFeed,
  image,
  schedule,
  size,
  title,
  trackClick,
  type,
  uri,
}) => {
  const expectedImage = PROMO_CARD_RATIOS[size];
  return (
    isConectaFeed ? (
      <SquareImageWrapper
        href={uri}
        onClick={trackClick}
        type={type}
        target="_blank"
      >
        <PromoBackgroundPicture
          alt={title}
          image={image}
          overrideImageUrl={getRenditionUrl(
            getKey(image, 'renditions.original', {}),
            expectedImage
          )}
          overrideImageBounds={expectedImage}
        />
        <PromoBackgroundOverlay />
      </SquareImageWrapper>
    ) : (
      <PromoSchedule
        type={type}
        image={getRenditionUrl(getKey(schedule?.image, 'renditions.original', {}), expectedImage) || defaultImage}
      />
    )
  );
};

SquareExternalPromo.propTypes = {
  isConectaFeed: PropTypes.bool,
  image: PropTypes.shape({
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  schedule: PropTypes.object,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  title: PropTypes.string,
  trackClick: PropTypes.func,
  type: PropTypes.string,
  uri: PropTypes.string,
};

SquareExternalPromo.defaultProps = {
  isConectaFeed: true,
};

export default SquareExternalPromo;
