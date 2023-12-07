import React from 'react';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme, isTudnSite } from '@univision/fe-commons/dist/store/storeHelpers';
import whiteLogo from '@univision/fe-commons/dist/assets/images/logo-univision-white.svg';
import colorLogo from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import tudnWhiteLogo from '@univision/fe-commons/dist/assets/images/tudn/tudn_white_logo.svg';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import FooterData from '@univision/fe-components-base/dist/components/Footer/footerData.json';

import AmpIcon from '../icon/AmpIcon';

import {
  AboutContainer, AppsContainer, CopyrightContainer, Footer, FooterImageLink, FooterTitle,
  NewsLetterLink, SocialNetworkContainer, SocialNetworkLink, TopContainer, TopContainerWrapper,
} from './AmpFooter.styles';

/**
 * Footer for pages.
 * @param {Object} props Component props
 * @returns {JSX}
 */
const AmpFooter = () => {
  const theme = getTheme(Store) || {};
  const iconFill = theme.variant === 'light' ? '#000' : '#fff';
  const isTudn = isTudnSite(Store);
  let image = colorLogo;
  if (isTudn) {
    image = tudnWhiteLogo;
  } else if (theme.variant === 'dark') {
    image = whiteLogo;
  }
  const { apps, general } = FooterData;
  const socialNetworks = isTudn ? {
    facebook: 'https://www.facebook.com/tudnusa',
    twitter: 'https://twitter.com/TUDNUSA',
    instagram: 'https://www.instagram.com/tudnusa',
  } : {
    facebook: 'https://www.facebook.com/univision',
    twitter: 'https://twitter.com/univision',
    instagram: 'https://www.instagram.com/univision',
  };

  return (
    <Footer>
      <TopContainerWrapper>
        <TopContainer>
          <a href={isTudn ? 'https://www.tudn.com' : 'https://www.univision.com'}>
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
            <NewsLetterLink href="https://www.univision.com/newsletters/preference" target="_blank">
              <AmpIcon name="mail" fill={iconFill} />
              <span>{localization.get('newsletters')}</span>
            </NewsLetterLink>
          </div>
        </TopContainer>
      </TopContainerWrapper>

      <div className="uvs-container">
        <div className="col-sm-12 col-md-5">
          <FooterTitle className="uvs-font-a-bold">{apps.title.text}</FooterTitle>
          <AppsContainer>
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
          <FooterTitle className="uvs-font-a-bold">{general.title.text}</FooterTitle>
          <AboutContainer>
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
      <CopyrightContainer className="row no-gutters">
        <div className="col-sm">
            Copyright. © {new Date().getFullYear()}.<br /> Univision
            Communications Inc.<br /> Todos Los Derechos Reservados.
        </div>
      </CopyrightContainer>
    </Footer>
  );
};

export default AmpFooter;
