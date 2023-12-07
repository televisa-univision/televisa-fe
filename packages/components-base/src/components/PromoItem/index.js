import PropTypes from 'prop-types';
import React from 'react';

import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import Link from '../Link';
import Picture from '../Picture';
import Title from '../Title';
import TagLabel from '../TagLabel';
import Sponsor from '../Sponsor';
import * as sizes from '../Picture/imageSizes';
import * as ratios from '../Picture/aspectRatios';
import Styles from './PromoItem.scss';

/**
 * Maps a contentType with it's corresponding icon class
 * @param {string} contentType Content type for which we want to get an icon class
 * @returns {Object} icon class to use for this promo
 */
const getIconClass = (contentType) => {
  switch (contentType) {
    case 'video':
      return 'playnocircle';
    case 'reactionslideshow':
    case 'slideshow':
      return 'slideshow';
    default:
      return null;
  }
};

/**
 * Basic building block for image+text based container components
 * e.g. widgets like {@link FiveItem}
 * @param {Object} props React Props for this component
 * @returns {jsx}
 * @constructor
 */
const PromoItem = ({
  aspectRatio,
  className,
  deviceSizeOverrides,
  image,
  primaryTag,
  showIcon,
  showTag,
  showText,
  sponsor,
  theme,
  title,
  type,
  uri,
  view,
}) => {
  const iconClass = getIconClass(type);
  const promoUrl = uri;

  const overrides = deviceSizeOverrides || {
    xl: sizes.X_SMALL,
    lg: sizes.X_SMALL,
    md: sizes.X_SMALL,
    sm: sizes.X_SMALL,
    xsm: sizes.X_SMALL,
  };
  /**
   * Rendering of {PromoItem}
   * Relies on the Picture component to decide which image rendition to use
   */
  return (
    <div className={`${Styles.wrapper} ${Styles[view]} ${Styles[theme]} ${className}`}>
      <div className={Styles.imageCont}>
        <Link href={promoUrl} className={Styles.hoverState}>
          {exists(image) ? (
            <Picture
              alt={title}
              image={image}
              deviceSizeOverrides={overrides}
              aspectRatio={aspectRatio}
            />
          ) : (
            <Picture />
          )}
          {showIcon
            && iconClass && (
              <div className={Styles.iconWrapper}>
                <Icon name={iconClass} className={Styles.icon} fill={WHITE} />
              </div>
          )}
        </Link>
      </div>
      <div className={Styles.textCont}>
        {exists(showTag)
          && exists(primaryTag) && <TagLabel className={Styles.label} tag={primaryTag} />}
        {exists(showText) && (
          <Title className={Styles.title} size="small">
            <Link className="uvs-text-hover uvs-text-link" href={uri}>
              {title}
            </Link>
          </Title>
        )}
        {exists(sponsor) && <Sponsor {...sponsor} />}
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {Object} renditions Object containing data different image renditions available
 * @property {string} title_text Text that represents the title for this item
 * @property {string} uri URL to reach the full representation of the content in this promo
 * @property {boolean} showTag Boolean value to show tag below image
 * @property {boolean} showText Boolean value to show the text below image
 * @property {boolean} showIcon Boolean value to show icon overlay
 */
PromoItem.propTypes = {
  image: PropTypes.object,
  primaryTag: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  uri: PropTypes.string,
  showTag: PropTypes.bool,
  showText: PropTypes.bool,
  deviceSizeOverrides: PropTypes.object,
  showIcon: PropTypes.bool,
  view: PropTypes.oneOf(['vertical', 'horizontal']),
  theme: PropTypes.oneOf(['light', 'gray']),
  sponsor: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    logo: PropTypes.string,
  }),
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
};

/**
 * Default Prop Values
 */
PromoItem.defaultProps = {
  showTag: true,
  showText: true,
  showIcon: true,
  view: 'vertical',
  theme: 'light',
  className: '',
  aspectRatio: ratios.ASPECT_RATIO_16X9,
};

export default PromoItem;
