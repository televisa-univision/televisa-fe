import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Link from '@univision/fe-components-base/dist/components/Link';
import Styles from './ApplyJobButton.styles';

const ApplyJobBtnWrapper = styled(Link)`${Styles.applyJobBtnWrapper}`;

/**
 * Aplicar Button Component
 * @param {Object} props - component props
 * @param {func} applyBtnTrackingJob - Apply Button Tracking
 * @param {string} applyUrl - Job Apply url
 * @param {string} className - modifier class name
 * @param {string} [target = '_blank'] - link target options
 * @returns {JSX}
 */
const ApplyJobButton = ({
  applyBtnTracking,
  applyUrl,
  className,
  target,
}) => {
  return (
    <ApplyJobBtnWrapper
      href={applyUrl}
      onClick={applyBtnTracking}
      className={className}
      target={target}
    >
      {localization.get('apply')}
    </ApplyJobBtnWrapper>
  );
};

ApplyJobButton.propTypes = {
  applyBtnTracking: PropTypes.func,
  applyUrl: PropTypes.string,
  className: PropTypes.string,
  target: PropTypes.string,
};

ApplyJobButton.defaultProps = {
  target: '_blank',
};

export default ApplyJobButton;
