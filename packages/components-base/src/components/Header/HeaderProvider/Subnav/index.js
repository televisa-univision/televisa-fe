import React from 'react';
import PropTypes from 'prop-types';
import getSubNav from './getSubNav';
import * as subNavTypes from './subNavTypes';

/**
 * Subnav link list
 * @param   {Object} props component props
 * @returns {JSX}
 */
export default function Subnav (props) {
  const { subNavComponent } = props;

  const SubNav = getSubNav(subNavComponent);
  return <SubNav {...props} />;
}

Subnav.propTypes = {
  links: PropTypes.array.isRequired,
  variant: PropTypes.string,
  theme: PropTypes.object,
  // @property {boolean} [isTudn] - Changes style for certain configurations
  // on TUDN/Deportes site on styles parts.
  isTudn: PropTypes.bool,
  styling: PropTypes.object,
  isBrandedHeader: PropTypes.bool,
  subNavComponent: PropTypes.oneOf(Object.keys(subNavTypes)),
};
