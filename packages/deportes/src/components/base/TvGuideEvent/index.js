import React from 'react';
import PropTypes from 'prop-types';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import ShowCard from '@univision/shared-components/dist/components/v2/ShowCard';
import TVSoccerCard from '@univision/shared-components/dist/components/v2/TVSoccerCard';
import { SHOWS, SPORT, UDN_EVENT } from '@univision/fe-commons/dist/constants/tvGuide';
import CardWrapper from '../CardWrapper';
import { getShowProgress, isLive } from '../../../utils/helpers';
import Styles from './TvGuideEvent.scss';

/**
 * Tv Guide Event widget
 * @param {Object} props wrapper props
 * @returns {?JSX}
 */
const TvGuideEvent = (props) => {
  const {
    event,
    className,
  } = props;
  if (!hasKey(event, 'type')) {
    return null;
  }
  const isMobile = getDevice(Store) === 'mobile';
  const isDigital = getKey(event, 'hasLiveStream') || false;
  const url = event.url ? { href: event.url, target: '_blank' } : null;
  const isShowLive = event.type === SPORT ? isLive(event.date, 120) : isLive(event.time, event.d);
  const progress = event.type === SPORT ? getShowProgress(event.date, 120)
    : getShowProgress(event.time, event.d);
  let renderCard;
  switch (event.type) {
    case SHOWS:
      renderCard = (
        <CardWrapper
          date={event.time}
          onDigital={isDigital}
          onTV
          isLive={event.isLive || isShowLive}
          progress={progress}
          className={className}
        >
          <ShowCard
            showTitle={event.content || event.e}
            showDescription={event.ed}
            showImage={event.image || event.img}
            showLink={url}
            isLive={event.isLive || isShowLive}
            className={Styles.card}
          />
        </CardWrapper>
      );
      break;
    case SPORT:
      renderCard = (
        <CardWrapper
          date={event.time}
          onDigital={isDigital}
          onTV
          isLive={isShowLive}
          progress={progress}
          className={className}
        >
          <TVSoccerCard
            {...event}
            link={url}
            className={Styles.match}
            size={isMobile ? 'small' : 'medium'}
          />
        </CardWrapper>
      );
      break;
    case UDN_EVENT:
      renderCard = (
        <CardWrapper
          date={event.time}
          onDigital={isDigital}
          onTV
          isLive={event.isLive}
          progress={progress}
          className={className}
        >
          <ShowCard
            showTitle={event.content}
            showImage={event.image}
            showLink={url}
            isLive={event.isLive}
            className={Styles.card}
          />
        </CardWrapper>
      );
      break;
    default: renderCard = null;
  }
  return renderCard;
};

/**
 * propTypes
 * @property {Object} event - the tv guide event show / match
 * @property {string} [className] - a custom class name
 * @property {Function} [onChange] - the callback when change of filter type
 */
TvGuideEvent.propTypes = {
  event: PropTypes.object,
  className: PropTypes.string,
};

/**
 * Default Prop Values
 */
TvGuideEvent.defaultProps = {
  className: '',
};

export default TvGuideEvent;
