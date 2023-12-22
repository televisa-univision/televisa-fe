import {
  LCDLF,
  LCDLF_SHOW,
} from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchIncludesPath, matchPageUri } from './matchers';

export default {
  [LCDLF_SHOW]: [matchIncludesPath('/show'), matchIncludesPath('/show-test-lcdlf')],
  [LCDLF]: [matchPageUri('/')],
};
