import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import Button from '@univision/fe-components-base/dist/components/Button';
import formatLocalTime from '@univision/fe-utilities/helpers/date/formatLocalTime';
import Carousel from '@univision/fe-components-base/dist/components/Carousel';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import Styles from './DateList.styles';
import Scss from './DateList.scss';

const DateLabel = styled.div`
  ${Styles.dateLabel}
`;

const DayLabel = styled.div`
  ${Styles.dayLabel}
`;

const StyledButton = styled(Button)`
  ${Styles.button}
`;

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

/**
 * Renders a list of provided dates
 * @param {Object} props - component props
 * @returns {JSX}
 */
const DateList = ({
  activeTab,
  className,
  currentDateKey,
  dates,
  setActiveTab,
  widgetContext,
}) => {
  const handleTabChange = useCallback((key) => {
    WidgetTracker.track(
      WidgetTracker.events.click,
      {
        widgetContext,
        target: 'subnav-wcwidget-day',
      }
    );

    setActiveTab(key);
  }, [setActiveTab, widgetContext]);

  const list = useMemo(() => {
    if (!isValidArray(dates)) {
      return null;
    }

    const currentKey = activeTab || currentDateKey;
    const activeIndex = Math.max(0, dates.findIndex(item => item.key === currentKey));
    const matchList = dates.map((item, idx) => {
      const { key, dateObj } = item;
      const formatter = formatLocalTime({ date: dateObj.toString() });
      const {
        day,
        month: { abbreviatedMonth },
        weekDay: { abbreviatedDay },
      } = formatter;
      const isActive = idx === activeIndex;
      return (
        <StyledButton
          key={key}
          onClick={() => handleTabChange(key)}
          isActive={isActive}
        >
          <DateLabel>{abbreviatedMonth} {day}</DateLabel>
          <DayLabel>{abbreviatedDay}</DayLabel>
        </StyledButton>
      );
    });

    return (
      <Carousel
        separator={1}
        itemsToBeDisplayed={{
          xs: 6,
          sm: 10,
          md: 12,
        }}
        itemsToBeDisplayedDefault={14}
        mobilePeek={50}
        disableLazyLoad
        partialShowing
        goToItem={activeIndex}
        selectedItem={activeIndex}
        usePagination
        leftArrowClassName={Scss.leftArrow}
        rightArrowClassName={Scss.rightArrow}
      >
        {matchList}
      </Carousel>
    );
  }, [activeTab, currentDateKey, dates, handleTabChange]);

  return (
    <Wrapper className={className}>
      {list}
    </Wrapper>
  );
};

DateList.propTypes = {
  activeTab: PropTypes.string,
  className: PropTypes.string,
  currentDateKey: PropTypes.string,
  dates: PropTypes.array,
  setActiveTab: PropTypes.func,
  widgetContext: PropTypes.object,
};

DateList.defaultProps = {
  widgetContext: {},
};

export default DateList;
