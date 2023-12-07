import { setHeaders } from '../../../utils/serverUtils';

/**
 * Send the response for a Raw HTML
 * @param {Object} data web-api Data
 * @param {Object} httpResponse Express.js Response object
 */
export default function sendResponse(data, httpResponse) {
  // Set headers
  if (Array.isArray(data.headers)) {
    data.headers.forEach((httpHeader) => {
      httpResponse.setHeader(httpHeader.name, httpHeader.value);
    });
  }
  // Set TTL
  setHeaders(httpResponse, data.ttl);
  // Send response
  httpResponse.send(data.html);
}

export const RAW_HTML_TYPE = 'rawhtml';
