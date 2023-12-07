import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { deviceSelector, userLocationSelector, siteSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { getUniqKey } from '@univision/fe-commons/dist/utils/helpers';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';
import {
  TELEVISA_SITE,
  UNIVISION_SITE,
} from '@univision/fe-commons/dist/constants/sites';

import Link from '../../Link';
import trackClickEvent, { getSiteLinks } from '../helpers';
import { tuCiudadLink } from './data/links';
import { televisaLink } from './data/televisaLinks';
import Styles from './GlobalNav.styles';
import TuCiudad from './TuCiudad';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import TelevisaLink from './TelevisaLink';

const Wrapper = styled.div`${Styles.wrapper}`;
const List = styled.ul`${Styles.list}`;
export const ItemList = styled.li`${Styles.itemList}`;
const GlobalNavLink = styled(({
  isTudnMX, bottomBorderColor, isTelevisaSite, ...rest
}) => <Link {...rest} />)`${Styles.link}`;

/**
 * Track event
 * @param {Object} event - native JS event
 */
function trackClick(event) {
  trackClickEvent('topnav', event.target);
}

/**
 * Get site main link data
 * @param {boolean} isTelevisaSite - site id
 * @param {Object} extraProps - props
 * @param {Object} theme - theme
 * @returns {JSX}
 */
const getMainSiteLinkData = (isTelevisaSite, extraProps, theme) => {
  const site = isTelevisaSite ? TELEVISA_SITE : UNIVISION_SITE;

  const mapping = {
    [TELEVISA_SITE]: {
      link: TelevisaLink,
      props: televisaLink,
    },
    [UNIVISION_SITE]: {
      link: TuCiudad,
      props: tuCiudadLink,
    },
  };

  const { link, props } = mapping[site];

  return {
    link,
    props: {
      ...props,
      label: props?.name,
      href: props?.uri,
      ...extraProps,
    },
  };
};

/**
 * Global Nav styled component
 * @param {Object} props of the component
 * @param {string} props.activePath current URL page
 * @param {boolean} props.isTudnSite true if is a TUDN site
 * @param {currentMarket} props.currentMarket based on user location if any
 * @param {parentSite} props.parentSite site id
 * @returns {JSX}
 */
const GlobalNav = ({
  activePath,
  currentMarket,
  isTelevisaSite,
  isTudnSite,
  theme,
}) => {
  const userLocation = useSelector(userLocationSelector);

  const isMXLocation = userLocation === MX;
  const isMobile = useSelector(deviceSelector) === 'mobile';
  const pageSite = useSelector(siteSelector);

  const filteredUrls = getSiteLinks({
    isTelevisaSite,
    isTudnSite,
    userLocation,
  });

  const {
    link: MainLink,
    props: mainLinkProps,
  } = !isMXLocation && getMainSiteLinkData(isTelevisaSite, {
    activePath,
    market: currentMarket,
  }) || {};
  const isDark = theme?.mainIconIsDark || false;
  return (
    <Wrapper data-element-name="GlobalNav" isMobile={isMobile} isTudnSite={isTudnSite}>
      {mainLinkProps && pageSite !== TELEVISA_SITE && (
        <MainLink
          {...{ ...(isTudnSite && ({ isTudnSite })) }}
          {...mainLinkProps}
          isDark={isDark}
        />
      )}
      <List itemScope itemType="https://schema.org/SiteNavigationElement" role="menu">
        {filteredUrls.map(({
          uri, site, target, name, bottomBorderColor, icon,
        }) => (
          <ItemList
            itemProp="name"
            role="menuitem"
            isMobile={isMobile}
            key={getUniqKey('globalNav')}
          >
            <GlobalNavLink
              itemProp="url"
              href={uri}
              site={site}
              target={target}
              title={name}
              activeLink={activePath}
              className="uvs-font-c-bold"
              data-name={name}
              onClick={trackClick}
              bottomBorderColor={bottomBorderColor}
              isTudnMX={isTudnSite && isMXLocation}
              isTelevisaSite={isTelevisaSite}
            >
              {icon ? <Icon name={icon} size="xsmall" /> : name}
            </GlobalNavLink>
          </ItemList>
        ))
        }
      </List>
    </Wrapper>
  );
};

GlobalNav.propTypes = {
  activePath: PropTypes.string,
  currentMarket: PropTypes.object,
  isTudnSite: PropTypes.bool,
  isTelevisaSite: PropTypes.bool,
  theme: PropTypes.object,
};

export default GlobalNav;
