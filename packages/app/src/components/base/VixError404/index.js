import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Tracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import localization from '@univision/fe-utilities/localization';

import VixLayout from '../../layout/VixLayout';
import Styles from './VixError404.styles';

const ErrorMessageWrapper = styled.div`${Styles.errorMessageWrapper}`;
const NotFoundMessage = styled.p`${Styles.notFoundMessage}`;

/**
 * Error404 that contains the 404 page content
 * @param {Object} props component props
 * @returns {JSX}
 */
const VixError404 = ({ pageData }) => {
  return (
    <VixLayout pageData={pageData}>
      <Tracking page={{ ...pageData, statusCode: 404 }} />
      <ErrorMessageWrapper>
        <NotFoundMessage>{localization.get('status404Title')}</NotFoundMessage>
        <p>{localization.get('statusVix404TitleSecondary')}</p>
      </ErrorMessageWrapper>
    </VixLayout>
  );
};

VixError404.propTypes = {
  pageData: PropTypes.object,
};

export default VixError404;
