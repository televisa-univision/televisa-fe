import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import univisionLogoColor from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import { LIGHT_VARIANT, DARK_VARIANT } from '@univision/fe-commons/dist/utils/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import {
  VIX_BANNER_DOMAIN,
  VIX_BANNER_FOOTER_PATH,
  VIX_BANNER_FOOTER_MOBILE,
  VIX_BANNER_FOOTER_DESKTOP,
} from '@univision/fe-commons/dist/constants/televisaSitesData';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { DESKTOP } from '@univision/fe-commons/dist/constants/devices';
import store from '@univision/fe-commons/dist/store/store';

import Link from '../../Link';
import Logo from '../../Logo';
import Image from '../../Image';
import FooterLink from '../FooterLink/FooterLink';
import FooterImageLink from '../FooterImageLink/FooterImageLink';
import FooterTitle from '../FooterTitle/FooterTitle';
import FooterCopyright from '../FooterCopyright/FooterCopyright';

import Styles from './FooterLayoutTelevisa.scss';
import Styled from './FooterLayoutTelevisa.styles';
import { tracksVIXLink } from '../../Navigation/MegaMenu/helpers';

const LogoWrapper = styled(Logo)`${Styled.logoWrapper}`;

/**
 * Tracks click search button
 * @param {string} eventAction event action to track
 * @returns {Function}
 */
const track = eventAction => () => {
  NavigationTracker.track(NavigationTracker.events.click, { eventAction });
};

/**
 * Footer layout view
 */
class FooterLayoutRevamp extends Component {
  /**
   * Setup the state
   * @param {Object} props of the component
   * @param {Object} context of the component
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      showOtherPages: false,
    };
    this.renderLink = this.renderLink.bind(this);
  }

  /**
   * Get social networks to display
   * @returns {JSX}
   */
  getSocialNetworks() {
    const { socialNetworks } = this.props;
    return isValidArray(socialNetworks) && (
      <div className={Styles.networks}>
        {socialNetworks.map(network => (
          <Link
            onClick={track(`footer-social media-${network.name.toLowerCase()}`)}
            href={network.url}
            target="_blank"
            key={network.name.toLowerCase()}
          >
            <Icon
              size="small"
              name={`${network.name.toLowerCase()}Color`.replace('twitter', 'x')}
            />
          </Link>
        ))}
      </div>
    );
  }

  /**
   * Renders a footer title
   * @param {Object} section has all the info for the footer section
   * @param {Object} section.title has all the info to render the main link of the section
   * @param {string} section.title.text the display text of the link
   * @param {string} section.title.href the url of the link
   * @param {boolean} options - additional options
   * @property {boolean} options.isInternal - flag to mark the title as internal
   * @returns {JSX}
   */
  renderFooterTitle(section, { isInternal }) {
    const { themeVariant } = this.props;

    if (!hasKey(section, 'title.href')) {
      return (
        <FooterTitle
          themeVariant={themeVariant}
          className={classnames({
            [Styles.internalTitle]: isInternal,
          })}
        >
          {section.title.text}
        </FooterTitle>
      );
    }

    return (
      <FooterTitle
        themeVariant={themeVariant}
        className={classnames({
          [Styles.internalTitle]: isInternal,
        })}
      >
        <FooterLink
          key={section.title.text}
          themeVariant={themeVariant}
          item={section.title}
          className={Styles.openLink}
        />
      </FooterTitle>
    );
  }

  /**
   * Render a footer link
   * @param {Object} link info about the footer link
   * @param {string} link.text the display text of the link
   * @returns {JSX}
   */
  renderLink(link) {
    const { themeVariant } = this.props;

    return (
      <FooterLink
        key={link.text}
        themeVariant={themeVariant}
        item={link}
        className={Styles.openLink}
      />
    );
  }

