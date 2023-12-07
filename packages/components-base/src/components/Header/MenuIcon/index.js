import React from 'react';
import PropTypes from 'prop-types';

import Styles from './MenuIcon.scss';

/**
 * MenuIcon component
 * @returns {JSX}
 */
const MenuIcon = ({ open }) => (
  <div className={`${Styles.icon} ${open ? Styles.open : ''}`}>
    <div className={Styles.bar} />
    <div className={Styles.bar} />
    <div className={Styles.bar} />
    <div className={Styles.bar} />
  </div>
);

MenuIcon.propTypes = {
  open: PropTypes.bool,
};

MenuIcon.defaultProps = {
  open: false,
};

export default MenuIcon;
