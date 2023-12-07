import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  cleanUrl,
  isEqual,
  getUniqKey,
  isValidArray,
} from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import Loading from '@univision/fe-components-base/dist/components/Loading';
import DateTime from '@univision/shared-components/dist/components/v2/DateTime';
import ScoreCardV2 from '@univision/shared-components/dist/components/v2/ScoreCard';
import ScoreCardV3 from '@univision/shared-components/dist/components/v3/ScoreCard';
import { useSelector } from 'react-redux';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';

import {
  filterChannels,
  getTudnUrl,
} from '../../../../utils/helpers';
import ApiError from '../../../base/ApiError';
import CalienteCTA from '../../../base/CalienteCTA';
import Microdata from '../../../utils/Microdata';
import Styles from './MatchesEvents.scss';

/**
 * Component for  soccer matches events
 * @access public
 * @param {Object} props - the component props
 * @param {boolean} props.isMobile - true if the device is mobile
 * @param {boolean} props.isTablet - true if the device is tablet
 * @param {boolean} props.isTudn - tudn theme support
 * @param {boolean} props.isVixEnabled - vix feature flag
 * @param {function} props.matchHandler - callback when match card is clicked
 * @param {function} props.reminderHandler - callback when the reminder is clicked
 * @param {string[]} props.remind - list of events soccer match ids that has reminder enabled
 * @param {boolean} props.showError - true show an error message to the user
 * @param {boolean} props.showTabs - true if have enabled the navigation tabs
 * @param {Object[]} props.weekEvents - soccer match week events
 * @returns {JSX}
 */
const MatchesEvents = ({
  isMobile,
  isTablet,
  isTudn,
  isVixEnabled,
  matchHandler,
  remind,
  reminderHandler,
  showError,
  showLoading,
  showTabs,
  theme,
  weekEvents,
  isWorldCupMVP,
  isLiveMatches,
}) => {
  const userLocation = useSelector(userLocationSelector);
  const isAbbreviated = isMobile;
  const size = isMobile ? 'small' : 'medium';
  let lastDate;

  if (showError) {
    return <ApiError className={Styles.message} />;
  }

  if (showLoading) {
    return (
      <div className={Styles.loader}>
        <Loading theme={theme} />
      </div>
    );
  }

  if (!isValidArray(weekEvents)) {
    return (
      <ApiError
        message={localization.get('noEvents')}
        className={Styles.message}
      />
    );
  }

  // Get soccer events cards
  return weekEvents.map((eventData) => {
    const {
      broadcastLanguage,
      channels,
      coverage,
      date,
      elapsedTime,
      hasLiveStream,
      id,
      stadiumName,
      status,
      teams,
      url,
      fixture,
      leagueName,
      leagueAbbreviation,
      week,
      soccerMatchContentURL,
      calienteMetadata,
    } = eventData || {};
    const isReminderActive = isValidArray(remind) && remind.indexOf(id) !== -1;
    const matchLink = !isLiveMatches && soccerMatchContentURL ? soccerMatchContentURL : url;
    const matchStatusLink = { href: getTudnUrl(cleanUrl(matchLink)) };
    const nextDate = new Date(date).setHours(0, 0, 0, 0);
    const prevDate = new Date(lastDate).setHours(0, 0, 0, 0);
    const hasCalienteCta = calienteMetadata && userLocation === MX;

    let headCard;
    if (!isEqual(nextDate, prevDate)) {
      // only show date head if the events is in different dates
      lastDate = date;
      headCard = (
        <DateTime
          className={classnames(Styles.headline, {
            [Styles.headlineOld]: !isWorldCupMVP,
            [Styles.headlineMvp]: isWorldCupMVP,
          })}
          date={date}
          format={
            isMobile ? 'ddd, DD MMM YYYY' : 'dddd, DD [de] MMMM [de] YYYY'
          }
          capitalize
        />
      );
    }
    const ScoreCard = isWorldCupMVP ? ScoreCardV3 : ScoreCardV2;
    const scoreCardStyle = hasCalienteCta ? Styles.matchCaliente : Styles.match;
    const matchMvpStyle = hasCalienteCta ? Styles.matchMvpCaliente : Styles.matchMvp;
    return (
      <Fragment key={getUniqKey(`match${id}`)}>
        {headCard}
        <ScoreCard
          isTudn={isTudn}
          size={size}
          className={classnames(scoreCardStyle, {
            [Styles.matchNoTabs]: !showTabs,
            [matchMvpStyle]: isWorldCupMVP,
          })}
          link={matchStatusLink}
          date={date}
          coverage={coverage}
          status={status}
          teams={teams}
          channels={filterChannels({
            channels,
            isVixEnabled,
            isWorldCupMVP,
            userLocation,
          })}
          stadiumName={stadiumName}
          elapsedTime={elapsedTime}
          onPress={matchHandler(eventData)}
          reminderOnPress={reminderHandler(id)}
          isReminderActive={isReminderActive}
          isAbbreviated={isAbbreviated}
          broadcastLanguage={broadcastLanguage}
          useTabletChannels={isTablet}
          hasLiveStream={hasLiveStream}
          data-match={id}
          fixture={fixture}
          leagueName={leagueName}
          leagueAbbreviation={leagueAbbreviation}
          hideLang={userLocation === MX}
          week={week}
          type="card"
          useFullName={!isMobile}
        />
        {hasCalienteCta && (
          <div className={Styles.calienteWrap}>
            <div className={Styles.calienteContainer}>
              <CalienteCTA
                {...calienteMetadata}
                className={Styles.caliente}
                isBetOpen={calienteMetadata?.isBetOpen && status !== 'post'}
                inline
              />
            </div>
          </div>
        )}
        <Microdata key={getUniqKey('micro')} data={eventData} />
      </Fragment>
    );
  });
};

MatchesEvents.propTypes = {
  isTudn: PropTypes.bool,
  isMobile: PropTypes.bool,
  isTablet: PropTypes.bool,
  isVixEnabled: PropTypes.bool,
  matchHandler: PropTypes.func,
  remind: PropTypes.arrayOf(PropTypes.string),
  reminderHandler: PropTypes.func,
  showError: PropTypes.bool,
  showTabs: PropTypes.bool,
  weekEvents: PropTypes.arrayOf(PropTypes.object),
  isWorldCupMVP: PropTypes.bool,
  isLiveMatches: PropTypes.bool,
};

MatchesEvents.defaultProps = {
  isTudn: false,
  isMobile: false,
  isTablet: false,
  showError: false,
  showTabs: false,
  isWorldCupMVP: false,
};

export default MatchesEvents;