  /**
   * Renders top part of footer
   * @returns {JSX}
   */
  renderTopPart() {
    const {
      domain,
      themeVariant,
      footerLogo,
      footerLogoHeight,
    } = this.props;
    const lightClass = { [Styles.light]: themeVariant === LIGHT_VARIANT };
    const isDesktop = deviceSelector(store.getState()) === DESKTOP;

    return (
      <div className={classnames(Styles.topWrapper, lightClass)}>
        <div className={classnames('uvs-container', Styles.vixBannerContainer)}>
          <Link
            target="_blank"
            onClick={() => tracksVIXLink(true, false)}
            href={`${VIX_BANNER_DOMAIN}${VIX_BANNER_FOOTER_PATH}`}
          >
            <div>
              <Image
                width="100%"
                height="100%"
                loading="lazy"
                alt="VIX Banner"
                src={isDesktop ? VIX_BANNER_FOOTER_DESKTOP : VIX_BANNER_FOOTER_MOBILE}
              />
            </div>
          </Link>
        </div>
        <div className={classnames('uvs-container', Styles.top, lightClass)}>
          <div className={Styles.logoActions}>
            <LogoWrapper
              logoHeight={footerLogoHeight}
              className={Styles.logo}
              onClick={track('footernav-logo-univision')}
              src={footerLogo}
              uri={domain}
              site={TUDN_SITE}
              checkUserLocation
            />
            <div className={Styles.linksWrapper}>
              {this.getSocialNetworks()}
            </div>
          </div>
          <div className={Styles.linksWrapper}>
            {this.getSocialNetworks()}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Renders bottom part of footer
   * @returns {JSX}
   */
  renderBottomPart() {
    const {
      apps,
      domain,
      footerCopyright,
      general,
      localLinks,
      themeVariant,
    } = this.props;
    const lightClass = { [Styles.light]: themeVariant === LIGHT_VARIANT };
    // const styleApps = apps?.links?.length > 2 ? Styles.apps : Styles.appsPair;
    return (
      <Fragment>
        <div className={classnames('col-sm-12 col-md-5', Styles.appsWrapper)}>
          <FooterTitle themeVariant={themeVariant}>{getKey(apps, 'title.text')}</FooterTitle>
          {Array.isArray(apps?.links) && (
            <div className={classnames(Styles.apps, lightClass)}>
              {apps.links.map(app => (
                <FooterImageLink key={app.text} item={app} themeVariant={themeVariant} />
              ))}
            </div>
          )}
        </div>
        <div className={classnames('col-sm-12 col-md-7', Styles.info)}>
          <div className={classnames(Styles.mainLinks, lightClass)}>
            {isValidArray(general.mainLinks)
              && general.mainLinks.map(link => (
                <div key={link.text} className={Styles.link}>
                  <FooterLink item={link} themeVariant={themeVariant} domain={domain} />
                </div>
              ))}
          </div>
          <div className={classnames(Styles.links, lightClass)}>
            <div className={classnames(Styles.general, lightClass)}>
              {isValidArray(general.links)
                && general.links.map(link => (
                  <div key={link.text} className={Styles.link}>
                    <FooterLink item={link} themeVariant={themeVariant} domain={domain} />
                  </div>
                ))}
            </div>
            {Array.isArray(localLinks.links) && localLinks.links.length > 0 && (
              <div className={Styles.local}>
                <div className={Styles.link}>
                  <FooterLink item={{ text: localLinks.title }} themeVariant={themeVariant} />
                </div>
                {localLinks.links.map(link => (
                  <div key={link.text} className={Styles.link}>
                    <FooterLink item={link} themeVariant={themeVariant} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <FooterCopyright
            footerCopyright={footerCopyright}
            themeVariant={themeVariant}
            isUSLocation={false}
          />
        </div>
      </Fragment>
    );
  }

  /**
   * Render the component revamp US
   * @param {boolean} showOtherPages show other pages
   * @returns {JSX}
   */
  renderRevamp() {
    return (
      <Fragment>
        {this.renderTopPart()}
        <div className="uvs-container">
          <div className={Styles.main}>
            {
              this.renderBottomPart()
            }
          </div>
        </div>
      </Fragment>
    );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { showOtherPages } = this.state;
    return this.renderRevamp(showOtherPages);
  }
}

FooterLayoutRevamp.propTypes = {
  apps: PropTypes.object,
  footerLogoHeight: PropTypes.string,
  general: PropTypes.object,
  domain: PropTypes.string,
  localLinks: PropTypes.object,
  themeVariant: PropTypes.oneOf([LIGHT_VARIANT, DARK_VARIANT]),
  footerCopyright: PropTypes.string,
  footerLogo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  socialNetworks: PropTypes.array,
};

FooterLayoutRevamp.defaultProps = {
  apps: {},
  general: {},
  domain: 'https://www.univision.com',
  localLinks: {},
  themeVariant: DARK_VARIANT,
  footerLogo: univisionLogoColor,
  socialNetworks: [],
};

export default FooterLayoutRevamp;
