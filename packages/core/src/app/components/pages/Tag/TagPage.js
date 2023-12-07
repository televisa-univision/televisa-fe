import PropTypes from 'prop-types';
import React from 'react';

import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import Title from '@univision/fe-components-base/dist/components/Title';
import Header from '@univision/fe-components-base/dist/components/Header';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import { getPageCategory } from '@univision/fe-commons/dist/store/storeHelpers';
import GlobalWidget from '../../layout/GlobalWidget';
import MainWrapper from '../../layout/MainWrapper';

/**
 * Container component representing a Tag page
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const TagPage = (props) => {
  const { page } = props;
  const primaryTopic = page?.primaryTopic;
  const title = page?.title;
  return (
    <Provider store={Store}>
      <div>
        <MainWrapper state={Store.getState()}>
          <Header pageData={page} pageCategory={getPageCategory(Store)} />
          <GlobalWidget />
          {!!primaryTopic && <Title hidden element="h1">{primaryTopic}</Title>}
          {!!title && primaryTopic !== title && <Title hidden element="h2">{page.title}</Title>}
          <Footer />
        </MainWrapper>
      </div>
    </Provider>
  );
};

/**
 * propTypes
 */
TagPage.propTypes = {
  page: PropTypes.shape({
    uri: PropTypes.string,
    seo: PropTypes.shape({
      tagHierarchy: PropTypes.array,
    }),
    primaryTopic: PropTypes.object,
    title: PropTypes.string,
  }),
};

/**
 * Default Prop Values
 * @property {Object} page - Default response for this {Section}
 */
TagPage.defaultProps = {
  page: {},
};

export default TagPage;
