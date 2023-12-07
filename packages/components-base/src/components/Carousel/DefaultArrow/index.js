import PropTypes from 'prop-types';
import React from 'react';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Styles from './DefaultArrow.scss';

/**
 * Default Arrow Component
 * @param {*} props component
 * @returns {JSX}
 */
const DefaultArrow = (props) => {
  const {
    isRight, onClick, onMouseEnter, onMouseLeave,
  } = props;

  const icon = isRight ? 'arrowRight' : 'arrowLeft';
  const className = isRight ? Styles.right : Styles.left;

  return (
    <button
      className={`${Styles.arrow} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon name={icon} fill="#FFFFFF" size="large" />
    </button>
  );
};

DefaultArrow.propTypes = {
  isRight: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

DefaultArrow.defaultProps = {
  isRight: false,
};

export default DefaultArrow;
