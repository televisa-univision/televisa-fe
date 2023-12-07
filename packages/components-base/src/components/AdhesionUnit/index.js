import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { ADHESION_UNIT } from '@univision/fe-commons/dist/utils/ads/ad-types';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { WHITE } from '@univision/fe-utilities/styled/constants';
import Styles from './AdhesionUnit.styles';

const CloseWrapper = styled.div`
  ${Styles.closeWrapper}
`;
const StickyAdWrapper = styled.div`
  ${Styles.stickyAdWrapper}
`;

/**
 * Render the AdhesionUnit Component
 * @returns {JSX}
 */
const AdhesionUnit = ({
  closeTimeOut,
}) => {
  const [isActive, setIsActive] = useState(true);
  const device = useSelector(deviceSelector);
  const isMobile = device === 'mobile';

  /**
   * Hanlde to close advertice
   */
  const hangleActive = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let timer;
    if (closeTimeOut) {
      timer = setTimeout(() => {
        setIsActive(false);
      }, closeTimeOut);
    }
    return () => {
      clearInterval(timer);
    };
  }, [closeTimeOut]);

  return (
    isActive && isMobile && (
    <StickyAdWrapper>
      {adHelper.getAd(ADHESION_UNIT, { isLazyLoaded: false, hasBg: true })}
      <CloseWrapper onClick={hangleActive}>
        <Icon name="close" fill={WHITE} size={10} />
      </CloseWrapper>
    </StickyAdWrapper>
    )
  );
};

AdhesionUnit.propTypes = {
  closeTimeOut: PropTypes.number,
};

export default AdhesionUnit;
