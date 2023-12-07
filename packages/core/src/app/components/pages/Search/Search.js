import React from 'react';
import PropTypes from 'prop-types';
import Store from '@univision/fe-commons/dist/store/store';
import { Provider } from 'react-redux';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import { getPageData, getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import Header from '@univision/fe-components-base/dist/components/Header';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import GlobalWidget from '../../layout/GlobalWidget';
import MainWrapper from '../../layout/MainWrapper';

import SearchConnector from './SearchConnector';

/**
 * Search page component
 * @param {Object} props Component properties
 * @returns {XML}
 */
const Search = ({ page }) => {
  if (exists(page)) {
    const isDesktop = getDevice(Store) === 'desktop';
    const renderingOptions = {
      showSearch: false,
      showLinks: true,
    };

    if (isDesktop) {
      renderingOptions.showSearch = true;
    }

    return (
      <Provider store={Store}>
        <MainWrapper state={Store.getState()}>
          <Header
            pageData={getPageData(Store).data}
            pageCategory={pageCategories.UNIVISION}
            renderingOptions={renderingOptions}
          />
          <GlobalWidget />
          <SearchConnector />
          <Footer />
        </MainWrapper>
      </Provider>
    );
  }

  return null;
};

Search.propTypes = {
  page: PropTypes.object,
};

export default Search;
