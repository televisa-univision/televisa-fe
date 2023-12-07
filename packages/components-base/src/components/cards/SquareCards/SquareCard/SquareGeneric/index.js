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
import Label from '@univision/shared-components/dist/components/v3/Label';

import Picture from '../../../../Picture';
import Title from '../../../../Title';
import Link from '../../../../Link';
import Styles from './SquareGeneric.styles';

const SquarePromoContainer = styled.div`
  ${Styles.promoContainer}
`;
const PromoBackgroundPicture = styled(Picture)`
  ${Styles.promoBackgroundPicture}
`;
const PromoSchedule = styled.div`
  ${Styles.promoSchedule}
`;
const PromoBackgroundOverlay = styled.div`
  ${Styles.promoBackgroundOverlay}
`;
const PromoInfo = styled.div`
  ${Styles.promoInfo}
`;
const PromoLabelWrapper = styled.div`
  ${Styles.promoLabelWrapper}
`;
const PromoTitle = styled(Title).attrs({
  className: 'uvs-font-b-bold',
})`
  ${Styles.promoTitle}
`;
const PromoLink = styled(Link)`
  ${Styles.promoCardLink}
`;

/**
 * Square SquareGeneric
 * @param {Object} props Component props
 * @param {Object} [props.cardTheme] - the card theme
 * @param {bool} [props.isConectaFeed] - true if consumer content is Conecta
 * @param {Object} [props.image] - Image object for the background of the card
 * @param {Object} [props.labelProps] - the props for the label
 * @param {Object} [props.schedule] - schedule object
 * @param {string} [props.size] - the card size
 * @param {string} [props.title] - Name of the Promo
 * @param {function} [props.trackClick] - the tracking function
 * @param {string} [props.trackClickOther] -the tracking for the badge
 * @param {string} [props.type] - content type,
 * @param {string} [props.uri] - URL for the full promo page
 * @returns {JSX}
 */
const SquareGeneric = ({
  cardTheme,
  isConectaFeed,
  image,
  labelProps,
  schedule,
  size,
  title,
  trackClick,
  trackClickOther,
  type,
  uri,
}) => {
  const expectedImage = PROMO_CARD_RATIOS[size];
  return (
    isConectaFeed
      ? (
        <SquarePromoContainer type={type}>
          <PromoLink useExplicitNavigation href={uri} onClick={trackClick}>
            <PromoBackgroundPicture
              image={image}
              overrideImageUrl={getRenditionUrl(getKey(image, 'renditions.original', {}), expectedImage)}
              size={size}
            />
            <PromoBackgroundOverlay type={type} />
            <PromoInfo type={type}>
              {labelProps?.text && (
                <PromoLabelWrapper size={size}>
                  {trackClickOther ? (
                    <Link href={labelProps?.href || '#'}>
                      <Label {...labelProps} />
                    </Link>
                  ) : (
                    <Label {...labelProps} />
                  )}
                </PromoLabelWrapper>
              )}
              {title && (
              <PromoTitle
                fontName={getKey(
                  cardTheme, `headlineFont.${type}`
                )}
                size={size}
                type={type}
              >
                {title}
              </PromoTitle>
              )}
            </PromoInfo>
          </PromoLink>
        </SquarePromoContainer>

      ) : (
        <PromoSchedule
          type={type}
          image={getRenditionUrl(getKey(schedule?.image, 'renditions.original', {}), expectedImage) || defaultImage}
        />
      )
  );
};

SquareGeneric.propTypes = {
  cardTheme: PropTypes.object,
  isConectaFeed: PropTypes.bool,
  image: PropTypes.shape({
    caption: PropTypes.string,
    credit: PropTypes.string,
    renditions: PropTypes.object.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  labelProps: PropTypes.object,
  schedule: PropTypes.object,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  title: PropTypes.string,
  trackClick: PropTypes.func,
  trackClickOther: PropTypes.func,
  type: PropTypes.string,
  uri: PropTypes.string,
};

SquareGeneric.defaultProps = {
  isConectaFeed: true,
};

export default SquareGeneric;
