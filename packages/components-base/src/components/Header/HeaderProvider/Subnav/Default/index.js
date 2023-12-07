import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getDevice, getSites } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  isValidArray, getKey, isValidObject, toAbsoluteUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import GlobalHeaderLink from '../../GlobalHeaderLink';
import { getLinks, trackSubnavClick } from '../helpers';
import getIcons from '../getIcons';
import DropDown from '../DropDown';

import Styles from './DefaultSubnav.scss';

/**
 * Sub Navigation Component
 */
export default class DefaultSubNav extends Component {
  /**
   * Initial State
   */
  state = {
    scrollerClass: Styles.noScroller,
    gradientRight: '',
    gradientLeft: '',
    toScroll: false,
  };

  /**
   * Available webapp sites
   */
  sites = getSites(Store);

  /**
   * Current user device
   */
  device = getDevice(Store);

  timeOut = null;

  subNavWrapper = React.createRef();

  subNavScroller = React.createRef();

  /**
   * Check the device from the store to init the title animation.
   */
  componentDidMount() {
    if (this.device === 'mobile' || this.device === 'tablet') {
      this.timeOut = setTimeout(this.addSwipeHelper, 500);
    }
  }

  /**
   * Cleanup event listeners
   */
  componentWillUnmount() {
    if (this.subNavWrapper.current) {
      this.subNavWrapper.current.removeEventListener('scroll', this.navScroll);
    }
    clearTimeout(this.timeOut);
  }

  /**
   * Adds the scroller class and the scroll event
   */
  addSwipeHelper = () => {
    if (this.subNavWrapper.current && this.subNavScroller.current) {
      const maxWidth = this.subNavWrapper.current.offsetWidth;
      const subNavWidth = this.subNavScroller.current.offsetWidth;
      if (subNavWidth > maxWidth) {
        this.setState({
          scrollerClass: Styles.scroller,
          gradientRight: Styles.gradientRight,
          toScroll: true,
        });
        this.subNavWrapper.current.addEventListener('scroll', this.navScroll);
      }
    }
  };

  /**
   * Nav Scroll handler:
   * This method is responsible for comparing the width of the list and the available area,
   * when the user scrolls on the nav.
   * It sets the different classes to hide and show the gradients.
   */
  navScroll = () => {
    const { gradientLeft, gradientRight, toScroll } = this.state;
    const scroll = this.subNavWrapper.current.scrollLeft;
    const maxWidth = this.subNavWrapper.current.offsetWidth;
    const subNavWidth = this.subNavScroller.current.offsetWidth;
    const scrollState = {};

    if (scroll >= subNavWidth - maxWidth) {
      scrollState.gradientRight = '';
    } else if (!gradientRight) {
      scrollState.gradientRight = Styles.gradientRight;
    }
    if (scroll === 0) {
      scrollState.gradientLeft = '';
      scrollState.toScroll = true;
    } else if (!gradientLeft && toScroll) {
      scrollState.gradientLeft = Styles.gradientLeft;
      scrollState.toScroll = false;
    }

    if (isValidArray(Object.keys(scrollState))) {
      this.setState(scrollState);
    }
  };

  /**
   * Renders the component
   * @returns {JSX}
   */
  render() {
    const {
      links, variant, theme, renderingOptions, styling, isTudn, isBrandedHeader,
    } = this.props;
    const { gradientRight, gradientLeft, scrollerClass } = this.state;

    let { subNavBackground } = this.props;

    if (!renderingOptions.showLinks || !Array.isArray(links) || !links.length) return null;

    const subNavLinks = getLinks(links, 980);

    if (!subNavBackground) {
      subNavBackground = {
        color: '#000000',
      };

      if (variant === 'light') {
        subNavBackground.color = '#ffffff';
      }
    }

    return (
      /* Special cases for the TUDN/Deportes section
       * On variants that are not 'dark', we are applying TUDN styles
       * to remove background and leave it default white.
       * On variant 'dark', we are adding 'tudnDarkSectionTitleNav'
       * TUDN style to apply the complementary TUDN color.
       */
      <div
        className={classnames(Styles.subnav, Styles[variant], Styles[getKey(theme, 'name')], {
          [Styles.bgTransparent]: isTudn && (isBrandedHeader || variant !== 'dark'),
          [Styles.tudnDarkSectionTitleNav]: isTudn && !isBrandedHeader && variant === 'dark',
        })}
        data-element-name="Subnav"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className={classnames(
                  Styles.subNavContent,
                  scrollerClass,
                  gradientRight,
                  gradientLeft
                )}
              >
                <nav
                  className={Styles.subNavWrapper}
                  ref={this.subNavWrapper}
                >
                  <div
                    className={Styles.subNavScroller}
                    ref={this.subNavScroller}
                  >
                    {subNavLinks.visible.map((link) => {
                      let Icon = null;
                      const iconData = getKey(link, 'icon');
                      // Horrible fix
                      const customClass = getKey(link, 'customClass', null);

                      if (isValidObject(iconData)) {
                        const IconType = getIcons(iconData.type);
                        Icon = IconType ? <IconType {...iconData.props} /> : null;
                      }

                      return (
                        <GlobalHeaderLink
                          onClick={() => trackSubnavClick(link.name)}
                          href={toAbsoluteUrl(link.link, this.sites[link.site])}
                          key={link.link}
                          theme={theme}
                          text={link.name}
                          active={link.active}
                          variant={variant}
                          target={link.target}
                          icon={Icon}
                          className={classnames(Styles.subNavLink, {
                            [Styles[customClass]]: customClass,
                          })}
                          activeLinkIndicatorColor={getKey(styling, 'activeLinkIndicatorColor')}
                        />
                      );
                    })}
                    {subNavLinks.hidden.length > 0 && (
                      <DropDown
                        links={subNavLinks}
                        variant={variant}
                        subNavBackground={subNavBackground}
                        isTudn={isTudn}
                      />
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DefaultSubNav.propTypes = {
  links: PropTypes.array.isRequired,
  variant: PropTypes.string,
  theme: PropTypes.object,
  renderingOptions: PropTypes.shape({
    showLinks: PropTypes.bool,
    showSearch: PropTypes.bool,
  }),
  subNavBackground: PropTypes.object,
  styling: PropTypes.object,
  // @property {boolean} [isTudn] - If true depending on the variant and
  // component that comes from changes the style on the parent element
  isTudn: PropTypes.bool,
  isBrandedHeader: PropTypes.bool,
};

DefaultSubNav.defaultProps = {
  variant: 'light',
  renderingOptions: {
    showLinks: true,
    showSearch: true,
  },
  isTudn: false,
  isBrandedHeader: false,
};
