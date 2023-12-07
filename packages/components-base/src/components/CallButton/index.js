import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { phoneFormat } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';

import Link from '../Link';
import Styles from './CallButton.styles';

const CallBtnWrapper = styled(Link)`${Styles.callBtnWrapper}`;
const CallBtnLabel = styled.span`${Styles.callBtnLabel}`;
const CallIcon = styled(Icon).attrs({
  name: 'phone',
  size: 12,
  fill: WHITE,
})`${Styles.callIcon}`;

/**
 * Call Button Component
 * @param {Object} props - component props
 * @param {func} props.callBtnTracking - Call Button Tracking
 * @param {string} props.callNumber - Call number
 * @param {string} props.className - modifier class name
 * @returns {JSX}
 */
const CallButton = ({
  callBtnTracking,
  callNumber,
  className,
}) => {
  const device = useSelector(deviceSelector);
  const isMobile = device === 'mobile';

  return (
    <CallBtnWrapper
      href={`tel:${callNumber}`}
      onClick={callBtnTracking}
      className={className}
    >
      <CallIcon />
      <CallBtnLabel>
        {isMobile ? localization.get('call') : phoneFormat(callNumber)}
      </CallBtnLabel>
    </CallBtnWrapper>
  );
};

CallButton.propTypes = {
  callBtnTracking: PropTypes.func,
  callNumber: PropTypes.string,
  className: PropTypes.string,
};

export default CallButton;
