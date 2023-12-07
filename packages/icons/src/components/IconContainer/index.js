import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import { Svg } from 'svgs';

import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import { formatIconProps } from '../../utils/helpers';
import { iconsWithType, iconsAllowedGroups } from '../../assets/icons';

/**
 * Get dynamically icon by name to web
 * @param {string} iconName - name of icon to load
 * @returns {Promise<JSX>}
 */
function getIconLoader(iconName) {
  const iconType = iconsWithType[iconName];
  const loaderGroup = iconsAllowedGroups[iconType];

  if (!iconType) {
    return null;
  }

  // get loader group by icon type then returns the icon component
  if (isValidFunction(loaderGroup)) {
    return loaderGroup(iconName);
  }

  // by default get chunk per icon
  return import(/* webpackChunkName: "icons/icon[request][index]" */ `../../assets/icons/${iconType}/${iconName}`);
}

/**
 * Get static/sting Icon markup.
 *
 * @param {string} name - the name of icon to load
 * @param {Object} props - additional icon/svg props
 * @param {string} [props.className] - modifier class
 * @param {string} [props.fill] - fill color, default: svg file color
 * @param {(string|number|Array)} [props.size] - name size or custom number size
 * @param {(Object|style)} [props.style] - additional styles
 * @param {string} [props.viewBox] - viewBox size, default from: {@link formatIconProps}
 * @param {...*} [otherProps] - additional icon properties/props
 * @returns {string}
 */
async function getIconStatic(name, {
  className,
  fill,
  style,
  size,
  viewBox,
  ...otherProps
} = {}) {
  const { iconName, iconProps } = formatIconProps({
    className,
    fill,
    name,
    size,
    style,
    viewBox,
  });
  try {
    const { default: IconSvg } = await getIconLoader(iconName);
    return ReactDOMServer.renderToStaticMarkup(<IconSvg {...iconProps} {...otherProps} />);
  } catch (err) {
    return '';
  }
}

/**
 * Get fallback SVG icon
 * @param {Object} [iconProps] - component props for fallback svg
 * @returns {JSX}
 */
function FallbackSvg(iconProps) {
  return <Svg {...iconProps} />;
}

/**
 * Get dynamically icon by name to web with lazy load/suspense
 * @param {Object} props - all react prop for the icon component
 * @param {string} props.iconName - the name of icon to load
 * @param {Object} props.iconProps - additional icon/svg props
 * @returns {JSX}
 */
function IconContainer({ iconName, ...iconProps }) {
  const fallback = (
    <FallbackSvg
      data-name={iconName}
      className={iconProps.className}
      fill={iconProps.fill}
      width={iconProps.width}
      height={iconProps.height}
    />
  );
  if (typeof window === 'undefined') {
    return fallback;
  }

  const iconLoader = getIconLoader(iconName);
  if (!iconLoader) {
    return null;
  }

  const IconSvg = React.lazy(() => iconLoader);

  return (
    <Suspense fallback={fallback}>
      <IconSvg {...iconProps} />
    </Suspense>
  );
}

IconContainer.propTypes = {
  iconName: PropTypes.string,
};

export default IconContainer;
export { getIconLoader, getIconStatic };
