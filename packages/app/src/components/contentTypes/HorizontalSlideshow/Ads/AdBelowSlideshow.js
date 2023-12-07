import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import Styles from './AdBelowSlideshow.scss';

const AD_ID = AdTypes.SLIDESHOW_TOP_AD;

/**
 * AdBelowSlideshow
 * this was needed to allow connection to redux as we can not add
 * a connect in the same comp that adds the <Provider>
 * @param {bool} hideAds used to hide ad
 * @returns {JSX}
 */
const AdBelowSlideshow = ({ hideAds }) => {
  return (
    <div className={classnames(Styles.adContainer, { [Styles.hideAd]: hideAds.includes(AD_ID) })}>
      {adHelper.getAd(AD_ID, { hasBg: false })}
    </div>
  );
};

/**
 * propTypes
 * @property {array} hideAds object with the ads to hide by id
 */
AdBelowSlideshow.propTypes = {
  hideAds: PropTypes.array.isRequired,
};

export default AdBelowSlideshow;
