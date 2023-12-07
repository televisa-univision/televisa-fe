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
 * ButtonShowEventsVote
 * @param {Object} props component props
 * @returns {JSX}
 */
const ButtonShowEventsVote = ({
  eventData,
}) => {
  const pageData = useSelector(pageSelector);
  const { vote, voteIcon, voteIconView } = eventData.style;
  /**
   * Tracks click watch button
   */
  const trackClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventData.analyticsEventVote,
      link_text: eventData.voteText || 'Vota',
      link_url: eventData.urlVote,
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
        href={eventData.urlVote}
        className={classnames(
          Styles[vote],
          'uvs-font-c-bold'
        )}
      >
        {voteIcon && <Icon name={voteIcon} viewBox={voteIconView} stroke={BLACK} />}
        {eventData.voteText && <span>{eventData.voteText}</span>}
      </ActionLink>
    </div>
  );
};

ButtonShowEventsVote.propTypes = {
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

export default ButtonShowEventsVote;
