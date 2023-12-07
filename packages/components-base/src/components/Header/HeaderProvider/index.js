import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';

import {
  getDevice,
  getEntryByKey,
  isSoccerMatchPage,
} from '@univision/fe-commons/dist/store/storeHelpers';
import {
  toRelativeUrl,
  isValidString,
} from '@univision/fe-commons/dist/utils/helpers';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import Features from '@univision/fe-commons/dist/config/features';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';

import StickyWrapper from '../../StickyWrapper';
import SectionTitle from './SectionTitle';
import BrandedHeader from './BrandedHeader';
import HeaderStyles from '../Header.scss';
import menuTypes from '../data/menuTypes.json';
import GlobalNav from './GlobalNav';
import SubNav from './Subnav';
import LogOutBar from '../../LogOutBar';

/**
 * GlobalHeader component to handle all header display variations
 * based on vertical, content type, tags, etc.
 * @returns {function}
 */
@asDeferrer
class GlobalHeader extends React.Component {
  /**
   * track click when the hamburger menu is expanded
   */
  static trackHamburgerExpanded = () => {
    const eventAction = 'hamburger menu expand';
    const utagData = {
      eventAction,
    };

    NavigationTracker.track(NavigationTracker.events.click, utagData);
  };

  /**
   * initialize state
   */
  constructor() {
    super();

    this.state = {
      brandedStickyHeader: false,
      isSticky: false,
    };
    this.isDesktop = getDevice(Store) === 'desktop';
    this.data = getEntryByKey(Store, 'data') || {};
    this.onStickyChange = this.onStickyChange.bind(this);
    this.brandedRef = React.createRef();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    // remove any global classes that may be left over
    // this is necessary because in multipage mode these were cleared
    // automatically, while in SPA mode the <body> element persists
    // so we need to clear the modifier classes manually
    this.defer(() => {
      global.document.body.classList.remove(
        'sections-open',
        'sections-mobile-open-sticky',
        'sections-mobile-open'
      );
    });
  }

  /**
   * Update the sticky flag in the State.
   * @param {boolean} isSticky Sticky flag.
   */
  onStickyChange = (isSticky) => {
    this.setState(({ sectionMenu: isHamburgerOpen }) => ({
      isSticky,
      sectionMenu: isHamburgerOpen && !isSticky,
    }));
  };

  /**
   * determine which header type to render based on page data
   * @param   {string} type page type from api
   * @returns {JSX|null} the appropriate header markup
   */
  getHeaderLayout = () => {
    const {
      config: {
        pageTitle,
        sectionTitle,
        fixedSectionUrl,
        verticalRoot,
        showGlobalNav,
        showLinks,
        subNavComponent,
        links: {
          active,
        },
      },
    } = this.props;
    let { config: { sectionUrl } } = this.props;
    const relativeUri = toRelativeUrl(this.data.uri);
    const isLocalContent = isValidString(relativeUri) && relativeUri.startsWith('/local/');
    const isSection = this.data.type === 'section';
    let menuType = menuTypes.SECTION_MENU;
    if (!fixedSectionUrl && active && !sectionUrl) {
      sectionUrl = active.link;
    }

    if (this.data.show) {
      return this.renderShowContentHeader();
    }

    if (isSection && verticalRoot) {
      menuType = menuTypes.BRANDED_SECTION_MENU;
      return (
        <Fragment>
          {showGlobalNav && !isLocalContent && this.renderGlobalNav(menuType)}
          {this.renderBrandedHeader()}
        </Fragment>
      );
    }

    if (subNavComponent) {
      menuType = menuTypes.BRANDED_SUBNAV;
    }

    return (
      <Fragment>
        {showGlobalNav && !isLocalContent && this.renderGlobalNav(menuType)}
        {this.renderSectionTitleHeader({
          sectionUrl,
          // To allow other content types headers to override
          showLinks,
          title: isSection ? pageTitle || sectionTitle : sectionTitle,
        })}
      </Fragment>
    );
  };

