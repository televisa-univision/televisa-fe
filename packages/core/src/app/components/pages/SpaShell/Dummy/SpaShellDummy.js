import React from 'react';
import PropTypes from 'prop-types';
import Store from '@univision/fe-commons/dist/store/store';
import { Provider } from 'react-redux';

import SpaShellDummyConnector from './SpaShellDummyConnector';

/**
 * Top container component which wraps of all the building blocks
 * representing an SPA page.
 * @param {Object} props Component props
 * @returns {JSX} rendered shell/document
 */
const SpaShellDummy = ({ uri }) => {
  return (
    <Provider store={Store}>
      <SpaShellDummyConnector uri={uri} />
    </Provider>
  );
};

/**
 * propTypes
 * @property {Node} children React children and components to render
 */
SpaShellDummy.propTypes = {
  uri: PropTypes.string,
};

export default SpaShellDummy;
