import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Styles from './Button.scss';

/**
 * Button base component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const Button = ({
  className, plain, type, onClick, disabled, style, children,
}) => {
  return (
    <button
      className={classnames(Styles.buttonBase,
        className,
        {
          [Styles.plain]: plain,
          [Styles[`${type}`]]: type,
        })}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

/**
 * propTypes
 * @property {Node} children Components to mount
 * @property {String} class Class name of the element
 * @property {Function} onClick Click Handler to invoke when button is clicked
 * @property {String} type Defines what type of button to render
 */
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  plain: PropTypes.bool,
  type: PropTypes.string,
};

/**
 * propTypes
 * @property {String} className - Default class to render
 * @property {bool} disabled - flag to enable or disable button
 */
Button.defaultProps = {
  className: '',
  disabled: false,
};

export default Button;
