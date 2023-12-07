import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import * as languages from '@univision/fe-commons/dist/utils/localization/languages';

import BKPIndicator from '@univision/fe-commons/dist/components/breakpoint/BreakPointIndicator';
import Tracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import usePermutiveTracker from '@univision/fe-commons/dist/hooks/usePermutiveTracker';

import LoaderBarConnector from '@univision/fe-components-base/dist/components/LoadingIndicatorBar/LoaderIndicatorBarConnector';
import WithPage from '@univision/fe-commons/dist/components/WithPage/WithPage';
import Authenticator from '@univision/fe-commons/dist/components/Authenticator';
import ProtectedDataCollector from '@univision/fe-commons/dist/components/ProtectedDataCollector';

import PageHead from '../PageHead';
import PageMicrodata from '../PageMicrodata';
import SpecialAds from '../PageSpecialAds';

import Styles from './PageWrapper.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

const ConnectedTracking = WithPage(Tracking);

/**
 * Page container component used to wrap together all the page components
 * @public
 * @extends {React.Component}
 * @params {Object} props - react props component
 * @params {Node} props.children - react children component
 * @params {boolean} props.[dfpSupport=true] - determines if dfp is supported
 * @params {Object} props.pageData - the page object from content API
 * @params {Object} props.pageData.data - the page data from content API
 * @params {string} props.pageData.data.type - page content type
 * @params {boolean} props.pageData.isSpa - determines if is SPA to ignore some components
 * @params {string} props.pageData.language - user or page language
 * @returns {JSX}
 */
function PageWrapper({
  children,
  pageData,
}) {
  // load permutive script early in the page, to capture all the ad events, also
  // to make sure is loaded in pages that dfpManager is not called
  usePermutiveTracker();
  const { data, loading } = { ...pageData };
  const articleType = data?.articleType;
  const contentType = data?.type || null;
  const language = pageData?.language || languages.ES;

  localization.setLanguage(language);

  return (
    <Wrapper className="app-spa">
      <PageHead pageData={pageData} />
      <PageMicrodata pageData={pageData} />
      <LoaderBarConnector />
      <BKPIndicator />
      <ConnectedTracking
        contentType={contentType}
        page={pageData}
      />
      { /* Checking loading feature flag to avoid rerender ad on page transition */ }
      {
        !loading && <SpecialAds articleType={articleType} contentType={contentType} />
      }
      {children}
      <Authenticator />
      <ProtectedDataCollector />
    </Wrapper>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.shape({
    data: PropTypes.shape({
      type: PropTypes.string,
    }).isRequired,
    isSpa: PropTypes.bool,
    language: PropTypes.string,
  }),
};

export default PageWrapper;
