/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import Store from '@univision/fe-commons/dist/store/store';
import {
  getTheme,
  getPageCategory,
  getSharingOptions,
  getRequestParams,
} from '@univision/fe-commons/dist/store/storeHelpers';
import { exists, getKey } from '@univision/fe-commons/dist/utils/helpers';
import ArticleMetadata from 'components/pages/Article/ArticleMetadata';
import RecipeMicrodata from 'components/pages/Article/RecipeMicrodata';

import MainWrapper from '../../../../components/layout/MainWrapper';
import ampFactory from '../../../utils/factories/ampFactory';
import AmpHeader from '../../header/AmpHeader';
import AmpFooter from '../../footer/AmpFooter';
import AmpRawHtml from '../../widgets/AmpRawHtml';
import AmpArticleBody from './ArticleBody/AmpArticleBody';
import AmpShareBar from '../../sharebar/AmpShareBar';
import ArticleContainer from './AmpArticle.styles';

/**
 * Container component rendering all pieces of an article
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const AmpArticle = ({ page }) => {
  if (exists(page)) {
    const articleType = getKey(page, 'articleType', '');
    const requestParams = getRequestParams(Store) || {};
    if ('articleRawHtml' in requestParams) {
      const body = ampFactory.mergeRawHtmls(page.body).filter(chunk => !chunk.skip);
      return <AmpRawHtml chunk={body[requestParams.articleRawHtml]} />;
    }
    const theme = getTheme(Store);
    return (
      <Provider store={Store}>
        <ThemeProvider theme={theme}>
          <MainWrapper state={Store.getState()}>
            <AmpHeader pageData={page} pageCategory={getPageCategory(Store)} />
            <AmpShareBar sharingOptions={getSharingOptions(Store)} />
            <div itemScope itemType="http://schema.org/NewsArticle">
              <ArticleMetadata page={page} />
              {articleType === 'recipe' && <RecipeMicrodata data={page} />}
              <ArticleContainer>
                <div className="row">
                  <div className="col-sm-12 col-md-10">
                    <AmpArticleBody {...page} theme={theme} />
                  </div>
                </div>
              </ArticleContainer>
            </div>
            <AmpFooter />
          </MainWrapper>
        </ThemeProvider>
      </Provider>
    );
  }
  return <div />;
};

/**
 * propTypes
 * @property {Object} page - The page object from content API
 * @property {Array} page.body - The body object from content API
 * @property {Object} radioStation - The radio object from store
 */
AmpArticle.propTypes = {
  page: PropTypes.object,
  leadType: PropTypes.object,
};

/**
 * Default Prop Values
 */
AmpArticle.defaultProps = {
  page: {},
};

export default AmpArticle;
