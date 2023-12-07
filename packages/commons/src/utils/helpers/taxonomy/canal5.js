import {
  CANAL5,
  CANAL5_SHOW,
} from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchPageUri, matchIncludesPath } from './matchers';

export default {
  [CANAL5_SHOW]: [matchIncludesPath('/show'), matchIncludesPath('/show-test-canal-5')],
  [CANAL5]: [matchPageUri('/')],
};
