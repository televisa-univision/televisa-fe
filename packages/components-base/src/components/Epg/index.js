import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import { getEPGSchedule } from '@univision/fe-commons/dist/utils/video';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';

import Carousel from '../Carousel';
import Cell from './Cell';
import LegacyStyles from './EpgStyle.scss';

/**
 * EPG component
 * @param {Object} props - component props
 * @param {string} props.className - modifier class
 * @param {Object} props.digitalChannelSchedule - channel schedule
 * @param {Object} props.isAnchor - true if it's shows in the expanded anchor
 * @returns {JSX}
 */
const Epg = ({ className, digitalChannelSchedule, isAnchor }) => {
  const [currentShow, setCurrentShow] = useState(
    () => getEPGSchedule(digitalChannelSchedule)?.currentShow
  );
  const [nextShows, setNextShows] = useState(
    () => getEPGSchedule(digitalChannelSchedule)?.nextShows
  );

  const firstCell = useMemo(() => {
    /* istanbul ignore next */
    if (!currentShow) return null;

    /* istanbul ignore next */
    const {
      duration, easternDateEnd, easternDateStart, live, title,
    } = currentShow;

    /* istanbul ignore next */
    return (
      <Cell
        key={easternDateStart}
        duration={duration}
        title={title}
        startTime={easternDateStart}
        endTime={easternDateEnd}
        isFirstCard
        isLive={live}
      />
    );
  }, [currentShow]);

  const upcomingShows = useMemo(() => {
    if (!isValidArray(nextShows)) return null;

    return nextShows.map((nextShow) => {
      const {
        duration, easternDateEnd, easternDateStart, live, title,
      } = nextShow;

      return (
        <Cell
          key={easternDateStart}
          duration={duration}
          title={title}
          startTime={easternDateStart}
          endTime={easternDateEnd}
          isLive={live}
        />
      );
    });
  }, [nextShows]);

  useInterval(() => {
    const {
      currentShow: currentShowEPG, nextShows: nextShowsEPG,
    } = digitalChannelSchedule ? getEPGSchedule(digitalChannelSchedule) : {};

    setCurrentShow(currentShowEPG);
    setNextShows(nextShowsEPG);
  }, 60000);

  /* istanbul ignore next */
  const shouldRender = nextShows?.length > (currentShow ? 2 : 3);

  if (!shouldRender) return false;

  const displayProperties = isAnchor ? {
    itemsToBeDisplayed: {
      xs: 3,
    },
    itemsToBeDisplayedDefault: 3,
  } : {
    itemsToBeDisplayed: {
      xs: 3,
      sm: 5,
      md: 7,
    },
    itemsToBeDisplayedDefault: 7,
  };

  return (
    <div className={`${className} row`}>
      <div className="col-12">
        <Carousel
          className={LegacyStyles.carousel}
          componentClass={LegacyStyles.item}
          separator={{ xs: 4 }}
          maskWrapper={LegacyStyles.mask}
          separatorDefaultValue={4}
          leftArrowClassName={LegacyStyles.leftArrow}
          rightArrowClassName={LegacyStyles.rightArrow}
          mobilePeek={50}
          disableLazyLoad
          {...displayProperties}
        >
          {firstCell}
          {upcomingShows}
        </Carousel>
      </div>
    </div>
  );
};

Epg.propTypes = {
  className: PropTypes.string,
  digitalChannelSchedule: PropTypes.array,
  isAnchor: PropTypes.bool,
};

Epg.defaultProps = {
  className: '',
};

export default Epg;
