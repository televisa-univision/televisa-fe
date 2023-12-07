import Loadable from 'react-loadable';
import * as iconTypes from './iconTypes';
import Image from '../../../Image';

/**
 * iconType helper
 * @param {{ iconTypes : string }} iconType - icon type
 * @returns {?JSX}
 */
export default (iconType) => {
  switch (iconType) {
    case iconTypes.LIVE:
      return Loadable({
        loader: () => import(/* webpackChunkName: "header/deportes" */ '../../../LiveIcon'),
        loading: () => null,
      });
    case iconTypes.IMAGE:
      return Image;
    default:
      return null;
  }
};
