import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Styles from './SlideArrow.scss';

/**
 * Arrow component for navigating the slideshow
 * @returns {JSX}
 */
const SlideArrow = ({
  direction,
  disabled,
  offset,
  onClick,
  theme,
  className,
  autoHide,
  afterClick,
  modifierClass,
}) => {
  const rest = {};

  if (offset) {
    rest.style = { ...offset };
  }

  const disable = className.indexOf('slick-disabled') !== -1 && 'hide';

  /**
   * Wraps the react-slick default onClick.
   * @param {array} args Arguments
   */
  const clickHandler = (...args) => {
    if (onClick) {
      onClick.apply(this, args);
    }
    if (afterClick) {
      afterClick();
    }
  };

  const slideTheme = theme !== 'none' ? Styles[theme] : '';

  return (
    <Button
      className={`
        ${modifierClass || ''}
        ${Styles.arrow}
        ${Styles[direction]}
        ${slideTheme}
        ${autoHide ? Styles[disable] : ''}
      `}
      onClick={clickHandler}
      disabled={disabled}
      {...rest}
    />
  );
};

SlideArrow.propTypes = {
  direction: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  offset: PropTypes.object,
  onClick: PropTypes.func,
  afterClick: PropTypes.func,
  theme: PropTypes.oneOf(['dark', 'light', 'white', 'plain-white', 'none']),
  className: PropTypes.string,
  autoHide: PropTypes.bool,
  modifierClass: PropTypes.string,
};

SlideArrow.defaultProps = {
  theme: 'dark',
  className: '',
  autoHide: false,
};

export default SlideArrow;
