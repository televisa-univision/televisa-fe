import React from 'react';
import PropTypes from 'prop-types';
import { supportingArrays } from 'react-style-proptype';

import getKey from '@univision/fe-utilities/helpers/object/getKey';

import iconsConstants from '../../constants/icons';
import { getIconVariant, formatIconProps } from '../../utils/helpers';
import IconWrapper from '../IconWrapper';
import IconContainer from '../IconContainer';

/**
 * Icon component with support web/native
 * @param {Object} props - react Props for this component
 * @param {string} [props.className] - modifier class
 * @param {string} [props.fill] - fill color, default: svg file color
 * @param {string} props.name - icon name
 * @param {(string|number|Array)} [props.size='medium'] - name size or custom number size
 * @param {(Object|style)} [props.style] - additional styles
 * @param {Object} [props.theme] - theme colors
 * @param {string} [props.variant] - color variant name
 * @param {string} [props.viewBox='0 0 256 256'] - viewBox size, default: 0 0 256 256
 * @param {Object} [props.otherProps] - aditional props as Icon options.
 * @returns {JSX}
 */
function Icon ({
  className,
  fill,
  name,
  size,
  style,
  theme,
  variant,
  viewBox,
  ...otherProps
}) {
  const themeColor = getKey(theme, 'primary') || getIconVariant(variant);
  const { iconProps, iconName } = formatIconProps({
    className,
    fill,
    name,
    size,
    style,
    viewBox,
  });

  // For compatibility with the legacy Icon component
  if (themeColor && iconProps.style && typeof iconProps.style === 'object') {
    iconProps.fill = themeColor;
  }

  return (
    <IconWrapper>
      <IconContainer iconName={iconName} {...iconProps} {...otherProps} />
    </IconWrapper>
  );
}

Icon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'extraLarge']),
    PropTypes.number,
    PropTypes.array,
  ]),
  style: PropTypes.oneOfType([PropTypes.object, supportingArrays]),
  theme: PropTypes.object,
  variant: PropTypes.oneOf(['dark', 'light']),
  viewBox: PropTypes.string,
};

Icon.defaultProps = {
  size: iconsConstants.DEFAULT_SIZE,
  viewBox: iconsConstants.DEFAULT_VIEWBOX,
};

export default Icon;
