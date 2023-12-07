import { URL, URLSearchParams } from 'url';
import * as messages from '../../constants/messages';
import { requestServer } from './request';
import { hasKey } from '../helpers';

/**
 * Requests to sports api
 * @param {Object} config - configuration object
 * @returns {Promise} request instance
 */
export default async function sportsRequest(config) {
  if (hasKey(process, 'env.SPORT_API_URL') && hasKey(process, 'env.SPORT_API_KEY')) {
    // Docs: https://github.com/univision/sports-data-service/wiki/%5BIteration-8%5D-API-Resources
    // EndPoint: /proxy/api/cached/sports/v1/commentary/soccer/920517
    // API: https://sports-api-dev.univision.com/v1/stats/soccer/934230
    const domain = process.env.SPORT_API_URL;
    const apiKey = process.env.SPORT_API_KEY;
    const options = {
      headers: {
        'x-api-key': apiKey,
      },
      json: true,
      fullData: config.fullData,
    };

    try {
      const url = new URL(domain);
      url.pathname = config.path;
      options.params = new URLSearchParams(config.query);
      options.url = url.toString();
    } catch (err) {
      return err;
    }
    const response = await requestServer(options);
    return response;
  }
  return { statusText: messages.PROXY_ERROR };
}
