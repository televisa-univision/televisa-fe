import React, { Fragment } from 'react';

import Features from '@univision/fe-commons/dist/config/features';
import { hasKey, getKey } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getRequestParams } from '@univision/fe-commons/dist/store/storeHelpers';

/**
 * Renders the scripts for Yotta, if enabled in the current env.
 * @returns {?JSX}
 */
export default () => {
  const envFeatures = Features.env();
  const yottaaStatus = getKey(getRequestParams(Store), 'yottaa', 'enabled');
  if (hasKey(envFeatures, 'yotta') && yottaaStatus === 'enabled') {
    return (
      <Fragment>
        <script
          type="text/javascript"
          src="https://cdn.yottaa.com/rapid.min.js"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
            __html: `Yo.configure("https://qoe-1.yottaa.net/api/v1/configure.rapid.js?key=${envFeatures.yotta}")`,
          }}
          charSet="UTF-8"
        />
      </Fragment>
    );
  }
  return null;
};
