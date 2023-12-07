import getKey from '@univision/fe-utilities/helpers/object/getKey';

import pageComponents from './ampPageFactoryComponents';

/**
 * Helper to get page Component based on page type
 * @param {Object} pageData from api data
 * @returns {function(): JSX}
 */
function getPageComponent(pageData) {
  const Component = getKey(
    pageComponents,
    pageData?.type,
    null,
  );
  return Component;
}

export default getPageComponent;
