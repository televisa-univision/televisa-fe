import {
  UNICABLE,
  UNICABLE_SHOWS,
} from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchPageUri, matchIncludesPath } from './matchers';

export default {
  [UNICABLE_SHOWS]: [matchIncludesPath('/show'), matchIncludesPath('/show-test-canal-unicable')],
  [UNICABLE]: [matchPageUri('/')],
};
