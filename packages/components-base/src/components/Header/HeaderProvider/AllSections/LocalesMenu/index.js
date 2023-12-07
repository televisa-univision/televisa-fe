import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { isValidArray, toAbsoluteUrl } from '@univision/fe-commons/dist/utils/helpers';
import Link from '../../../../Link';
import { trackHamburgerClick } from '../helpers';
import Image from '../../../../Image';

import Styles from './LocalesMenu.scss';

/**
 * LocalesMenu
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const LocalesMenu = (props) => {
  const { items, site, localMarket } = props;

  /**
   * Render subnav items
   * @param {array} subMenuItems Elements from the internal submenu
   * @returns {JSX}
   */
  const renderSubMenu = (subMenuItems) => {
    if (isValidArray(subMenuItems)) {
      return subMenuItems.map((submenu) => {
        return (
          <Fragment>
            <li key={`submenuItem${submenu.name}`} className={`${Styles.localMarketSubtitle} uvs-font-a-bold`}>
              {submenu.name}
            </li>
            {isValidArray(submenu.items) && submenu.items.map((submenuItem) => {
              const {
                href,
                target,
                name,
                image,
              } = submenuItem;
              return (
                <li key={`submenuItem${href}`} className={Styles.localMarketDefault}>
                  <Link
                    href={toAbsoluteUrl(href, site)}
                    target={target}
                    className="uvs-font-a-bold"
                    onClick={() => trackHamburgerClick([name])}
                  >
                    {image ? <Image alt={name} src={image} /> : name}
                  </Link>
                </li>
              );
            })}
          </Fragment>
        );
      });
    }
    return null;
  };

  /**
   * Render menu items
   * @param {array} localMarketItems Elements used on the main internal menu
   * @returns {JSX}
   */
  const renderMenu = (localMarketItems) => {
    if (isValidArray(localMarketItems)) {
      return (
        <Fragment>
          {localMarketItems.map((market) => {
            const {
              href,
              target,
              name,
            } = market;
            const isUnivisionNow = name === 'tv en vivo';
            return (
              <li key={`localMarket${href}`} className={Styles.localMarket}>
                <Link
                  href={toAbsoluteUrl(href, site)}
                  className={classnames('uvs-font-a-bold', { [Styles['tv-en-vivo']]: isUnivisionNow })}
                  target={target}
                  onClick={() => trackHamburgerClick([name])}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </Fragment>
      );
    }
    return null;
  };

  return (
    <Fragment>
      {renderMenu(localMarket)}
      {renderSubMenu(items)}
    </Fragment>
  );
};

/**
 * @param {array} items Elements from the internal submenu
 * @param {string} site Domain for locales sections
 * @param {array} localMarket Elements used on the main internal menu
 */
LocalesMenu.propTypes = {
  items: PropTypes.array,
  site: PropTypes.string,
  localMarket: PropTypes.array,
};

LocalesMenu.defaultProps = {
  items: [],
  localMarket: [],
};

export default LocalesMenu;
