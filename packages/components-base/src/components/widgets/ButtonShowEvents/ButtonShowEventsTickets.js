import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import { pageSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { BLACK } from '@univision/fe-utilities/styled/constants';

import ActionLink from '../../ActionLink';
import Styles from './ButtonShowEvents.scss';

/**
 * ButtonShowEventsTickets
 * @param {Object} props component props
 * @returns {JSX}
 */
const ButtonShowEventsTickets = ({
  eventData,
}) => {
  const pageData = useSelector(pageSelector);
  const { ticket, ticketIcon, ticketIconView } = eventData.style;
  /**
   * Tracks click watch button
   */
  const trackClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventData.analyticsEventTicket,
      link_text: eventData.ticketText || 'Boletos',
      link_url: eventData.urlTicket,
      link_domain: pageData.domain,
    });
  };

  return (
    <div className={classnames(
      Styles.container,
    )}
    >
      <ActionLink
        onClick={trackClick}
        target="_blank"
        href={eventData.urlTicket}
        className={classnames(
          Styles[ticket],
          Styles[ticketIcon],
          'uvs-font-c-bold'
        )}
      >
        {ticketIcon && <Icon name={ticketIcon} viewBox={ticketIconView} stroke={BLACK} />}
        {eventData.ticketText && <span>{eventData.ticketText}</span>}
      </ActionLink>
    </div>
  );
};

ButtonShowEventsTickets.propTypes = {
  eventData: PropTypes.shape({
    active: PropTypes.bool,
    voteText: PropTypes.string,
    ticketText: PropTypes.string,
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

export default ButtonShowEventsTickets;
