import React from 'react';
import PropTypes from 'prop-types';

import ButtonShowEventsVote from './ButtonShowEventsVote';
import ButtonShowEventsTickets from './ButtonShowEventsTickets';

import Styles from './ButtonShowEvents.scss';

/**
 * This component merges the buttons for Shows Events in one component to
 * keep a cleaner rendering logic
 * @returns {JSX}
 */
const ButtonShowEvents = ({ eventData = {} }) => {
  return (
    <div className={Styles.buttonWrapper}>
      {eventData.urlVote && (<ButtonShowEventsVote eventData={eventData} />)}
      {eventData.urlTicket && (<ButtonShowEventsTickets eventData={eventData} />)}
    </div>
  );
};

ButtonShowEvents.propTypes = {
  eventData: PropTypes.shape({
    active: PropTypes.bool,
    analyticsEventVote: PropTypes.string,
    analyticsEventTicket: PropTypes.string,
    urlVote: PropTypes.string,
    urlTicket: PropTypes.string,
    style: PropTypes.shape({
      vote: PropTypes.string,
      ticket: PropTypes.string,
      voteIcon: PropTypes.string,
      ticketIcon: PropTypes.string,
      voteIconView: PropTypes.string,
      ticketIconView: PropTypes.string,
    }),
  }),
};

export default ButtonShowEvents;
