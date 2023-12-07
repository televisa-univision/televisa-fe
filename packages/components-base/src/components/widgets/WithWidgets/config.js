import Loadable from 'react-loadable';

import Features from '@univision/fe-commons/dist/config/features';
import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

import { LoadingPlaceholder } from '../../Placeholder';

import CarSaverStyles from '../CarSaver/CarSaver.scss';
import CivicScienceStyles from '../CivicScience/CivicScience.scss';

import insertionPoints from './insertionPoints.json';

/**
 * Widgets configration per tags and insertion point.
 * @param {Object} pageData Data
 * @returns {Object}
 */
export default pageData => ({
  [categories.AUTOS]: [
    {
      insertionPoint: hasKey(pageData, 'data.type') && pageData.data.type === 'section'
        ? insertionPoints.belowHeader
        : insertionPoints.belowContentBody,
      widget: {
        component: Loadable({
          loader: () => import(/* webpackChunkName: "carSaver" */ '../CarSaver'),
          loading: LoadingPlaceholder(CarSaverStyles.horizontal),
        }),
        props: {
          orientation: 'horizontal',
        },
      },
      advertisement: hasKey(pageData, 'data.type') && pageData.data.type === 'section' ? AdTypes.TOP_AD : false,
    },
  ],
  [categories.SOCCER_FUTBOL_STANDINGS]: [{ insertTopAd: true }],
  // This apply for any page category
  any: [
    {
      insertionPoint: insertionPoints.belowArticleBody,
      shouldRender: () => !Features.content.isSensitive(pageData) && hasKey(pageData, 'data.externalWidgets.civicScience'),
      widget: {
        component: Loadable({
          loader: () => import(/* webpackChunkName: "civicScience" */ '../CivicScience'),
          loading: LoadingPlaceholder(CivicScienceStyles.placeholder),
          props: {},
        }),
      },
    },
  ],
});
