import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import { WHITE, GREY_ZAMBEZI } from '@univision/fe-utilities/styled/constants';

import CastingFixedButton from '../CastingFixedButton';
import controls from '../PlaybackControls/PlaybackControls.config';
import Styles from './ExtraControls.styles';
import { castingIcons } from '../CastingControls.config';

const ExtraWrapper = styled.div`${Styles.extraWrapper}`;

/**
 * ExtraControls Component
 * @param {Object} props - component props
 * @param {bool} [props.activeCaptions = false] - true if captions are active
 * @param {function} [props.captionsCallback] - the captions callback
 * @param {bool} [props.hasCaptions = false] - true if captions are available
 * @param {string} [props.type] - the type of video that is casting
 * @returns {JSX}
 */
const ExtraControls = ({
  activeCaptions,
  captionsCallback,
  hasCaptions,
  type,
}) => {
  if (!controls[type]?.hasExtraControls) {
    return null;
  }

  return (
    <ExtraWrapper>
      {isValidFunction(captionsCallback) && hasCaptions && (
        <CastingFixedButton
          isExtraButton
          name={castingIcons.CLOSED_CAPTIONS}
          buttonCallback={captionsCallback}
          fill={activeCaptions ? WHITE : GREY_ZAMBEZI}
        />
      )}
    </ExtraWrapper>
  );
};

ExtraControls.propTypes = {
  activeCaptions: PropTypes.bool,
  captionsCallback: PropTypes.func,
  hasCaptions: PropTypes.bool,
  type: PropTypes.string,
};

export default ExtraControls;
