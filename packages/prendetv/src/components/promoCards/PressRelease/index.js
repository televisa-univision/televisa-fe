/**
 * @module PrendeTV Press Release Promo Card
 */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import Styles from './PressRelease.styles';
import NewsItem from '../../NewsItem';
import PrendeTVContext from '../../../context';

const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const NewsListContainer = styled.div`${Styles.newsListContainer}`;
const Title = styled.h3`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * PrendeTV Press Release Promo Card
 * @params {array} contents - Articles
 * @params {string} headLine - Press Release head line
 * @returns {JSX.Element}
 */
const PressRelease = ({ contents, headLine }) => {
  const { device } = useContext(PrendeTVContext);

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>{headLine}</Title>

        <NewsListContainer>
          {isValidArray(contents)
          && contents.map(news => <NewsItem key={news.uid} device={device} {...news} />)}
        </NewsListContainer>
      </InnerWrapper>
    </Wrapper>
  );
};

PressRelease.propTypes = {
  contents: PropTypes.array,
  headLine: PropTypes.string,
};

export default PressRelease;
