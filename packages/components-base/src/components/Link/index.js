import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  exists,
  getKey,
  isInUnivisionDomain,
  isRelativeUrl,
  isValidFunction,
  isValidString,
  toAbsoluteUrl,
  toRelativeUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import { shouldSkipSpa } from '@univision/fe-commons/dist/utils/helpers/spa';
import RouterContext from '@univision/fe-commons/dist/components/RouterContext';
import Store from '@univision/fe-commons/dist/store/store';
import { isPlayingMedia } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  configSelector,
  domainSelector,
  isTudnSiteSelector,
  isSpaSelector,
  sitesSelector,
  userLocationSelector,
  pageUriSelector,
  pageCategorySelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import getSiteDomainFromHref from '@univision/fe-utilities/helpers/url/getSiteDomainFromHref';
import { TUDN_SITE, TUDN_DEFAULT_HOST } from '@univision/fe-commons/dist/constants/sites';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';
import features from '@univision/fe-commons/dist/config/features';
import { isVerticalTelevisaByUri } from '@univision/fe-commons/dist/utils/header/helpers';

const IGNORE_LIST = [
  'https://fantasypredictor.tudn.com/',
];

/**
 * Check if the click used an modifier key
 * @param {Object} event the original event
 * @returns {boolean}
 */
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * Link base component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
class Link extends React.PureComponent {
  /**
   * constructor
   */
  constructor() {
    super();
    this.anchorRef = React.createRef();
    this.onSpaClick = this.onSpaClick.bind(this);
    this.renderAnchor = this.renderAnchor.bind(this);
    this.onClickTargetHandler = this.onClickTargetHandler.bind(this);
    this.explicitNavigation = this.explicitNavigation.bind(this);

    const state = Store.getState();
    const config = configSelector(state);
    this.isMultiSite = getKey(config.deploy, 'multiSite');
    this.isTudnSite = isTudnSiteSelector(state);
    this.isTelevisaSite = isVerticalTelevisaByUri(state.page.site);
    this.isSpa = isSpaSelector(state);
    this.domain = domainSelector(state);
    this.sites = sitesSelector(state);
    this.userLocation = userLocationSelector(state);
    this.isWorldCupMVP = features.deportes.isWorldCupMVP(state);
    this.pageUri = pageUriSelector(state);
    this.pageCategory = pageCategorySelector(state);
  }

  /**
   * Remove event listeners.
   */
  componentWillUnmount() {
    if (this.anchorRef.current) {
      this.anchorRef.current.removeEventListener('click', this.onSpaClick);
    }
  }

  /**
   * Handle the link click on SPA mode.
   * @param {Object} event Click event.
   */
  onSpaClick(event) {
    const { preventFollowClick } = this.props;
    if (preventFollowClick) {
      event.preventDefault();
    }

    this.handleClick(event, this.history);
  }

  /**
   * Handle to validate if pip player is active
   * and change the link target to `_blank`
   * @param {Object} event Click event.
   */
  onClickTargetHandler(event) {
    const { onClick, preventFollowClick, useExplicitNavigation } = this.props;
    const { current } = this.anchorRef;

    if (preventFollowClick) {
      event.preventDefault();
    }

    if (isValidFunction(onClick)) onClick(event);

    if (isPlayingMedia(Store)) {
      /* store the current target to restore when the the pip player is closed */
      if (!current.dataset.targetPip) {
        current.dataset.targetPip = current.target || '_self';
      }
      current.target = '_blank';
    } else {
      // we have an issue with double tapping in hero widget, so we pass this flag
      // as a workaround while a better solution is found.
      if (useExplicitNavigation) this.explicitNavigation();

      const { targetPip } = current.dataset;
      if (typeof targetPip !== 'undefined') {
        current.target = targetPip;
      }
    }
  }

  /**
   * Link click event handler
   * @param {Object} event the click event
   * @param {Object} history the history object
   */
  handleClick(event, history) {
    const {
      onClick,
      target,
      href,
      site,
    } = this.props;

    if (isValidFunction(onClick)) onClick(event);

    if (
      history
      && (
        !event.defaultPrevented // onClick prevented default
        && event.button === 0 // ignore everything but left clicks
        && (!target || target === '_self') // let browser handle "target=_blank" etc.
        && !isModifiedEvent(event) // ignore clicks with modifier keys
      )
    ) {
      event.preventDefault();
      // Get href from the link because it is already absolute
      const url = this.withCountryCode((event.target && event.target.getAttribute('href') || href), site, true);
      history.push(toRelativeUrl(url), { url });
    }
  }

  /**
   * this is a workaround handler to prevent issue with double tapping in mobile
   * with react-slick
   * @param {Object} history the history object
   */
  explicitNavigation() {
    const { href, preventFollowClick } = this.props;

    if (href && isValidString(href) && !preventFollowClick) {
      window.location.href = href;
    }
  }

