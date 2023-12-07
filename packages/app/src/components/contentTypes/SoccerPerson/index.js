import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import { HORIZONTAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import SoccerPersonStats from '@univision/fe-components-base/dist/components/SoccerPersonStats';
import { sportsDataSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import soccerPersonAvatar from '@univision/fe-commons/dist/assets/images/tudn/soccer-person-avatar.svg';

import HeaderHub from '../../base/HeaderHub';
import Section from '../Section';
import SoccerPersonMicrodata from './SoccerPersonMicrodata';

/**
 * Extends widget list to include header hub for soccer person
 * @param {Object} playerProfile fetched graphql web-api Data for the player's profile
 * @returns {function} widgets
 */
export const extendWidgets = (playerProfile) => {
  return (pageData = {}, widgets) => {
    const extendedWidgets = [...widgets];
    const { data = {} } = pageData;
    const {
      image,
      teamSeason,
    } = data;
    const fallbackAvatar = !isValidValue(image?.title) || /fallback/i.test(image.title) ? soccerPersonAvatar : null;
    const league = teamSeason?.soccerCompetitionSeason?.soccerCompetition?.league;

    extendedWidgets.unshift(
      <HeaderHub
        {...data}
        alignTop
        showFullHeader
        showRelatedTags
        personAvatar={fallbackAvatar}
      >
        <SoccerPersonStats
          layout={HORIZONTAL}
          league={league}
          {...playerProfile}
        />
      </HeaderHub>,
    );
    return extendedWidgets;
  };
};

/**
 * Soccer Person component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const SoccerPerson = ({ pageData }) => {
  const { playerProfile } = useSelector(sportsDataSelector);

  return (
    <>
      <SoccerPersonMicrodata profile={playerProfile} />
      <Section
        pageData={pageData}
        widgetsModifier={extendWidgets(playerProfile)}
      />
    </>
  );
};

/**
 * propTypes
 */
SoccerPerson.propTypes = {
  pageData: PropTypes.shape({
    data: PropTypes.shape({
      primaryTopic: PropTypes.string,
      team: PropTypes.object,
      widgets: PropTypes.array,
    }),
    theme: PropTypes.object,
  }).isRequired,
};

export default SoccerPerson;
