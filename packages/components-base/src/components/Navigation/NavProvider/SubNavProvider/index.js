import React from 'react';
import PropTypes from 'prop-types';

import getSubNav from './getSubNav';

/**
 * SubNav Provider
 * @param {Object} props of the component
 * @param {string} [subNavType] - type that will help indentify which component to load as subnav
 * @returns {JSX}
 */
const SubNavProvider = (props) => {
  const { subNavType } = props;
  const SubNav = getSubNav(subNavType);

  return <SubNav {...props} />;
};

SubNavProvider.propTypes = {
  subNavType: PropTypes.string,
};

export default React.memo(SubNavProvider);
