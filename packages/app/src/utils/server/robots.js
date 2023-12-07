import robotsDev from '../../assets/robots_dev.txt';

/**
 * Dummy component required in all pages by next.js
 * @returns {JSX}
 */
function Robots() {
  return null;
}

/**
 * Return 'getServerSideProps' function with the robots string content
 * for responding to requests for the web application's
 * robot.txt for lower environments or per site/route
 * @param {string} [robotsString=robotsDefault] - robots.txt string content
 * by default dev robots.txt that disallow all
 * @returns {Function} 'getServerSideProps' with node response
 */
export function getRobotsServerSideProps(robotsString = robotsDev) {
  /**
   * Pre-render this page on each request changing
   * the behavior sending a custom response with robots.txt file.
   * @param {Object} context - next.js page context properties
   * @param {Object} context.res - the node.js HTTP response object
   * @param {Object} context.query - request query string
   * @returns {Object} empty props because is required by next.js
   */
  return async function getServerSideProps({ res, query }) {
    res.setHeader('Content-Type', 'text/plain');
    if (process.env.DEPLOY_ENV === 'production' || query?.mode === 'prod') {
      res.end(robotsString);
    } else {
      res.end(robotsDev);
    }
    return { props: {} };
  };
}

export const getServerSideProps = getRobotsServerSideProps();
export default Robots;
