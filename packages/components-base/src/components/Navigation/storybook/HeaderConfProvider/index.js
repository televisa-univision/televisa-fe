import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import getHeaderConf from '@univision/fe-commons/dist/utils/header/headerConf';
import { setHeaderConf } from '@univision/fe-commons/dist/store/actions/header/header-actions';
import { UNIVISION } from '@univision/fe-commons/dist/constants/pageCategories';
import ThemeProviderStory from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderStory';

/**
 * HeaderConfProvider component
 * Helps to bring the Navigation component into the Storybooks
 * @param {Object} props of the component
 * @param {Object} [data] - page data to feed the header configuration
 * @param {string} [device] - device being used to preview (mobile/tablet/desktop)
 * @param {string} [pageCategory] - configuration category to be loaded
 * @returns {JSX}
 */
const HeaderConfProvider = ({
  children,
  data,
  device,
  pageCategory,
  ...rest
}) => {
  Store.dispatch(setPageData({
    data,
    device,
    pageCategory,
    ...rest,
  }));
  Store.dispatch(setHeaderConf(getHeaderConf(data, pageCategory)));

  return (
    <Provider store={Store}>
      <ThemeProviderStory pageCategory={pageCategory} data={data}>
        {children}
      </ThemeProviderStory>
    </Provider>
  );
};

HeaderConfProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.array,
  ]),
  data: PropTypes.object,
  device: PropTypes.string,
  pageCategory: PropTypes.string,
};

HeaderConfProvider.defaultProps = {
  data: {},
  device: 'mobile',
  pageCategory: UNIVISION,
};

export default HeaderConfProvider;
