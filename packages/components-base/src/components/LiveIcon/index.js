import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Styles from './LiveIcon.scss';

/**
 * Live Label
 * Displays labels for "live icon" content types
 * @param {string} name Name of icon
 * @param {string} size Size of icon
 * @param {string} fill Color of icon
 * @param {string} blink Color of icon
 * @returns {JSX}
 */
const LiveIcon = ({
  name, size, fill, blink, className,
}) => {
  return (
    <div className={classnames(Styles.liveLabel, {
      [Styles.blink]: blink,
    })}
    >
      <Icon
        className={classnames(Styles.liveIcon, { [className]: className })}
        name={name}
        fill={fill}
        size={size}
      />
    </div>
  );
};

LiveIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.oneOf([
    'xxsmall', 'xsmall', 'small', 'medium', 'large', 'bars',
  ]), PropTypes.number]),
  fill: PropTypes.string,
  blink: PropTypes.bool,
  className: PropTypes.string,
};

LiveIcon.defaultProps = {
  name: 'dot',
  size: 'small',
  blink: true,
  fill: '#ffffff',
};

export default LiveIcon;
