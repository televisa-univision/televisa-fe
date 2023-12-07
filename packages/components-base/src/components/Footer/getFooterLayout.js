import dynamic from 'next/dynamic';
import { SECTION } from '@univision/fe-commons/dist/constants/contentTypes.json';

/**
 * NextJS needs each dynamic import to be declared indepentendly, and sometimes
 * we don't want to render the footer content in server side
 */

// Default footer layout
const FooterLayout = dynamic(() => import(/* webpackChunkName: "footerLayout" */ './FooterLayout/FooterLayout'));

// Required for rebrand sections
const FooterLayoutRevampSSR = dynamic(() => import(/* webpackChunkName: "tudn-rebrand-footer" */ './FooterLayoutRevamp/FooterLayoutRevamp'));

// Required for rebrand content types other than sections
const FooterLayoutRevamp = dynamic(() => import(/* webpackChunkName: "tudn-rebrand-footer" */ './FooterLayoutRevamp/FooterLayoutRevamp'), {
  ssr: false,
});

// Required for rebrand sections
const FooterLayoutTelevisaSSR = dynamic(() => import(/* webpackChunkName: "tudn-rebrand-footer" */ './FooterTelevisaSites/FooterLayoutTelevisa'));

// Required for rebrand content types other than sections
const FooterLayoutTelevisa = dynamic(() => import(/* webpackChunkName: "tudn-rebrand-footer" */ './FooterTelevisaSites/FooterLayoutTelevisa'), {
  ssr: false,
});

/**
 * Gets the footer layout. When the WC feature flag is on we want to bring the
 * TUDN rebrand footer, but we only want to load in SSR when the user is visiting a section
 * @param {Object} options - configuration
 * @returns {JSX}
 */
const getFooterLayout = ({ isWorldCupMVP, contentType, isTelevisaSite }) => {
  if (isTelevisaSite) {
    return contentType === SECTION
      ? FooterLayoutTelevisaSSR
      : FooterLayoutTelevisa;
  }

  if (!isWorldCupMVP) {
    return FooterLayout;
  }
  // Will only load in SSR when user is visiting a section
  return contentType === SECTION
    ? FooterLayoutRevampSSR
    : FooterLayoutRevamp;
};

export default getFooterLayout;
