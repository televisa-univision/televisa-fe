import React from 'react';
import PropTypes from 'prop-types';
import localization from '../../../../../utils/localization';
import StatWrapper from '../../../../base/StatWrapper';
import PreMatchTitle from '../../PreMatchTitle';
import MatchInfoCardLayout from './MatchInfoCardsLayout';

import Styles from './MatchInfoCards.scss';

/**
 * List of event info cards
 * @param {Object} props an array of previous events/matches
 * @returns {JSX}
 */
const MatchInfoCards = (props) => {
  const { infoCards, isBlack } = props;
  return (
    <StatWrapper withBorder={!isBlack} className={`${Styles.container}`}>
      <PreMatchTitle title={localization.get('match')} />
      <div className={Styles.infoList}>
        {infoCards ? (
          <MatchInfoCardLayout {...infoCards} />
        ) : (
          <div className={Styles.noInfo}>{localization.get('noInfo')}</div>
        )}
      </div>
    </StatWrapper>
  );
};

/**
 * @property {array} sportContent object with info for the sports event
 */
MatchInfoCards.propTypes = {
  infoCards: PropTypes.object,
  isBlack: PropTypes.bool,
};

MatchInfoCards.defaultProps = {
  isBlack: false,
};

export default MatchInfoCards;
