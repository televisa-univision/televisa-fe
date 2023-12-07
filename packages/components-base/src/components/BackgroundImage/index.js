import React from 'react';
import PropTypes from 'prop-types';
import bg from '@univision/fe-commons/dist/assets/images/default-content-image.png';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

import getRatioImages from '../Picture/getRatioImages';
import * as sizes from '../Picture/imageSizes';
import * as ratios from '../Picture/aspectRatios';
import Styles from './BackgroundImage.scss';

/**
 * BackgroundImage
 * @param {Object} props component props
 * @returns {JSX}
 */
const BackgroundImage = (props) => {
  const {
    className,
    blur,
    dark,
    absolute,
    image,
    aspectRatio,
    deviceSizeOverrides,
    overrideImageUrl,
    device,
    gradient,
  } = props;

  let source;

  if (overrideImageUrl) {
    source = overrideImageUrl;
  } else if (image && hasKey(image, 'renditions')) {
    const images = getRatioImages({
      renditions: image.renditions,
      aspectRatio,
      defaultImage: null,
      overrides: deviceSizeOverrides,
    });
    switch (device) {
      case 'desktop': {
        source = images.lg;
        break;
      }
      case 'tablet': {
        source = images.md;
        break;
      }
      default: {
        source = images.sm;
      }
    }
  }

  const style = {};

  const classList = [];
  if (className) classList.push(className);
  if (dark) classList.push(Styles.dark);
  if (absolute) classList.push(Styles.absolute);
  if (source) style.backgroundImage = `url('${source}')`;
  else style.backgroundImage = `url('${bg}')`;

  if (blur) {
    classList.push(Styles.blur);
    return (
      <div className={classList.join(' ')}>
        <div className={Styles.background} style={style} />
      </div>
    );
  }

  if (gradient) classList.push(Styles.backgroundWithGradient);
  else classList.push(Styles.background);
  return <div className={classList.join(' ')} style={style} />;
};

BackgroundImage.propTypes = {
  device: PropTypes.string,
  aspectRatio: PropTypes.oneOf([ratios.ASPECT_RATIO_16X9,
    ratios.ASPECT_RATIO_3X4,
    ratios.ASPECT_RATIO_4X3,
    ratios.ASPECT_RATIO_ORIGINAL]),
  className: PropTypes.string,
  blur: PropTypes.bool,
  dark: PropTypes.bool,
  absolute: PropTypes.bool,
  gradient: PropTypes.bool,
  image: PropTypes.shape({
    renditions: PropTypes.object.isRequired,
  }),
  deviceSizeOverrides: PropTypes.shape({
    xl: PropTypes.oneOf([
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
    lg: PropTypes.oneOf([
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
    md: PropTypes.oneOf([
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
    sm: PropTypes.oneOf([
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
    xs: PropTypes.oneOf([
      sizes.XX_SMALL,
      sizes.X_SMALL,
      sizes.SMALL,
      sizes.MEDIUM,
      sizes.LARGE,
      sizes.X_LARGE,
    ]),
  }),
  overrideImageUrl: PropTypes.string,
};

BackgroundImage.defaultProps = {
  device: 'mobile',
  aspectRatio: ratios.ASPECT_RATIO_16X9,
};

export default BackgroundImage;
