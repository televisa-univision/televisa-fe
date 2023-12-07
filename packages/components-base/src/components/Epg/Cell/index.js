import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CRIMSON_RADIO } from '@univision/fe-commons/dist/utils/styled/constants';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import { getShowToLocalTime } from '@univision/fe-commons/dist/utils/video';

import LiveIcon from '../../LiveIcon';
import Styles from './Cell.styles';

const LiveDot = styled(LiveIcon).attrs({
  fill: CRIMSON_RADIO,
  size: 28,
})`${Styles.liveDot}`;
const ProgressBar = styled.div`${Styles.progressBar}`;
const Time = styled.div.attrs({
  className: 'uvs-font-b-bold',
})`${Styles.time}`;
const Title = styled.div.attrs({
  className: 'uvs-font-a-regular',
})`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Cell component
 * @param {Object} props - component props
 * @param {string} props.className - modifier class
 * @param {string} props.endTime - at what time the show ends (ET)
 * @param {boolean} props.isFirstCard - true if its the first card
 * @param {boolean} props.isLive - true if the show is live
 * @param {string} props.startTime - at what time the show starts (ET)
 * @returns {JSX}
 */
const Cell = ({
  className,
  endTime,
  isFirstCard,
  isLive,
  startTime,
  title,
}) => {
  const [formattedTime, setTime] = useState('');
  const [position, setPosition] = useState(-1);
  const showStart = useRef();
  const showEnd = useRef();
  const duration = useRef();

  const calculateProgressBar = useCallback(() => {
    if (!showStart.current || !showEnd.current || !duration.current) {
      showStart.current = new Date(startTime);
      showEnd.current = new Date(endTime);
      duration.current = showEnd.current.getTime() - showStart.current.getTime();
    }

    const today = new Date();
    const delta = showEnd.current.getTime() - today.getTime();
    const progress = 1 - delta / duration.current;
    setPosition(progress * 100);
  }, [endTime, startTime]);

  useEffect(() => {
    setTime(getShowToLocalTime(startTime));
    if (isFirstCard) calculateProgressBar();
  }, [isFirstCard, startTime, calculateProgressBar]);

  useInterval(() => {
    calculateProgressBar();
  }, isFirstCard ? 30000 : null);

  return (
    <Wrapper className={className}>
      <Time>
        {isFirstCard && isLive && <LiveDot />}
        {formattedTime}
      </Time>
      <Title>{title}</Title>
      {position >= 0 && (
        <ProgressBar position={position} />
      )}
    </Wrapper>
  );
};

Cell.propTypes = {
  className: PropTypes.string,
  endTime: PropTypes.string,
  isFirstCard: PropTypes.bool,
  isLive: PropTypes.bool,
  startTime: PropTypes.string,
  title: PropTypes.string,
};

export default Cell;
