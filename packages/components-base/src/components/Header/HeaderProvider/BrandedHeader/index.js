import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { exists, getKey } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import Link from '../../../Link';
import { chooseBgStyle } from '../../data/helpers';
import Subnav from '../Subnav';
import Logo from '../../../Logo';
import Search from '../../../Search';
import FollowMenu from '../../../FollowMenu';
import SectionsButton from '../SectionsButton';
import menuTypes from '../../data/menuTypes.json';
import ButtonUniNow from '../../../widgets/ButtonUniNow';

import Styles from './BrandedHeader.scss';

/* eslint-disable react/prefer-stateless-function */
/**
 * Branded Header
 * added as a class for reference use
 * @param {Object} props component props
 * @returns {JSX} the header
 */
class BrandedHeader extends React.Component {
  child = React.createRef();

  /**
   * render
   * @returns {JSX} Render the header along with the {@link ./AllSections|AllSections} menu
   */
  render() {
    const {
      backgroundTheme,
      hamburgerOpen,
      isSearchOpen,
      isTudn,
      links,
      logoDesktop,
      logoMobile,
      logoUrl,
      networks,
      renderingOptions,
      sectionTitle,
      sectionUrl,
      showTitleOnBranded,
      styling,
      subNavBackground,
      theme,
      toggleSearchChange,
      toggleSectionMenu,
      variant,
    } = this.props;

    const isDarkIcon = theme?.mainIconIsDark || false;
    const hasBackground = styling !== undefined;
    const defaultColor = variant === 'dark' ? 'white' : 'black';
    const themeVariant = backgroundTheme ? 'dark' : variant;
    const color = getKey(theme, 'primary', defaultColor);
    const device = getDevice(Store);
    const isDesktop = device === 'desktop';
    const label = isDesktop ? 'Secciones' : null;
    const closeLabel = isDesktop ? 'Cerrar' : null;
    const forceMobileView = !isDesktop;
    const { showSearch, showLinks, showUniNow } = { ...renderingOptions };
    let bgStyle = {};
    if (getKey(backgroundTheme, 'primary')) {
      bgStyle = {
        backgroundColor: hasBackground ? 'transparent' : backgroundTheme.primary,
      };
    }

    const styleBg = chooseBgStyle(isTudn, styling);
    return (
      <div
        className={classnames({
          [Styles.tudnBackground]: isTudn,
        })}
        ref={this.child}
        style={styleBg}
      >
        <div
          className={classnames(Styles.brandedHeader, Styles[themeVariant], {
            [Styles.tudn]: isTudn,
          })}
          data-element-name="BrandedHeader"
          style={bgStyle}
        >
          <div className={`container ${Styles.container}`}>
            <SectionsButton
              primaryControl
              isTudn={isTudn}
              label={label}
              closeLabel={closeLabel}
              className={classnames(Styles.sections, { [Styles.forceLeftSection]: isTudn })}
              onClick={e => toggleSectionMenu(e, menuTypes.BRANDED_SECTION_MENU)}
              open={hamburgerOpen}
              variant={themeVariant}
            />
            <div className={classnames({ [Styles.justifyLogo]: isTudn })}>
              <Logo
                uri={logoUrl}
                src={isDesktop ? logoDesktop : logoMobile}
                className={Styles.logo}
              />
              {showTitleOnBranded
                && exists(sectionUrl) && (
                  <div>
                    <Link
                      checkUserLocation
                      href={sectionUrl}
                      className={classnames('uvs-font-a-bold', Styles.brandedTitle)}
                      style={{ color }}
                    >
                      {sectionTitle}
                    </Link>
                  </div>
              )}
            </div>
            <div className={classnames(Styles.rightContent, {
              [Styles.removeRightContent]: isTudn,
            })}
            >
              {exists(networks) && !showUniNow && (
                <FollowMenu
                  isTudn={isTudn}
                  networks={networks}
                  className={Styles.followMenu}
                  useLegacy
                  variant={themeVariant}
                  forceMobileView={forceMobileView}
                />
              )}
              {showSearch && (
                <Search
                  variant={themeVariant}
                  className={classnames(Styles.search, {
                    [hamburgerOpen]: Styles.hide,
                  })}
                  onToggle={toggleSearchChange}
                  open={isSearchOpen}
                  formStyle={{ ...bgStyle }}
                  variantLogoDark={isDarkIcon}
                />
              )}
              {showUniNow && (
                <ButtonUniNow />
              )}
            </div>
          </div>
        </div>
        {showLinks && (
          <Subnav
            styling={styling}
            subNavBackground={subNavBackground}
            isBrandedHeader
            isTudn={isTudn}
            theme={theme}
            links={links.primary}
            variant={variant}
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
 * @property {string} logoMobile - Url of Logo image in mobile
 * @property {string} logoDesktop - Url of Logo image in desktop
 */

BrandedHeader.propTypes = {
  logoUrl: PropTypes.string,
  logoDesktop: PropTypes.string,
  logoMobile: PropTypes.string,
  toggleSectionMenu: PropTypes.func.isRequired,
  toggleSearchChange: PropTypes.func.isRequired,
  isSearchOpen: PropTypes.bool,
  hamburgerOpen: PropTypes.bool,
  variant: PropTypes.oneOf(['light', 'dark']),
  renderingOptions: PropTypes.shape({
    showLinks: PropTypes.bool,
    showSearch: PropTypes.bool,
    showUniNow: PropTypes.bool,
  }),
  // @property {boolean} [isTudn] - If true activates the TUDN themes and styling
  // for TUDN/Deportes branded headers.
  isTudn: PropTypes.bool,
  theme: PropTypes.object,
  backgroundTheme: PropTypes.object,
  networks: PropTypes.array,
  showTitleOnBranded: PropTypes.bool,
  sectionTitle: PropTypes.string,
  sectionUrl: PropTypes.string,
  styling: PropTypes.object,
  subNavBackground: PropTypes.object,
  links: PropTypes.shape({
    primary: PropTypes.array,
    secondary: PropTypes.array,
    global: PropTypes.array,
  }),
};

BrandedHeader.defaultProps = {
  renderingOptions: {
    showSearch: true,
    showUniNow: false,
  },
  isTudn: false,
};

export default BrandedHeader;
