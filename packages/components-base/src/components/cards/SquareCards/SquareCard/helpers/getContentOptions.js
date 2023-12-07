import { LIVE_STREAM, ARTICLE, EXTERNAL_CONTENT_PROMO } from '@univision/fe-commons/dist/constants/contentTypes';
import { LOADING } from '@univision/fe-commons/dist/constants/status';
import getFromMap from '@univision/fe-utilities/helpers/object/getFromMap';

import contentOptions from '../contentOptions';

/**
 * Determines which content options to send depending on the card name and
 * other options like cardLabel availability
 * @param {string} cardName - name of the card
 * @param {string} cardLabel - label of the card
 * @param {bool} isConecta - true if feedConsumer is CONECTA
 * @param {bool} isConectaFeed - true if feedConsumer is CONECTA and schedule is valid
 * @param {Object} status - status of the squarecard is loading - success -error
 * @returns {string}
 */
export default function getContentOptions({
  cardName,
  cardLabel,
  isConecta,
  isConectaFeed,
  status,
}) {
  if (status === LOADING) {
    return contentOptions[LOADING];
  }
  /**
   * Special case where the API sends a livestream card without a card label
   * in order to hide it
  */
  if (cardName === LIVE_STREAM && !cardLabel) {
    return {
      ...contentOptions[LIVE_STREAM],
      showBadge: false,
      titleTypeOverride: ARTICLE,
    };
  }

  /**
   * Special case where feedConsumer is CONECTA and schedule is valid
  */
  if (cardName === EXTERNAL_CONTENT_PROMO && isConecta) {
    return {
      ...contentOptions[EXTERNAL_CONTENT_PROMO],
      hideContent: !isConectaFeed,
      showBadge: true,
    };
  }

  return getFromMap(cardName, contentOptions);
}
