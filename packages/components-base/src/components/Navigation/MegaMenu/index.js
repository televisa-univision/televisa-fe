import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { isDesktop } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  getUniqKey,
  isValidArray,
  isValidObject,
  alphabeticallyByName,
} from '@univision/fe-commons/dist/utils/helpers';
import { WHITE, BLACK } from '@univision/fe-commons/dist/utils/styled/constants';
import features from '@univision/fe-commons/dist/config/features';
import Icon from '@univision/fe-icons/dist/components/Icon';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Store from '@univision/fe-commons/dist/store/store';
import MarketSelector from '@univision/fe-local/dist/components/widgets/MarketSelector/MarketSelectorConnector';
import { TUDN_DEFAULT_HOST, UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import {
  VIX_BANNER_MENU_DESKTOP,
  VIX_BANNER_MENU_MOBILE,
  VIX_BANNER_DOMAIN,
  VIX_BANNER_PATH,
} from '@univision/fe-commons/dist/constants/vixSitesData';
import tudnLogo from '@univision/fe-commons/dist/assets/images/tudn-logo.svg';

import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Button from '../../Button';
import FollowMenu from '../../FollowMenu';
import ImageLinksWithHeader from '../../ImageLinksWithHeader';
import Link from '../../Link';
import LinksWithHeader from '../../LinksWithHeader';
import Search from '../../Search';
import TopicBar from '../../TopicBar';

import aBordoData from '../data/aBordo';
import archiveData from '../data/archive';
import deliciosoData from '../data/delicioso';
import tudnData from '../data/tudn';
import tudnMxData from '../data/tudn/mx';
import estiloDeVidaData from '../data/estiloDeVida';
import gangasAndDealsData from '../data/gangasAndDeals';
import famososData from '../data/famosos';
import entretenimientoData from '../data/entretenimiento';
import localesData from '../data/locales';
import noticiasData from '../data/noticias';
import novelasData from '../data/novelas';
import popularTopicsData from '../data/popularTopics';
import popularTudnTopicsData from '../data/tudn/popularTopics';
import popularTudnMxTopicsData from '../data/tudn/mx/popularTopics';
import premiacionesData from '../data/premiaciones';
import seriesData from '../data/series';
import tvShowsData from '../data/tvShows';
import tudnShowsData from '../data/tudn/tudnShows';
import tudnMxShowsData from '../data/tudn/mx/tudnShows';
import uforiaData from '../data/uforia';
import usaSpoken from '../data/usaSpoken';

import {
  trackNavigationClick,
  enhanceChildrenLinksWithParentInfo,
  enhanceNetworksWithTracking,
  enhanceSectionLinksWithTracking,
  tracksVIXLink,
} from './helpers';
import Styles from './MegaMenu.styles';
import HamburgerMegaMenu from '../NavProvider/BrandedNavProvider/HamburgerMegaMenu';
import Image from '../../Image';

const ColumnPadding = styled.div`
  ${Styles.columnPadding}
`;
const ColumnContainer = styled.div`
  ${Styles.columnContainer}
`;
const Container = styled.div`
  ${Styles.container}
`;
const SearchContainer = styled.div`
  ${Styles.searchContainer}
`;
const DeskstopTopSectionContainer = styled.div`
  ${Styles.desktopTopSectionContainer}
`;
const HamburgerMenuWrapper = styled.div`
  ${Styles.hamburgerMenuWrapper}
`;
const LinkLogoWrapper = styled(Link)`${Styles.linkLogoWrapper}`;
const LinksContainer = styled.div`
  ${Styles.linksContainer}
`;
const LinksHeader = styled(TopicBar)`
  ${Styles.menuLinksHeader}
`;
const Logo = styled.img`${Styles.logo}`;
const MainSectionContainer = styled.div`
  ${Styles.mainSectionContainer}
`;
const MenuLink = styled(Link)`
  ${Styles.menuLink}
`;
const MobileFollowMenu = styled(FollowMenu)`
  ${Styles.mobileFollowMenu}
`;
const OtherNetworksContainer = styled.div`
  ${Styles.otherNetworksContainer}
`;
const TvGuideAndConectaContainer = styled.div`
  ${Styles.tvGuideAndConectaContainer}
`;
const OtherNetworksIconsContainer = styled.div`
  ${Styles.otherNetworksIconsContainer}
`;
const StyledImageLinksWithHeader = styled(ImageLinksWithHeader)`
  ${Styles.secondaryShows}
`;
const GlobalImageLinksWithHeader = styled(ImageLinksWithHeader)`
  ${Styles.globalImageLinksWithHeader}
`;
const PopularTopicsContainer = styled(LinksWithHeader)`
  ${Styles.popularTopicsContainer}
`;
const StyledSearch = styled(Search)`
  ${Styles.search}
`;
const TvGuideButton = styled(Button)`
  ${Styles.tvGuideButton}
`;
const TvGuideLink = styled(Link)`
  ${Styles.tvGuideLink}
`;
const ConectaLink = styled(Link)`
  ${Styles.conectaLink}
`;
const ConectaButton = styled(Button)`
  ${Styles.conectaButton}
`;
const Wrapper = styled.nav`
  ${Styles.wrapper}
`;

/**
 * Tracks when a user clicks on the search bar
 */
function trackSearchClick() {
  trackNavigationClick('search icon');
}

/**
 * Tracks click on the TV Shows header
 */
function trackTvShowsClick() {
  trackNavigationClick('tv shows');
}

/**
 * Tracks click on the Series header
 */
function trackSeriesClick() {
  trackNavigationClick('series');
}

/**
 * Tracks click on the Novelas header
 */
function trackNovelasClick() {
  trackNavigationClick('novelas');
}

/**
 * Tracks click on the Unimas header
 */
function trackUnimasClick() {
  trackNavigationClick('otras cadenas', 'unimas');
}

/**
 * Tracks click on the Galavision header
 */
function trackGalavisionClick() {
  trackNavigationClick('otras cadenas', 'galavision');
}

/**
 * Tracks click on the Unimas header
 */
function trackCanalCincoClick() {
  trackNavigationClick('otras cadenas', 'canalcinco');
}

/**
 * Tracks click on the Galavision header
 */
function trackLasEstrellasClick() {
  trackNavigationClick('otras cadenas', 'lasestrellas');
}

/**
 * Tracks click on the Ver Guia TV button
 */
function trackTvGuideClick() {
  trackNavigationClick('ver guia tv');
}

/**
 * Tracks click on the Conecta button
 */
function trackConectaClick() {
  trackNavigationClick('ver conecta');
}

/**
 * Renders stacked follow menu
 * @param {Array} networks the list of available social networks for the page
 * @returns {JSX}
 */
const renderMobileSocialNetworks = (networks) => {
  if (isDesktop(Store)) return null;

  return <MobileFollowMenu isVertical networks={networks} />;
};

/**
 * Renders follow menu in one row
 * @param {Array} networks the list of available social networks for the page
 * @returns {JSX}
 */
const renderDesktopSocialNetworks = networks => <FollowMenu networks={networks} />;

/**
 * Renders a single link item.
 * @param {Object} linkItem the data for the link item
 * @returns {JSX}
 */
const renderLinkItem = (linkItem) => {
  return (
    <MenuLink
      checkUserLocation
      key={getUniqKey('megaMenuLink')}
      href={linkItem.href}
      isWorldCupMVP={features.deportes.isWorldCupMVP()}
      site={linkItem.site}
      target={linkItem.target}
      className="col-6 col-md-12"
      onClick={() => trackNavigationClick(linkItem.parent, linkItem.name)}
    >
      {linkItem.name}
    </MenuLink>
  );
};

/**
 * Renders all the links for a given section
 * @param {Object} sectionData the link data for a specific section
 * @param {string} css optional css to target links
 * @returns {JSX}
 */
export const renderLinks = (sectionData) => {
  if (!isValidObject(sectionData)) return null;

  const linkItemsWithParentInfo = enhanceChildrenLinksWithParentInfo(
    sectionData
  ).sort(alphabeticallyByName);

  return (
    <LinksContainer>
      <LinksHeader
        cta={!isDesktop(Store) && sectionData.href ? { text: '' } : null}
        isWorldCupMVP={features.deportes.isWorldCupMVP()}
        onClick={() => trackNavigationClick(sectionData.name)}
        noMargin={sectionData.href === '/se-habla-usa'}
        separator="bottom"
        separatorSpace={6}
        settings={{
          title: sectionData.name,
          titleLink: sectionData.href && {
            href: sectionData.href,
            site: sectionData.site,
            target: sectionData.target,
          },
        }}
        size="large"
        theme={sectionData.theme}
      />
      <div className="row">
        {isValidArray(linkItemsWithParentInfo) && linkItemsWithParentInfo.map(renderLinkItem)}
      </div>
    </LinksContainer>
  );
};

/**
 * Renders the mega menu search
 * @param {bool} isTudnSite true if it's TUDN site
 * @returns {JSX}
 */
const renderMarketSelector = (isTudnSite) => {
  if (isTudnSite) {
    return null;
  }
  const LinksData = enhanceChildrenLinksWithParentInfo(
    localesData
  ).sort(alphabeticallyByName);
  return <MarketSelector links={LinksData} />;
};

/**
 * Renders the first section of the mega menu that includes search and social networks on dekstop
 * and only search on mobile.
 * @param {Array} networks the list of available social networks for the page
 * @param {bool} isTudnSite true if it's TUDN site
 * @returns {JSX}
 */
const renderTopSection = (networks, isTudnSite) => {
  if (isDesktop(Store)) {
    return (
      <DeskstopTopSectionContainer isWorldCupMVP={features.deportes.isWorldCupMVP()}>
        {renderMarketSelector(isTudnSite)}
        {renderDesktopSocialNetworks(networks)}
      </DeskstopTopSectionContainer>
    );
  }
  return renderMarketSelector(isTudnSite);
};

/**
 * Renders links for unimas and galavision
 * @returns {JSX}
 */
const renderOtherNetworks = () => (
  <OtherNetworksContainer isWorldCupMVP={features.deportes.isWorldCupMVP()}>
    <span>{LocalizationManager.get('otherNetworks')}</span>
    <OtherNetworksIconsContainer className="col-6">
      <Link href="/unimas" itemProp="url" onClick={trackUnimasClick} site={UNIVISION_SITE}>
        <Icon name="unimas" size={[60, 20]} />
      </Link>
      <Link href="/galavision" itemProp="url" onClick={trackGalavisionClick} site={UNIVISION_SITE}>
        <Icon name="galavision" size={[80, 20]} />
      </Link>
    </OtherNetworksIconsContainer>
  </OtherNetworksContainer>
);

/**
 * Renders links for unimas and galavision
 * @returns {JSX}
 */
const renderOtherMxNetworks = () => (
  <OtherNetworksContainer isWorldCupMVP={features.deportes.isWorldCupMVP()}>
    <span>{LocalizationManager.get('otherNetworks')}</span>
    <OtherNetworksIconsContainer className="col-6">
      <Link href="https://www.lasestrellas.tv" itemProp="url" onClick={trackLasEstrellasClick}>
        <Icon name="lasEstrellas" size={[60, 30]} />
      </Link>
      <Link href="https://www.televisa.com/canal5/" itemProp="url" onClick={trackCanalCincoClick}>
        <Icon name="canalCinco" size={[80, 30]} />
      </Link>
    </OtherNetworksIconsContainer>
  </OtherNetworksContainer>
);

// TODO: Move some of the next function to functional component to split the code

/**
 * Renders the TV guide button
 * @param {bool} isTudnSite true if it's a TUDN site should not render conecta
 * @returns {JSX}
 */
const renderTvGuideAndConectaButton = (isTudnSite) => {
  const colorIconMVP = features.deportes.isWorldCupMVP() ? BLACK : WHITE;
  return (
    <TvGuideAndConectaContainer>
      <TvGuideLink
        href="/shows/univision-guia-programacion-de-television-shows-novelas-y-series"
        itemProp="url"
        onClick={trackTvGuideClick}
        className="col-6"
        site={UNIVISION_SITE}
      >
        <TvGuideButton
          className={classNames({
            'uvs-font-c-bold': !features.deportes.isWorldCupMVP(),
            'uvs-font-a-bold': features.deportes.isWorldCupMVP(),
          })}
          isWorldCupMVP={features.deportes.isWorldCupMVP()}
        >
          <Icon name="screen" size={[16, 16]} fill={colorIconMVP} style={{ margin: 8 }} />
          <span>{LocalizationManager.get('seeTvGuide')}</span>
        </TvGuideButton>
      </TvGuideLink>
      {!isTudnSite && (
        <ConectaLink
          href="/conecta"
          itemProp="url"
          onClick={trackConectaClick}
          className="col-6"
        >
          <ConectaButton className="uvs-font-c-bold">
            <span>{LocalizationManager.get('seeConecta')}</span>
          </ConectaButton>
        </ConectaLink>
      )}
    </TvGuideAndConectaContainer>
  );
};

const tvShowsContent = {
  ...tvShowsData,
  children: enhanceSectionLinksWithTracking(tvShowsData),
};

const tudnShowsContent = {
  ...tudnShowsData,
  children: enhanceSectionLinksWithTracking(tudnShowsData),
};

const seriesContent = {
  ...seriesData,
  children: enhanceSectionLinksWithTracking(seriesData),
};

const novelasContent = {
  ...novelasData,
  children: enhanceSectionLinksWithTracking(novelasData),
};

/**
 * Renders the first column of the mega menu
 * @param {bool} isTudnSite true if it's a TUDN site should render TUDN links
 * @param {string} isMxSite if user is on mx site
 * @param {boolean} isMobile device size
 * @returns {JSX}
 */
const renderFirstColumn = (isTudnSite, isMxSite, isMobile) => {
  let popularTopics = popularTopicsData;
  let showsContent = tvShowsContent;

  if (isTudnSite) {
    popularTopics = popularTudnTopicsData;
    showsContent = tudnShowsContent;

    if (isMxSite) {
      popularTopics = popularTudnMxTopicsData;
      showsContent = tudnMxShowsData;
    }
  }
  return (
    <ColumnContainer className="col-12 col-md-4">
      <PopularTopicsContainer
        isWorldCupMVP={features.deportes.isWorldCupMVP()}
        links={enhanceSectionLinksWithTracking(popularTopics)}
        title={popularTopics.name}
        sortType={isTudnSite ? 'byId' : 'alphabetically'}
        isPopularTopics
      />
      <SearchContainer onClick={trackSearchClick} role="button" tabIndex={0}>
        <StyledSearch
          isWorldCupMVP={features.deportes.isWorldCupMVP()}
          onClick={trackSearchClick}
          open
          searchOnRight
          showCloseButton={false}
        />
      </SearchContainer>
      {!isTudnSite && (
        <ColumnPadding>
          <Link
            target="_blank"
            id="vix-banner-megamenu-link"
            onClick={() => tracksVIXLink(false, false)}
            href={`${VIX_BANNER_DOMAIN}${VIX_BANNER_PATH}`}
          >
            <Image
              width="100%"
              height="100%"
              loading="lazy"
              alt="VIX Banner"
              src={isMobile ? VIX_BANNER_MENU_MOBILE : VIX_BANNER_MENU_DESKTOP}
            />
          </Link>
        </ColumnPadding>
      )}
      <GlobalImageLinksWithHeader
        isWorldCupMVP={features.deportes.isWorldCupMVP()}
        content={showsContent}
        onHeaderClick={trackTvShowsClick}
        withSeparator
      />
      {!isTudnSite && (
        <>
          <StyledImageLinksWithHeader content={seriesContent} onHeaderClick={trackSeriesClick} />
          <StyledImageLinksWithHeader content={novelasContent} onHeaderClick={trackNovelasClick} />
        </>
      )}
      {isMxSite ? renderOtherMxNetworks() : renderOtherNetworks()}
      {renderTvGuideAndConectaButton(isTudnSite)}
    </ColumnContainer>
  );
};

/**
 * Renders the second column of the mega menu
 * @returns {JSX}
 */
const renderSecondColumn = () => (
  <ColumnContainer className="col-12 col-md-2">
    {renderLinks(noticiasData)}
  </ColumnContainer>
);

/**
 * Renders the third column of the mega menu which encompasses deportes and uforia
 * @param {string} isMxSite if user is on mx site
 * @returns {JSX}
 */
const renderThirdColumn = isMxSite => (
  <ColumnContainer className="col-12 col-md-2">
    {renderLinks(famososData)}
    {renderLinks(entretenimientoData)}
    {renderLinks(premiacionesData)}
    {renderLinks(isMxSite ? tudnMxData : tudnData)}
    {renderLinks(uforiaData)}
    {renderLinks(usaSpoken)}
  </ColumnContainer>
);

/**
 * Renders the fourth column of the mega menu which encompasses locales, estilo de vida, and a bordo
 * @returns {JSX}
 */
const renderFourthColumn = () => (
  <ColumnContainer className="col-12 col-md-2">
    {renderLinks(localesData)}
    {renderLinks(estiloDeVidaData)}
    {renderLinks(gangasAndDealsData)}
    {renderLinks(aBordoData)}
  </ColumnContainer>
);

/**
 * Renders the fifth column of the mega menu which encompasses horoscopos and delicioso
 * @returns {JSX}
 */
const renderFifthColumn = () => (
  <ColumnContainer className="col-12 col-md-2">
    {renderLinks(deliciosoData)}
    {renderLinks(archiveData)}
  </ColumnContainer>
);

const logoComponent = (
  <LinkLogoWrapper checkUserLocation href={`https://${TUDN_DEFAULT_HOST}`}>
    <Logo src={tudnLogo} height={23} width={108} />
  </LinkLogoWrapper>
);

/**
 * Menu that opens up when the hamburger menu on the branded header is clicked. Covers all of the
 * screen and has all main entry points for the web app.
 * @param {Object} props of the component
 * @param {bool} props.open - true if the mega menu should be open
 * @param {Object} [props.networks] - social networks data
 * @param {bool} [props.isTudnSite=false] - true if should render exclusive TUDN links/content
 * @param {bool} [props.isMxSite=false] - true if should render Mexico TUDN links/content
 * @returns {JSX}
 */
const MegaMenu = ({
  open,
  networks,
  isMxSite,
  isTudnSite,
  hamburgerProps,
}) => {
  const isMobile = useSelector(deviceSelector) === 'mobile';
  if (!features.header.isMegaMenuEnabled() || !open) return null;

  const networksWithTracking = enhanceNetworksWithTracking(networks);

  return (
    <Wrapper
      data-element-name="MegaMenu"
      itemScope
      itemType="http://www.schema.org/SiteNavigationElement"
      isWorldCupMVP={features.deportes.isWorldCupMVP()}
    >
      <Container className="container">
        {features.deportes.isWorldCupMVP() && (
          <HamburgerMenuWrapper>
            <HamburgerMegaMenu {...hamburgerProps} />
            {logoComponent}
          </HamburgerMenuWrapper>
        )}
        {renderTopSection(networksWithTracking, isTudnSite)}
        <MainSectionContainer className="container">
          <div className="row">
            {renderFirstColumn(isTudnSite, isMxSite, isMobile)}
            {renderSecondColumn()}
            {renderThirdColumn(isMxSite)}
            {renderFourthColumn()}
            {renderFifthColumn()}
          </div>
        </MainSectionContainer>
        {renderMobileSocialNetworks(networksWithTracking)}
      </Container>
    </Wrapper>
  );
};

MegaMenu.propTypes = {
  hamburgerProps: PropTypes.object,
  open: PropTypes.bool,
  networks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      target: PropTypes.string,
      text: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  isMxSite: PropTypes.bool,
  isTudnSite: PropTypes.bool,
};

MegaMenu.defaultProps = {
  open: false,
  isMxSite: false,
  isTudnSite: false,
  networks: [],
};

export default MegaMenu;
