import React from 'react';
import PropTypes from 'prop-types';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import ScoreCard from '@univision/shared-components/dist/components/v2/ScoreCard';

import Styles from './LatestMatch.scss';

/**
 * A card displaying reults of an event
 * @param {Object} props The details of the event
 * @returns {JSX}
 */
const LatestMatch = (props) => {
  const { event, isSmall } = props;
  const innerWidth = getKey(global, 'window.innerWidth');
  let size = 'small';
  let isAbbreviated = true;
  // Pseudo responsive
  if (innerWidth > 767) {
    size = 'medium';
    isAbbreviated = isSmall;
  }
  return (
    <div className={`col-12 ${Styles.container} ${size}`}>
      <ScoreCard
        size={size}
        isAbbreviated={isAbbreviated}
        {...event}
        customTextClass={Styles.teamName}
        className={Styles.scoreCard}
      />
    </div>
  );
};

/**
 * @property {object} event data of the evnet, teams, scores
 */
LatestMatch.propTypes = {
  event: PropTypes.object,
  isSmall: PropTypes.bool,
};

LatestMatch.defaultProps = {
  isSmall: false,
};

export default LatestMatch;
