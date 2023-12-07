import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import {
  getPageData,
  getDevice,
  getSites,
  getBrandable,
} from '@univision/fe-commons/dist/store/storeHelpers';
import {
  exists,
  getKey,
  hasKey,
  isInArray,
  toAbsoluteUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import brandableTypes from '@univision/fe-commons/dist/utils/brandable/types.json';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '../../../../Link';
import GlobalHeaderLink from '../../GlobalHeaderLink';
import Search from '../../../../Search';
import SectionsButton from '../../SectionsButton';
import Logo from '../../../../Logo';
import FollowMenu from '../../../../FollowMenu';
import CalReply from '../../../../CalReply';
import menuTypes from '../../../data/menuTypes.json';
import ButtonUniNow from '../../../../widgets/ButtonUniNow';

import { getLinks, trackSubnavClick } from '../helpers';
import DropDown from '../DropDown';
import Styles from './BrandedSubNav.scss';

/**
 * Sub Navigation with branding. The branding is driven by the brandable object.
 * @param   {Object} props component props
 * @returns {JSX}
 */
export default class BrandedSubNav extends Component {
  /**
   * Constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      followUsOpen: false,
      device: getDevice(Store),
      isSearchOpen: false,
    };
    this.sites = getSites(Store);
    this.brandable = props.brandable || getBrandable(Store);
  }

  /**
   * Get custom link element
   * @param {string} href href
   * @param {string} text to show
   * @param {string} imageClass imageClass
   * @returns {JSX}
   */
  getCustomLinkEl = (href, text, imageClass) => {
    return (
      <Link href={href} className={Styles.customLink}>
        <div className={classnames(Styles.imageContainer, Styles[imageClass])}>
          <Icon name={text} size="xsmall" fill="#fff" />
        </div>
        <span>{localization.get(text)}</span>
      </Link>
    );
  };

  /**
   * Get custom button based on data properties
   * @param {Array} networks networks to show
   * @param {boolean} hasAirTime hasAirTime param
   * @param {boolean} hasLinks hasLinks param
   * @param {boolean} showCalReply showCalReply param
   * @returns {JSX}
   */
  getCustomButtom = (networks, hasAirTime, hasLinks, showCalReply) => {
    const { data: brandableData } = this.brandable;
    const hasNetworks = Array.isArray(networks) && networks.length > 0;
    let hasLiveStream = false;
    let href = '/';
    if (hasKey(brandableData, 'liveLandingPage') && hasKey(brandableData, 'liveTimer')) {
      const { liveTimer } = brandableData;
      const dateNow = Date.now();
      const parseLiveTimer = new Date(liveTimer).getTime();
      // Check both using unix timestamp
      hasLiveStream = dateNow >= parseLiveTimer;
    }
    if (hasLiveStream) {
      const { liveLandingPage } = brandableData;
      href = hasKey(liveLandingPage, 'href') ? liveLandingPage.href : href;
      return this.getCustomLinkEl(href, 'livestream', 'liveStream');
    }
    return hasNetworks
      ? this.getFollowingUsMenu(networks, hasAirTime, hasLinks, showCalReply)
      : null;
  };

  /**
   * Get following us menu button
   * @param {Array} networks networks to show
   * @param {boolean} hasAirTime hasAirTime param
   * @param {boolean} hasLinks hasLinks param
   * @param {boolean} showCalReply showCalReply param
   * @returns {JSX}
   */
  getFollowingUsMenu = (networks, hasAirTime, hasLinks, showCalReply) => {
    const { device, followUsOpen } = this.state;
    const followMenuProps = {
      className: classnames({ [Styles.withAirTime]: hasAirTime }),
      networks,
      useLegacy: true,
    };

    if (device === 'mobile'
    || (device === 'tablet' && hasLinks)
    || (device === 'desktop' && showCalReply)) {
      followMenuProps.forceMobileView = true;
      followMenuProps.onToggle = this.toggleFollowUs;
    }

    return (
      <div
        className={classnames(Styles.followUsContainer, {
          [Styles.mobile]: followMenuProps.forceMobileView,
          [Styles.followUsOpen]: followUsOpen,
        })}
      >
        <FollowMenu {...followMenuProps} />
      </div>
    );
  };

  /**
   * Get social networks array
   * @returns {Array} links
   */
  getSocialNetworksLink = () => {
    return this.brandable.socialNetworks;
  };

  /**
   * Callback for the Follow Us button on mobile
   * @param {boolean} open Is open
   */
  toggleFollowUs = (open) => {
    this.setState({
      followUsOpen: open,
    });
  };

  /**
   * Return true if viewport is landscape
   * @returns {boolean}
   */
  isLandscape = () => {
    if (exists(global.window)) {
      return window.innerHeight < window.innerWidth;
    }
    return null;
  };

  /**
   * Return true if the brandable has a show or radio station object
   * @returns {JSX}
   */
  hasBrandable = () => {
    return isInArray(this.brandable.type, [brandableTypes.show, brandableTypes.radio]);
  };

  /**
   * Handle on toggle search change
   */
  toggleSearchChange = () => {
    this.setState(prevState => ({ isSearchOpen: !prevState.isSearchOpen }));
  };

  /**
   * Render the logo
   * @returns {JSX}
   */
  renderLogo() {
    const image = this.brandable.headerLogo;
    if (image) {
      return <Logo uri={this.brandable.uri} src={image} className={Styles.logo} />;
    }
    return null;
  }

  /**
   * Renders the component
   * @returns {XML}
   */
  render() {
    const {
      links,
      variant,
      subNavBackground,
      toggleSectionMenu,
      hamburgerOpenSubNav,
      renderingOptions,
      centerLogoMobile,
      styling,
    } = this.props;
    const { isSearchOpen } = this.state;
    let { theme } = this.props;
    const variantCheck = subNavBackground.variant || variant;
    const { device } = this.state;

    const pageData = getPageData(Store);
    if (!hasKey(pageData, 'data')) {
      return null;
    }

    const isMobile = device === 'mobile';

    const activeCustomLink = styling ? styling.activeLinkIndicatorColor : undefined;

    const networks = this.getSocialNetworksLink();

    if (subNavBackground && hasKey(subNavBackground, 'text')) {
      theme = {
        primary: subNavBackground.text,
      };
    }

    const hasLinks = Array.isArray(links) && links.length > 0;
    const hasNetworks = Array.isArray(networks) && networks.length > 0;
    const hasAirTime = hasKey(this.brandable, 'data.airTimeText');
    const calReplyProps = {
      code: getKey(pageData.data, 'externalWidgets.calReply.code', null),
      href: getKey(pageData.data, 'externalWidgets.calReply.href', null),
      hasBackgroundImage: subNavBackground && hasKey(subNavBackground, 'image'),
      hasCalReplyOnly: (!hasNetworks && !hasAirTime) || (!hasNetworks && hasAirTime),
    };

    const showCalReply = calReplyProps.code && calReplyProps.href;
    const onlyHasLogo = !hasLinks && !hasNetworks && !hasAirTime;

    const maxWidth = showCalReply ? 260 : 514;

    const subNavLinks = getLinks(links, maxWidth);
    const customButton = this.getCustomButtom(networks, hasAirTime, hasLinks, showCalReply);

    const { showSearch, showUniNow } = { ...renderingOptions };
    return (
      <div
        className={classnames(Styles.wrapper, Styles[variant])}
        data-element-name="BrandedSubNav"
        style={{
          backgroundColor: subNavBackground.color,
          backgroundImage: subNavBackground.image ? `url(${subNavBackground.image})` : null,
        }}
      >
        <div className="uvs-container">
          <div
            className={classnames(
              'row no-gutters',
              {
                [Styles.noLinks]: !hasLinks,
              }
            )}
          >
            <div
              className={classnames(
                { 'col-12': isMobile, [Styles.withAirTime]: hasAirTime },
                Styles.logoContainer
              )}
            >
              {(!isSearchOpen || !isMobile)
              && (
              <Fragment>
                <SectionsButton
                  primaryControl
                  label={null}
                  closeLabel={null}
                  className={Styles.sections}
                  onClick={e => toggleSectionMenu(e, menuTypes.BRANDED_SUBNAV)}
                  open={hamburgerOpenSubNav}
                  variant={variantCheck}
                />
                <div className={classnames(
                  Styles.logoWrapper,
                  { [Styles.centerLogo]: centerLogoMobile }
                )}
                >
                  {this.renderLogo()}
                  {device === 'mobile'
                    && hasAirTime && (
                      <span className={`${Styles.airTimeLabel} uvs-font-a-bold`}>
                        {this.brandable.data.airTimeText}
                      </span>
                  )}
                </div>
              </Fragment>
              )
              }
              {!isSearchOpen && isMobile
                && (
                <Fragment>
                  { showCalReply
                    && <CalReply className={Styles.calReply} {...calReplyProps} />
                  }
                  {!showUniNow && (
                    customButton
                  )}
                </Fragment>
                )}
              {isMobile
                && showSearch && (
                <Search
                  open={isSearchOpen}
                  onToggle={this.toggleSearchChange}
                  className={Styles.search}
                  variant={variantCheck}
                />
              )}
              {isMobile && showUniNow && (
              <ButtonUniNow className={Styles.uniNow} />
              )}
            </div>
            {hasLinks && (
            <nav className={classnames(Styles.subnav, { 'col-12': isMobile })}>
              {subNavLinks.visible.map(link => (
                <GlobalHeaderLink
                  active={link.active}
                  activeLinkIndicatorColor={activeCustomLink}
                  className={Styles.subNavLink}
                  href={toAbsoluteUrl(link.link, this.sites[link.site])}
                  key={link.link}
                  onClick={() => trackSubnavClick(link.name)}
                  site={link.site}
                  target={link.target}
                  text={link.name}
                  theme={theme}
                  variant="dark"
                />
              ))}
              {subNavLinks.hidden.length > 0 && (
              <DropDown
                links={subNavLinks}
                variant={variantCheck}
                subNavBackground={subNavBackground}
              />
              )}
            </nav>
            )}
            {(!isMobile && !isSearchOpen)
              && this.hasBrandable() && (
                <div
                  className={classnames(Styles.infoContainer, {
                    [Styles.onlyCalReply]: onlyHasLogo && showCalReply,
                  })}
                >
                  {hasAirTime && (
                    <span className={`${Styles.airTimeLabel} uvs-font-a-bold`}>
                      {this.brandable.data.airTimeText}
                    </span>
                  )}
                  {showCalReply && (
                    <CalReply
                      className={classnames({ [Styles.calReply]: hasNetworks })}
                      {...calReplyProps}
                    />
                  )}
                  {customButton}
                </div>
            )}
            {!isMobile
              && showSearch && (
              <Search
                open={isSearchOpen}
                onToggle={this.toggleSearchChange}
                className={classnames(Styles.icon, Styles.search)}
                variant={variantCheck}
              />
            )}
            {!isMobile && showUniNow && (
            <ButtonUniNow className={Styles.uniNow} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Object} renderingOptions - Options to the header component
 * @property {boolean} [renderingOptions.showLinks=true] - If false should hide nav links
 * @property {boolean} [renderingOptions.showSearch=true] - If false hide the search button
 * @property {boolean} [renderingOptions.showUniNow=false] - If true hide the UniNow button
 * @property {boolean} [centerLogoMobile=false] - If true center logo in mobile
 * @property {Function} hamburgerOpenSubNav - Callback when open is trigger
 * @property {Function} toggleSectionMenu - Handler to section button
 */
BrandedSubNav.propTypes = {
  links: PropTypes.array.isRequired,
  variant: PropTypes.string,
  theme: PropTypes.object,
  subNavBackground: PropTypes.shape({
    color: PropTypes.string,
    text: PropTypes.string,
    variant: PropTypes.string,
    image: PropTypes.string,
  }),
  styling: PropTypes.object,
  brandable: PropTypes.object,
  renderingOptions: PropTypes.shape({
    showLinks: PropTypes.bool,
    showSearch: PropTypes.bool,
    showUniNow: PropTypes.bool,
  }),
  centerLogoMobile: PropTypes.bool,
  hamburgerOpenSubNav: PropTypes.func,
  toggleSectionMenu: PropTypes.func,
};

BrandedSubNav.defaultProps = {
  subNavBackground: {
    color: '#000000',
    text: '#FFFFFF',
  },
  renderingOptions: {
    showSearch: true,
    showUniNow: false,
  },
  centerLogoMobile: false,
};
