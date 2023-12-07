import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Styles from './FooterTitle.scss';

/**
 * Univision title in footer navigation
 * @returns {JSX}
 */
const FooterTitle = ({ className, themeVariant, children }) => (
  <div
    className={classnames(Styles.title, 'uvs-font-a-bold', className, {
      [Styles.light]: themeVariant === 'light',
    })}
  >
    {children}
  </div>
);

/**
 * @property {Node} children node
 * @property {string} modifer class
 */
FooterTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  themeVariant: PropTypes.string.isRequired,
};

FooterTitle.defaultProps = {
  className: '',
};

export default FooterTitle;