  /**
   * Renders the global nav
   * @param   {string} menuType menu type
   * @returns {JSX} the appropriate header markup
   */
  renderGlobalNav = (menuType) => {
    const {
      config: {
        variant,
        ...rest
      },
    } = this.props;

    return (
      <GlobalNav
        {...rest}
        variant={variant}
        isDesktop={this.isDesktop}
        toggleSectionMenu={this.toggleSectionMenu}
        activePath={this.data.uri}
        menuType={menuType}
      />
    );
  }

  /**
   * handle the stickyHeader visibility on brandedHeader
   * @param {number} scrollTop scroll top value
   * @returns {boolean}
   */
  shouldApplySticky = (scrollTop) => {
    /* eslint-disable react/destructuring-assignment */
    let result;
    const { brandedRef: { current: currentBrandedRef } } = this;
    if (currentBrandedRef && scrollTop <= currentBrandedRef.child.current.offsetHeight) {
      this.setState({ brandedStickyHeader: false });
      result = false;
    } else if (
      currentBrandedRef
      && scrollTop > currentBrandedRef.child.current.offsetHeight
      && !this.state.brandedStickyHeader
    ) {
      this.setState({
        brandedStickyHeader: true,
        brandedSectionMenu: false,
        brandedSubNav: false,
      });
      result = true;
    }

    return result;
  };

  /**
   * Handle on toggle search change
   */
  toggleSearchChange = () => {
    this.setState(prevState => ({ search: !prevState.search }));
  };

  /**
   * on toggle section menu
   * @param {Object} event result event
   * @param {string} type header type
   */
  toggleSectionMenu = (event, type) => {
    const { isSticky } = this.state;
    this.setState(
      prevState => ({ [type]: !prevState[type] }),
      () => {
        if (this.state[type]) {
          GlobalHeader.trackHamburgerExpanded();
        }
      }
    );

    if (this.isDesktop) {
      global.document.body.classList.toggle('sections-open');
    } else if (isSticky) {
      global.document.body.classList.toggle('sections-mobile-open-sticky');
    } else {
      global.document.body.classList.toggle('sections-mobile-open');
    }
  };

  /**
   * renderBrandedHeader
   * @returns {JSX} the header to display
   */
  renderBrandedHeader = () => {
    const {
      props: { config },
      state: { search, brandedSectionMenu },
    } = this;

    return (
      <Fragment>
        <BrandedHeader
          toggleSectionMenu={this.toggleSectionMenu}
          toggleSearchChange={this.toggleSearchChange}
          isSearchOpen={search}
          activePath={this.data.uri}
          hamburgerOpen={brandedSectionMenu}
          ref={this.brandedRef}
          {...config}
        />
        {this.renderSectionTitleHeader(
          {
            title: config.pageTitle || config.sectionTitle,
          },
          true
        )}
      </Fragment>
    );
  };

  /**
   * SectionTitle header
   * @param {boolean} showLinks whether or not to display the Subnav links
   * @param {boolean} hasCustomRule custom rule for apply or not the sticky header
   * @returns {JSX} the header to display
   */
  renderSectionTitleHeader = (
    { showLinks = true, ...configOverrides } = {},
    hasCustomRule = false
  ) => {
    /* eslint-disable react/destructuring-assignment */
    const {
      brandedStickyHeader, search, sectionMenu, isSticky, brandedSubNav,
    } = this.state;
    let config = Object.assign({}, this.props.config, configOverrides);
    const showContent = !hasCustomRule || (hasCustomRule && brandedStickyHeader);
    const { setSticky = true } = config;
    this.props.config.renderingOptions.showLinks = showLinks;
    // Custom settings for the sticky state
    if (isSticky && this.props.config.stickyHeaderSettings) {
      config = Object.assign({}, config, this.props.config.stickyHeaderSettings);
    }
    const titleContent = (
      <SectionTitle
        toggleSectionMenu={this.toggleSectionMenu}
        toggleSearchChange={this.toggleSearchChange}
        isSearchOpen={search}
        hamburgerOpen={sectionMenu}
        hamburgerOpenSubNav={brandedSubNav}
        isSticky={isSticky}
        {...config}
      />
    );

    if (!setSticky) {
      return titleContent;
    }

    return (
      <StickyWrapper
        className={classnames(HeaderStyles.hideSubNav, {
          [HeaderStyles.customSticky]: brandedStickyHeader,
        })}
        shouldApply={hasCustomRule ? this.shouldApplySticky : undefined}
        onChange={this.onStickyChange}
      >
        {showContent && titleContent}
        {!isSoccerMatchPage(Store) && <LogOutBar variant="light" />}
      </StickyWrapper>
    );
  };

