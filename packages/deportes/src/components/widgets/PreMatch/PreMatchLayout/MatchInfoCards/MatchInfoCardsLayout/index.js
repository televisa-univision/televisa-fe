import React from 'react';
import PropTypes from 'prop-types';

import { exists } from '@univision/fe-commons/dist/utils/helpers';

import localization from '../../../../../../utils/localization';

import MatchInfoCard from '../MatchInfoCard';
import Styles from './MatchInfoCardsLayout.scss';

/**
 * MatchInfoCardsLayout component.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const MatchInfoCardsLayout = (props) => {
  const {
    site, official, tournament, screen, className,
  } = props;
  const stadium = {
    type: 'field',
    info: exists(site.name) ? `${site.name}` : localization.get('noInfo'),
    extra: exists(site.capacity) ? `${site.capacity} ${localization.get('spectators')}` : '',
  };

  const tv = {
    type: 'screen',
    info: exists(screen.name) ? screen.name : localization.get('noInfo'),
    logo: exists(screen.logo) ? screen.logo : '',
  };

  const referee = {
    type: 'fault',
    info: exists(official.name) ? official.name : localization.get('noInfo'),
  };

  const { week } = tournament;
  const competition = {
    type: 'cup',
    info: exists(tournament.name)
      ? `${tournament.name} -
    ${localization.get('weekOf', { locals: { week } })}`
      : localization.get('noInfo'),
  };
  return (
    <div className={`row no-gutters ${Styles.container} ${className}`}>
      <div className={`col-6 ${Styles.info}`}>
        <MatchInfoCard {...competition} />
      </div>
      <div className={`col-6 ${Styles.info}`}>
        <MatchInfoCard {...referee} />
      </div>
      <div className={`col-6 ${Styles.info}`}>
        <MatchInfoCard {...stadium} />
      </div>
      <div className={`col-6 ${Styles.info}`}>
        <MatchInfoCard {...tv} />
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {Object} sports-event object with data, for a given match
 * @property {className} class name for the Component
 */
MatchInfoCardsLayout.propTypes = {
  site: PropTypes.shape({
    name: PropTypes.string,
    capacity: PropTypes.string,
  }),
  official: PropTypes.shape({
    name: PropTypes.string,
  }),
  screen: PropTypes.shape({
    name: PropTypes.string,
    logo: PropTypes.string,
  }),
  tournament: PropTypes.shape({
    name: PropTypes.string,
    week: PropTypes.string,
  }),
  className: PropTypes.string,
  eventId: PropTypes.string,
};

/**
 * Default Prop Values
 */
MatchInfoCardsLayout.defaultProps = {
  className: '',
};

export default MatchInfoCardsLayout;
