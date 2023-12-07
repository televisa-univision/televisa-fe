import React from 'react';
import { connect } from 'react-redux';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import ShowHeaderBase from './ShowHeaderBase';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @returns {{page: Object}}
 */
export const mapStateToProps = (state) => {
  return {
    pageData: getKey(state, 'page', {}),
  };
};

/**
 * ShowHeader component
 * @param {Object} props of the component
 * @returns {JSX}
 */
const ShowHeader = (props) => {
  const HeaderBase = connect(mapStateToProps)(ShowHeaderBase);
  return <HeaderBase {...props} />;
};

export default ShowHeader;