  /**
   * Checks if mx country should be appended to the TUDN urls
   * @param {string} url current link url
   * @param {string} site current link site
   * @param {boolean} click true if the link was clicked
   * @returns {string}
   */
  withCountryCode(url, site, click) {
    if (click) {
      this.pageUri = pageUriSelector(Store.getState());
    }

    const { checkUserLocation } = this.props;
    const isTudnLink = (site === TUDN_SITE || url?.includes(TUDN_DEFAULT_HOST))
      && !IGNORE_LIST.includes(url);
    const modifyLinkOnClient = !this.pageUri?.includes(`${this.domain}/mx`);

    if (modifyLinkOnClient && isTudnLink && !click && this.pageUri) {
      return url;
    }

    if (
      this.isTudnSite
      && isTudnLink
      && this.userLocation === MX
      && checkUserLocation
      && this.isWorldCupMVP
      && !url?.includes('/mx/')
    ) {
      const isHomePage = url === '/';
      const cleanUrl = isHomePage ? this.domain : url;
      const currentURL = new URL(cleanUrl, this.domain);
      currentURL.pathname = isHomePage ? '/mx/' : `/mx${currentURL.pathname}`;

      return currentURL.toString();
    }

    return url;
  }

  /**
   * Get absolute href link with site or current domain
   * @param {string} href URL to get domain
   * @param {string} site name of site to get the domain
   * @returns {string}
   */
  getAbsoluteHref(href, site) {
    const siteDomain = this.sites[site];
    let absoluteUrl = href;
    // make sure all links are absolute for a better workflow in MPA or SPA
    if (!this.isSpa && !this.isMultiSite && isInUnivisionDomain(href)) {
      // To easily test multipage on lower environments
      const domain = siteDomain || getSiteDomainFromHref(href, this.sites);
      const relativeUrl = toRelativeUrl(href);
      absoluteUrl = toAbsoluteUrl(relativeUrl, domain);
    } else if (isRelativeUrl(href)) {
      const domain = siteDomain || this.domain;
      absoluteUrl = toAbsoluteUrl(href, domain);
    }

    return this.withCountryCode(absoluteUrl, site);
  }

  /**
   * Get true is current is navigation active link
   * @param {string} href URL to get domain
   * @param {string} activeLink active link URL
   * @returns {string}
   */
  getGlobalNavActiveLink(href, activeLink) {
    let activeDomain;

    if (isVerticalTelevisaByUri(href)) {
      activeDomain = href.match(/\/([^]*)$/);
      return activeDomain && activeLink.includes(activeDomain[1]);
    }

    const absoluteUrl = toAbsoluteUrl(
      toRelativeUrl(activeLink),
      getSiteDomainFromHref(activeLink, this.sites)
      );
    return absoluteUrl.includes(href);
  }

  /**
   * Renders the anchor element.
   * @param {Object} ctx Router context.
   * @returns {*}
   */
  renderAnchor(ctx) {
    const {
      context,
      href,
      site,
      activeLink,
      children,
      className,
      dataActionAttr,
      useExplicitNavigation,
      versionCreated,
      preventFollowClick,
      checkUserLocation,
      isWorldCupMVP,
      ...rest
    } = this.props;

    const relData = this.isTudnSite ? {
      rel: 'alternate',
      hrefLang: 'es-us',
    } : {};
    const anchorProps = {
      ...rest,
      href: this.getAbsoluteHref(href, site),
      'data-action': dataActionAttr,
      ref: this.anchorRef,
      ...relData,
    };

    // Check if it's an active link
    let isActive = false;

    if (activeLink) {
      isActive = this.getGlobalNavActiveLink(href, activeLink);
    }

    const currentContext = context || ctx;

    // fix to test SPA on local host
    if (currentContext.history && !shouldSkipSpa({ url: anchorProps.href })) {
      this.history = currentContext.history;
      anchorProps.onClick = this.onSpaClick;
    } else {
      anchorProps.onClick = this.onClickTargetHandler;
    }

    return (
      <a
        {...anchorProps}
        className={classnames(className, { active: isActive })}
      >
        {children}
      </a>
    );
  }

  /**
   * Renders the component
   * @returns {JSX}
   */
  render() {
    const {
      href, children, className, onClick,
    } = this.props;
    if (exists(href)) {
      return (
        <RouterContext.Consumer>
          {this.renderAnchor}
        </RouterContext.Consumer>
      );
    }

    return <span className={className} onClick={onClick} role="button" tabIndex="0">{children}</span>;
  }
}

/**
 * propTypes
 * @property {Node} children Components to mount
 * @property {String} href Link to render
 * @property {String} class Class name of the element
 */
Link.propTypes = {
  checkUserLocation: PropTypes.bool,
  children: PropTypes.node,
  context: PropTypes.object,
  href: PropTypes.string,
  isWorldCupMVP: PropTypes.bool,
  site: PropTypes.string,
  activeLink: PropTypes.string,
  className: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self', '_parent', '_top']),
  onClick: PropTypes.func,
  preventFollowClick: PropTypes.bool,
  dataActionAttr: PropTypes.string,
  style: PropTypes.object,
  versionCreated: PropTypes.string,
  useExplicitNavigation: PropTypes.bool,
};

/**
 * propTypes
 * @property {Node} children Components to mount
 * @property {String} href Link to render
 * @property {String} class Class name of the element
 */
Link.defaultProps = {
  href: '#',
};

export default Link;
