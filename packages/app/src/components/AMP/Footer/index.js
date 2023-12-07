import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { themeSelector, isTudnSiteSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import FooterData from '@univision/fe-components-base/dist/components/Footer/footerData.json';
import {
  VIX_BANNER_DOMAIN,
  VIX_BANNER_FOOTER_PATH,
  VIX_BANNER_FOOTER_MOBILE,
} from '@univision/fe-commons/dist/constants/televisaSitesData';
import { TELEVISA_SITES } from '@univision/fe-commons/dist/constants/sites';

import AmpIcon from '../Icon';
import {
  getLogoLink,
  getSocialLinks,
  getLogoHref,
} from './FooterHelpers';

import {
  AboutContainer, AppsContainer, CopyrightContainer, Footer, FooterImageLink, FooterTitle,
  NewsLetterLink, SocialNetworkContainer, SocialNetworkLink, TopContainer, TopContainerWrapper,
  VixPromotionalBanner,
} from './Footer.styles';

/**
 * Footer for pages.
 * @param {Object} props Component props
 * @returns {JSX}
 */
const AmpFooter = ({ pageData }) => {
  const theme = useSelector(themeSelector);
  const isTudn = useSelector(isTudnSiteSelector);
  const isTelevisaSite = TELEVISA_SITES.includes(pageData.site);
  const image = getLogoLink(isTudn, isTelevisaSite, pageData.site, theme);
  const socialNetworks = getSocialLinks(isTudn, isTelevisaSite);
  const apps = (isTelevisaSite) ? FooterData.televisa.apps : FooterData.apps;
  const general = (isTelevisaSite) ? FooterData.televisa.general : FooterData.general;
  const logoHref = getLogoHref(isTudn, isTelevisaSite, pageData.site);
  const themeVariant = {
    variant: 'dark',
  };
  let iconFill = theme.variant === 'light' ? '#000' : '#fff';
  // if sites are part of televisa override
  // components settings
  if (isTelevisaSite) {
    iconFill = '#000';
    themeVariant.variant = 'ligth';
  }

  return (
    <Footer theme={{ variant: isTelevisaSite ? 'light' : 'dark' }}>
      <TopContainerWrapper>
        {isTelevisaSite ? (
          <VixPromotionalBanner>
            <a href={`${VIX_BANNER_DOMAIN}${VIX_BANNER_FOOTER_PATH}`} rel="noopener noreferrer" target="_blank">
              <img src={VIX_BANNER_FOOTER_MOBILE} alt="vix" />
            </a>
          </VixPromotionalBanner>
        ) : null}
        <TopContainer theme={{ variant: isTelevisaSite ? 'light' : 'dark' }}>
          <a href={logoHref}>
            <amp-img src={image} width={141} height={32} />
          </a>
          <div>
            <SocialNetworkContainer>
              { Object.keys(socialNetworks).map(socialNetwork => (
                <SocialNetworkLink href={socialNetworks[socialNetwork]} key={socialNetwork}>
                  <AmpIcon name={socialNetwork} fill={iconFill} />
                </SocialNetworkLink>
              ))}
            </SocialNetworkContainer>
            {(!isTelevisaSite) ? (
              <NewsLetterLink href="https://www.univision.com/newsletters/preference" target="_blank">
                <AmpIcon name="mail" fill={iconFill} />
                <span>{localization.get('newsletters')}</span>
              </NewsLetterLink>
            ) : null}
          </div>
        </TopContainer>
      </TopContainerWrapper>

      <div className="uvs-container">
        <div className="col-sm-12 col-md-5">
          <FooterTitle theme={{ variant: isTelevisaSite ? 'light' : 'dark' }} className="uvs-font-a-bold">{apps.title.text}</FooterTitle>
          <AppsContainer theme={{ variant: isTelevisaSite ? 'light' : 'dark' }}>
            {apps.links.map(app => (
              <FooterImageLink key={app.text}>
                <a href={app.href}>
                  {app.text}
                </a>
              </FooterImageLink>
            ))}
          </AppsContainer>
        </div>
        <div className="col-sm-12 col-md-7">
          <FooterTitle theme={{ variant: isTelevisaSite ? 'light' : 'dark' }} className="uvs-font-a-bold">{general.title.text}</FooterTitle>
          <AboutContainer theme={{ variant: isTelevisaSite ? 'light' : 'dark' }}>
            <div>
              {general.links.map(link => (
                <a key={link.text} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              ))}
            </div>
          </AboutContainer>
        </div>
      </div>
      <CopyrightContainer theme={{ variant: isTelevisaSite ? 'light' : 'dark' }} className="row no-gutters">
        {(isTelevisaSite) ? (
          <div className="col-sm">
            Derechos Reservados © Televisa S. de R.L. de C.V.
          </div>
        ) : (
          <div className="col-sm">
            Copyright. © {new Date().getFullYear()}.<br /> Univision
            Communications Inc.<br /> Todos Los Derechos Reservados.
          </div>
        )}
      </CopyrightContainer>
    </Footer>
  );
};

AmpFooter.propTypes = {
  pageData: PropTypes.shape({
    site: PropTypes.string,
    pageCategory: PropTypes.string,
  }),
};

export default AmpFooter;
