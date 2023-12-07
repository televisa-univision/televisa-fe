import {
  TELEVISA,
} from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchPageUri } from './matchers';

export default {
  [TELEVISA]: [matchPageUri('/televisa')],
  [TELEVISA]: [matchPageUri('/')],
};
