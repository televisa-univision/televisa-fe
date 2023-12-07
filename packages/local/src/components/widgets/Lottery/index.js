import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Store from '@univision/fe-commons/dist/store/store';
import { getBrandable, isTopAdInserted } from '@univision/fe-commons/dist/store/storeHelpers';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import * as AdActions from '@univision/fe-commons/dist/store/actions/ads-actions';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import getLotteryMarket from './data/getLotteryMarket';
import Styles from './Lottery.styles';

const LotteryWrapper = styled.div`${Styles.lotteryWrapper}`;
const LotteryFrame = styled.iframe`${Styles.lotteryFrame}`;
const AdWrapper = styled.div`${Styles.adWrapper}`;

/**
* Lottery Widget
* @returns {JSX}
*/
const Lottery = ({ market, disableTopAd }) => {
  const marketName = market || getKey(getBrandable(Store), 'data.localMarket.title', '');
  const currentLanguage = LocalizationManager.getCurrentLanguage();
  const iframeLanguage = currentLanguage === languages.ES ? 1 : 0;
  const { region, height } = getLotteryMarket(marketName.trim());
  const shouldRenderAd = !isTopAdInserted(Store) && !disableTopAd;

  if (shouldRenderAd) {
    Store.dispatch(AdActions.insertTopAd());
  }

  if (!region) {
    return null;
  }

  return (
    <LotteryWrapper className="uvs-widget">
      {shouldRenderAd && (
        <AdWrapper>
          {adHelper.getAd(AdTypes.TOP_AD, { isLazyLoaded: false })}
        </AdWrapper>
      )}
      <LotteryFrame
        title="Lottery Widget"
        data-region={region}
        data-language={iframeLanguage}
        name="tbcontent"
        id="tbcontent"
        scrolling="auto"
        frameBorder="0"
        src={`https://www.lotteryinformation.us/redirect.php?tb_state=${region}&tb_links=&tb_country=US&tb_lang=${iframeLanguage}&adsurl=`}
        {...height}
      />
    </LotteryWrapper>
  );
};

/**
 * propTypes
 * @property {String} market - Local market name: Miami, Nueva York, Atlanta, Los Angeles, etc
 * @property {bool} disableTopAd - disables top ad
 */
Lottery.propTypes = {
  market: PropTypes.string,
  disableTopAd: PropTypes.bool,
};

export default Lottery;
