import * as categories from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchTagUri } from './matchers';
// eslint-disable-next-line import/no-cycle

export default {
  [categories.ENTERTAINMENT]: [matchTagUri('/temas/entretenimiento'), matchTagUri('/entretenimiento')],
};
