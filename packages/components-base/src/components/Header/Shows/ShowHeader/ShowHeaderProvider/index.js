/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import {
  getDevice,
  getEntryByKey,
} from '@univision/fe-commons/dist/store/storeHelpers';
import { CERULEAN_BLUE } from '@univision/fe-commons/dist/utils/styled/constants';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';

import GlobalNav from '../../../HeaderProvider/GlobalNav';
import SectionTitle from '../../../HeaderProvider/SectionTitle';
import StickyWrapper from '../../../../StickyWrapper';
import Talent from '../../Talent';
import menuTypes from '../../../data/menuTypes.json';
import Navigation from '../../../../Navigation';

/**
 * Header provider component
 */
class ShowHeaderProvider extends Component {
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
   * Constructor method
   * @param {Object} props of the component
   */
  constructor(props) {
    super(props);
    this.state = {
      isSticky: false,
    };
    this.data = getEntryByKey(Store, 'data') || {};
    this.isDesktop = (getDevice(Store) === 'desktop');
  }

  /**
   * Update the sticky flag in the State.
   * @param {boolean} isSticky Sticky flag.
   */
  onStickyChange = (isSticky) => {
    this.setState({
      isSticky,
    });
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
          ShowHeaderProvider.trackHamburgerExpanded();
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

    if (!this.state.sectionMenu && getKey(event, 'target.innerText') === 'MÁS') {
      NavigationTracker.track(NavigationTracker.events.link, { type: 'global', text: 'Mas' }, null);
    }
  };

  /**
   * Handle on toggle search change
   */
  toggleSearchChange = () => {
    this.setState(prevState => ({ search: !prevState.search }));
  };

  /**
   * Global nav render method
   * @returns {JSX}
   */
  renderGlobalNav() {
    const {
      config: {
        ...globalNavProps
      },
    } = this.props;
    const menuType = menuTypes.SECTION_MENU;

    return (
      <GlobalNav
        {...globalNavProps}
        menuType={menuType}
        isDesktop={this.isDesktop}
        toggleSectionMenu={this.toggleSectionMenu}
      />
    );
  }

  /**
   * Render the section title
   * @returns {JSX}
   */
  renderSectionTitle() {
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

    const sectionTitle = (
      <SectionTitle
        isSearchOpen={search}
        toggleSearchChange={this.toggleSearchChange}
        toggleSectionMenu={this.toggleSectionMenu}
        hamburgerOpen={sectionMenu}
        hamburgerOpenSubNav={brandedSubNav}
        isSticky={isSticky}
        title={title}
        {...config}
      />
    );

    if (!setSticky) {
      return sectionTitle;
    }

    return (
      <StickyWrapper
        onStickyChange={this.onStickyChange}
      >
        {sectionTitle}
      </StickyWrapper>
    );
  }

  /**
   * Render show content
   * @returns {JSX}
   */
  renderShowContent() {
    const {
      config: {
        airTimeText,
        headerLogo,
        sectionUrl,
        subNavBackground = {},
      },
    } = this.props;

    const componentProps = {
      uri: sectionUrl,
      backgroundColor: getKey(subNavBackground, 'color', CERULEAN_BLUE),
      background: getKey(subNavBackground, 'image', ''),
      logo: headerLogo,
      subtitle: airTimeText,
    };

    return <Talent {...componentProps} />;
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    return (
      <Fragment>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
        {this.renderShowContent()}
      </Fragment>
    );
  }
}

ShowHeaderProvider.propTypes = {
  config: PropTypes.shape({
    setSticky: PropTypes.bool,
    sectionTitle: PropTypes.string,
    airTimeText: PropTypes.string,
    headerLogo: PropTypes.string,
    sectionUrl: PropTypes.string,
    subNavBackground: PropTypes.string,
  }),
};

export default ShowHeaderProvider;
