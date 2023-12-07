import React from 'react';
import PropTypes from 'prop-types';

import Header from '@univision/fe-components-base/dist/components/Header';

/**
 * Renders a header using the data in the Store
 * @param {Object} initialState Initiall State
 * @returns {XML}
 * @constructor
 */
const HeaderWrapper = ({ initialState }) => {
  return <Header pageData={initialState.data} pageCategory={initialState.pageCategory} />;
};

/**
 * propTypes
 */
HeaderWrapper.propTypes = {
  initialState: PropTypes.object,
};

export default HeaderWrapper;
