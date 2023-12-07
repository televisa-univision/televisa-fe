import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Store from '@univision/fe-commons/dist/store/store';
import deportes from '@univision/fe-commons/dist/config/features/deportes';
import createTimer from '@univision/fe-commons/dist/utils/timer';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import getTimeLeft from '@univision/fe-utilities/helpers/date/getTimeLeft';
import getTimeRemaining from '@univision/fe-utilities/helpers/date/getTimeRemaining';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';

import CountdownLogo from './CountdownLogo';
import CountdownItem from './CountdownItem';
import CountdownEvent from './CountdownEvent';
import CountdownChannels from './CountdownChannels';
import CalReply from '../../CalReply';
import Sponsor from '../../Sponsor';

import Styles from './Countdown.styles';

const Container = styled.div`
  ${Styles.container}
`;
const Content = styled.div`
  ${Styles.content}
`;
const InnerContent = styled.div`
  ${Styles.innerContent}
`;
const TimerContent = styled.div`
  ${Styles.timerContent}
`;
const TimerTitle = styled.div`
  ${Styles.timerTitle}
`;
const CalReplyStyled = styled(CalReply)`
  ${Styles.calReplyWrapper}
`;
const Timer = styled.div`
  ${Styles.timer}
`;
/**
 * Coundtdown widget
 */
class Countdown extends Component {
  /**
   * Bind methods and setup state component
   * @param {Object} props - the component props
   * @constructor
   */
  constructor(props) {
    super(props);
    const event = new Date(getKey(props.settings, 'date'));
    const today = new Date();

    this.isTudn = deportes.isTudn();
    this.countDown = this.countDown.bind(this);
    this.isMobile = getDevice(Store) === 'mobile';
    this.timer = null;
    this.state = {
      active: event > today,
      eventDate: event,
      todayDate: today,
      time: [],
    };

    const { time, timeLeft } = this.timeRemaining();
    this.state.time = time;

    if (timeLeft < 0) {
      this.state.active = false;
    }
  }

  /**
   * Set up the widget if it's active or has ended, start timer
   */
  componentDidMount() {
    this.timer = createTimer(1, this.countDown);
  }

  /**
   * Clean the timer
   */
  componentWillUnmount() {
    if (this.timer) {
      this.timer.cancel();
    }
  }

  /**
   * Stop if it's done or update timer
   */
  countDown() {
    const today = new Date();
    const { time, timeLeft } = this.timeRemaining();

    if (timeLeft < 0) {
      // for stopping the timer is it's done
      this.timer.cancel();
      this.timer = null;
      this.setState({
        time,
        active: false,
      });
      return;
    }
    this.setState(({ eventDate }) => ({
      time,
      todayDate: today,
      active: eventDate > today,
    }));
  }

  /**
   * Calculate time remaining from now to event date
   * @returns {Object}
   */
  timeRemaining() {
    const { eventDate, todayDate } = this.state;
    const timeLeft = getTimeLeft(eventDate, todayDate);

    return {
      timeLeft,
      time: getTimeRemaining(timeLeft),
    };
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      props: { settings, widgetContext },
      state: { active, time },
    } = this;

    if (!isValidObject(settings)) {
      return null;
    }

    const {
      background,
      sponsor,
      eventName,
      eventLink,
      eventDateString,
      externalWidgets,
      timerOverEventLink,
      startLeadInText,
      timerOverLeadText,
      soccerMatch,
    } = settings;
    const {
      'television-coverage': channels,
    } = { ...soccerMatch };
    const countTopicBar = { title: eventName };
    const countLink = active ? eventLink : timerOverEventLink;
    const countBg = getKey(background, 'renditions.original.href');
    const countLogo = isValidObject(settings.logo) && settings.logo;
    const calReply = isValidObject(externalWidgets) && externalWidgets.calReply;
    const sponsorProps = isValidObject(sponsor) && {
      logo: sponsor.image,
      name: sponsor.name,
      link: getKey(sponsor.link, 'href'),
      sponsorBy: localization.get('sponsorBy'),
      aspectRatio: '7x4',
    };
    const otherProps = {};

    return (
      <div className="uvs-widget">
        <Container
          countBg={countBg}
          {...otherProps}
        >
          <Content>
            {countLogo && <CountdownLogo image={countLogo} />}

            <InnerContent className="col-xs">
              <CountdownEvent
                link={countLink}
                soccerMatch={soccerMatch}
                titleSettings={countTopicBar}
                hasBg={!!countBg}
                widgetContext={widgetContext}
                isMobile={this.isMobile}
                date={eventDateString}
              />
              <TimerContent>
                {active ? (
                  <Fragment>
                    <TimerTitle countBg={!!countBg} status="active">{startLeadInText}:</TimerTitle>
                    <Timer countBg={!!countBg}>
                      {time.map(timeData => (
                        <CountdownItem
                          key={timeData.title}
                          text={timeData.title}
                          time={timeData.number}
                        />
                      ))}
                    </Timer>
                  </Fragment>
                ) : <TimerTitle countBg={!!countBg} status="finished">{timerOverLeadText}</TimerTitle>}
              </TimerContent>
              <CountdownChannels
                isTudn={this.isTudn}
                hasBg={!!countBg}
                isMobile={this.isMobile}
                channels={channels}
              />
            </InnerContent>
            {calReply && (
              <CalReplyStyled
                className="calReply"
                promoNameText={localization.get('add')}
                {...calReply}
              />
            )}
          </Content>
          {sponsorProps && <Sponsor className="col-sm sponsor" {...sponsorProps} />}
        </Container>
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Object} settings - countDown settings
 * @property {string} settings.date - the ISO date
 * @property {Object} [settings.sponsor] - data of the sponsor like image/link
 * @property {string} settings.eventDateString - an string free format date
 * @property {string} settings.startLeadInText - text to show when countdown is active
 * @property {string} settings.eventName - the main title
 * @property {Object} settings.eventLink - the main link when countdown is active
 * @property {Object} [settings.background] - background image data
 * @property {Object} [settings.logo] - main logo image data
 * @property {string} settings.timerOverLeadText - text to show when countdown finished
 * @property {Object} settings.timerOverEventLink - the main link when countdown finished
 * @property {Object} [settings.soccerMatch] - soccer match event data like teams and tv coverage
 */
Countdown.propTypes = {
  settings: PropTypes.shape({
    date: PropTypes.string,
    sponsor: PropTypes.object,
    eventDateString: PropTypes.string,
    startLeadInText: PropTypes.string,
    eventName: PropTypes.string,
    eventLink: PropTypes.object,
    background: PropTypes.shape({
      renditions: PropTypes.object,
    }),
    logo: PropTypes.shape({
      renditions: PropTypes.object,
    }),
    timerOverLeadText: PropTypes.string,
    timerOverEventLink: PropTypes.object,
    soccerMatch: PropTypes.shape({
      homeTeam: PropTypes.object,
      awayTeam: PropTypes.object,
      'television-coverage': PropTypes.array,
    }),
    externalWidgets: PropTypes.shape({
      calReply: PropTypes.string,
    }),
  }),
  widgetContext: PropTypes.object,
};

/**
 * Default Prop Values
 */
Countdown.defaultProps = {
  settings: {},
};

export default Countdown;
