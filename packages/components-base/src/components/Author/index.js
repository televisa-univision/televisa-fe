import React from 'react';
import PropTypes from 'prop-types';
import { exists, getKey } from '@univision/fe-commons/dist/utils/helpers';
import Link from '../Link';
import Styles from './Author.scss';

/**
 * Text based Author
 * @param {Object} props component props
 * @returns {JSX}
 */
const Author = ({
  title, uri, link, company, designation, fullName, className, size,
}) => {
  let linkValue = { href: '/equipo' };
  let companyName;
  const name = title || fullName || '';

  if (exists(uri)) {
    linkValue = { href: uri };
  } else if (exists(link)) {
    linkValue = {
      href: getKey(link, 'href', link),
      target: getKey(link, 'target', '_blank'),
    };
  }

  if (exists(company)) {
    companyName = ` (${company})`;
    if (exists(designation)) {
      companyName = ` (${company} - ${designation})`;
    }
  }

  return (
    <span className={`uvs-font-a-bold ${Styles.author} ${className} ${Styles[size]}`}>
      <Link {...linkValue}>
        <span className={Styles.name}>{name}</span>
        {companyName && <span className={Styles.company}>{companyName}</span>}
      </Link>
    </span>
  );
};

/**
 * propTypes
 * @property {string} title if fullName doesn't exist it's author name
 * @property {string} fullName author name
 * @property {string} uri link value
 * @property {string} company company name
 * @property {string} designation position author in company
 * @property {object} link if uri doesn't exist, it's link value
 * @property {size} size of author Component
 */

Author.propTypes = {
  title: PropTypes.string,
  uri: PropTypes.string,
  fullName: PropTypes.string,
  company: PropTypes.string,
  designation: PropTypes.string,
  link: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'regular', 'large']),
};

Author.defaultProps = {
  fullName: '',
  company: '',
  designation: '',
  className: '',
  size: 'regular',
};

export default Author;
