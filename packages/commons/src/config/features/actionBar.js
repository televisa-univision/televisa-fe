// eslint-disable-next-line import/no-cycle
import { requestParamsSelector } from '../../store/selectors/page-selectors';
// eslint-disable-next-line import/no-cycle
export default {
  hasActionBar: state => requestParamsSelector(state)?.showActionBar !== 'false',
};
