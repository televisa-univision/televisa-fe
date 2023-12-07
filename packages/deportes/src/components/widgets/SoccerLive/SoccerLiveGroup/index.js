import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DateTime from '@univision/shared-components/dist/components/v2/DateTime';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import {
  getUniqKey, locationRedirect, hasKey, cleanUrl,
} from '@univision/fe-commons/dist/utils/helpers';
import SoccerLiveEvents from '../SoccerLiveEvents';
import Styles from '../SoccerLive.styles';
import MatchEvents from '../../Matches/MatchesEvents';
import { TRACK_TARGETS } from '../../Matches/constants';

import { getTudnUrl } from '../../../../utils/helpers';

const DateTimeStyled = styled(DateTime)`${Styles.date}`;

/**
   * Returns the handler for the match card
   * @param {string} match - the match event data
   * @access public
   * @returns {Function}
   */
const matchHandler = (match) => {
  if (!hasKey(match, 'status')) {
    return null;
  }

  return (event) => {
    const isLive = match.status === 'live';
    const trackTarget = isLive ? TRACK_TARGETS.live : TRACK_TARGETS.resume;
    const uri = getTudnUrl(cleanUrl(match.url));

    event.preventDefault();

    if (!global.window || !uri) {
      return;
    }

    WidgetTracker.track(
      WidgetTracker.events.engagement, {
        target: trackTarget,
      }, locationRedirect(uri)
    );
  };
};

/**
 * Render a SoccerLiveEventGroup
 * @access private
 * @param {Object} props Component props
 * @param {Object} props.group Event group to be rendered
 * @param {Function} props.eventsFilter filter function to be applied to events
 * @param {ReactElement} props.showEndedMatchesToogle Ended matches toogle element
 * @returns {Array}
 */
const SoccerLiveEventGroup = ({
  group, eventsFilter, showEndedMatchesToogle, isWorldCupMVP,
}) => {
  const { date, events } = group;

  if (isWorldCupMVP) {
    /**
     * reminder
     * @returns {JSX} rreturn null
     */
    const reminder = () => { return null; };
    return (
      <div key={getUniqKey('soccer-live-')}>
        <Fragment>
          {showEndedMatchesToogle}
          <MatchEvents
            weekEvents={events.filter(eventsFilter)}
            matchHandler={matchHandler}
            reminderHandler={reminder}
            isWorldCupMVP={isWorldCupMVP}
          />
        </Fragment>
      </div>
    );
  }

  return (
    <Fragment>
      <DateTimeStyled
        className={Styles.date}
        date={date}
        format="dddd, DD [de] MMMM [de] YYYY"
        capitalize
        isBold
      />
      {showEndedMatchesToogle}
      <SoccerLiveEvents events={events.filter(eventsFilter)} />
    </Fragment>
  );
};

SoccerLiveEventGroup.propTypes = {
  group: PropTypes.shape({
    events: PropTypes.array,
    date: PropTypes.instanceOf(Date),
  }),
  eventsFilter: PropTypes.func.isRequired,
  showEndedMatchesToogle: PropTypes.element,
  isWorldCupMVP: PropTypes.bool,
};

export default SoccerLiveEventGroup;
