import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import AmpRawHtml from '../../AmpRawHtml';
import AmpHeader from '../../Header';
import AmpFooter from '../../Footer';
import AmpShareBar from '../../ShareBar';
import ampFactory from '../../../../utils/factories/ampFactory';
import ArticleMetadata from '../../../contentTypes/Article/ArticleMetadata.js';
import RecipeMicrodata from '../../../contentTypes/Article/RecipeMicrodata';
import AmpArticleBody from './ArticleBody';
import ArticleContainer from './Article.styles';

/**
 * Article AMP component
 * @param {Object} [pageData] - pageData from api response
 * @returns {JSX}
 */
const Article = ({ pageData }) => {
  const {
    data,
    requestParams = {},
    theme,
    pageCategory,
  } = pageData;
  const articleType = data?.articleType ?? '';

  if ('articleRawHtml' in requestParams) {
    const body = ampFactory.mergeRawHtmls(data?.body).filter(chunk => !chunk.skip);
    return <AmpRawHtml chunk={body[requestParams.articleRawHtml]} />;
  }

  const sharingOptions = data?.sharing?.options ?? {};

  return (
    <ThemeProvider theme={theme}>
      <AmpHeader
        theme={theme}
        pageData={data}
        siteName={pageData.site}
        pageCategory={pageCategory}
      />
      <AmpShareBar theme={theme} sharingOptions={sharingOptions} siteName={pageData.site} />
      <div itemScope itemType="http://schema.org/NewsArticle">
        <ArticleMetadata page={data} />
        {articleType === 'recipe' && <RecipeMicrodata data={data} />}
        <ArticleContainer>
          <div className="row">
            <div className="col-sm-12 col-md-10">
              <AmpArticleBody {...data} theme={theme} />
            </div>
          </div>
        </ArticleContainer>
        <AmpFooter pageData={pageData} />
      </div>
    </ThemeProvider>
  );
};

Article.propTypes = {
  pageData: PropTypes.shape({
    data: PropTypes.object,
    requestParams: PropTypes.object,
    theme: PropTypes.object,
    pageCategory: PropTypes.string,
    site: PropTypes.string,
  }),
};

export default Article;
