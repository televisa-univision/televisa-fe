import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import { TV } from '@univision/fe-commons/dist/constants/pageCategories';
import {
  isValidArray,
  isValidFunction,
  isValidObject,
  getKey,
} from '@univision/fe-commons/dist/utils/helpers';
import { hasAdSkinSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-icons/dist/constants/colors';

import Link from '../../Link';
import Logo from '../../Logo';
import { trackLogoContentClick } from './helpers';

import Styles from './ExposedNav.styles';
import LinksList from './LinksList';

// Styled components
const Wrapper = styled.div`${Styles.wrapper}`;
const Container = styled.div`${Styles.container}`;
const LinkLocalMarket = styled(Link)`${Styles.linkLocalMarket}`;
const LogoArea = styled.div`${Styles.logoArea}`;
const LogoItem = styled(Logo)`${Styles.logo}`;
const LogoText = styled.div`${Styles.logoText}`;
const LogoTextWrapper = styled.div`${Styles.logoTextWrapper}`;
const NavArea = styled.div`${Styles.navArea}`;
const NavList = styled.ul`${Styles.navList}`;
const HomeLink = styled(Link)`${Styles.homeLink}`;
const RightCol = styled.div`${Styles.rightCol}`;
const Subtitle = styled.p`${Styles.subtitle}`;

/**
 * Renders the logo area content
 * @param {string} title nav string title
 * @param {string} logo image URL as logo
 * @param {boolean} isLocalesCustom - true if its a locales custom page
 * @param {string} subtitle subtitle text
 * @param {string} useCustomBranding if the page uses custom branding
 * @returns {JSX}
 */
const getLogoContent = (title, logo, isLocalesCustom, subtitle, useCustomBranding) => {
  let logoComponent = null;
  if (!logo && title) {
    logoComponent = (
      <>
        <LogoText
          noBorder
          isLocalesCustom={isLocalesCustom}
          hasSubtitle={!!subtitle}
        >
          {title}
        </LogoText>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </>
    );
  } else if (!title && logo) {
    logoComponent = <LogoItem src={logo} />;
  } else if (title && logo) {
    logoComponent = (
      <LogoTextWrapper>
        <LogoItem src={logo} />
        <LogoText
          customBranding={useCustomBranding}
          noBorder={useCustomBranding}
        >
          {title}
        </LogoText>
      </LogoTextWrapper>
    );
  }
  return logoComponent;
};

/**
 * ExposedNav component
 * @param {Object} props of the component
 * @returns {JSX}
 */
const ExposedNav = ({
  activeLink,
  componentRight,
  logo,
  logoMarket,
  links,
  pageCategory,
  site,
  title,
  subtitle,
  uri,
  isLocalesCustom,
  contentType,
  useCustomBranding,
  hideNavigation,
}) => {
  const hasAdSkin = useSelector(hasAdSkinSelector);
  const isLocalMarket = pageCategory === TV;
  const localAdSkinStyle = hasAdSkin && isLocalMarket;
  const isValidComponentRight = isValidFunction(componentRight);
  const shouldRenderNavArea = !hideNavigation && (isValidArray(links) || isValidComponentRight);
  const logoContent = getLogoContent(title, logo, isLocalesCustom, subtitle, useCustomBranding);
  const hasLogoMarket = isValidObject(logoMarket);
  const logoClassNames = {
    // With links and with right comp
    'col-6 col-lg-3': shouldRenderNavArea && isValidComponentRight,
    // With links and without right comp
    'col-12 col-lg-3': shouldRenderNavArea && !isValidComponentRight,
    // Without links and with right comp
    'col-6 col-lg-12': !shouldRenderNavArea && isValidComponentRight,
    // Without links and without right comp
    'col-12 col-lg-12': !shouldRenderNavArea && !isValidComponentRight,
    // locales job
    'col-9 col-lg-3': isLocalesCustom,
  };
  const navAreaClassNames = {
    'col-lg-6 col-lg-pull-3': isValidComponentRight && !localAdSkinStyle,
    'col-lg-9': !isValidComponentRight,
  };
  const renderComponentRight = useMemo(() => {
    if (!isValidFunction(componentRight)) return null;

    return (
      <RightCol className={`${isLocalesCustom ? 'col-3' : 'col-6'} col-lg-3 col-lg-push-6`}>
        {componentRight()}
      </RightCol>
    );
  }, [componentRight, isLocalesCustom]);
  const onHomeClick = useCallback(() => {
    trackLogoContentClick(title || pageCategory);
  }, [title, pageCategory]);

  if (hideNavigation && !logoContent) {
    return null;
  }

  return (
    <Wrapper
      data-element-name="ExposedNav"
      theme={null}
    >
      <div className="uvs-container">
        <Container className="row no-gutters" localAdSkinStyle={localAdSkinStyle}>
          {
            (logoContent || hasLogoMarket) && (
              <LogoArea
                className={classnames('uvs-font-a-bold', logoClassNames)}
                isLocalesCustom={isLocalesCustom}
              >
                { hasLogoMarket && (
                <LinkLocalMarket href={getKey(logoMarket, 'uri', uri)}>
                  <Icon
                    name={getKey(logoMarket, 'icon')}
                    removeGradient
                    fill={WHITE}
                    size={60}
                  />
                </LinkLocalMarket>
                )}
                {logoContent && (
                <HomeLink
                  hasLogoMarket={hasLogoMarket}
                  href={uri}
                  onClick={onHomeClick}
                  site={site}
                  target="_self"
                  checkUserLocation
                >
                  { logoContent }
                </HomeLink>
                )}
              </LogoArea>
            )
          }
          {renderComponentRight}
          {
            shouldRenderNavArea && (
              <NavArea
                className={classnames('col-12', navAreaClassNames)}
                localAdSkinStyle={localAdSkinStyle}
              >
                <NavList
                  itemScope
                  itemType="http://www.schema.org/SiteNavigationElement"
                  isLocalesCustom={isLocalesCustom}
                >
                  <LinksList
                    activeLink={activeLink}
                    pageCategory={pageCategory}
                    links={links}
                    contentType={contentType}
                    uri={uri}
                  />
                </NavList>
              </NavArea>
            )
          }
        </Container>
      </div>
    </Wrapper>
  );
};

ExposedNav.propTypes = {
  activeLink: PropTypes.string,
  componentRight: PropTypes.func,
  hideNavigation: PropTypes.bool,
  logo: PropTypes.string,
  logoMarket: PropTypes.object,
  links: PropTypes.array,
  pageCategory: PropTypes.string,
  site: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  uri: PropTypes.string,
  isLocalesCustom: PropTypes.bool,
  contentType: PropTypes.string,
  useCustomBranding: PropTypes.bool,
};

ExposedNav.defaultProps = {
  componentRight: null,
  uri: '/',
};

export default ExposedNav;
