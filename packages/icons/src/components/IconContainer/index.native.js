import React from 'react';
import PropTypes from 'prop-types';

import icons from '../../assets/icons';

/**
 * Get dynamically icon by name to web with lazy load/suspense
 * @param {Object} props - all react prop for the icon component
 * @param {string} props.iconName - the name of icon to load
 * @returns {JSX}
 */
function IconContainer({ iconName, ...iconProps }) {
  const IconSvg = icons[iconName];

  if (!IconSvg) {
    return null;
  }
  return (
    <IconSvg {...iconProps} />
  );
}

IconContainer.propTypes = {
  iconName: PropTypes.string,
};

export default IconContainer;
