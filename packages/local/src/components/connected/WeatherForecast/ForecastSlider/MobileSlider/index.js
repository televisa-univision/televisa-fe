import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './MobileSlider.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const ScrollArea = styled.div`${Styles.scrollArea}`;

/**
 * MobileSlider component
 * @param {Object} props - component props
 * @param {elem} children - component childs
 * @returns {JSX}
 */
const MobileSlider = ({ children }) => {
  return (
    <Wrapper>
      <ScrollArea>
        {children}
      </ScrollArea>
    </Wrapper>
  );
};

MobileSlider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.array,
  ]),
};

export default MobileSlider;
