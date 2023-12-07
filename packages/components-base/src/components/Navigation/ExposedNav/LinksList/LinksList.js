import React, { useEffect } from 'react';

import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import {
  isValidArray,
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-icons/dist/constants/colors';
import LocalDropDown from '@univision/fe-local/dist/components/compound/LocalDropDown';
import SelectMarket from '@univision/fe-local/dist/components/compound/SelectMarket';

import styled from 'styled-components';
import Link from '../../../Link';
import LiveIcon from '../../../LiveIcon';
import { trackLogoContentClick } from '../helpers';
import Styles from './LinksList.styles';

const LiveIconStyled = styled(LiveIcon)`${Styles.liveIcon}`;
const NavItem = styled.li`${Styles.navItem}`;
const NavLink = styled(({ underline, ...rest }) => <Link {...rest} />)`${Styles.navLink}`;
const MarketLink = styled.div`${Styles.marketLink}`;
const NUESTRA_BELLEZA = '/shows/nuestra-belleza-latina';

/**
 * Handler link click
 * @param {Object} event - native JS event
 */
const onClickLink = (event) => {
  trackLogoContentClick('subnav', event.target);
};

/**
 * Get links lister
 * @param {Object} opts options from props to get the links links
 * @param {Object[]} opts.links list of links
 * @param {Object} opts.activeLink current page URL
 * @returns {JSX}
 */
const LinksList = ({
  links,
  activeLink,
  pageCategory,
  contentType,
  uri,
  fetchLocalMarket,
  localMarket,
}) => {
  useEffect(() => {
    if (uri === NUESTRA_BELLEZA && !localMarket) {
      fetchLocalMarket();
    }
  }, [uri, fetchLocalMarket, localMarket]);

  return isValidArray(links) && links.map((item) => {
    const {
      category,
      dropDownOptions,
      icon,
      link,
      site,
      target,
      name,
      selectorMarket,
    } = item;

    let url = link;
    const newActiveLink = activeLink === '/horoscopos' && `${uri}/horoscopos`;
    const underline = (category && category === pageCategory)
      || url === activeLink || url === newActiveLink
      || (
        activeLink
        && contentType !== contentTypes.SECTION
        && new RegExp(`${url}$`).test(activeLink.substring(0, activeLink.lastIndexOf('/')))
      );

    if (name === 'Vota' && localMarket) {
      const westTimeZones = ['PDT', 'PST', 'MST', 'MDT'];
      const localTimeZone = marketCoordinates[localMarket]?.timeZoneAbbreviation;
      const isWest = westTimeZones.includes(localTimeZone);
      url = `${NUESTRA_BELLEZA}/vota${isWest ? '-west' : ''}`;
    }

    /**
     * navLinks options
     * @returns {JSX}
     */
    const navLinks = () => {
      // selector market options
      if (selectorMarket) {
        return (
          <SelectMarket relativePath={url} fillArrowColor={WHITE}>
            <MarketLink
              className="uvs-font-c-bold"
              site={site}
              href="#selectMarket"
              title={name}
              itemProp="url"
              onClick={onClickLink}
              data-name="local-list"
              underline={underline}
            >
              {name}
            </MarketLink>
          </SelectMarket>
        );
      }

      // local más drop down
      if (isValidArray(dropDownOptions)) {
        return <LocalDropDown name={name} options={dropDownOptions} />;
      }

      // default nav link
      return (
        <NavLink
          className="uvs-font-c-bold"
          checkUserLocation
          data-element-name="ExposedNavLink"
          href={url}
          site={site}
          target={target}
          title={name}
          itemProp="url"
          onClick={onClickLink}
          data-name={name}
          underline={underline}
        >
          {name}
        </NavLink>
      );
    };

    return (
      <NavItem
        itemProp="name"
        key={`exposedNav${name}`}
      >
        {isValidObject(icon) && (
          <ErrorBoundary>
            {icon.name === 'live' ? (
              <LiveIconStyled {...icon.props} />
            ) : (
              <Icon name={icon.name} {...icon.props} />
            )}
          </ErrorBoundary>
        )}
        {navLinks()}
      </NavItem>
    );
  });
};

export default LinksList;
