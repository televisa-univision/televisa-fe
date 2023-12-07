import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './CountdownItem.styles';

const TimerItem = styled.div.attrs(({ isPrendeTV }) => ({
  ...(isPrendeTV && { className: 'uvs-font-c-regular' }),
}))`
  ${Styles.timerItem}
`;
const Time = styled.span.attrs(({ isPrendeTV }) => ({
  ...(isPrendeTV && { className: 'uvs-font-b-bold' }),
}))`
  ${Styles.time}
`;
const Separator = styled.span`
  ${Styles.separator}
`;

/**
 * A clickable item with an image in the footer
 * @param {Object} props for this component
 * @returns {JSX}
 */
const CountdownItem = ({ time, text, isPrendeTV }) => {
  return (
    <TimerItem isPrendeTV={isPrendeTV}>
      <Separator isPrendeTV={isPrendeTV} />
      <Time isPrendeTV={isPrendeTV}>{time}</Time>{text}
    </TimerItem>
  );
};

/**
 * @property {string} time - the time number
 * @property {string} text - the text to display to type of time
 * @property {bool} isPrendeTV - if true it wil render the prende tv style
 */
CountdownItem.propTypes = {
  time: PropTypes.string,
  text: PropTypes.string,
  isPrendeTV: PropTypes.bool,
};

CountdownItem.defaultProps = {
  time: '',
  text: '',
};

export default CountdownItem;
