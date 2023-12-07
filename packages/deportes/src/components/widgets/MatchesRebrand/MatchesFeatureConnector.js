import React from 'react';
import PropTypes from 'prop-types';

import Matches from '../Matches/MatchesConnector';
import MatchesConnectorRebrand from './MatchesConnector';

/**
 * Gets the MatchesConnector.
 * @param {Object} props props to create matchesConnector.
 * @returns {JSX}
 */
const MatchesFeatureConnector = (props) => {
  const { settings: { displayType: { value } } } = props;
  if (value !== 'Live') {
    return <Matches {...props} />;
  }
  return <MatchesConnectorRebrand {...props} />;
};

MatchesFeatureConnector.propTypes = {
  settings: PropTypes.shape({
    displayType: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MatchesFeatureConnector;
