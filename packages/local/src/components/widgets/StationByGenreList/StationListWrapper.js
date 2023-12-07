import React from 'react';
import PropTypes from 'prop-types';

import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import StationList from './StationList';

/**
 * Wrapper to include widget title
 * @param {Object} props - Component props
 * @returns {*}
 * @constructor
 */
const StationListWrapper = (props) => {
  const {
    settings,
    theme,
  } = props;
  return (
    <>
      <TopicBar
        settings={settings}
        align="center"
        separator="bottom"
        theme={theme}
      />
      <StationList {...props} />
    </>
  );
};

/**
 * propTypes
 */
StationListWrapper.propTypes = {
  theme: PropTypes.object,
  settings: PropTypes.object,
};

export default StationListWrapper;
