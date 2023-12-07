import * as contentTypes from '../../../constants/contentTypes.json';
import * as sites from '../../../constants/sites';

import searchModifier from './search';
import sportsModifier from './sports';
import radioModifier from './radio';
import tudnModifier from './tudn';

export default {
  [contentTypes.SEARCH_PORTAL]: searchModifier,
  [contentTypes.SOCCER_TEAM]: sportsModifier,
  [contentTypes.LEAGUE]: sportsModifier,
  [contentTypes.RADIO_STATION]: radioModifier,
  [sites.TUDN_SITE]: tudnModifier,
};
