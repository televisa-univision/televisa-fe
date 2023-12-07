import {
  ELNU9VE,
  ELNU9VE_SHOW,
} from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchIncludesPath, matchPageUri } from './matchers';

export default {
  [ELNU9VE_SHOW]: [matchIncludesPath('/shows'), matchIncludesPath('/show-test-canal-nu9ve')],
};
