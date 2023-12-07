import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@univision/shared-components/dist/components/v2/Button';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import Styles from '../SoccerLive.styles';

const EndedMatchesWrapper = styled.div`${Styles.endedMatchesSwitchButtonWrapper}`;

/**
 * Update soccer matches data after component was mount
 * @param {Object} props - Component props Object
 * @param {boolean} props.showEndedMatches - Flag to show ended matches slider
 * @param {Function} props.onToogle - Function to handle show or hide ended matches
 * @returns {JSX}
 */
const ShowEndedMatchesButton = ({
  showEndedMatches,
  onToogle,
  isWorldCupMVP,
  isTudn,
}) => {
  const typeButton = 'loadMore';
  if (showEndedMatches) {
    return (
      <EndedMatchesWrapper>
        <Button
          type={typeButton}
          icon="arrowUp"
          isWorldCupMVP={isWorldCupMVP}
          onPress={onToogle}
          useUpperCase
          isTudn={isTudn}
        >
          {localization.get('hideFinalizedMatches')}
        </Button>
      </EndedMatchesWrapper>
    );
  }

  return (
    <EndedMatchesWrapper>
      <Button
        type={typeButton}
        icon="arrowDown"
        onPress={onToogle}
        useUpperCase
        isWorldCupMVP={isWorldCupMVP}
        isTudn={isTudn}
      >
        {localization.get('showFinalizedMatches')}
      </Button>
    </EndedMatchesWrapper>
  );
};

ShowEndedMatchesButton.propTypes = {
  showEndedMatches: PropTypes.bool,
  onToogle: PropTypes.func,
  isWorldCupMVP: PropTypes.bool,
  isTudn: PropTypes.bool,
};

export default ShowEndedMatchesButton;
