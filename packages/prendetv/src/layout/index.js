/**
 * @module PrendeTV Layout
 */
import React, { useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import AntiFlicker from '@univision/fe-commons/dist/components/tracking/GoogleTagManager/googleOptimize/AntiFlicker';
import ScrollTracker from '@univision/fe-commons/dist/components/tracking/ScrollTracker';
import gtmManager from '@univision/fe-commons/dist/utils/tracking/googleTagManager/gtmManager';

import { GTM } from '../constants';
import localization from '../constants/localization';
import Header from '../components/Header';
import Footer from '../components/Footer';
import favicon from '../assets/favicon.ico';
import PrendeTVContext from '../context';

const DEFAULT_IMAGE = 'https://st1.uvnimg.com/04/82/6fcdfdb6408d8d2572d0b65b1e5c/share3-prendetv.jpg';

/**
 * Main Prende TV page layout
 * @param {Object} props - react Props for this component
 * @param {Node} props.children - React element to be render
 * @returns {JSX}
 */
const PrendeTVLayout = ({ children }) => {
  const { page } = useContext(PrendeTVContext);

  let metatagTitle = localization.get('metatagnotfoundTitle');
  let metatagDescription = localization.get('metatagnotfoundDescription');
  const metatagImage = page?.data?.metaTagData?.openGraph?.imageUrl || DEFAULT_IMAGE;

  if (page && !page.error) {
    ({ title: metatagTitle, description: metatagDescription } = page.data?.seo?.title
      ? page.data.seo : page.data);
  }

  const trackScroll = useCallback((milestones) => {
    for (let i = 0; i < milestones.length; i += 1) {
      gtmManager.triggerEvent(`section_${milestones[i]}_percent`);
    }
  }, []);

  useEffect(() => {
    gtmManager.addDataLayer({
      uciPlatform: 'web',
      uciProduct: 'Prende TV',
      environment: process.env.NODE_ENV,
      pageTitle: 'Prende TV Marketing Landing Page',
      pageType: 'section',
    });
    gtmManager.updateDataLayer({});
  }, []);

  return (
    <>
      <AntiFlicker id={GTM.id} />
      <Head>
        <title>{metatagTitle}</title>
        <link rel="icon" type="image/x-icon" href={favicon} />

        <meta name="title" content={metatagTitle} />
        <meta name="description" content={metatagDescription} />

        <meta name="twitter:title" content={metatagTitle} />
        <meta name="twitter:description" content={metatagDescription} />
        <meta name="twitter:image" content={metatagImage} />
        <meta name="twitter:creator" content="@PrendeTV" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="fb:app_id" content="your_app_id" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metatagTitle} />
        <meta property="og:description" content={metatagDescription} />
        <meta property="og:image" content={metatagImage} />
        <meta property="og:locale" content="es_LA" />
        <meta property="og:locale:alternate" content="en_US" />

        <link rel="alternate" hrefLang="es_LA" href="https://www.prende.tv/" />
        <link rel="alternate" hrefLang="en_US" href="https://www.prende.tv/en/" />
      </Head>
      <ScrollTracker
        onMilestone={trackScroll}
        milestones={[50, 100]}
      >
        <Header />
        {children}
      </ScrollTracker>
      <Footer />
    </>
  );
};

PrendeTVLayout.propTypes = {
  children: PropTypes.node,
};

export default PrendeTVLayout;
