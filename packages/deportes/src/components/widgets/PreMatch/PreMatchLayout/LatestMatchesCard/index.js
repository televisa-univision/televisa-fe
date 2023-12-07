import React from 'react';
import PropTypes from 'prop-types';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import localization from '../../../../../utils/localization/index';
import StatWrapper from '../../../../base/StatWrapper/index';
import PreMatchTitle from '../../PreMatchTitle';
import LatestMatch from './LatestMatch';

import Styles from './LatestMatchesCard.scss';

/**
 * List of previous matches
 * @param {Object} props an array of previous events/matches
 * @returns {JSX}
 */
const LatestMatchesCard = (props) => {
  const { events, isSmall, isBlack } = props;
  return (
    <StatWrapper withBorder={!isBlack} className={`${Styles.container}`}>
      <PreMatchTitle title={localization.get('previousEncounters')} />
      <div className={Styles.eventsList}>
        {isValidArray(events) ? (
          events.map(event => <LatestMatch key={event.id} event={event} isSmall={isSmall} />)
        ) : (
          <div className={Styles.noInfo}>{localization.get('noEvents')}</div>
        )}
      </div>
    </StatWrapper>
  );
};

/**
 * @property {array} events indicating latest matches from current teams in the event
 */
LatestMatchesCard.propTypes = {
  events: PropTypes.array,
  isSmall: PropTypes.bool,
  isBlack: PropTypes.bool,
};

LatestMatchesCard.defaultProps = {
  events: [],
  isSmall: false,
  isBlack: false,
};

export default LatestMatchesCard;
