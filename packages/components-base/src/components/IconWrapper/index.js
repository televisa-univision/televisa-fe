import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Styles from './IconWrapper.scss';

/**
 * Icon wrapper to be reused for customizations.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const IconWrapper = ({
  className, content, iconName, variant, iconSize,
}) => {
  const isDarkVariant = variant === 'dark';
  const variantIcon = isDarkVariant ? 'light' : 'dark';
  return (
    <div
      className={classnames(className, Styles.iconWrapper, {
        [Styles.content]: exists(content),
        [Styles.dark]: isDarkVariant,
      })}
    >
      {content && <span>{content}</span>}
      <Icon name={iconName} className={Styles.icon} size={iconSize} variant={variantIcon} />
    </div>
  );
};

/**
 * propTypes
 * @property {String} class Class name of the element
 * @property {String} iconName iconName
 * @property {String} content show content besides the icon
 * @property {String} iconSize - name size or custom number size
 */
IconWrapper.propTypes = {
  className: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.oneOfType([
    PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'extraLarge']),
    PropTypes.number,
    PropTypes.array,
  ]),
  content: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
};

/**
 * propTypes
 * @property {String} className - Default class to render
 */
IconWrapper.defaultProps = {
  className: '',
  iconSize: 14,
  variant: 'dark',
};

export default IconWrapper;
