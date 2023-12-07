import React from 'react';
import PropTypes from 'prop-types';

import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import PreGameInfo from '@univision/shared-components/dist/components/v2/PreGameInfo';
import LatestMatches from '@univision/shared-components/dist/components/v2/LatestMatches';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import Styles from './PreGame.scss';

/**
 * Pre Game cards
 * @param {Object} props The pre game details of the event
 * @returns {JSX}
 */
const PreGame = ({ infoCards, previousEncounters }) => {
  const { site, official } = infoCards;
  let title = localization.get('latestMatches');
  const stadium = {
    info: site.name ? site.name : '—',
  };

  const referee = {
    info: official.name ? official.name : '—',
  };
  if (isValidArray(previousEncounters)) {
    title = previousEncounters.length === 1 ? localization.get('lastMatch') : title;
  }
  const isMobile = getDevice(Store) === 'mobile';
  return (
    <div className="pregame col-12">
      <PreGameInfo
        referee={referee.info}
        stadium={stadium.info}
        className={Styles.topContainer}
        isTudn
      />
      <LatestMatches
        title={title}
        matches={previousEncounters}
        className={Styles.topContainer}
        size={isMobile ? 'small' : 'medium'}
        isTudn
      />
    </div>
  );
};

/**
 * @property {object} infoCards - event data of the event, teams, scores
 * @property {array} previousEncounters - previous matches between teams
 */
PreGame.propTypes = {
  infoCards: PropTypes.object,
  previousEncounters: PropTypes.array,
};

export default PreGame;
