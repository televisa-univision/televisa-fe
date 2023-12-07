import React from 'react';
import PropTypes from 'prop-types';

import AskTheExpertQA from '@univision/fe-components-base/dist/components/enhancements/AskExpertQA/AskExpertQA';

import CompanyBio from '../CompanyBio';
import AskExpertHelpers from '../helpers';

/**
 * Ask Expert Body content
 * @param {Object} props - component props
 * @param {Object} props.askExpertData - Data for Ask the Experts from API
 * @param {string} props.askExpertQaAClassName - CSS class fro Questions and Answers section
 * @param {function} props.callBtnTracking - Tracking function
 * @param {Object} props.pageData - Page data from store
 * @returns {JSX}
 */
const AskExpertBody = ({
  askExpertData, askExpertQaAClassName, callBtnTracking, pageData,
}) => (
  <>
    <AskTheExpertQA askExpertData={askExpertData} className={askExpertQaAClassName} />
    <CompanyBio
      {...AskExpertHelpers.getAskExpertCompanyBioInfo(pageData)}
      callBtnTracking={callBtnTracking}
    />
  </>
);

AskExpertBody.propTypes = {
  askExpertData: PropTypes.object,
  askExpertQaAClassName: PropTypes.string,
  callBtnTracking: PropTypes.func,
  pageData: PropTypes.object,
};

AskExpertBody.defaultProps = {
  askExpertQaAClassName: '',
};

export default AskExpertBody;
