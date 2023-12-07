// eslint-disable-next-line import/no-cycle
import { requestParamsSelector, configSelector } from '../../store/selectors/page-selectors';

export default {
  isSsoEnabled: (state) => {
    const ssoParamEnabled = requestParamsSelector(state)?.ssoEnabled !== 'false';
    const isProdEnv = configSelector(state)?.deploy?.buildMode === 'production';

    // SSO implementation depends on some iFrame component events.
    // Those events only are triggering when the app is running a production build,
    // for that reason we perform the further validation.
    return isProdEnv && ssoParamEnabled;
  },
  ssoLogsEnabled: state => requestParamsSelector(state)?.ssoLogsEnabled === 'true',
};
