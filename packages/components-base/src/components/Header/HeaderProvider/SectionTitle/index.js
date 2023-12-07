import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { BLACK, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { globalComponents } from '@univision/fe-commons/dist/config';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';
import Link from '../../../Link';

import Search from '../../../Search';
import Logo from '../../../Logo';
import SectionsButton from '../SectionsButton';
import Subnav from '../Subnav';
import FollowMenu from '../../../FollowMenu';
import menuTypes from '../../data/menuTypes.json';
import ButtonUniNow from '../../../widgets/ButtonUniNow';

import Styles from './SectionTitle.scss';

/**
 * Render a header with this layout:
 * -----------------------------------
 * [Menu]   [Title|Logo]    [Widgets]
 * -----------------------------------
 *            [Sub Nav]
 * -----------------------------------
 * The component provides a default implementation for each element,
 * but it can be overridden using props.override. See './overrides.js' for more info.
 */
@asDeferrer
class SectionTitle extends React.Component {
  /**
   * Constructor
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);
    this.isMobile = getDevice(Store) === 'mobile';
    this.onUserLoggedHandler = this.onUserLoggedHandler.bind(this);
    this.onSectionButtonClick = this.onSectionButtonClick.bind(this);
    this.brandingTitle = React.createRef();
    this.wrapperTitle = React.createRef();
  }

  /**
   * Initial State
   */
  state = {
    isLoggedIn: false,
    animateClass: '',
    translationStyle: {},
  };

  /**
   * Check the device from the store to ini the title animation.
   */
  componentDidMount() {
    if (this.isMobile) {
      this.setAnimation();
    }
  }

  /**
   * Fired when a section button is clicked.
   * @param {Object} event Click event
   */
  onSectionButtonClick(event) {
    const { toggleSectionMenu } = this.props;
    toggleSectionMenu(event, menuTypes.SECTION_MENU);
  }

  /**
   * Handler when user is logged in
   * @access public
   * @param {boolean} isLoggedIn to know if user is logged in or not
   */
  onUserLoggedHandler(isLoggedIn) {
    this.setState({ isLoggedIn });
  }

  /**
   * Init the animation to right
   */
  setAnimation = () => {
    this.defer(() => {
      if (this.wrapperTitle.current && this.brandingTitle.current) {
        const titleWidth = this.wrapperTitle.current.offsetWidth;
        const maxWidth = this.brandingTitle.current.offsetWidth;
        if (titleWidth > maxWidth) {
          const translateX = titleWidth - window.innerWidth + maxWidth;
          this.setState({
            animateClass: Styles.toAnimate,
            translationStyle: {
              transform: `translate3d(-${translateX}px, 0, 0)`,
            },
          });
        }
      }
    });
  };

  /**
   * Check if the title have more characters that global truncate value and whether is in desktop.
   * @returns {boolean} returns `true` if the conditions matched, else `false`.
   */
  isLongTitleInDesktop() {
    const { title } = this.props;
    return title && title.length >= globalComponents.truncate.title && !this.isMobile;
  }

  /**
   * Check if the title have more characters that limit that can show in mobile viewport.
   * @returns {boolean} returns `true` if the conditions matched, else `false`.
   */
  isLongTitleInMobile() {
    const { title } = this.props;
    return title && title.length >= 20 && this.isMobile;
  }

  /**
   * Returns the widgets to render in this header.
   * Builds the default widgets to use if props.widgets is not defined.
   * By default the widgets include a Search and FollowMenu component.
   *
   * @param {string|null} customVariant Optional custom variant to use.
   * @returns {SectionTitle.props.widgets|*}
   */
  renderHeaderWidgets = (customVariant) => {
    const {
      isSearchOpen,
      isTudn,
      showFollowUs,
      renderingOptions,
      toggleSearchChange,
      networks,
    } = this.props;
    const { isLoggedIn } = this.state;
    const { showSearch, showUniNow } = { ...renderingOptions };

    let columnValue;
    let searchOpenColumn;

    if (isTudn) {
      columnValue = '1';
      searchOpenColumn = '1';
    } else {
      columnValue = this.isLongTitleInDesktop() ? '2' : '3';
      searchOpenColumn = '3';
    }

    return (
      <div
        className={classnames(
          { [Styles.userLoggedIn]: isLoggedIn },
          isSearchOpen && `col-12 col-sm-${searchOpenColumn}`,
          !isSearchOpen && `col-${columnValue}`,
          Styles.searchContainer
        )}
      >
        {showFollowUs
        && !isSearchOpen && (
          <FollowMenu
            networks={networks}
            className={Styles.followMenu}
            useLegacy
            variant={customVariant}
          />
        )}
        {showSearch && (
          <Search
            open={isSearchOpen}
            onToggle={toggleSearchChange}
            className={classnames(Styles.icon, Styles.search)}
            variant={customVariant}
          />
        )}
        {showUniNow && (
          <ButtonUniNow />
        )}
      </div>
    );
  };

  /**
   * Returns the menu to render in this header.
   * @param {string|null} customVariant Optional custom variant to use.
   * @returns {SectionTitle.props.menu|*}
   *
   */
  renderHeaderMenu = (customVariant) => {
    const {
      title,
      isSearchOpen,
      isTudn,
      hamburgerOpen,
      logoUrl,
      logoMap,
      logoMobile,
    } = this.props;

    let columnValue;
    if (isTudn) {
      columnValue = '1';
    } else {
      columnValue = this.isLongTitleInDesktop() ? '2' : '3';
    }

    return (
      <div
        className={classnames(
          `col-${columnValue}`,
          Styles.sectionControlContainer,
          {
            [Styles.mobileHide]: isSearchOpen,
            [Styles.sectionControlSearchOpen]: isSearchOpen,
          }
        )}
      >
        <SectionsButton
          primaryControl
          isTudn={isTudn}
          onClick={this.onSectionButtonClick}
          variant={customVariant}
          className={Styles.section}
          open={hamburgerOpen}
        />
        {title && (
          <span
            className={classnames(Styles.logoMobile, Styles.button, {
              [Styles.isTudn]: isTudn,
            })}
          >
            <Logo uri={logoUrl} src={logoMobile} logoMap={logoMap && logoMap.mobile} />
          </span>
        )}
      </div>
    );
  };

  /**
   * Returns the main header.
   *
   * @param {string|null} color Main color for the header.
   * @param {string|null} background background color for th eheader
   * @returns {SectionTitle.props.mainHeader|*}
   */
  renderHeaderTitle = (color, background) => {
    const {
      isSearchOpen,
      isTudn,
      logoUrl,
      logoMobile,
      logoDesktop,
      logoMap,
      title,
      sectionUrl,
    } = this.props;

    const {
      animateClass,
      translationStyle,
    } = this.state;
    const isMobileAndNoTitle = !title && this.isMobile;
    let columnValue = '6';
    let backgroundColorStyle = { color, background };

    if (isTudn) {
      columnValue = '10';
      backgroundColorStyle = { color, background: 'none' };
    } else if (this.isLongTitleInDesktop()) {
      columnValue = (isSearchOpen ? '7' : '8');
    } else if (this.isLongTitleInMobile()) {
      columnValue = '7';
    }

    return (
      <div
        className={classnames(
          `col-${columnValue}`,
          Styles.branding,
          animateClass,
          {
            [Styles.mobileHide]: isSearchOpen,
            [Styles.mobileNoTitleCenter]: isMobileAndNoTitle,
            [Styles.justifyTitle]: isTudn,
          },
        )}
        ref={this.brandingTitle}
      >
        {!title && (
          <Logo
            uri={logoUrl}
            src={logoMobile}
            className={classnames(Styles.logo, Styles.logoMobileNoTitle)}
            logoMap={logoMap && logoMap.mobile}
          />
        )}
        <Logo
          uri={logoUrl}
          src={this.isLongTitleInDesktop() ? logoMobile : logoDesktop}
          className={classnames(Styles.logo, Styles.logoDesktop, {
            [Styles.isTudn]: isTudn && title,
            [Styles.logoDesktopNoTitle]: isTudn && !title,
          })}
          logoMap={logoMap && logoMap.desktop}
        />
        {title && (
          <Fragment>
            <span
              className={classnames(Styles.sectionName, Styles.divider)}
              style={backgroundColorStyle}
            >
              /
            </span>
            <div
              className={classnames(
                Styles.wrapperTitle,
                {
                  [Styles.longTitle]: this.isLongTitleInDesktop() || this.isLongTitleInMobile(),
                }
              )}
              ref={this.wrapperTitle}
              style={translationStyle}
            >
              <Link
                checkUserLocation={isTudn}
                href={sectionUrl}
                className={Styles.sectionName}
                style={{ color }}
              >
                {title}
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    );
  };

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      links,
      theme,
      className,
      renderingOptions,
      sectionTitleBg,
      subNavBackground,
      showFollowUs,
      variant,
      styling,
      isSticky,
      subNavComponent,
      toggleSectionMenu,
      hamburgerOpen,
      hamburgerOpenSubNav,
      isTudn,
    } = this.props;

    let shouldHideUpper = false;
    // customVariant: is ussed to pass it to sectionTitle component and children
    // variant: is ussed to pass it to subNav component
    let customVariant = variant;
    let themeClass = '';

    const { primary } = theme || {};
    const background = sectionTitleBg ? primary : null;
    const headerStyle = {
      background,
    };
    let color = primary;

    if (variant === 'dark') {
      headerStyle.background = BLACK;
    }

    // Force the change of customVariant when sectionTitleBg exists
    if (sectionTitleBg && primary) {
      color = WHITE;
      customVariant = 'dark';
      themeClass = Styles.theme;
    }
    if (styling.backgroundImage) {
      headerStyle.backgroundImage = `url(${styling.backgroundImage})`;
      headerStyle.backgroundSize = 'cover';
    }
    // Condition for TUDN/Deportes to not affect locales headers background image on sticky style
    if (isTudn) {
      if (variant !== 'dark' || isSticky) {
        headerStyle.backgroundImage = null;
      }

      if (variant === 'dark') {
        color = WHITE;
      }
    }

    // If this header has branded sub nav and is not currently sticky
    if (subNavComponent && !isSticky) {
      // hide the sections title top div aka upper
      shouldHideUpper = true;
    }

    color = getKey(subNavBackground, 'text', color);
    return (
      <div
        className={classnames(Styles[customVariant], className, themeClass)}
        data-element-name="SectionTitle"
      >
        <div
          className={classnames(Styles.upper, { [Styles.hideUpper]: shouldHideUpper })}
          style={headerStyle}
        >
          <div className="container">
            <div
              className={classnames('row no-gutters', { [Styles.withFollowMenu]: showFollowUs })}
              style={{ background }}
            >
              { this.renderHeaderMenu(customVariant) }

              { this.renderHeaderTitle(color, headerStyle.background) }

              { this.renderHeaderWidgets(customVariant) }
            </div>
          </div>
        </div>
        {renderingOptions.showLinks && (
          <Subnav
            {...this.props}
            isTudn={isTudn}
            theme={theme}
            links={links.primary}
            variant={variant}
            toggleSectionMenu={toggleSectionMenu}
            hamburgerOpen={hamburgerOpen}
            hamburgerOpenSubNav={hamburgerOpenSubNav}
          />
        )}
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
 * @property {boolean} [isSticky] - If true hide section title when have subnav
 * @property {Function} hamburgerOpenSubNav - Callback to listen when hamburger subnav is open
 */
SectionTitle.propTypes = {
  links: PropTypes.shape({
    primary: PropTypes.array,
    secondary: PropTypes.array,
    global: PropTypes.array,
  }),
  title: PropTypes.string,
  logoDesktop: PropTypes.string,
  logoMobile: PropTypes.string,
  logoMap: PropTypes.shape({
    desktop: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        shape: PropTypes.string,
        coords: PropTypes.string,
        href: PropTypes.string,
      })
    ),
    mobile: PropTypes.arrayOf(
      PropTypes.shape({
        alt: PropTypes.string,
        shape: PropTypes.string,
        coords: PropTypes.string,
        href: PropTypes.string,
      })
    ),
  }),
  toggleSearchChange: PropTypes.func,
  toggleSectionMenu: PropTypes.func,
  hamburgerOpenSubNav: PropTypes.func,
  hamburgerOpen: PropTypes.bool,
  isSearchOpen: PropTypes.bool,
  isSticky: PropTypes.bool,
  // @property {boolean} [isTudn] - If true changes the headerStyle depending
  // on the sticky status of the section title component.
  isTudn: PropTypes.bool,
  logoUrl: PropTypes.string,
  sectionUrl: PropTypes.string.isRequired,
  renderingOptions: PropTypes.shape({
    showLinks: PropTypes.bool,
    showSearch: PropTypes.bool,
    showUniNow: PropTypes.bool,
  }),
  variant: PropTypes.oneOf(['dark', 'light']),
  className: PropTypes.string,
  theme: PropTypes.object,
  subNavComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
  sectionTitleBg: PropTypes.bool,
  showFollowUs: PropTypes.bool,
  networks: PropTypes.array,
  subNavBackground: PropTypes.shape({
    color: PropTypes.string,
    text: PropTypes.string,
  }),
  styling: PropTypes.shape({
    backgroundImage: PropTypes.string,
    subNavShadow: PropTypes.string,
  }),
  override: PropTypes.string,
};

SectionTitle.defaultProps = {
  logoUrl: '/',
  links: {},
  renderingOptions: {
    showLinks: true,
    showSearch: true,
    showUniNow: false,
  },
  styling: {},
  isTudn: false,
};

export default SectionTitle;
