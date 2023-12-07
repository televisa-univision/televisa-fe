import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import LabelUni from '@univision/shared-components/dist/components/v3/Label';
import LabelMvp from '../../../../../Label/TudnRebrandLabel';
import { getCardLabelProps, getScoreCardLabelProps } from '../scoreCardUtils';
import Styles from './ScoreCardBadge.styles';
import StylesLayoutListCard from '../../../ListCard/ListCardLayout.styles';
import Link from '../../../../../Link';

const Badge = styled(motion.div)`
  ${Styles.badge}
`;
const LabelUniList = styled(LabelUni)`${StylesLayoutListCard.labelMVP}`;
/**
 * ScoreCardBadge
 * @param {!Object} props - component props
 * @param {string} [props.cardLabel] - the card label manually set from bex
 * @param {string} [props.className] - the class oveeride style
 * @param {bool} [props.isListCard] - if in list card
 * @param {string} [props.device] - page current device
 * @param {Object} [props.liveStreamData] - the live stream object data
 * @param {array} [props.matchHierarchy] - the hierarchy for the match
 * @param {number} [props.matchId] - the match id
 * @param {string} [props.matchTime] . the match start time
 * @param {string} [props.matchUrl] - the match url fro the badge
 * @param {string} [props.size] - the size of card
 * @param {Object} [props.scoreData] - the score data
 * @param {Object} [props.theme] - the theme object
 * @returns {JSX}
 */
const ScoreCardBadge = ({
  cardLabel,
  className,
  device,
  isListCard,
  liveStreamData,
  matchHierarchy,
  matchId,
  matchTime,
  matchUrl,
  size,
  scoreData,
  theme,
  isWorldCupMVP,
  isMatchCard,
  userLocation,
}) => {
  let labelProps;
  if (isMatchCard) {
    labelProps = getCardLabelProps({
      matchId,
      scoreData,
      liveStream: liveStreamData,
      matchHierarchy,
      matchUrl,
      cardLabel,
      matchTime,
      theme,
      userLocation,
    });
  } else {
    labelProps = getScoreCardLabelProps({
      matchId,
      scoreData,
      liveStream: liveStreamData,
      matchHierarchy,
      matchUrl,
      cardLabel,
      matchTime,
      theme,
    });
  }

  const labelMVP = isListCard ? LabelUniList : LabelMvp;
  const Label = isWorldCupMVP ? labelMVP : LabelUni;
  return (
    <Badge
      className={className}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      size={size}
    >
      <Link href={matchUrl}>
        <Label
          {...labelProps}
          isListItem={isListCard}
          hasLiveIcon
          device={device}
        />
      </Link>
    </Badge>
  );
};

ScoreCardBadge.propTypes = {
  cardLabel: PropTypes.string,
  className: PropTypes.string,
  device: PropTypes.string,
  isListCard: PropTypes.bool,
  liveStreamData: PropTypes.object,
  matchHierarchy: PropTypes.array,
  matchId: PropTypes.number,
  matchTime: PropTypes.string,
  matchUrl: PropTypes.string,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  scoreData: PropTypes.object,
  theme: PropTypes.object,
  isWorldCupMVP: PropTypes.bool,
  isMatchCard: PropTypes.bool,
  userLocation: PropTypes.string,
};

export default ScoreCardBadge;
