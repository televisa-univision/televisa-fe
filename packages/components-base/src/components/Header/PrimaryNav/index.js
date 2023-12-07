import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Store from '@univision/fe-commons/dist/store/store';
import { hasKey, toRelativeUrl } from '@univision/fe-commons/dist/utils/helpers';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../../Link';
import Button from '../../Button';
import MenuLink from '../MenuLink';
import MenuIcon from '../MenuIcon';

import Styles from './PrimaryNav.scss';

/**
 * find the matching link to mark as active
 * @param   {Array} links the primary nav links
 * @returns {Array}       the links with the active key included
 */
export const findActiveItem = (links) => {
  if (!Array.isArray(links)) return { links: [] };

  const pageData = getPageData(Store);
  if (!hasKey(pageData, 'data.uri')) return { links };

  const { uri } = pageData.data;
  const relativeUrl = toRelativeUrl(uri);
  let activeItemFound = false;

  // clear active property history
  links.forEach((_item) => {
    const item = _item;
    item.active = false;
  });

  // first try to find an *exact* match
  links.forEach((_link) => {
    if (activeItemFound) return;
    // If the link has an intended pageCategory
    // we should ignore it if it doesn't match the current pageCategory
    // (custom logic for leagues, soccer teams, etc) =(
    if (!_link.pageCategory || !pageData.pageCategory
      || _link.pageCategory === pageData.pageCategory) {
      const link = _link;
      // compare aliases
      if (Array.isArray(link.aliases)) {
        link.active = link.aliases.indexOf(relativeUrl) > -1;
      }
      // if no aliases, then compare actual link
      if (!link.active) {
        link.active = link.link === relativeUrl;
      }
      activeItemFound = link.active;
    }
  });

  // the page category should override the active link
  for (let i = 0; i < links.length; i += 1) {
    const item = links[i];
    if (pageData.pageCategory && pageData.pageCategory === item.pageCategory) {
      // clear active property history
      links.forEach((_item) => {
        const linkItem = _item;
        linkItem.active = false;
      });

      item.active = true;
      activeItemFound = item.active;
      break;
    }
  }

  // if no exact match, try to find a match at the beginning of the path
  links.forEach((_item) => {
    if (activeItemFound) return;
    const item = _item;
    if (relativeUrl.indexOf(item.link) === 0) {
      item.active = true;
      activeItemFound = item.active;
    }
  });

  const [active] = links.filter(l => !!l.active);

  return {
    links,
    active,
  };
};

/**
 * Header primary navigation
 * @returns {JSX}
 */
const PrimaryNav = ({
  links, showMore, onMore, onClose, open, variant,
}) => {
  return (
    <div className={classnames(Styles.nav, Styles[variant])}>
      {onClose && (
        <div className={Styles.overlayHeader}>
          <Link href="https://www.univision.com">
            <Icon name="univision" size="small" />
          </Link>
          <Button className={Styles.closer} onClick={onClose}>
            <Icon name="close" size="small" />
          </Button>
        </div>
      )}
      <ul className={classnames(Styles.primary, Styles.linkList)}>
        {links.map(item => (
          <MenuLink
            key={item.name}
            item={item}
            className={Styles.hoverState}
            active={item.active}
          />
        ))}
        {showMore && (
          <li className={Styles.moreWrapper}>
            <Button className={Styles.more} onClick={onMore}>
              {localization.get('moreSections')}
              <MenuIcon open={open} />
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};

/**
 * @property {Array} links The array of links to be rendered
 * @property {boolean} showMore whether or not the "more" button is rendered
 * @property {string} logo the url to the source image to display
 * @property {function} onMore function to be called when open/close secondary nav
 * @property {function} onClose function to be called when collapsing mobile primary nav
 * @property {String} stationLink the section url
 */
PrimaryNav.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  showMore: PropTypes.bool,
  onMore: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  variant: PropTypes.string,
};

PrimaryNav.defaultProps = {
  links: [],
  showMore: false,
  open: false,
};

export default PrimaryNav;
