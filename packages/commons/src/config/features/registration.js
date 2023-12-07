import { requestParamsSelector } from '../../store/selectors/page-selectors';
// eslint-disable-next-line import/no-cycle
export default {
  enableRegistration: state => requestParamsSelector(state)?.enableRegistration === 'true',
};
