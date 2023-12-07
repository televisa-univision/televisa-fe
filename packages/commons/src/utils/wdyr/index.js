/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import React from 'react';

// monkeypatch used to track re-renders in dev mode
// see https://github.com/welldone-software/why-did-you-render
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  const ReactRedux = require('react-redux');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    // check for reference https://github.com/welldone-software/why-did-you-render#trackextrahooks
    trackExtraHooks: [
      [ReactRedux, 'useSelector'],
    ],
  });
}
