import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './ConditionMessage.styles';

const CondensedText = styled.div.attrs(({ isBold }) => ({
  className: `uvs-font-c-${isBold ? 'bold' : 'regular'}`,
}))`${Styles.condensedText}`;
const Wrapper = styled.span`${Styles.wrapper}`;

/**
 * ConditionMessage component
 *
 * @param {Object} props - component props
 * @param {Object} props.message - condition message
 * @param {string} props.value - condition value
 * @returns {JSX}
 */
const ConditionMessage = ({ message, value }) => (
  <Wrapper>
    <CondensedText>{message}</CondensedText>
    <CondensedText isBold isValue>{value}</CondensedText>
  </Wrapper>
);

ConditionMessage.propTypes = {
  message: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ConditionMessage;
