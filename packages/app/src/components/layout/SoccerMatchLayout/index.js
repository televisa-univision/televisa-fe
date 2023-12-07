import React from 'react';
import PropTypes from 'prop-types';

import TudnMvpdWrapper from '@univision/fe-deportes/dist/components/base/TudnMvpdWrapper';
import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider/ThemeProviderConnector';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import { getChannelsType } from '@univision/shared-components/dist/extractors/commonsExtractor';

import PageWrapper from '../../base/PageWrapper';

import Styles from './SoccerMatchLayout.styles';

const MatchGlobalStyled = Styles.global;

/**
 * Soccer Match TUDN page layout
 * @param {Object} props - react Props for this component
 * @param {Object} props.pageData - page object definition
 * @param {string} props.pageData.device - current page device
 * @param {boolean} [props.pageData.data.tudnExtra] - true if is the match is TUDNXtra
 * @param {Object} [props.pageData.data.tudnExtraSettings] - settings for TUDN popup
 * @param {Node} props.children - react component to be render
 * @returns {JSX}
 */
const SoccerMatchLayout = ({ pageData, children }) => {
  const { data, device } = pageData ?? {};
  const {
    tudnExtraSettings: tudnXtraSettings,
  } = data || {};
  const channels = getChannelsType(data);

  return (
    <ThemeProvider>
      <PageWrapper pageData={pageData}>
        <MatchGlobalStyled />
        {children}
        <Footer />
        <TudnMvpdWrapper
          device={device}
          tudnXtraSettings={tudnXtraSettings}
          channels={channels}
        />
      </PageWrapper>
    </ThemeProvider>
  );
};

SoccerMatchLayout.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.shape({
    device: PropTypes.string,
    data: PropTypes.shape({
      tudnExtra: PropTypes.bool,
      tudnExtraSettings: PropTypes.bool,
    }),
  }),
};

export default SoccerMatchLayout;
