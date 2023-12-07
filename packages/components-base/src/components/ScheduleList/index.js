import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StyledComponent from './ScheduleList.styles';

const ScheduleWrapper = styled.div`${StyledComponent.scheduleWrapper}`;
const ScheduleItem = styled.div`${StyledComponent.scheduleItem}`;
const Time = styled.div`${StyledComponent.time}`;
const Title = styled.div`${StyledComponent.title}`;

/**
 * Schedule List component
 * @param {Object} { schedule } array of schedule items
 * @returns {JSX}
 */
const scheduleList = ({ schedule, variant }) => {
  return (
    <ScheduleWrapper>
      {schedule?.map((item) => {
        const [hour, minutes] = item?.startTime?.split(':');
        let time = new Date();
        time.setHours(hour);
        time.setMinutes(minutes);

        time = time.toLocaleString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hours12: true,
        });

        return (
          <ScheduleItem key={item.title} variant={variant}>
            <Time className="uvs-font-b-bold">{time}</Time>
            <Title>{item.title}</Title>
          </ScheduleItem>
        );
      })}
    </ScheduleWrapper>
  );
};

scheduleList.propTypes = {
  schedule: PropTypes.array,
  variant: PropTypes.string,
};

export default scheduleList;
