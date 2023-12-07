import getKey from '@univision/fe-utilities/helpers/object/getKey';

import fetch from '../../fetch';
import { getTimestamp } from '../../datetime';
import Store from '../../../store/store';
import { getConfig } from '../../../store/storeHelpers';

/**
 * Paginates the content in a widget
 * @param {Object} widgetContext Widget Context
 * @param {Object} options used for the pagination
 * @param {Object} options.pageUri current page uri
 * @param {number} options.offset Page number
 * @param {number} options.limit How many items to fetch
 *
 * @returns {Promise.<void>}
 */
export default async function paginate(widgetContext, {
  offset,
  limit,
  pageUri,
}) {
  const params = `wid=${widgetContext.id}&offset=${offset}&limit=${limit}&url=${pageUri}`;
  const cacheBuster = `&mrpts=${getTimestamp({ secondsInterval: 59 }, false)}`;
  const uri = `${getConfig(Store, 'syndicator.widget')}?${params}${cacheBuster}`;
  const response = await fetch(uri);
  return getKey(response, 'data.widget', null);
}
