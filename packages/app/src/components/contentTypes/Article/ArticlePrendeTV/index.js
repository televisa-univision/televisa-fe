import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';

// eslint-disable-next-line no-restricted-imports
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import PrendeTVContext from '@univision/fe-prendetv/dist/context';

import getTheme from '@univision/fe-commons/dist/components/ThemeProvider/helpers';

import { PRENDETV } from '@univision/fe-commons/dist/constants/pageCategories';
import ArticleContent from '../ArticleContent';
import ArticleMetadata from '../ArticleMetadata';
import Styles from './ArticlePrendeTV.styles';

const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Article Prende tv variation component rendering all pieces of an article body
 * @returns {JSX}
 */
const ArticlePrendeTV = () => {
  const { device, page, requestParams } = useContext(PrendeTVContext);
  const data = page?.data;
  const theme = getTheme(PRENDETV, page);
  const pageData = {
    ...page,
    data: {
      ...data,
      isSensitive: true,
    },
    device,
    theme,
    requestParams,
  };

  Store.dispatch(setPageData({ ...pageData }));
  return !data ? <div /> : (
    <Provider store={Store}>
      <ThemeProvider>
        <Wrapper itemScope itemType="http://schema.org/NewsArticle">
          <ArticleMetadata page={pageData.data} />
          <ArticleContent
            content={pageData.data}
            depth={0}
            pageData={pageData}
          />
        </Wrapper>
      </ThemeProvider>
    </Provider>
  );
};

export default ArticlePrendeTV;
