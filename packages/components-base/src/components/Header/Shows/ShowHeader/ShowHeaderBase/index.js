import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import { EN } from '@univision/fe-commons/dist/utils/localization/languages';
import features from '@univision/fe-commons/dist/config/features';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';

import insertionPoints from '../../../../widgets/WithWidgets/insertionPoints.json';
import ShowHeaderProvider from '../ShowHeaderProvider';
import WithWidgets from '../../../../widgets/WithWidgets';

/**
 * ShowHeaderBase component for binding methods.
 */
class ShowHeaderBase extends Component {
  /**
   * Constructor method
   * @param {Object} props of the compoonent
   */
  constructor(props) {
    super(props);
    this.state = {
      searchOpen: false,
      subNavOpen: false,
    };
    this.toggleSearch = this.toggleSearch.bind(this);
    this.toggleSubNav = this.toggleSubNav.bind(this);
  }

  /**
   * Toggle subnav state method
   */
  toggleSubNav() {
    this.setState(({ subNavOpen }) => ({
      subNavOpen: !subNavOpen,
    }));
  }

  /**
   * Toggle search state method
   */
  toggleSearch() {
    this.setState(({ searchOpen }) => ({
      searchOpen: !searchOpen,
    }));
  }

  /**
   * Render method.
   * @returns {JSX}
   */
  render() {
    const {
      renderingOptions,
      setSticky,
      showGlobalNav,
      pageData,
      variant,
    } = this.props;
    const { searchOpen, subNavOpen } = this.state;
    const navData = getKey(pageData, 'navData', {});

    // rendering options
    const isDesktop = getDevice(Store) === 'desktop';
    const shouldshowUniNow = features.header.buttonUniNow();
    const showSearch = getKey(navData, 'renderingOptions.showSearch', renderingOptions.showSearch);
    const shouldShowSearch = !isDesktop && shouldshowUniNow ? false : showSearch;
    const shouldShowLinks = EN !== navData.language && renderingOptions.showLinks;

    const headerConfig = {
      variant,
      links: {
        primary: [],
        secondary: [],
        global: [],
      },
      ...navData,
      isDesktop,
      renderingOptions: {
        showLinks: shouldShowLinks,
        showSearch: shouldShowSearch,
        showUniNow: shouldshowUniNow,
      },
      searchOpen,
      setSticky,
      showGlobalNav,
      subNavOpen,
      toggleSearch: this.toggleSearch,
      toggleSubNav: this.toggleSubNav,
    };

    let HeaderComponent = <ShowHeaderProvider config={headerConfig} />;
    HeaderComponent = WithWidgets(HeaderComponent, insertionPoints.belowHeader);
    return (
      <ErrorBoundary>
        <HeaderComponent />
      </ErrorBoundary>
    );
  }
}

ShowHeaderBase.propTypes = {
  renderingOptions: PropTypes.shape({
    showLinks: PropTypes.bool,
    showSearch: PropTypes.bool,
    showUniNow: PropTypes.bool,
  }),
  variant: PropTypes.string,
  setSticky: PropTypes.bool,
  showGlobalNav: PropTypes.bool,
  theme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }),
  pageData: PropTypes.object,
};

ShowHeaderBase.defaultProps = {
  renderingOptions: {
    showLinks: false,
    showSearch: true,
    showUniNow: false,
  },
  setSticky: true,
  showGlobalNav: true,
  variant: 'dark',
};

export default ShowHeaderBase;
