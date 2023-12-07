import React from 'react';
import PropTypes from 'prop-types';
import { requestWithBasicAuth } from '@univision/fe-commons/dist/utils/api/request';
import Store from '@univision/fe-commons/dist/store/store';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { getDevice, getConfig } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { getFormattedDigit as pad } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import { getKey, isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import LongformWrapper from '../../LongformWrapper';
import ScheduleCard from '../../ScheduleCard';
import Clickable from '../../Clickable';
import imageReplace from './imageReplace';

import Styles from './LongformScheduleList.scss';

/**
 * Longform Schedule List Component
 * @param {Object} props component properties
 */
class LongformScheduleList extends React.Component {
  /**
   * Constructor
   * @param {Object} props current props
   */
  constructor(props) {
    super(props);
    this.isDesktop = getDevice(Store) === 'desktop';
    this.date = new Date();
    this.state = {
      schedule: [],
    };

    this.logo = this.getLogo();
    this.trackClick = this.trackClick.bind(this);
  }

  /**
   * lifeCycle method
   */
  componentDidMount() {
    this.loadNetworkData();
  }

  /**
   * Get current logo name
   * @returns {string}
   */
  getLogo = () => {
    const { settings: { networkSchedule } } = this.props;
    let logo = 'univision';

    if (networkSchedule.indexOf('galavision') !== -1) {
      logo = 'galavision';
    } else if (networkSchedule.indexOf('unimas') !== -1) {
      logo = 'unimas';
    }

    return logo;
  }

  /**
   * Load nework data
   * @param {Object} date current date
   */
  loadNetworkData = async () => {
    const { settings: { networkSchedule } } = this.props;

    const today = `${this.date.getFullYear()}/${pad(this.date.getMonth() + 1)}/${pad(this.date.getDate())}`;
    const domain = getKey(getConfig(Store), 'syndicator.uri');
    const uri = `${domain}/schedule-proxy/${networkSchedule}/${today}.json`;

    try {
      const response = await requestWithBasicAuth({ uri });
      this.setState({ schedule: this.processSchedule(response) });
    } catch (err) {
      this.setState({ schedule: [] });
    }
  }

  /**
   * Process schedule
   * @param {Object} schedule today's schedule
   * @returns {[]}
   */
  processSchedule = (schedule) => {
    // Convert to UTC by adding current time zone offset
    const tzOffset = this.date.getTimezoneOffset() * 60 * 1000;
    const currentDate = this.date.getTime() + tzOffset;
    const items = getKey(schedule, 'items', []);
    let time;
    let duration;
    let currentIndex;
    let percent;

    items.forEach((item, index) => {
      // Get current UTC time from item.su
      time = getKey(item, 'su', currentDate);
      // convert duration to ms
      duration = getKey(item, 'ds', 0) * 1000;

      time = new Date(time);
      time = time.getTime();

      // if current time is within timeframe this one is live
      if (currentDate >= time && currentDate < (time + duration)) {
        currentIndex = index;
        percent = ((currentDate - time) * 100) / duration;
      }
    });

    // return next 4 elements
    const shows = items.slice(currentIndex, currentIndex + 4);
    return shows.map((show, index) => {
      // show.su is the UTC time so subtract current offset to display actual user time
      const newTime = (new Date(show.su).getTime()) - tzOffset;
      return {
        tmsId: show.tmsId,
        airtime: show.airtime,
        calreply: {
          href: show.calReplyHref,
          code: show.calReplyCode,
        },
        percent,
        isLive: index === 0,
        image: getKey(imageReplace, show.seriesId, show.image),
        link: show.permalink,
        startTime: (new Date(newTime)).toLocaleString('en-US', {
          hour: 'numeric', minute: 'numeric', hour12: true,
        }),
        title: show.e,
      };
    });
  }

  /**
   * Tracks clicks on widget
   */
  trackClick() {
    const { widgetContext } = this.props;

    WidgetTracker.track(WidgetTracker.events.click, {
      widgetContext,
      target: 'ver_mas',
    });
  }

  /**
   * render
   * @returns {JSX}
   */
  render() {
    const { settings: { title } } = this.props;
    const { schedule } = this.state;

    if (!isValidArray(schedule)) return null;

    return (
      <LongformWrapper className={Styles.gridWrapper}>
        <div className={`${Styles.titleWrapper} row`}>
          <Icon name={`${this.logo}Mobile`} />
          <div className={Styles.title}>{title}</div>
        </div>
        <div className={`${Styles.cardWrapper} row`}>
          {schedule.map(item => (
            <ScheduleCard
              {...item}
              isDesktop={this.isDesktop}
              className="col-12 col-md-3"
              key={item.tmsId}
            />
          ))}
        </div>
        <div className={`row ${Styles.center}`}>
          <div className="col-12 col-md-6">
            <Clickable
              type="link"
              appearance="secondary"
              size="medium"
              align="center"
              variant="dark"
              href="https://www.univision.com/shows/univision-guia-programacion-de-television-shows-novelas-y-series"
              label={localization.get('viewTvGuide')}
              className={Styles.moreEpisodes}
              onClick={this.trackClick}
            />
          </div>
        </div>
      </LongformWrapper>
    );
  }
}

/**
 * @property {string} network Current network to load data for
 */
LongformScheduleList.propTypes = {
  settings: PropTypes.object,
  widgetContext: PropTypes.object,
};

export default LongformScheduleList;
