import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CLOSE_POPUP_TIME } from '@univision/fe-commons/dist/constants/video';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { showMVPDModal } from '@univision/fe-commons/dist/utils/video';
import Button from '@univision/fe-components-base/dist/components/Button';
import Styles from './FreeVideoPreview.styles';

const MainWrapper = styled.div`${Styles.wrapper}`;
const ContainerWrapper = styled.div`${Styles.container}`;
const InfoAlert = styled.div`${Styles.infoAlert}`;
const ButtonLogin = styled(Button)`${Styles.login}`;

/**
 * Free Video Preview
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const FreeVideoPreview = ({
  theme, nodeId, close,
}) => {
  let timer;
  useEffect(() => {
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Open popup MVPD and close alert
   */
  const openMVPD = () => {
    showMVPDModal(nodeId);
  };

  if (isValidFunction(close)) {
    timer = setTimeout(() => close(), CLOSE_POPUP_TIME);
  }

  return (
    <MainWrapper>
      <ContainerWrapper theme={theme}>
        <InfoAlert>{localization.get('modalFreeVideoPreview')}</InfoAlert>
        <ButtonLogin onClick={openMVPD}>{localization.get('registrationLogIn')}</ButtonLogin>
      </ContainerWrapper>
    </MainWrapper>
  );
};

/**
 * propTypes
 * @property {function} close - Callback to allow the popup to close
 * @property {string} nodeId -  DOM id for a player instance
 * @property {object} theme - theme object
 */
FreeVideoPreview.propTypes = {
  close: PropTypes.func,
  nodeId: PropTypes.string,
  theme: PropTypes.object,
};

export default React.memo(FreeVideoPreview);
