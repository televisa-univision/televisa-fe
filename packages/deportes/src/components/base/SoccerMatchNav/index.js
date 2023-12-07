import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import classnames from 'classnames';
import Button from '@univision/shared-components/dist/components/v2/Button';
import features from '@univision/fe-commons/dist/config/features';
import NavWrapper from '@univision/shared-components/dist/components/v2/NavWrapper';
import {
  isValidArray, exists, locationRedirect, isInViewport,
} from '@univision/fe-commons/dist/utils/helpers';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import Styles from './SoccerMatchNav.scss';

/**
 * Soccer Match Nav component
 * @param {!Object} props - components props
 * @returns {?JSX}
 */
class SoccerMatchNav extends Component {
  /**
   * Setup component state.
   */
  constructor() {
    super();

    this.state = {
      active: 0,
    };
    this.hasCLickedNav = false;
    this.toggleActiveTab = this.toggleActiveTab.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.throttleOnScroll = throttle(this.onScroll, 100).bind(this);
  }

  /**
   * Set onScroll listener
   */
  componentDidMount () {
    window.addEventListener('scroll', this.throttleOnScroll);
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttleOnScroll);
  }

  /**
   * Listen scroll event and update nav when scroll over element in viewport
   * @access public
   */
  onScroll () {
    const { navLinks } = this.props;
    if (isValidArray(navLinks) && !this.hasCLickedNav) {
      navLinks.map((nav, index) => {
        if (isInViewport(document.getElementById(nav.type))) {
          this.toggleActiveTab(index, nav.href);
        }
        return null;
      });
    }
    this.hasCLickedNav = false;
  }

  /**
   * Toggle active tab
   * @param {number} index - index number
   * @param {string} href - link to go to
   * @param {bool} isClicked - if it comes from being clicked
   */
  toggleActiveTab(index, href, isClicked = false) {
    this.setState({
      active: index,
    });
    this.hasCLickedNav = isClicked;
    if (exists(global.window) && href) {
      WidgetTracker.track(WidgetTracker.events.engagement, {
        target: `matches-nav-mc-${href}`,
      },
      locationRedirect(href));
    }
  }

  /**
   * Render Method
   * @returns {JSX}
   */
  render() {
    const { active } = this.state;
    const isWorldCupMVP = features.deportes.isWorldCupMVP();
    const {
      navLinks,
      className,
    } = this.props;
    if (!isValidArray(navLinks)) {
      return null;
    }

    const navContent = navLinks.map((nav, i) => (
      <Button
        key={`tab${nav.name}`}
        type="matchNav"
        onPress={() => this.toggleActiveTab(i, nav.link, true)}
        isActive={i === active}
        className={classnames(Styles.navButton, Styles.tudn, {
          [Styles.active]: i === active,
          [Styles.isWorldCupMVP]: isWorldCupMVP,
          [Styles.uppercase]: !isWorldCupMVP,
        })}
        isTudn
        isWorldCupMVP={isWorldCupMVP}
      >
        {nav.name}
      </Button>
    ));

    return (
      <div className="uvs-widget">
        <div className={classnames(Styles.navWrapper, Styles.tudn, {
          [Styles.withScroll]: navLinks.length > 3,
        })}
        >
          <NavWrapper
            isCentered
            className={classnames(
              Styles.nav,
              className,
              { [Styles.noScroll]: navLinks.length < 4 }
            )}
            isWorldCupMVP={isWorldCupMVP}
          >
            {navContent}
          </NavWrapper>
        </div>
      </div>
    );
  }
}

/**
 * @property {array} navLinks - navigation links
 * @property {string} className - the class modifier
 */
SoccerMatchNav.propTypes = {
  navLinks: PropTypes.array,
  className: PropTypes.string,
};

SoccerMatchNav.defaultProps = {
  navLinks: [],
  className: '',
};

export default SoccerMatchNav;
