import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from '../../Link';
import Styles from './MenuLink.scss';

/**
 * A clickable item in the navigation
 * @param {Object} item The details of the link to display
 * @param {string} custom className
 * @returns {JSX}
 */
export default function MenuLink({ item, className, active }) {
  return (
    <li
      key={item.name}
      className={classnames(
        Styles.link,
        className,
        { [Styles.active]: active }
      )}
    >
      <Link checkUserLocation href={item.link}>{item.name}</Link>
    </li>
  );
}

/**
 * @property {Object} item the details of the link to display
 * @property {string} item.name the text to display in the UI;
 * @property {string} item.link the link's href attribute
 * @property {string} className custom className
 */
MenuLink.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    pageCategory: PropTypes.string,
  }),
  className: PropTypes.string,
  active: PropTypes.bool,
};

MenuLink.defaultProps = {
  item: {},
  className: '',
};
