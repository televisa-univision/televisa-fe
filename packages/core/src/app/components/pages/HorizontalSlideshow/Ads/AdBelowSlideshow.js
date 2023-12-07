import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import Styles from './AdBelowSlideshow.scss';

const AD_ID = AdTypes.SLIDESHOW_BOT_AD;

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
  hideAds: PropTypes.array,
};

/**
 * get hideAds from dfp data
 * @param   {Object} state the current redux state
 * @returns {Object} the props to be injected on the component
 */
export const stateToProps = state => ({
  hideAds: getKey(state, 'dfpAds.hideAds', []),
});

export default connect(stateToProps)(AdBelowSlideshow);
