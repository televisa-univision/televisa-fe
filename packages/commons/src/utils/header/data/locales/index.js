import {
  isPartOfElectionsSection,
  isPartOfLocalesJobs,
  isPartOfAskExperts,
  isPartOfCoronavirusNav,
  isPartOfDestino2024,
} from './localesNavHelpers';

import { getKey } from '../../../helpers';
import { getBrandable } from '../../helpers';

import * as subNavTypes from '../../../../constants/subNavTypes';
import {
  currentMarketSelector,
} from '../../../../store/selectors/local-selectors';
import Features from '../../../../config/features';

import genericNavData from '../genericNavData';
import getLinks from './links/home';

import * as brandableTypes from '../../../brandable/types.json';

import headerTheming from './localesData';
import logoUnivision from '../../../../assets/images/logo-univision-color.svg';
import electionsNav from './elections2020';
import localesJobNav from './localesJobNav';
import localesAskExpertsNav from './localesAskExperts';
import jobMarkets from './links/jobLinks';
import askExpertsMarkets from './links/askExpertsLinks';
import localesCoronavirusNav from './localesCoronavirusNav';

/**
 * Returns the configuration for the header
 * @param {Object} data Current data
 * @param {Object} requestStore Current Store
 * @returns {Object}
 */
export default (data = {}) => {
  const state = { page: { data } };
  const localMarket = currentMarketSelector(state);
  const defaultNav = genericNavData(data);
  const brandable = getBrandable(data);
  const localUri = getKey(data, 'uri', brandable.uri);
  const isElections = isPartOfElectionsSection(localUri);
  const isLocalesJob = isPartOfLocalesJobs(localUri);
  const isCoronavirusNav = isPartOfCoronavirusNav(localUri);
  const isAskExperts = isPartOfAskExperts(localUri);
  const isDestino2024 = isPartOfDestino2024(localUri);
  const { link: jobsHomepage } = getKey(jobMarkets, `${localMarket}.options`, [])[0] || {};
  const { link: askExpertsHomepage } = getKey(askExpertsMarkets, `${localMarket}.options`, [])[0] || {};
  const isMarketActiveForJobs = getKey(jobMarkets, `${localMarket}.isActive`, false) || Features.localMarkets.forceMarketJobs();
  const isMarketActiveForATE = getKey(askExpertsMarkets, `${localMarket}.isActive`, false) || Features.localMarkets.forceAskExperts();

  if (isDestino2024) {
    return {
      ...defaultNav,
      brandableType: brandableTypes.tv,
      links: getLinks({
        uri: brandable.uri,
      }),
      title: {
        link: brandable.uri,
        logo: 'https://st1.uvnimg.com/2f/db/d7d5845c4e6f9d89971e636d1363/destino-2024-wide-199x31px.svg',
        name: null,
        target: '_self',
        maxWidth: '300px',
        maxHeight: '48px',
      },
    };
  }

  if (isLocalesJob && isMarketActiveForJobs) {
    return {
      ...defaultNav,
      ...localesJobNav({
        uri: brandable.uri,
        state,
        localMarket,
        jobsHomepage,
      }),
    };
  }

  if (isAskExperts && isMarketActiveForATE) {
    return {
      ...defaultNav,
      ...localesAskExpertsNav({
        uri: brandable.uri,
        state,
        localMarket,
        askExpertsHomepage,
      }),
    };
  }

  if (isElections) {
    return {
      ...defaultNav,
      ...electionsNav({ uri: brandable.uri, state }),
    };
  }

  if (isCoronavirusNav) {
    return {
      ...defaultNav,
      ...localesCoronavirusNav({
        logo: getKey(headerTheming, `${brandable.uri}.headerLogo`, logoUnivision),
        state,
        uri: brandable.uri,
      }),
    };
  }

  const title = {
    link: brandable.uri,
    logo: getKey(headerTheming, `${brandable.uri}.headerLogo`, logoUnivision),
    name: null,
    target: '_self',
  };

  return {
    ...defaultNav,
    brandableType: brandableTypes.tv,
    links: getLinks({
      uri: brandable.uri,
      localMarket,
      jobsHomepage,
      isMarketActiveForJobs,
      isMarketActiveForATE,
      askExpertsHomepage,
    }),
    title,
    subNavType: subNavTypes.SECTION_SUBNAV,
  };
};
