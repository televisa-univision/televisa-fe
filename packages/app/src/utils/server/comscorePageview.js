import { LAS_ESTRELLAS_SITE, DISTRITOCOMEDIA_SITE } from '@univision/fe-commons/dist/constants/sites';
import { DISTRITO_COMEDIA } from '@univision/fe-commons/src/constants/pageCategories';
/**
 * Return 'getServerSideProps' function with the robots string content
 * for responding to requests for the web application's
 * robot.txt for lower environments or per site/route
 * @returns {Function} 'getServerSideProps'
 */
export default function getComscorePageViewServerSideProps() {
  /**
   * Pre-render this page on each request changing
   * the behavior sending a custom response with comscore pageview value
   * for tracking on SPA subsecuent pages on
   * packages/commons/src/utils/tracking/comScore/comScoreManager.js.
   * @param {Object} context - next.js page context properties
   * @param {Object} context.res - the node.js HTTP response object
   * @param {Object} context.query - request query string
   * @returns {Object} empty props because is required by next.js
   */
  return function getServerSideProps({ res, req }) {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store');
    res.setHeader('Edge-Control', '!no-store, cache-maxage=31536000s');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,PATCH,OPTIONS');
    const domain = req.headers.host;
    if (domain === LAS_ESTRELLAS_SITE || domain === DISTRITOCOMEDIA_SITE) {
      res.end('comscore');
    } else {
      res.end('comscore-pageview');
    }
    return { props: {} };
  };
}
