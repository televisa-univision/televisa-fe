import React from 'react';
import PropTypes from 'prop-types';

import localization from '../../../../../../../utils/localization/index';
import Styles from './Scorer.scss';

/**
 * Scorer component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const Scorer = (props) => {
  const {
    name,
    position,
    score,
    className,
  } = props;
  return (
    <div className={`${Styles.container} ${className}`}>
      <div className={Styles.playerWrapper}>
        <span className="uvs-font-a-bold">{name}</span>
        <span className="uvs-font-a-regular">{localization.get(position)}</span>
      </div>
      <div className={Styles.scoreWrapper}>
        <span className="uvs-font-a-bold">{score}</span>
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {string} name of player
 * @property {string} position players position
 * @property {number} score total goals from this player
 */
Scorer.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  score: PropTypes.number,
  className: PropTypes.string,
};

/**
 * Default Prop Values
 */
Scorer.defaultProps = {
  className: '',
};

export default Scorer;
