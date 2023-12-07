import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import Link from '../Link';
import Image from '../Image';
import CalReply from '../CalReply';
import ProgressBar from '../ProgressBar';
import Styles from './ScheduleCard.scss';

/**
 * Schedule Card Component
 * @params {Obejct} {props} current props
 * @returns {JSX}
 */
const ScheduleCard = ({
  airtime,
  className,
  calreply,
  image,
  isLive,
  isDesktop,
  link,
  percent,
  startTime,
  title,
}) => {
  const calReplyWrapper = (
    <span className={Styles.iconWrapper}>
      <CalReply
        className={Styles.calReply}
        {...calreply}
        showTextButton={false}
        hasCalReplyOnly
      />
    </span>
  );

  const desktopContent = isDesktop
    ? hasKey(calreply, 'code') && calReplyWrapper
    : <span className={Styles.title}>{title}</span>;

  return (
    <div className={`${Styles.mainWrapper} ${className}`}>
      <div className={Styles.timeWrapper}>
        <span className={
          classnames(
            Styles.time,
            { [Styles.isLive]: isLive }
          )}
        >
          {startTime}
        </span>
        {desktopContent}
      </div>
      <div className={Styles.imageWrapper}>
        <Link href={link}>
          <Image src={image} alt={title} />
        </Link>
        {isLive && (
          <ProgressBar
            strokeColor="#0db697"
            trailColor="#d8d8d8"
            trailSize={2}
            percent={percent}
          />
        )}
        {isDesktop && <span className={Styles.title}>{title}</span>}
        {airtime && (
          <div className={Styles.replayTimeWrapper}>
            {!isDesktop && hasKey(calreply, 'code') && calReplyWrapper}
            <span className={Styles.replayTime}>{airtime}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {String} airtime - Current show airtime
 * @property {String} className - CSS class for this component
 * @property {Object} carreply Object expecting carlreply url and script
 * @property {String} image Image for this show
 * @property {Boolean} isLive Wether this card is live or not
 * @property {Boolean} isDesktop Wether current device is desktop or not
 * @property {String} link current show link
 * @property {String} startTime current start time
 * @property {String} startTime current show title
 */
ScheduleCard.propTypes = {
  airtime: PropTypes.string,
  className: PropTypes.string,
  calreply: PropTypes.object,
  image: PropTypes.string,
  isLive: PropTypes.bool,
  isDesktop: PropTypes.bool,
  link: PropTypes.string,
  percent: PropTypes.number,
  startTime: PropTypes.string,
  title: PropTypes.string,
};

export default ScheduleCard;
