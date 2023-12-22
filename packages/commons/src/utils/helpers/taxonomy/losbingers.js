import {
  LOS_BINGERS,
  LOS_BINGERS_SHOW,
} from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchPageUri, matchIncludesPath } from './matchers';

export default {
  [LOS_BINGERS_SHOW]: [matchIncludesPath('/show'), matchIncludesPath('/show-test-los-bingers')],
  [LOS_BINGERS]: [matchPageUri('/')],
};
