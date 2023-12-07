import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-utilities/styled/constants';
import localStorage from '@univision/fe-utilities/storage/localStorage';
import getDaysDiff from '@univision/fe-utilities/helpers/date/getDaysDiff';

import Styles from './ToolTip.styles';

const ToolTipStyled = styled.div`${Styles.toolTip}`;
const CloseIcon = styled(Icon)`${Styles.closeIcon}`;
const Arrow = styled.div`${Styles.arrow}`;
const Label = styled.div`${Styles.label}`;
const IconWrapper = styled.div`${Styles.iconWrapper}`;

/**
 * Get number of times that the tooltip have been shown
 * @param {string} toolTipId - toolTip identifier for localstorage
 * @returns {number}
 */
function getToolTipValue(toolTipId) {
  const defaultValue = { count: 1, timestamp: Date.now() };
  const toolTipValue = JSON.parse(localStorage.get(toolTipId)) || defaultValue;

  if (typeof toolTipValue === 'number') { // backward compatibility with counter old storage
    return { count: toolTipValue, timestamp: Date.now() };
  }

  if (toolTipValue === true) { // backward compatibility with true old storage
    return defaultValue;
  }

  return toolTipValue;
}

/**
 * Increment tooltip show count and save in storage
 * @param {string} toolTipId - toolTip identifier for localstorage
 */
function incrementToolTipCount(toolTipId) {
  const { count, timestamp } = getToolTipValue(toolTipId);
  localStorage.set(toolTipId, JSON.stringify({ count: count + 1, timestamp }));
}

/**
 * Determines if N number of days (frequency) has passed after X times
 * @param {string} toolTipId tooltip unique id
 * @param {number} initialTime first time tooltip showed for user
 * @param {number} showFrequency show tooltip N number of times every N days
 * @param {number} count show tooltip N times
 * @returns {boolean}
 */
function shouldShowByFrequency(toolTipId, initialTime, showFrequency, count) {
  const daysDiff = getDaysDiff(initialTime, Date.now());

  if (daysDiff >= showFrequency || count === 1) {
    // If frequency has passed, update timestamp with new date
    localStorage.set(toolTipId, JSON.stringify({ count, timestamp: Date.now() }));
    return true;
  }

  return false;
}

/**
 * ActionBar Component
 * @param {Object} props - component props
 * @param {(string|Node)} [props.content] - The label to be shown inside the toolbox
 * @param {string} [props.className] - The modifies class name
 * @param {Object} [props.close] - To force the close from parent
 * @param {boolean} [props.visibilityDelay] - How much in seconds to wait to show the tool tip
 * @param {number} [props.arrowPosition] - Number 0 -100 to positionate the arrow
 * @param {number} [props.leftToolTipPosition] - Move tooltip to left
 * @param {string} [props.toolTipId] - Id for localstorage
 * @param {boolean} [props.showToolTipUp] - To show tooltip up
 * @param {boolean} [props.showArrowRight] - To show arrow at right position
 * @param {string} [props.showOnce] - To show tooltip only once to the user need toolTipId
 * @param {string} [props.showFrequency] - To show tooltip N number of times every N days
 * @param {boolean} [props.showToolTip] - To handle from parent to be shown or not
 * @returns {JSX}
 */
const ToolTip = ({
  content,
  className,
  close,
  visibilityDelay,
  arrowPosition,
  leftToolTipPosition,
  topToolTipPosition,
  toolTipId,
  theme,
  showToolTipUp,
  showArrowRight,
  showFrequency,
  showTimes,
  showToolTip,
}) => {
  const [closeToolTip, setCloseToolTip] = useState(false);
  const [canBeShown, setCanBeShown] = useState(false);

  useEffect(() => {
    let show = showToolTip;

    if (toolTipId && show) {
      const { count, timestamp } = getToolTipValue(toolTipId);
      show = showTimes ? count < showTimes : show;

      if (showFrequency) {
        show = show && shouldShowByFrequency(toolTipId, timestamp, showFrequency, count);
      }
    }

    setCanBeShown(show);
  }, [toolTipId, showToolTip, showTimes, showFrequency]);

  useEffect(() => {
    // Do not increment count if was not actually shown
    if (close && canBeShown) {
      setCloseToolTip(true);
      incrementToolTipCount(toolTipId);
    }
  }, [close, canBeShown]);

  if (!canBeShown) return null;

  /**
   * Handle click tooltip
   * @param {Object} event - react click event
   */
  const handleClick = (event) => {
    // eslint-disable-next-line babel/no-unused-expressions
    event?.preventDefault();
    setCloseToolTip(true);
    incrementToolTipCount(toolTipId);
  };

  return (
    <ToolTipStyled
      closeToolTip={closeToolTip}
      left={leftToolTipPosition}
      onClick={handleClick}
      visibilityDelay={visibilityDelay}
      showToolTipUp={showToolTipUp}
      top={topToolTipPosition}
      theme={theme}
      className={className}
    >
      <Label>{content}</Label>
      <IconWrapper>
        <CloseIcon name="close" fill={WHITE} size={11} />
      </IconWrapper>
      <Arrow
        position={arrowPosition}
        showArrowRight={showArrowRight}
        showToolTipUp={showToolTipUp}
        theme={theme}
      />
    </ToolTipStyled>
  );
};
ToolTip.defaultProps = {
  visibilityDelay: 0,
  arrowPosition: 10,
  leftToolTipPosition: 0,
  topToolTipPosition: 0,
  showToolTip: true,
};
ToolTip.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  close: PropTypes.bool,
  visibilityDelay: PropTypes.number,
  arrowPosition: PropTypes.number,
  leftToolTipPosition: PropTypes.number,
  topToolTipPosition: PropTypes.number,
  toolTipId: PropTypes.string,
  theme: PropTypes.object,
  showToolTipUp: PropTypes.bool,
  showArrowRight: PropTypes.bool,
  showFrequency: PropTypes.number,
  showTimes: PropTypes.number,
  showToolTip: PropTypes.bool,
};
export default React.memo(ToolTip);
