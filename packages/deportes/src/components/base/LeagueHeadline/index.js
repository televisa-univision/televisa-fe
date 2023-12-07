import React from 'react';
import PropTypes from 'prop-types';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Styles from './LeagueHeadline.scss';

/**
 * A League Headline
 * @param {Object} props The details of the league headline
 * @returns {JSX}
 */
const LeagueHeadline = (props) => {
  const { name, fixture, showName } = props;

  return (
    <div className={Styles.container}>
      {showName && (
        <span className="uvs-font-a-bold leagueName">
          {name}
          <span className={Styles.separator}>-</span>
        </span>
      )}
      <span className="uvs-font-a-regular">
        {localization.get('week')} {fixture}
      </span>
    </div>
  );
};

/**
 * @property {string} name the teams first name;
 * @property {string} fixture round of the league
 * @property {string} showName to show or not to show the name
 */
LeagueHeadline.propTypes = {
  name: PropTypes.string,
  fixture: PropTypes.string,
  showName: PropTypes.bool,
};

LeagueHeadline.defaultProps = {
  showName: true,
};

export default LeagueHeadline;
