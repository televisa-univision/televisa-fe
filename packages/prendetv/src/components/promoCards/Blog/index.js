/**
 * @module PrendeTV Blog Promo Card
 */
import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';
import getTheme from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
// eslint-disable-next-line no-restricted-imports
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';

import { PRENDETV } from '@univision/fe-commons/dist/constants/pageCategories';

import Styles from './Blog.styles';

import BlogItem from '../../BlogItem';
import PrendeTVContext from '../../../../dist/context';

const Header = styled.header`${Styles.header}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * PrendeTV Blog Promo Card
 * @param {Object} props - initial props
 * @property {array} props.contents - Blog articles
 * @returns {JSX.Element}
 */
const Blog = ({ contents }) => {
  const { device, page, requestParams } = useContext(PrendeTVContext);
  const theme = getTheme(PRENDETV, page);

  const pageData = {
    ...page,
    device,
    theme,
    requestParams,
  };

  Store.dispatch(setPageData({ ...pageData }));

  return (
    <Provider store={Store}>
      <ThemeProvider>
        <Wrapper>
          <Header />

          {contents.map((article, consecutive) => (
            <BlogItem {...article} consecutive={consecutive} key={article.uid} />
          ))}
        </Wrapper>
      </ThemeProvider>
    </Provider>
  );
};

Blog.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      image: PropTypes.object,
      title: PropTypes.string,
      uri: PropTypes.string,
    }).isRequired,
  ),
};

export default Blog;
