import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './ScoreCellsArrow.styles';

const ArrowButtonStyled = styled.button`${Styles.arrow}`;

/**
 * ScoreCell Arrow Component
 * @param {*} props component
 * @returns {JSX}
 */
const ScoreCellsArrow = (props) => {
  const {
    isRight, isHidden, onClick, onMouseEnter, onMouseLeave,
  } = props;
  const { white } = themes;

  return (
    <ArrowButtonStyled
      isRight={isRight}
      isHidden={isHidden}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon
        size="extraLarge"
        name={isRight ? 'arrowRight' : 'arrowLeft'}
        fill={white.primary}
      />
    </ArrowButtonStyled>
  );
};
/**
 * propTypes
 * @property {boolean} [isRight=false] - if true is right arrow
 * @property {boolean} [isHidden=false] - if true arrow is hidden
 * @property {Function} onClick - on click callback function
 * @property {Function} onMouseEnter - onMouseEnter function
 * @property {Function} onMouseLeave - tonMouseLeave function
 */
ScoreCellsArrow.propTypes = {
  isRight: PropTypes.bool,
  isHidden: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

ScoreCellsArrow.defaultProps = {
  isRight: false,
  isHidden: false,
};

export default ScoreCellsArrow;
