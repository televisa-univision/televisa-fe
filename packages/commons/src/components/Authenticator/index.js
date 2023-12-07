import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isClientSide from '@univision/fe-utilities/helpers/common/isClientSide';
import { fetchAnonUser } from '../../store/slices/user/user-actions';
import authFeatures from '../../config/features/auth';
import { iFrameId } from '../../constants/sso';
import { ERROR, SUCCESS } from '../../constants/status';
import { ssoIFrameUrlSelector } from '../../store/selectors/auth-selectors';
import * as SsoIFrameLocalStorage from '../../utils/helpers/SsoIFrameLocalStorage';

/**
 * Component to handle all the logic related to authentication
 * across univision web apps
 * @returns {Function}
 */
const Authenticator = () => {
  const isSsoEnabled = useSelector(authFeatures.isSsoEnabled);
  const ssoIframeUrl = useSelector(ssoIFrameUrlSelector);
  const dispatch = useDispatch();
  const ssoIFrameRef = useRef(null);
  const [iframeStatus, setIFrameStatus] = useState(null);

  useEffect(() => {
    if (iframeStatus !== ERROR && isSsoEnabled) {
      if (!ssoIFrameRef.current || iframeStatus !== SUCCESS) return;
      // Initialize SSO IFrame Local Storage manager
      // This should always be called before initialize the user
      const iframeOrigin = ssoIframeUrl?.replace(`/${iFrameId}`, '') ?? '';
      SsoIFrameLocalStorage.init(
        ssoIFrameRef.current?.contentWindow,
        iframeOrigin
      );
      dispatch(fetchAnonUser());
    } else {
      dispatch(fetchAnonUser());
    }
  }, [ssoIFrameRef, iframeStatus, isSsoEnabled, ssoIframeUrl, dispatch]);

  const onLoad = useCallback(() => {
    // This callback is supposed to be called every time the page reload.
    // Under development mode, this callback runs randomly and only after a hot reload.
    // We don't know the root of the issue.
    // If you want to test this is being invoked after every reload of the browser,
    // you will need to run the app in production.
    setIFrameStatus(SUCCESS);
  }, []);

  const onError = useCallback(() => {
    setIFrameStatus(ERROR);
  }, []);

  if (!isSsoEnabled || !isClientSide()) return null;
  return (
    <iframe
      ref={ssoIFrameRef}
      title={iFrameId}
      src={ssoIframeUrl}
      onLoad={onLoad}
      onError={onError}
      width={0}
      height={0}
      style={{ display: 'none' }}
    />
  );
};

export default Authenticator;