  /**
   * Render Show content header
   * @param {string} menuType type of menu
   * @returns {JSX}
   */
  renderShowContentHeader = () => {
    const {
      props: { config },
      state: {
        search,
        sectionMenu,
        isSticky,
        brandedSubNav,
      },
    } = this;
    const { setSticky = true } = config;
    const title = !this.isDesktop ? config.sectionTitle : null;
    // We don't wanna load the default subnav in here
    const renderingOptions = {
      ...config.renderingOptions,
      showLinks: false,
    };
    const { type: pageType } = this.data;

    // SectionTitle component sans sticky wrapper
    let sectionTitle = (
      <SectionTitle
        toggleSectionMenu={this.toggleSectionMenu}
        toggleSearchChange={this.toggleSearchChange}
        isSearchOpen={search}
        hamburgerOpen={sectionMenu}
        hamburgerOpenSubNav={brandedSubNav}
        isSticky={isSticky}
        title={title}
        {...config}
        subNavComponent={null}
        renderingOptions={renderingOptions}
      />
    );

    // If sticky is enabled, add a sticky wrapper
    if (setSticky) {
      sectionTitle = (
        <StickyWrapper
          onStickyChange={this.onStickyChange}
        >
          {sectionTitle}
          {!isSoccerMatchPage(Store) && <LogOutBar variant="light" />}
        </StickyWrapper>
      );
    }

    return (
      <Fragment>
        {sectionTitle}
        {this.renderGlobalNav(menuTypes.SECTION_MENU)}
        {
          config.subNavComponent
          && (
            <SubNav
              {...config}
              links={config.links.primary}
              pageType={pageType}
            />
          )
        }
      </Fragment>
    );
  };

  /**
   * render
   * @returns {JSX} Render the header along with the {@link ./AllSections|AllSections} menu
   */
  render() {
    return Features.header.hideHeaderFooter()
      ? null
      : (
        <div className={HeaderStyles.header}>
          {this.getHeaderLayout()}
        </div>
      );
  }
}

/**
 * propTypes
 * @property {Object} config - The header configuration
 * @property {Object} [config.renderingOptions] - Options to the header component
 * @property {Object} [config.theme] - The color theme values
 * @property {Object} config.links - The sub-navigation links configuration
 * @property {boolean} [config.tSticky=true] - If false does not put the header sticky
 * @property {string} [config.variant] - The background variant light/dark
 * @property {string} config.sectionTitle - The section title from API
 * @property {string} [config.pageTitle] - The page title from API
 * @property {Object} [config.stickyHeaderSettings] - Custom settings for the sticky header
 * @property {Object} [config.showGlobalNav] - Flag to turn on/off global nav
 */
GlobalHeader.propTypes = {
  config: PropTypes.shape({
    renderingOptions: PropTypes.object,
    theme: PropTypes.object,
    links: PropTypes.shape({
      primary: PropTypes.array.isRequired,
      active: PropTypes.object,
    }).isRequired,
    setSticky: PropTypes.bool,
    variant: PropTypes.oneOf(['light', 'dark']),
    sectionTitle: PropTypes.string.isRequired,
    pageTitle: PropTypes.string,
    stickyHeaderSettings: PropTypes.object,
    showGlobalNav: PropTypes.bool,
    fixedSectionUrl: PropTypes.bool,
    verticalRoot: PropTypes.bool,
    showLinks: PropTypes.bool,
    subNavComponent: PropTypes.string,
    sectionUrl: PropTypes.string,
  }),
};

export default GlobalHeader;
