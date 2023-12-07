import React from 'react';
import PropTypes from 'prop-types';

import {
  isValidArray, getKey, hasKey,
} from '@univision/fe-commons/dist/utils/helpers';
import aspectRatios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import Link from '@univision/fe-components-base/dist/components/Link';
import Picture from '@univision/fe-components-base/dist/components/Picture';

import { getRadioStationProps } from '../../../utils/helpers';
import PerformanceInfo from '../abacast/PerformanceInfo/PerformanceInfo';

import Styles from './RadioShowCard.scss';

/**
 * RadioShow Widget
 * @param {Object} props component props;
 * @returns {JSX}
 */
const RadioShowCard = ({
  content, settings, theme, device,
}) => {
  let data = content;
  if (!isValidArray(data) && settings.radioStation) {
    data = [{
      ...settings.radioStation,
      radioStation: settings.radioStation,
    }];
  }
  const bgImage = getRenditionUrl(getKey(data[0], 'image.renditions.original', {}), aspectRatios['16x9'].sm);
  const link = hasKey(settings, 'titleLink') ? settings.titleLink : { href: '' };
  const deviceSizeOverrides = {
    xl: sizes.X_SMALL,
    lg: sizes.X_SMALL,
    md: sizes.X_SMALL,
    sm: sizes.X_SMALL,
    xsm: sizes.X_SMALL,
  };
  return (
    <div className={`row ${Styles.radioShowContainer}`}>
      <div className={`col ${Styles.gradient}`}>
        <div className={Styles.fill} style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}} />
        <div className={`${Styles.content}`}>
          <div className={Styles.imageCont}>
            <Link {...link}>
              <Picture
                image={data[0].image}
                deviceSizeOverrides={deviceSizeOverrides}
                preload={false}
              />
            </Link>
          </div>
          <div className={Styles.radioContent}>
            <PerformanceInfo
              title={data[0].title}
              modifierClass={Styles.performance}
              theme={theme}
              device={device}
              {...getRadioStationProps(data[0].radioStation || {})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

RadioShowCard.propTypes = {
  content: PropTypes.array.isRequired,
  settings: PropTypes.object,
  title: PropTypes.string,
  device: PropTypes.string,
  theme: PropTypes.object,
};

export default RadioShowCard;
