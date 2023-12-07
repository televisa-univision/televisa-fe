import entertainment from './entertainment';
import locales from './locales';
import news from './news';
import unow from './unow';
import radio from './radio';
import tudn from './tudn';

export const appsMapping = {
  ...locales.mapping,
  ...unow.mapping,
  ...entertainment.mapping,
  ...tudn.mapping,
};

export default {
  itunes: {
    affiliateId: '1010lNJb',
  },
  ...entertainment.apps,
  ...locales.apps,
  ...news.apps,
  ...unow.apps,
  ...tudn.apps,
  ...radio.apps,
};
