/**
 * @module PrendeTV Headline
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Styles from './Headline.styles';
import { PRENDE_TV_LANDING, PRENDE_TV_PARTNERS } from '../../constants';

const Wrapper = styled.div`${Styles.wrapper}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const Title = styled.h1`${Styles.title}`;
const SubTitle = styled.h3`${Styles.subTitle}`;
const Text = styled.h3`${Styles.text}`;

/**
 * Prende TV static Headline.
 * @param {Object} props - initial props of the component
 * @property {Object} props.page - Page container
 * @property {Object} props.subtitle - Page subtitle
 * @property {Object} props.text - Page text
 * @property {Object} props.title - Page title
 * @returns {JSX}
 */
const Headline = ({
  page,
  subtitle,
  text,
  title,
}) => {
  return (
    <Wrapper page={page}>
      <InnerWrapper page={page}>
        <Title page={page}>{title}</Title>
        <SubTitle page={page}>{subtitle}</SubTitle>
        <Text page={page}>{text}</Text>
      </InnerWrapper>
    </Wrapper>
  );
};

Headline.propTypes = {
  page: PropTypes.oneOf([
    PRENDE_TV_LANDING,
    PRENDE_TV_PARTNERS,
  ]),
  subtitle: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
};

Headline.defaultProps = {
  page: PRENDE_TV_LANDING,
};

export default Headline;
