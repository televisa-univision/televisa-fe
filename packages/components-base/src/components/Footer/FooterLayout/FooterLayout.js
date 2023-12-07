import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import { DESKTOP } from '@univision/fe-commons/dist/constants/devices';
import univisionLogoColor from '@univision/fe-commons/dist/assets/images/logo-univision-color.svg';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { LIGHT_VARIANT, DARK_VARIANT } from '@univision/fe-commons/dist/utils/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';
import {
  VIX_BANNER_DOMAIN,
  VIX_BANNER_FOOTER_PATH,
  VIX_BANNER_FOOTER_MOBILE,
  VIX_BANNER_FOOTER_DESKTOP,
} from '@univision/fe-commons/dist/constants/vixSitesData';

import store from '@univision/fe-commons/dist/store/store';
import { UNIVISION_SITE } from '@univision/fe-commons/dist/constants/sites';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Link from '../../Link';
import Logo from '../../Logo';
import Image from '../../Image';
import Button from '../../Button';
import FooterLink from '../FooterLink/FooterLink';
import FooterImageLink from '../FooterImageLink/FooterImageLink';
import FooterTitle from '../FooterTitle/FooterTitle';
import FooterCopyright from '../FooterCopyright/FooterCopyright';

import Styles from './FooterLayout.scss';
import Styled from './FooterLayout.styles';
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
class FooterLayout extends Component {
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
    this.toggleShowOtherPages = this.toggleShowOtherPages.bind(this);
    this.renderLink = this.renderLink.bind(this);
  }

  /**
   * Get social networks to display
   * @returns {JSX}
   */
  getSocialNetworks() {
    const { themeVariant, socialNetworks } = this.props;

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
              name={`${network.name.toLowerCase()}Legacy`}
              size="xsmall"
              fill={themeVariant === LIGHT_VARIANT ? '#000' : '#fff'}
            />
          </Link>
        ))}
      </div>
    );
  }

  /**
   * Get newsletters element
   * @param {Object} lightClass style
   * @returns {JSX}
   */
  getNewsletters(lightClass) {
    const { themeVariant, disableNewsLetters } = this.props;

    if (disableNewsLetters) {
      return null;
    }

    return (
      <Link
        className={classnames(Styles.newsletters, lightClass)}
        href="https://www.univision.com/newsletters/preference"
        target="_blank"
        onClick={track('footer-newsletters')}
      >
        <Icon name="mail" size="xsmall" fill={themeVariant === LIGHT_VARIANT ? '#000' : '#fff'} />
        <span>{localization.get('newsletters')}</span>
      </Link>
    );
  }

  /**
   * Show the other pages of the footer
   */
  toggleShowOtherPages() {
    this.setState(({ showOtherPages }) => ({ showOtherPages: !showOtherPages }));
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
   * Renders a footer section that has multiple columns
   * @param {Object} section has all the info for the footer section
   * @param {array} section.links has all the links for the footer section
   * @param {array} linksPerColumn includes the number of links per column that the section will
   * have
   * @returns {JSX}
   */
  renderMultiColumnSection(section, linksPerColumn = [10, 10, 10]) {
    if (!Array.isArray(section.links)) {
      return null;
    }

    const { result: multiColumnSection } = linksPerColumn.reduce(
      ({ takeFrom, result }, currLinkCount, currIndex) => {
        const linkGroup = section.links.slice().splice(takeFrom, currLinkCount);
        const columnClassNames = classnames(Styles.otherLinks, {
          // No bottom space on mobile for groups, unless it's the last group
          [Styles.noBottomSpace]: currIndex !== linksPerColumn.length - 1,
          // Align secondary columns with first column
          [Styles.topSpace]: takeFrom !== 0,
        });

        // first column includes title
        if (takeFrom === 0) {
          result.push(
            <div className={columnClassNames}>
              {this.renderFooterTitle(section, { isInternal: true })}
              <div>{linkGroup.map(this.renderLink)}</div>
            </div>
          );
        } else {
          result.push(
            <div className={columnClassNames}>
              <div>{linkGroup.map(this.renderLink)}</div>
            </div>
          );
        }

        return { takeFrom: takeFrom + currLinkCount, result };
      },
      { takeFrom: 0, result: [] }
    );

    return multiColumnSection;
  }

  /**
   * Renders main footer section
   * @returns {JSX}
   */
  renderMainSection() {
    const { main } = this.props;

    if (!Array.isArray(main.links)) {
      return null;
    }

    return (
      <div className={Styles.otherLinks}>
        <div className={Styles.otherLinksColumns}>
          {main.links.map(this.renderLink)}
        </div>
      </div>
    );
  }

  /**
   * Renders deportes footer section
   * @returns {JSX}
   */
  renderDeportesSection() {
    const { deportes } = this.props;

    return (
      <div className={Styles.otherLinks}>
        {this.renderFooterTitle(deportes, { isInternal: true })}
        <div className={Styles.otherLinksColumns}>
          {Array.isArray(deportes.links) && deportes.links.map(this.renderLink)}
        </div>
      </div>
    );
  }

  /**
   * Renders noticias footer section
   * @returns {JSX}
   */
  renderNoticiasSection() {
    const { noticias } = this.props;

    return this.renderMultiColumnSection(noticias, [15, 14]);
  }

  /**
   * Renders others footer section
   * @returns {JSX}
   */
  renderOthersSection() {
    const { other, otherChains } = this.props;

    if (!Array.isArray(other.links) && !Array.isArray(otherChains.links)) {
      return null;
    }

    return (
      <div className={Styles.otherLinks}>
        {this.renderFooterTitle(other, { isInternal: true })}
        <div className={Styles.otherLinksColumns}>
          {Array.isArray(other.links) && other.links.map(this.renderLink)}
        </div>

        {this.renderFooterTitle(otherChains, { isInternal: true })}
        <div className={Styles.otherLinksColumns}>
          {Array.isArray(otherChains.links) && otherChains.links.map(this.renderLink)}
        </div>
      </div>
    );
  }

  /**
   * Renders top part of footer
   * @returns {JSX}
   */
  renderTopPart() {
    const {
      site,
      domain,
      themeVariant,
      footerLogo,
      footerLogoHeight,
      disableOtherPagesButton,
    } = this.props;
    const { showOtherPages } = this.state;
    const buttonText = showOtherPages ? 'Cerrar' : 'Otras Páginas';
    const lightClass = { [Styles.light]: themeVariant === LIGHT_VARIANT };
    const isUnivision = site === UNIVISION_SITE;
    const isDesktop = deviceSelector(store.getState()) === DESKTOP;

    return (
      <div className={classnames(Styles.topWrapper, lightClass)}>
        {isUnivision && (
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
        )}
        <div className={classnames('uvs-container', Styles.top, lightClass)}>
          <div className={Styles.logoActions}>
            <LogoWrapper
              width="100%"
              height="100%"
              logoHeight={footerLogoHeight}
              className={Styles.logo}
              onClick={track('footernav-logo-univision')}
              src={footerLogo}
              uri={domain}
            />
            <div className={Styles.linksWrapper}>
              {this.getSocialNetworks()}
              {this.getNewsletters(lightClass)}
            </div>
            {!disableOtherPagesButton && (
              <Button
                className={classnames(Styles.button, 'uvs-font-a-bold', lightClass)}
                onClick={this.toggleShowOtherPages}
              >
                {buttonText}{' '}
                <Icon
                  name="arrow"
                  size="xxsmall"
                  className={classnames(
                    Styles.arrow,
                    lightClass,
                    {
                      [Styles.down]: !showOtherPages,
                      [Styles.up]: showOtherPages,
                    },
                  )}
                />
              </Button>
            )}
          </div>
          <div className={Styles.linksWrapper}>
            {this.getSocialNetworks()}
            {this.getNewsletters(lightClass)}
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
      site,
    } = this.props;
    const lightClass = { [Styles.light]: themeVariant === LIGHT_VARIANT };

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
          <FooterTitle className={Styles.aboutTitle} themeVariant={themeVariant}>
            {general.title.text}
          </FooterTitle>
          <div className={classnames(Styles.links, lightClass)}>
            <div className={classnames(Styles.general, lightClass)}>
              {Array.isArray(general.links)
                && general.links.map(link => (
                  <div key={link.text} className={Styles.link}>
                    <FooterLink
                      item={link}
                      themeVariant={themeVariant}
                      domain={domain}
                      site={site}
                    />
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
          <FooterCopyright footerCopyright={footerCopyright} themeVariant={themeVariant} />
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

    return (
      <Fragment>
        {this.renderTopPart()}
        <div className="uvs-container">
          <div className={Styles.main}>
            {showOtherPages ? (
              <Fragment>
                {this.renderMainSection()}
                {this.renderDeportesSection()}
                {this.renderNoticiasSection()}
                {this.renderOthersSection()}
              </Fragment>
            ) : (
              this.renderBottomPart()
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

FooterLayout.propTypes = {
  apps: PropTypes.object,
  deportes: PropTypes.object,
  footerLogoHeight: PropTypes.string,
  general: PropTypes.object,
  domain: PropTypes.string,
  localLinks: PropTypes.object,
  main: PropTypes.object,
  noticias: PropTypes.object,
  other: PropTypes.object,
  otherChains: PropTypes.object,
  themeVariant: PropTypes.oneOf([LIGHT_VARIANT, DARK_VARIANT]),
  footerCopyright: PropTypes.string,
  footerLogo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  socialNetworks: PropTypes.array,
  disableNewsLetters: PropTypes.bool,
  disableOtherPagesButton: PropTypes.bool,
  site: PropTypes.string,
};

FooterLayout.defaultProps = {
  apps: {},
  deportes: {},
  general: {},
  domain: 'https://www.univision.com',
  localLinks: {},
  main: {},
  noticias: {},
  other: {},
  otherChains: {},
  themeVariant: DARK_VARIANT,
  footerLogo: univisionLogoColor,
  socialNetworks: [],
};

export default FooterLayout;
