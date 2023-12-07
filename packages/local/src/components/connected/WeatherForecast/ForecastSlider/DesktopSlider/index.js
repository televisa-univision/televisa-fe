import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './DesktopSlider.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const Slider = styled(motion.div)`${Styles.slider}`;
const ArrowWrapper = styled(motion.div)`${Styles.arrowWrapper}`;

const arrowRightAnimation = {
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
  hidden: custom => ({
    x: custom === 'isLeft' ? -44 : 58,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 50,
    },
  }),
};

const pageTransition = {
  type: 'spring',
  stiffness: 120,
  damping: 19,
};

/**
 * DesktopSlider component
 * @param {Object} props - component props
 * @param {elem} children - component childs
 * @param {array} pagePosition - scroll page position
 * @returns {JSX}
 */
const DesktopSlider = ({ children, pagePosition }) => {
  const [page, setPage] = useState(0);
  const pageLimit = pagePosition.length - 1;

  if (page > pageLimit) {
    setPage(pageLimit);
  }

  return (
    <Wrapper>
      <ArrowWrapper
        initial="visible"
        onClick={() => setPage(
          currentPage => (currentPage + 1 >= pageLimit ? pageLimit : currentPage + 1)
        )}
        animate={page === pageLimit ? 'hidden' : 'visible'}
        variants={arrowRightAnimation}
      >
        <Icon name="arrowRight" size={39} />
      </ArrowWrapper>
      <ArrowWrapper
        initial="hidden"
        onClick={() => setPage(page - 1)}
        animate={page > 0 ? 'visible' : 'hidden'}
        variants={arrowRightAnimation}
        custom="isLeft"
        isLeft
      >
        <Icon name="arrowLeft" size={39} />
      </ArrowWrapper>
      <Slider initial={false} transition={pageTransition} animate={{ x: pagePosition[page] }}>
        {children}
      </Slider>
    </Wrapper>
  );
};

DesktopSlider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.array,
  ]),
  pagePosition: PropTypes.array,
};

export default DesktopSlider;
