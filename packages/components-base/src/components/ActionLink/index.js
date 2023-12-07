import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import Link from '../Link';
import Styles from './ActionLink.scss';

/**
 * Button base component.
 * @param {Object} props React Props for this component
 * @param {style} className - class name modifier
 * @param {string} link - redirect link
 * @param {Object} theme - theme options
 * @returns {JSX}
 * @constructor
 */
const ActionLink = ({
  theme,
  className,
  ...props
}) => {
  let background;
  if (isValidObject(theme)) {
    const direction = theme.direction || 'right';
    background = theme.gradient || `linear-gradient(to ${direction} , ${theme.primary} 0%, ${theme.secondary} 100%)`;
  }
  return (
    <Link className={classnames(Styles.actionLink, 'uvs-font-a-bold', className)} style={{ background }} {...props} />
  );
};

/**
 * propTypes
 * @property {Object} [theme] - To background link gradient
 * @property {string} [className] - Modifier class name
 * @property {*} children - Element/node[] to render as child
 * @property {string} [href] - Link href string
 */
ActionLink.propTypes = {
  theme: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  href: PropTypes.string,
};

ActionLink.defaultProps = {
  href: '#',
};

export default ActionLink;
