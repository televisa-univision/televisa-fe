import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../../Link';
import MenuLink from '../MenuLink';

import Styles from './SectionLinks.scss';

/**
 * Univision section links in header navigation
 * @param {Object} links the array of links to be rendered
 * @returns {JSX}
 */
export default function SectionLinks ({ links, variant }) {
  return (
    <div className={`${Styles.sections} ${Styles[variant]}`}>
      <Link href="https://www.univision.com" alt="Univision.com">
        <Icon name="univision" />
      </Link>
      <ul className={Styles.sectionLinks}>
        {links && Array.isArray(links) && links.map(item => (
          <MenuLink key={item.name} item={item} />))}
      </ul>
    </div>
  );
}

/**
 * @property {Array} links an array of section links to render
 */
SectionLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })),
  variant: PropTypes.string,
};

SectionLinks.defaultProps = {
  links: [],
};
