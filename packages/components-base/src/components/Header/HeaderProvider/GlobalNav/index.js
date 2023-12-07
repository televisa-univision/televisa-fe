import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getDomain, getSites } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import {
  getKey,
  isAbsoluteUrl,
  safeClassName,
  toAbsoluteUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import sections from '../../data/global/globalNav';

import GlobalHeaderLink from '../GlobalHeaderLink';
import SectionsButton from '../SectionsButton';

import Styles from './GlobalNav.scss';

/**
 * GlobalNav
 * @param {Object} props component props
 * @returns {JSX}
 */
const GlobalNav = ({
  activePath,
  toggleSectionMenu,
  variant,
  isDesktop,
  menuType,
}) => {
  const sites = getSites(Store);
  const domain = getDomain(Store);

  /**
   * Tracks click navigation events on the global nav
   * @param {string} menuOptionName name of the menu option clicked on the globa lnav
   */
  const trackClick = (menuOptionName) => {
    const eventAction = `topnav-${menuOptionName}`;
    const utagData = {
      eventAction,
    };

    NavigationTracker.track(NavigationTracker.events.click, utagData);
  };

  /**
   * Global Nav link handler
   * @param {event} e object
   */
  const handlerLink = (e) => {
    const menuOptionName = getKey(e, 'target.innerText', '').toLowerCase();
    trackClick(menuOptionName);
  };

  return (
    <div className={classnames(Styles.globalNav, Styles[variant])} data-element-name="GlobalNav">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={Styles.innerContainer}>
              <ul className={Styles.linkList}>
                {sections().map((section) => {
                  if (!section.display) return '';
                  const site = sites[section.site];
                  const hrefAbsolute = toAbsoluteUrl(section.href, site);
                  const activeDomain = isAbsoluteUrl(site) && domain;
                  const activeAbsolute = toAbsoluteUrl(activePath, activeDomain);
                  return (
                    <li key={section.name}>
                      <GlobalHeaderLink
                        active={activeAbsolute === hrefAbsolute}
                        className={classnames(Styles.link, Styles[safeClassName(section.name)])}
                        text={section.name}
                        href={hrefAbsolute}
                        site={section.site}
                        theme={section.theme}
                        target={section.target}
                        onClick={handlerLink}
                      />
                    </li>
                  );
                })}
                {isDesktop
                  && (
                    <li>
                      <SectionsButton
                        icon={null}
                        label={localization.get('more')}
                        onClick={e => toggleSectionMenu(e, menuType)}
                        className={Styles.more}
                      />
                    </li>
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNav;

GlobalNav.propTypes = {
  toggleSectionMenu: PropTypes.func.isRequired,
  activePath: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
  isDesktop: PropTypes.bool,
  menuType: PropTypes.string,
};
