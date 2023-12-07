import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Picture from '../../Picture';
import * as ratios from '../../Picture/aspectRatios';
import * as sizes from '../../Picture/imageSizes';
import FullWidth from '../../FullWidth';
import CaptionWrapper from './CaptionWrapper';
import Styles from './InlineImage.scss';

const SMALL_BREAKPOINTS = ['xxs', 'xs', 'sm'];
const ALL_BREAKPOINTS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'];
const LEAD_ASPECT_RATIO = {
  aspectRatio: ratios.ASPECT_RATIO_PANORAMIC,
};

/**
 * InlineImage to be rendered with or without caption
 * inline with other page content
 * @param {Object} image the image renditions
 * @param {string} caption the image description
 * @param {string} credit image attribution
 * @param {bool} props.lazyload it lazy loads the image
 * @returns {JSX}
 */
const InlineImage = ({
  alignment,
  enhancementData,
  caption,
  className,
  credit,
  fullWidth,
  isLead,
  onClick,
  renditions,
  lazyload,
}) => {
  const isLeadFullWidth = isLead && fullWidth;
  const aspectRatioProps = isLeadFullWidth ? LEAD_ASPECT_RATIO : {};
  const isVerticalImage = !!enhancementData?.verticalImage;
  const DEVICE_SIZE_OVERRIDES = !isVerticalImage ? {
    xl: sizes.LARGE,
    lg: sizes.MEDIUM,
    md: sizes.MEDIUM,
    sm: sizes.SMALL,
    xsm: sizes.X_SMALL,
  } : {
    xl: sizes.LARGE,
    md: sizes.LARGE,
    sm: sizes.LARGE,
    xsm: sizes.LARGE,
  };
  return (
    <div className={alignment ? Styles[alignment] : ''} tabIndex={-1} role="button" onClick={onClick}>
      <div
        className={classnames(
          className,
          Styles.inlineImage,
          {
            [Styles.withCaption]: caption,
          }
        )}
      >
        <FullWidth breakpoints={isLeadFullWidth ? ALL_BREAKPOINTS : SMALL_BREAKPOINTS}>
          <Picture
            isVertical={isVerticalImage}
            {...aspectRatioProps}
            lazyload={lazyload}
            image={{ renditions }}
            deviceSizeOverrides={DEVICE_SIZE_OVERRIDES}
            showBackground
          />
        </FullWidth>
        <CaptionWrapper caption={caption} credit={credit} isLead={isLead} fullWidth={fullWidth} />
      </div>
    </div>
  );
};

InlineImage.propTypes = {
  alignment: PropTypes.oneOf(['left', 'right']),
  caption: PropTypes.string,
  className: PropTypes.string,
  credit: PropTypes.string,
  fullWidth: PropTypes.bool,
  isLead: PropTypes.bool,
  onClick: PropTypes.func,
  renditions: PropTypes.object.isRequired,
  lazyload: PropTypes.bool,
  enhancementData: PropTypes.object,
};

InlineImage.defaultProps = {
  fullWidth: false,
  isLead: false,
  enhancementData: {},
};

export default InlineImage;
