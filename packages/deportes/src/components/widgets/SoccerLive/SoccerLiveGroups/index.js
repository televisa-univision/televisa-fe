import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DateTime from '@univision/shared-components/dist/components/v2/DateTime';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import SoccerLiveEventGroup from '../SoccerLiveGroup';
import Styles from '../SoccerLive.styles';

const DateTimeStyled = styled(DateTime)`${Styles.date}`;
const NoEventsWrapper = styled.div`${Styles.noEventsWrapper}`;
/**
 * Render event groups by date.
 * @access private
 * @param {Object} props Component props
 * @param {Array} props.eventGroups Array of event groups
 * @param {function} props.eventsFilter Filter function to discrimiante ended events or not.
 * @param  {ReactElement} props.showEndedMatchesToogle Toogle button to show and hide ended events.
 * @returns {Array}
 */
const SoccerLiveGroups = ({
  eventGroups = [],
  eventsFilter,
  showEndedMatchesToogle,
  isWorldCupMVP,
}) => {
  const hasEvents = eventGroups.some(eventGroup => eventGroup.events.length > 0);

  return (
    <div>
      {
        !hasEvents && (
          <Fragment>
            <DateTimeStyled
              className={Styles.date}
              date={new Date()}
              format="dddd, DD [de] MMMM [de] YYYY"
              capitalize
              isBold
            />
            <NoEventsWrapper>
              {localization.get('noEvents')}
            </NoEventsWrapper>
          </Fragment>
        )
      }
      {
        hasEvents && eventGroups.map((eventGroup, index) => (
          <SoccerLiveEventGroup
            showEndedMatchesToogle={index === 0 ? showEndedMatchesToogle : null}
            eventsFilter={eventsFilter}
            group={eventGroup}
            isWorldCupMVP={isWorldCupMVP}
          />
        ))
      }
    </div>
  );
};

SoccerLiveGroups.propTypes = {
  eventGroups: PropTypes.array,
  showEndedMatchesToogle: PropTypes.element,
  eventsFilter: PropTypes.func.isRequired,
  isWorldCupMVP: PropTypes.bool,
};

export default SoccerLiveGroups;
