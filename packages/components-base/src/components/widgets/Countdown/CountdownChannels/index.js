import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import ChannelLogos from '@univision/shared-components/dist/components/v2/ChannelLogos';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import features from '@univision/fe-commons/dist/config/features';

import Styles from './CountdownChannels.styles';

const DateText = styled.div`
  ${Styles.dateText}
`;
const ChannelLogosStyled = styled(ChannelLogos)`
  ${Styles.channelLogos}
`;

/**
 * Countdown date event
 * @param {Object} props - component props
 * @param {string} props.date - the event date string
 * @param {boolean} [props.hasBg] - is true show tv channel with white version
 * @param {boolean} [props.isMobile] -  to show tv channels mobile version
 * @param {string[]} [props.channels] - tv channels coverage
* @param {string[]} [props.isTudn] - for tudn theme
 * @returns {JSX}
 */
const CountdownChannels = ({
  isTudn,
  hasBg,
  isMobile,
  channels,
}) => {
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  return (
    isValidArray(channels) && (
      <DateText isWorldCupMVP={isWorldCupMVP}>
        <span>{localization.get('channelIn')}:</span>
        <ChannelLogosStyled
          isTudn={isTudn}
          className="countChannels"
          channels={channels}
          hasBg={hasBg}
          isActive={hasBg}
          useMobile={isMobile}
        />
      </DateText>
    ));
};

/**
 * propTypes
 * @property {boolean} [hasBg] - is true show tv channel white version
 * @property {boolean} [isMobile] - to show tv channels mobile version
 * @property {string[]} [channels] - tv channels coverage
* @property {string[]} [isTudn] - for tudn theme
 */
CountdownChannels.propTypes = {
  isTudn: PropTypes.bool,
  hasBg: PropTypes.bool,
  isMobile: PropTypes.bool,
  channels: PropTypes.arrayOf(PropTypes.string),
};

export default React.memo(CountdownChannels);
