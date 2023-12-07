import React from 'react';
import PropTypes from 'prop-types';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

import Link from '@univision/fe-components-base/dist/components/Link';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import Icon from '@univision/fe-icons/dist/components/Icon';

import BackgroundImage from '@univision/fe-components-base/dist/components/BackgroundImage';
import * as ratios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';
import PlayStationButton from '../../../../connected/PlayStationButton/PlayStationButton';
import { getRadioStationProps } from '../../../../../utils/helpers';
import Styles from './FeaturedStationsCardMobile.scss';

/**
 * Featured Stations Card Mobile Component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const FeaturedStationsCardMobile = ({
  abacast,
  activeStationIndex,
  card,
  device,
  index,
  images,
}) => {
  return (
    <div className={`${Styles.card} ${activeStationIndex === index ? Styles.active : ''}`}>
      <BackgroundImage
        image={images}
        className={Styles.image}
        device={device}
        aspectRatio={ratios.ASPECT_RATIO_ORIGINAL}
      />
      <div className={Styles.infoWrap}>
        <Link
          className={Styles.info}
          href={card.uri}
        >
          {hasKey(card, 'radioStation.alternativeLogo') && (
            <Picture image={card.radioStation.alternativeLogo} />
          )}
        </Link>
      </div>
      <div className={Styles.radioButtonWrapper}>
        {activeStationIndex === index ? (
          <PlayStationButton
            abacast={abacast}
            type="featuredStation"
            {...getRadioStationProps(card)}
          >
            <Icon name="playnocircleLegacy" size="small" />
          </PlayStationButton>
        ) : (
          <Link className={Styles.promoLink} href={card.uri} />
        )}
      </div>
      <div className={Styles.gradientContainer} />
    </div>
  );
};

FeaturedStationsCardMobile.propTypes = {
  abacast: PropTypes.object,
  images: PropTypes.object,
  card: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
    radioStation: PropTypes.shape({
      alternativeLogo: PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        caption: PropTypes.string,
        credit: PropTypes.string,
        renditions: PropTypes.object,
      }),
    }),
  }),
  device: PropTypes.string,
  index: PropTypes.number,
  activeStationIndex: PropTypes.number,
};

export default FeaturedStationsCardMobile;
