import React from 'react';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Loading from '../../../../Loading';

import Styles from './SquareCardLoading.styles';

const SquareWrapper = styled.div`
  ${Styles.squareWrapper}
`;

/**
 * Square SquareCardLoading
 * @returns {JSX}
 */
const SquareCardLoading = () => (
  <SquareWrapper>
    <Loading
      theme={{}}
      label={`${localization.get('loading')}...`}
    />
  </SquareWrapper>
);

export default SquareCardLoading;
