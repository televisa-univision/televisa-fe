/* eslint-disable import/no-cycle */
import URL from 'url';
import { getKey } from '../../utils/helpers';

import auth from './auth';
import advertisement from './advertisement';
import actionBar from './actionBar';
import article from './article';
import content from './content';
import header from './header';
import localMarkets from './localMarkets';
import optimize from './optimize';
import pwa from './pwa';
import radio from './radio';
import section from './section';
import tracking from './tracking';
import video from './video';
import widgets from './widgets';
import registration from './registration';
import shows from './shows';
import slideshows from './slideshows';
import deportes from './deportes';
import smartBanner from './smartBanner';
import liveblog from './liveblog';
import televisa from './televisa';

const misc = {
  env: () => URL.parse(`?${getKey(process, 'env.FEATURES', '')}`, true).query,
};

export default {
  auth,
  advertisement,
  article,
  actionBar,
  content,
  header,
  localMarkets,
  optimize,
  pwa,
  radio,
  registration,
  section,
  tracking,
  widgets,
  slideshows,
  video,
  shows,
  smartBanner,
  deportes,
  liveblog,
  televisa,
  ...misc,
};
