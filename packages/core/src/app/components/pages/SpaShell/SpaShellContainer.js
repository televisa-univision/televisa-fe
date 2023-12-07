import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import createHistory from '@univision/fe-commons/dist/utils/helpers/history';

import { getVerticalNav } from '@univision/fe-components-base/dist/components/Header/data/helpers';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import { toRelativeUrl } from '@univision/fe-commons/dist/utils/helpers';
import getStyledTheme from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import Router from './Router/Router';
import ContentWrapper from './ContentWrapper';

/**
 * Container to handle the spa shell
 */
class SpaShellContainer extends PureComponent {
  /**
   * Main constructor
   * @param {Object} props Component props
   */
  constructor(props) {
    super(props);
    this.history = createHistory('');
  }

  /**
   * component did update method
   * @param {Object} prevProps - the previous props component
   */
  componentDidUpdate(prevProps) {
    const { page } = this.props;

    // Check 'originalUrl' instead of page data 'uri'
    // due to some virtual pages like '/futbol/liga-mx/estadisticas'.
    // convert to relative Url because in some points the prop is mutated and comes with domain
    if (toRelativeUrl(prevProps.page.originalUrl) !== toRelativeUrl(page.originalUrl)) {
      window.scrollTo(0, 0);
      MainTracking.updateSpaTracking(page);
      global.window.carsaverWidgetSearchInit = undefined;
    }
  }

  /**
   * Fetch data before route change
   * @param {string} uri the new route path
   */
  handleChange = async (uri) => {
    const {
      fetchPageData,
    } = this.props;

    fetchPageData(
      uri,
      {
        navPromise: getVerticalNav,
        themeFn: getStyledTheme,
        resetAds: true,
        meta: {
          initiator: 'spa',
        },
      }
    );
  };

  /**
   * Render component
   * @returns {JSX}
   */
  render() {
    const {
      page: {
        data,
        error,
        pageCategory,
      },
      initialComponent,
    } = this.props;
    return (
      <div>
        <Router beforeChange={this.handleChange} data={data} history={this.history}>
          <ContentWrapper
            data={data}
            error={error}
            pageCategory={pageCategory}
            initialComponent={initialComponent}
          />
        </Router>
      </div>
    );
  }
}

/**
 * @property {Function} fetchAnonUser create or retrieve from localStore the anonymous user data
 */
SpaShellContainer.propTypes = {
  page: PropTypes.object,
  fetchPageData: PropTypes.func,
  initialComponent: PropTypes.element,
};

export default SpaShellContainer;
