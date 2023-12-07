import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { useSelector } from 'react-redux';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import { pageUriSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';

import features from '@univision/fe-commons/dist/config/features';
import univisionLogo from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import univisionLogoWhite from '@univision/fe-commons/dist/assets/images/univision-logo-black-bg.svg';
import tudnLogo from '@univision/fe-commons/dist/assets/images/tudn-logo.svg';
import { TUDN_SITE, UNIVISION_SITE, TELEVISA_SITE } from '@univision/fe-commons/dist/constants/sites';

import { trackMainLogoClick } from './helpers';
import Link from '../../Link';
import Styles from './BrandedHeader.styles';

// Styled components
const Wrapper = styled.div`${Styles.wrapper}`;
const Container = styled.div`${Styles.container}`;
const CenterCol = styled.div`${Styles.centerCol}`;
const LeftCol = styled.div`${Styles.leftCol}`;
const RightCol = styled.div`${Styles.rightCol}`;
const Logo = styled.img`${Styles.logo}`;

// Other logo settings
const otherLogos = {
  tudn: {
    src: tudnLogo,
    height: 23,
    width: 108,
  },
};

/**
 * Branded Header component
 * @param {Object} props pf the component
 * @returns {JSX}
 */
const BrandedHeader = ({
  componentCenter,
  componentLeft,
  componentRight,
  logoName,
  logoUrl,
  theme,
  isTelevisaSite,
  pageData,
  logo: logoItem,
  site,
}) => {
  const isLiveBlogFeatureFlag = features.liveblog.liveBlogPerformance();
  const { isBrandedHeaderBlack, disablePrendeTvButton } = theme;
  const pageUri = useSelector(pageUriSelector);
  const relativeUri = toRelativeUrl(pageUri);
  const mainName = isTelevisaSite && TELEVISA_SITE || UNIVISION_SITE;

  const defaultLogo = {
    src: isBrandedHeaderBlack ? univisionLogoWhite : univisionLogo,
    height: 28,
    width: 142,
    alt: `${mainName} logo`,
  };

  const logo = getKey(otherLogos, logoName, isTelevisaSite && logoItem || defaultLogo);
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const forceCenterRender = (relativeUri === '/' || relativeUri === '/mx') && (isWorldCupMVP || (isTelevisaSite && site !== TELEVISA_SITE));

  const logoComponent = (
    <Link
      checkUserLocation
      href={logoUrl}
      {...isWorldCupMVP && { site: TUDN_SITE }}
      onClick={() => trackMainLogoClick(logoName || mainName)}
    >
      <Logo
        disablePrendeTvButton={disablePrendeTvButton}
        {...logo}
        // As a part of improving SEO this had to be done.
        // For now it is just a part of the isLiveBlogFeatureFlag feature flag.
        {...isLiveBlogFeatureFlag && {
          alt: `${logoName} logo`,
          'aria-label': `${logoName} logo`,
        }}
      />
    </Link>
  );

  const isVariant = isWorldCupMVP || (isTelevisaSite && site !== TELEVISA_SITE);

  return (
    <Wrapper
      data-element-name="BrandedHeader"
      isWorldCupMVP={isWorldCupMVP}
      isTelevisaSite={isTelevisaSite && site !== TELEVISA_SITE}
    >
      <div className={classnames({
        'uvs-container': isVariant,
      }, 'container')}
      >
        <Container
          className="row"
          isWorldCupMVP={isWorldCupMVP}
          isTelevisaSite={isTelevisaSite && site !== TELEVISA_SITE}
          forceCenterRender={forceCenterRender}
        >
          <LeftCol
            className={classnames({
              'col-3': !isVariant && disablePrendeTvButton,
              'col-1 col-sm-3': !isVariant && !disablePrendeTvButton,
              'col-2': isVariant && disablePrendeTvButton,
              'col-1 col-sm-2': isVariant && !disablePrendeTvButton,
            })}
            isWorldCupMVP={isVariant}
            isTelevisaSite={isTelevisaSite && site !== TELEVISA_SITE}
          >
            {isValidFunction(componentLeft) && componentLeft()}
            {isVariant && logoComponent}
          </LeftCol>
          <CenterCol
            className={classnames({
              'col-6': !isVariant && disablePrendeTvButton,
              'col-5 col-sm-6': !isVariant && !disablePrendeTvButton,
              'col-8': isVariant && disablePrendeTvButton,
              'col-5 col-sm-8': isVariant && !disablePrendeTvButton,
            })}
            disablePrendeTvButton={disablePrendeTvButton}
            isWorldCupMVP={isVariant}
            forceCenterRender={forceCenterRender}
            isTelevisaSite={isTelevisaSite && site !== TELEVISA_SITE}
            isTelevisaParentSite={isTelevisaSite}
          >
            {(isTelevisaSite && site !== TELEVISA_SITE) && pageData?.type === contentTypes.ARTICLE
              ? null
              : (
                <>
                  {isValidFunction(componentCenter) && componentCenter()}
                  {!isVariant && logoComponent}
                </>
              )}
          </CenterCol>
          <RightCol
            className={classnames({
              'col-3': !isVariant && disablePrendeTvButton,
              'col-6 col-sm-3': !isVariant && !disablePrendeTvButton,
              'col-2': isVariant && disablePrendeTvButton,
              'col-6 col-sm-2': isVariant && !disablePrendeTvButton,
            })}
            isWorldCupMVP={isVariant}
            isTelevisaSite={isTelevisaSite && site !== TELEVISA_SITE}
          >
            {componentRight && isValidFunction(componentRight) && componentRight()}
          </RightCol>
        </Container>
      </div>
    </Wrapper>
  );
};

/**
 * Prop types
 * {@property} {function} componentLeft func that should return a component to be on the left
 * {@property} {function} componentRight func that should return a component to be on the right
 * {@property} {string} logoUrl url that should open when click on the logo
 * {@property} {string} logoName fe-icons name that should use as logo image {@link packages/icons}
 */
BrandedHeader.propTypes = {
  componentCenter: PropTypes.func,
  componentLeft: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  componentRight: PropTypes.func,
  logoUrl: PropTypes.string,
  logoName: PropTypes.string,
  theme: PropTypes.object,
  isTelevisaSite: PropTypes.bool,
  logo: PropTypes.object,
  pageData: PropTypes.object,
  site: PropTypes.string,
};

BrandedHeader.defaultProps = {
  theme: {},
};

export default BrandedHeader;
