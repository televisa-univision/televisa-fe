import Loadable from 'react-loadable';
import * as subNavType from './subNavTypes';
import Default from './Default';
import TentPoleSubNav from './TentpolesSubNav';
import BrandedSubNav from './BrandedSubNav';

/**
 * subNavType helper
 * @param {{ subNavType : string }} subNav - sub navigation type
 * @returns {JSX}
 */
export default (subNav) => {
  switch (subNav) {
    case subNavType.TENTPOLE:
      return TentPoleSubNav;
    case subNavType.BRANDED:
      return BrandedSubNav;
    case subNavType.SHOWS:
      return Loadable({
        loader: () => import(/* webpackChunkName: "header/shows" */ './ShowSubNav'),
        loading: () => null,
      });
    case subNavType.DEFAULT:
    default:
      return Default;
  }
};
