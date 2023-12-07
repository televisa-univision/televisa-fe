import React from 'react';
import PropTypes from 'prop-types';

import Schedule from '@univision/fe-components-base/dist/components/Schedule';
import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';

import Styles from './AbacastSchedule.scss';

/**
 * AbacastSchedule widget
 * @returns {JSX}
 * Usually invoked by RadioBannerStationSchedule and RadioStationScheduleWidget widget types
 */
const AbacastSchedule = ({ schedule, title }) => {
  const theme = getTheme(Store);
  const topicBarProps = {
    theme,
    settings: { title },
    separator: 'left',
  };
  return (
    <div className="uvs-widget">
      <TopicBar {...topicBarProps} />
      <div className={Styles.content}>
        <Schedule content={schedule} />
      </div>
    </div>
  );
};

/**
 * @param {Array} schedule Station's schedule
 * @param {String} title Headline for the widget
 */
AbacastSchedule.propTypes = {
  schedule: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default AbacastSchedule;
