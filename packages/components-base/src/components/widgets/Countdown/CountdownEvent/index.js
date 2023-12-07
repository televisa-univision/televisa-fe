import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import Team from '@univision/shared-components/dist/components/v2/Team';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import features from '@univision/fe-commons/dist/config/features';
import TopicBar from '../../../TopicBar';
import Link from '../../../Link';

import Styles from './CountdownEvent.styles';

const EventContainer = styled(Link)`
  ${Styles.eventContainer}
`;
const EventInfo = styled.div`
  ${Styles.eventInfo}
`;
const TopicBarContainer = styled.div`
  ${Styles.topicBarContainer}
`;
const Match = styled.div`
  ${Styles.match}
`;
const TopicBarStyled = styled(TopicBar)`
  ${Styles.topicBarModifier}
`;

/**
 * Track the click on the content
 * @param {Object} widgetContext Contextual data
 */
const onClickContent = (widgetContext) => {
  WidgetTracker.track(WidgetTracker.events.click, {
    widgetContext,
    target: 'content',
  });
};

/**
 * Countdown title or soccerMatch event
 * @param {Object} props - component props
 * @param {Object} props.link - the event link data
 * @param {Object} [props.soccerMatch] - soccer match teams data
 * @param {Object} props.titleSettings - topic bar settings
 * @param {Object} widgetContext Contextual data
 * @returns {JSX}
 */
const CountdownEvent = ({
  isMobile,
  link,
  soccerMatch,
  titleSettings,
  hasBg,
  widgetContext,
  date,
}) => {
  const { homeTeam, awayTeam } = { ...soccerMatch };
  let homeName;
  let awayName;
  let hasTeams;
  if (hasKey(homeTeam, 'name') && hasKey(awayTeam, 'name')) {
    hasTeams = true;
    homeName = {
      fullName: homeTeam.name.full,
      abbreviatedName: homeTeam.name.abbreviation,
      imageURI: getKey(homeTeam, 'icon.original'),
    };
    awayName = {
      fullName: awayTeam.name.full,
      abbreviatedName: awayTeam.name.abbreviation,
      imageURI: getKey(awayTeam, 'icon.original'),
    };
  }
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  return (
    <EventContainer
      {...link}
      onClick={() => onClickContent(widgetContext)}
    >
      <EventInfo isWorldCupMVP={isWorldCupMVP}>
        <TopicBarContainer>
          {hasTeams ? (
            <Match isWorldCupMVP={isWorldCupMVP}>
              <Team
                size="small"
                layout="right"
                name={homeName}
                className="team"
                isAbbreviated={!isWorldCupMVP || isMobile}
              />
              <span>Vs</span>
              <Team
                size="small"
                layout="left"
                name={awayName}
                className="team"
                isAbbreviated={!isWorldCupMVP || isMobile}
              />
            </Match>
          ) : (
            <TopicBarStyled
              settings={titleSettings}
              align="center"
              variant={hasBg && 'dark'}
              separator="bottom"
              className="topicBar"
              titleTagElement="h2"
            />
          )}
        </TopicBarContainer>
        <div className="dateText">
          <p>{date}</p>
        </div>
      </EventInfo>
    </EventContainer>
  );
};

/**
 * propTypes
 * @property {Object} link - the link data like href/target
 * @property {string} date - free format date string
 * @property {Object} [soccerMatch] - soccer match event data like teams and tv coverage
 * @property {Object} soccerMatch.homeTeam - home team data like full/abbreviation name and logo
 * @property {Object} soccerMatch.awayTeam - away team data like full/abbreviation name and logo
 * @property {bool} hasBg - indicates whether the countdown has a background.
 * @property {Object} titleSettings - TopicBar settings like title
 */
CountdownEvent.propTypes = {
  isMobile: PropTypes.bool,
  link: PropTypes.object,
  date: PropTypes.string,
  soccerMatch: PropTypes.shape({
    homeTeam: PropTypes.object,
    awayTeam: PropTypes.object,
  }),
  widgetContext: PropTypes.object,
  hasBg: PropTypes.bool,
  titleSettings: PropTypes.object,
};

export default CountdownEvent;
