import React, { Fragment } from 'react';

import { renderToStaticMarkup } from 'react-dom/server';
import Article from 'app/AMP/components/pages/Article/AmpArticle';
import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import { getAssets } from 'app/utils/factories/pageFactory';
import { parseWidgets } from 'app/utils/factories/widgetFactory';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import contentTypes from '@univision/fe-commons/dist/constants/contentTypes';

import GlobalStyles from 'app/AMP/styles/AmpPage.styles';

const pageFactory = {
  getPageComponent(currentPage) {
    const pageData = getPageData(Store);
    if (pageData) {
      const { data } = pageData;
      // Creating store to be consistent with client flow and use it in some components
      switch (currentPage) {
        case 'article':
          return (
            <Fragment>
              <GlobalStyles />
              <Article page={data} site={pageData.site} widgets={parseWidgets(data)} />
            </Fragment>
          );
        default:
          return null;
      }
    }
    return null;
  },

  getHtmlAndCss(pageComponent) {
    return renderToStaticMarkup(pageComponent);
  },

  getAssets(page, assets) {
    return getAssets(`AMP${page}`, assets);
  },

  isAmpPage(path, contentType) {
    return exists(path) && path.indexOf('/amp/') === 0 && contentType === contentTypes.ARTICLE;
  },
};

export default pageFactory;
