import React from 'react';
import PropTypes from 'prop-types';
import { exists } from '@univision/fe-commons/dist/utils/helpers';

import classnames from 'classnames';

import Styles from './Separator.scss';

/**
 * Component: Separator
 * Creates a customizeable horizontal separator
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const Separator = (props) => {
  const {
    align,
    className,
    theme,
    width,
  } = props;

  let styles;
  if (exists(theme)) {
    styles = {
      backgroundColor: theme.primary,
    };
  }

  return (
    <div
      className={classnames(
        Styles.separator,
        {
          [className]: className,
          [Styles[align]]: align === 'center' || 'right',
          [Styles.small]: width === 'small',
        },
      )}
      style={exists(theme) ? styles : {}}
    />
  );
};

/**
 * @param {Object} align Alignment of separator, defaults to left
 * @param {String} className Custom class passed from parent component
 * @param {String} theme Current page theme colors
 * @param {Object} width Size of separator, defaults to 100%
 */
Separator.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  className: PropTypes.string,
  theme: PropTypes.string,
  width: PropTypes.string,
};

Separator.defaultProps = {
  align: 'left',
};

export default Separator;
