/**
 * @module Promo Card Factory
 */
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

import promoCardFactoryComponents from './promoCardFactoryComponents';

/**
 * Helper to get proper Promo Card Component based on promo type
 * @param {Object} pageData from api data
 * @returns {function(): JSX}
 */
export default function getPromoCardComponent({ type }) {
  const Component = getKey(
    promoCardFactoryComponents,
    type,
  );

  return Component;
}
