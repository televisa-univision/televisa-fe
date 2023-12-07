import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Store from '../../../store/store';
import setPageData from '../../../store/actions/page-actions';
import DFPAdsProvider from './DFPAdsProvider';
import BKPIndicator from '../../breakpoint/BreakPointIndicator';
import { pageData } from '../../../config/storyMocks';
import DFPAd from './DFPAd';
import adHelper from '../../../utils/ads/adHelper';
import AdSettings from '../../../utils/ads/adSettings.json';
import * as AdTypes from '../../../utils/ads/ad-types';

import Styles from './DFPAd.stories.scss';

/**
 * Ad render
 * @param {Object} settings - Ad settings
 * @returns {*}
 * @constructor
 */
const Ad = (settings) => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      { visible && <DFPAd {...settings} />}
      <button onClick={() => setVisible(!visible)}>
        Toggle Ad
      </button>
    </>
  );
};

/**
 * DFP ad builder
 * @param {string} type of ad
 * @param {Object} children to be render
 * @param {boolean} hasBg the ad
 * @returns {XML}
 */
const callDFPAd = (type, children, hasBg) => {
  Store.dispatch(setPageData(pageData));
  const adSettings = AdSettings[type];
  const settings = adHelper.getSettings(adSettings);
  settings.hasBg = hasBg;
  return (
    <Provider store={Store}>
      <BKPIndicator />
      <DFPAdsProvider
        env={pageData.env}
        settings={pageData.data.adSettings}
        requestParams={pageData.requestParams}
        contentType={pageData.data.type}
      >
        <Ad {...settings} />
        {children}
      </DFPAdsProvider>
    </Provider>
  );
};

const contentWithAds = (
  <div>
    <div className={Styles.block}>Scroll Down ↓</div>
    {adHelper.getAd(AdTypes.MID_AD)}
    <div className={Styles.block}>Scroll Down ↓</div>
    {adHelper.getAd(AdTypes.MID_AD)}
    <div className={Styles.block} />
  </div>
);

storiesOf('Ads/DFPAd', module)
  .add('with top ad', withInfo('Ad located on top of the pages')(() => callDFPAd(AdTypes.TOP_AD)))
  .add(
    'with right rail ad',
    withInfo('Ad located on right rail of articles')(() => callDFPAd(AdTypes.RIGHT_RAIL_TOP_AD))
  )
  .add(
    'with background ad',
    withInfo('Ad located on right rail of articles')(() => callDFPAd(AdTypes.TOP_AD, false, true))
  )
  .add(
    'with lazyloading ads',
    withInfo('Ad located on right rail of articles')(() => callDFPAd(AdTypes.TOP_AD, contentWithAds))
  );
