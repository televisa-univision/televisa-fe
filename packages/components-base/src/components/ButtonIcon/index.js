import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Styles from './ButtonIcon.scss';

/**
 * Button Icon component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const ButtonIcon = (props) => {
  const { text, icon, className } = props;
  return (
    <div className={`${Styles.button} ${className}`}>
      <span>{text}</span>
      {icon && (
        <Icon name={icon} />
      )}
    </div>
  );
};

/**
 * propTypes
 * @property {type} component button type
 * @property {string} url for the component
 * @property {className} class name for the Component
 * @property {style} style for the Component
 * @property {string} callToAction for the Component
 */
ButtonIcon.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Default Prop Values
 */
ButtonIcon.defaultProps = {
  text: 'ver más',
  icon: '',
  className: '',
};

export default ButtonIcon;
