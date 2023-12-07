import {
  getHeaderLink,
  getHeaderTitle,
  getSubNavType,
  getActivePath,
  shouldRenderMvpd,
} from '../helpers';

/**
 * This is the generic configuration file and should probably be used
 * as a blueprint for the rest of the configurations, there is an optional
 * parameter being sent to these that is the Store, so there is no
 * need to import the global one, you can keep using the store helpers if you may.
 *
 * If there is a logic you keep repeating on these, you should create it as
 * a helper method instead, as shown for the logic to retrieve a header title
 * and a header link.
 *
 * For the type of information stored here, please keep it to simple strings, arrays,
 * objects or booleans. Don't include React components or async methods or we could face
 * some ugly side effects.
 *
 * NOTES:
 *
 * - Variant is not set here, it's tied to whatever value the Store has so it's in
 *   in the Navigation connector. We couldn't confirm if this was a value set globally
 *   and we might get a side effect of being undefined once the navData is deprecated.
 */

export default (data = {}) => {
  return {
    activePath: getActivePath(data),
    brandedNavLogoUri: '/',
    contentType: data.type,
    links: [],
    shouldRenderMVPD: shouldRenderMvpd(data),
    slideshowType: data.slideshowType,
    subNavType: getSubNavType(data.type),
    sectionType: data.sectionType,
    vertical: data.vertical,
    title: {
      name: getHeaderTitle(data),
      link: getHeaderLink(data),
      logo: null,
      target: '_self',
    },
  };
};
