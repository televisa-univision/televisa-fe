import React, {
  useRef, useState, useEffect, useMemo,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CountdownLogo from '@univision/fe-components-base/dist/components/widgets/Countdown/CountdownLogo';
import CountdownItem from '@univision/fe-components-base/dist/components/widgets/Countdown/CountdownItem';
import CalReply from '@univision/fe-components-base/dist/components/CalReply';
import Sponsor from '@univision/fe-components-base/dist/components/Sponsor';
import getTimeLeft from '@univision/fe-utilities/helpers/date/getTimeLeft';
import getTimeRemaining from '@univision/fe-utilities/helpers/date/getTimeRemaining';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import { ASPECT_RATIO_ORIGINAL } from '@univision/fe-components-base/dist/components/Picture/aspectRatios';

import localization from '../../../constants/localization';
import Styles from './Countdown.styles';

const Add = styled(CalReply)`${Styles.add}`;
const By = styled.span`${Styles.by}`;
const Channel = styled(CountdownLogo)`${Styles.channel}`;
const ChannelWrapper = styled.div`${Styles.channelWrapper}`;
const Content = styled.div`${Styles.content}`;
const ContentWrapper = styled.div`${Styles.contentWrapper}`;
const DateWrapper = styled.div`${Styles.dateWrapper}`;
const Info = styled.div`${Styles.info}`;
const Logo = styled(CountdownLogo)`${Styles.logo}`;
const Remaining = styled.span`${Styles.remaining}`;
const SponsorBy = styled(Sponsor)`${Styles.sponsorBy}`;
const SponsorWrapper = styled.div`${Styles.sponsorWrapper}`;
const TimerTitle = styled.div`${Styles.timerTitle}`;
const Title = styled.div`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Countdown Prende TV component
 * @param {Object} props - component props
 * @param {Object} [props.background] - background image for the countdown
 * @param {Array} [props.channels] - channels logo
 * @param {string} [props.date] - event date
 * @param {string} [props.eventDateString] - event information date
 * @param {string} [props.eventName] - event title
 * @param {Object} [props.externalWidgets] - calendar options
 * @param {Object} [props.logo] - event logo
 * @param {Object} [props.sponsor] - sponsor properties
 * @param {string} [props.startLeadInText] - before countdown message for desktop
 * @param {string} [props.timerOverLeadText] - text that displays when the event is finished
 * @returns {JSX}
 */
const Countdown = ({
  background,
  channels,
  date,
  eventDateString,
  eventName,
  externalWidgets,
  logo,
  sponsor,
  startLeadInText,
  timerOverLeadText,
}) => {
  const eventDate = useRef();
  const [isActive, setIsActive] = useState(false);
  const [hasLoad, setHasLoad] = useState(false);
  const [timer, setTimer] = useState();
  const calReply = isValidObject(externalWidgets) && externalWidgets.calReply;
  const sponsorProps = isValidObject(sponsor) && {
    logo: sponsor.image,
    name: sponsor.name,
    link: sponsor.link?.href,
    sponsorBy: localization.get('sponsorBy'),
    aspectRatio: ASPECT_RATIO_ORIGINAL,
  };

  // Otherwise the logo blinks each time a re-render is triggered
  const fixCalBlink = useMemo(() => calReply && (
    <Add
      className="calReply"
      promoNameText={localization.get('add')}
      {...calReply}
    />
  ), [calReply]);

  useEffect(() => {
    if (!hasLoad) {
      eventDate.current = new Date(date);
      const today = new Date();
      const timeLeft = getTimeLeft(eventDate.current, today);
      setIsActive(timeLeft > 0);
      setHasLoad(true);
    }
  }, [date, isActive, hasLoad]);

  useInterval(() => {
    if (isActive && hasLoad) {
      const today = new Date();
      const timeLeft = getTimeLeft(eventDate.current, today);

      if (timeLeft > 0) {
        setTimer(getTimeRemaining(timeLeft));
      } else {
        setIsActive(false);
      }
    }
  }, 1000);

  return (
    <Wrapper>
      <ContentWrapper>
        <Content background={background?.renditions?.original?.href}>
          {logo && <Logo image={logo} />}
          {eventName && <Title>{eventName}</Title>}
          <DateWrapper>
            {startLeadInText && isActive && <Remaining>{`${startLeadInText}:`}</Remaining>}
            {isValidArray(timer) && isActive && timer.map(timeData => (
              <CountdownItem
                key={timeData.title}
                text={timeData.title}
                time={timeData.number}
                isPrendeTV
              />
            ))}
            {hasLoad && !isActive && (
              <TimerTitle>{timerOverLeadText}</TimerTitle>
            )}
          </DateWrapper>
          {eventDateString && <Info>{eventDateString}</Info>}
          <ChannelWrapper>
            <By>{`${localization.get('by')}:`}</By>
            {isValidArray(channels) && channels.map(channel => (
              <Channel
                image={channel}
                key={channel.uid}
              />
            ))}
          </ChannelWrapper>
          {fixCalBlink}
        </Content>
      </ContentWrapper>
      {sponsorProps && (
        <SponsorWrapper>
          <SponsorBy {...sponsorProps} />
        </SponsorWrapper>
      )}
    </Wrapper>
  );
};

Countdown.propTypes = {
  background: PropTypes.shape({
    renditions: PropTypes.object,
  }),
  channels: PropTypes.array,
  date: PropTypes.string,
  eventDateString: PropTypes.string,
  eventName: PropTypes.string,
  externalWidgets: PropTypes.shape({
    calReply: PropTypes.object,
  }),
  logo: PropTypes.shape({
    renditions: PropTypes.object,
  }),
  sponsor: PropTypes.object,
  startLeadInText: PropTypes.string,
  timerOverLeadText: PropTypes.string,
};

export default Countdown;
