import React from 'react';
import PropTypes from 'prop-types';

import WidgetsFactory from '../../../utils/factories/widgetsFactory';
import SoccerMatchConnector from './SoccerMatchConnector';

/**
 * Soccer Match content type component
 * we don't add some prop from here to children component like
 * `pageCategory` or `pageData` becaise we depend of
 * data injected by redux depending of the match status,
 * for example we have a `pageCategory` and `widgets` per match status
 * @see {@link SoccerMatchConnector}
 * @param {Object} props - react props for this component
 * @param {Object} props.pageData.device - current page device
 * @param {Object} props.pageData.theme - current page theme
 * @returns {JSX}
 */
function SoccerMatch({ pageData }) {
  const widgetsFactory = new WidgetsFactory(pageData);
  const parseWidgets = widgetsFactory.parseWidgets();
  const { device, theme } = pageData;

  return (
    <SoccerMatchConnector
      device={device}
      theme={theme}
      parseWidgets={parseWidgets}
    />
  );
}

SoccerMatch.propTypes = {
  pageData: PropTypes.shape({
    device: PropTypes.string,
    theme: PropTypes.object,
  }).isRequired,
};

export default SoccerMatch;
