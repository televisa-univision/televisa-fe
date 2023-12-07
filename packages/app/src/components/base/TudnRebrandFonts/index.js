/* eslint-disable @next/next/missing-preload */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import features from '@univision/fe-commons/dist/config/features';
import GlobalStyle from './Global.styles';

/**
 * Page TudnRebrandFonts to the new rebranding fonts style.
 * @param {Object} props - props of the component
 * @property {boolean} store - Flag to store, redux store instance
 * @returns {JSX}
 */
function TudnRebrandFonts ({ store }) {
  if (!features.deportes.isWorldCupMVP(store.getState())) {
    return null;
  }
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Roboto+Flex:opsz,wght@8..144,400;8..144,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
    </>
  );
}

TudnRebrandFonts.propTypes = {
  store: PropTypes.object,
};

export default TudnRebrandFonts;
