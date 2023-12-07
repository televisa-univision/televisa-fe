import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import Styles from './GroupPhaseArrow.scss';

const TYPE_GROUP = 'group';
const TYPE_NAV = 'nav';
/**
 * GroupPhase Arrow Component
 * @returns {JSX}
 */
const GroupPhaseArrow = ({
  isRight, onClick, onMouseEnter, onMouseLeave, className, type, isTudn,
}) => {
  const theme = isTudn ? themes.tudn : themes.sports;
  const themeWhite = themes.white;
  return (
    <button
      className={classnames(
        className,
        Styles.arrow,
        {
          [Styles.groupArrow]: type === TYPE_GROUP,
          [Styles.navArrow]: type === TYPE_NAV,
        }
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon
        name={isRight ? 'arrowRight' : 'arrowLeft'}
        size={type === TYPE_GROUP ? 'large' : 'small'}
        fill={type === TYPE_GROUP ? themeWhite.primary : theme.primary}
      />
    </button>
  );
};
/**
 * propTypes
 * @property {boolean} [isRight=false] - if true is right arrow
 * @property {Function} onClick - on click callback function
 * @property {Function} onMouseEnter - onMouseEnter function
 * @property {Function} onMouseLeave - tonMouseLeave function
 * @property {String} className - the modifier class
 * @property {String} type - the type of arrow button
 * @property {bool} isTudn - tudn theme support
 */
GroupPhaseArrow.propTypes = {
  isRight: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf([TYPE_GROUP, TYPE_NAV]),
  isTudn: PropTypes.bool,
};

GroupPhaseArrow.defaultProps = {
  isRight: false,
  className: '',
  type: TYPE_GROUP,
  isTudn: false,
};

export default GroupPhaseArrow;
