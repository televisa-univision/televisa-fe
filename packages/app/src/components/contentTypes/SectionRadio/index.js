import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import { getRadioStationProps } from '@univision/fe-local/dist/utils/helpers';
import Brandable from '@univision/fe-commons/dist/utils/brandable';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import localization from '@univision/fe-local/dist/utils/localization';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import ConnectedGlobalWidget from '../../base/GlobalWidget';
import Section from '../Section';

const NowPlaying = dynamic(() => import(/* webpackChunkName: "globalWidgets-nowPlaying" */ '@univision/fe-local/dist/components/connected/NowPlaying/NowPlaying'));
/**
 * Tag component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const SectionRadio = ({ pageData }) => {
  const {
    data,
    device,
    theme,
  } = pageData;
  const extendedPageData = {
    ...pageData,
    data: {
      ...pageData.data,
      widgets: data.widgets,
    },
  };
  const brandable = new Brandable(data);
  const defaultChartImage = getKey(brandable, 'image.renditions.original.href', null);
  const extendedWidgets = extendedPageData.data.widgets;
  // Only include the widgets is they don't exist
  // to prevent aditional insertion on section rerender or hydration
  if (Array.isArray(extendedWidgets)
    && !extendedWidgets.find(w => w.type === widgetTypes.RADIO_STATION_LIST_WRAPPER)) {
    if (Array.isArray(getKey(brandable, 'relatedStations'))) {
      extendedWidgets.push({
        type: widgetTypes.RADIO_STATION_LIST_WRAPPER,
        settings: {
          title: localization.get('relatedStations'),
        },
        extraSettings: {
          stations: brandable.relatedStations.slice(0, 4),
        },
      });
    }
  }

  return (
    <>
      <ConnectedGlobalWidget />
      {hasKey(brandable, 'data.abacast.mp3Stream')
        && (
          <NowPlaying
            defaultChartImage={defaultChartImage}
            device={device}
            theme={theme}
            {...getRadioStationProps(brandable.data)}
          />
        )}
      <div className="uvs-ad-full-width uvs-container">
        {adHelper.getAd(AdTypes.TOP_AD, { isLazyLoaded: false })}
      </div>
      <Section pageData={extendedPageData} />
    </>
  );
};

/**
 * propTypes
 */
SectionRadio.propTypes = {
  pageData: PropTypes.shape({
    data: PropTypes.shape({
      widgets: PropTypes.array,
    }),
    device: PropTypes.string,
    theme: PropTypes.object,
  }).isRequired,
};

export default SectionRadio;
