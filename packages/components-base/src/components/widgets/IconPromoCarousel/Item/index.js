import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { defaultImage } from '@univision/fe-commons/dist/assets/images/default-content-image.png';

import Image from '../../../Image';

import Styles from './Item.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;
const Promo = styled.div`
  ${Styles.promo}
`;
const PromoImage = styled.div`
  ${Styles.promoImage}
`;
const PromoBorder = styled.div`
  ${Styles.promoBorder}
`;
const PromoTitle = styled.h3`
  ${Styles.promoTitle}
`;

/**
 * Item promo for IconPromoCarousel
 * @returns {JSX}
 */
const Item = ({
  bigSize,
  className,
  image,
  onPressHandler,
  style,
  title,
  theme,
  uid,
  uri,
  variant,
}) => {
  if (image) {
    const img = getKey(
      image,
      'renditions["1x1-mobile"].href',
      getKey(image, 'renditions.original.href', defaultImage),
    );
    const isDark = variant === 'dark';
    const borderStyle = isDark ? {} : { borderColor: theme && theme.primary };

    return (
      <Wrapper
        key={uid}
        style={style}
        className={className}
      >
        <Promo
          onClick={() => onPressHandler(uri, title)}
          role="button"
          tabIndex={0}
          isBigSize={bigSize}
        >
          <PromoImage isBigSize={bigSize} isDark={isDark}>
            <PromoBorder isDark={isDark} style={borderStyle} />
            <Image src={img} alt={title} />
          </PromoImage>
          <PromoTitle
            isDark={isDark}
            isBigSize={bigSize}
            className="uvs-font-a-regular"
          >
            {title}
          </PromoTitle>
        </Promo>
      </Wrapper>
    );
  }

  return null;
};

/**
 * propTypes
 * @property {Function} bigSize - Change item circle size
 * @property {String} [className] - a modifier class
 * @property {Object} image - item image with renditions
 * @property {Function} onPressHandler - method to do tracking and navigiation
 * @property {Object} [styles] - a modifier styles
 * @property {Object} [theme] - the theme object with primary color
 * @property {string} title - item title
 * @property {string} uid - item unique id
 * @property {string} uri - the item URI
 */
Item.propTypes = {
  bigSize: PropTypes.bool,
  className: PropTypes.string,
  image: PropTypes.object,
  onPressHandler: PropTypes.func.isRequired,
  style: PropTypes.object,
  theme: PropTypes.object,
  title: PropTypes.string,
  uid: PropTypes.string,
  uri: PropTypes.string,
  variant: PropTypes.string,
};

Item.defaultProps = {
  bigSize: false,
  style: {},
};

export default Item;
