import React from 'react';
import PropTypes from 'prop-types';

import AdhesionUnit from '@univision/fe-components-base/dist/components/AdhesionUnit';
import features from '@univision/fe-commons/dist/config/features';
import { isTemasPage } from '@univision/fe-commons/dist/utils/header/helpers';
import { COMPANY } from '@univision/fe-commons/dist/constants/contentTypes.json';
import PersonJobs from '@univision/fe-local/dist/components/widgets/PersonJobs';

import Section from '../Section';
import HeaderHub from '../../base/HeaderHub';

/**
 * Extends widget list to include specif one for tag
 * @param {Object} pageData web-api Data
 * @param {array} widgets Current widgets for the page
 * @returns {Array} widgets
 */
export const extendWidgets = (pageData = {}, widgets) => {
  const extendedWidgets = [...widgets];
  const { data = {}, config, device } = pageData;
  const {
    enableJobsWidgets,
    type,
  } = data;
  const showHeaderHub = (isTemasPage(type) || type === COMPANY) && features.content.hasTagPages();

  if (showHeaderHub) {
    if (enableJobsWidgets) {
      extendedWidgets.unshift(<PersonJobs {...data} serverUri={config?.graphql} />);
    }
    extendedWidgets.unshift(
      <HeaderHub {...data} device={device} showRelatedTags={!enableJobsWidgets} />,
    );
    extendedWidgets.unshift(
      <AdhesionUnit closeTimeOut={features.advertisement.adhesionUnitTimeout} />,
    );
  }
  return extendedWidgets;
};

/**
 * Tag component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const TagContent = ({ pageData }) => {
  return <Section pageData={pageData} widgetsModifier={extendWidgets} />;
};

/**
 * propTypes
 */
TagContent.propTypes = {
  pageData: PropTypes.shape({
    data: PropTypes.shape({
      widgets: PropTypes.array,
      primaryTopic: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    }),
    theme: PropTypes.object,
    device: PropTypes.string,
  }).isRequired,
};

export default TagContent;
