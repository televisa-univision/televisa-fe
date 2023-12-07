import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import {
  GREEN, WHITE,
} from '@univision/fe-utilities/styled/constants';
import localization from '@univision/fe-utilities/localization';
import Icon from '@univision/fe-icons/dist/components/Icon';

import {
  variants, SHOW, HIDDEN,
} from '../CastingControls.animation';
import {
  castingLabels,
  castingIcons,
} from '../CastingControls.config';
import Styles from './DisableCastingScreen.styles';

const ScreenWrapper = styled(motion.div)`${Styles.screenWrapper}`;
const ContentWrapper = styled(motion.div)`${Styles.contentWrapper}`;
const CastingInfo = styled.div`${Styles.castingInfo}`;
const IconStyled = styled(Icon)`${Styles.icon}`;
const Button = styled(motion.div)`${Styles.buttonContainer}`;
const ButtonCopy = styled(motion.div).attrs({
  whileHover: { opacity: 0.5 },
  whileTap: { opacity: 0.9 },
})`${Styles.buttonCopy}`;

/**
 * Disable Casting Screen Component
 * @param {Object} props - component props
 * @param {string} [props.castingDeviceName] - the casting device name
 * @param {string} [props.castingPlatform] - the casting platform name
 * @param {function} [props.disableCallback] - the function for the disabling casting
 * @param {bool} [props.showDisableScreen = false] - true if it is showing disable screen
 * @param {function} [props.showDisableScreenCallback] - function for show/hide disable cast screen
 * @returns {JSX}
 */
const DisableCastingScreen = ({
  castingDeviceName,
  castingPlatform,
  disableCallback,
  showDisableScreen,
  showDisableScreenCallback,
}) => {
  return (
    <AnimatePresence>
      {showDisableScreen && (
        <ScreenWrapper
          initial={HIDDEN}
          animate={SHOW}
          exit={HIDDEN}
          variants={variants.disableScreen}
        >
          <ContentWrapper
            isTop
            variants={variants.buttons}
          >
            <Button
              isClose
              onClick={showDisableScreenCallback}
              variants={variants.buttons}
            >
              <IconStyled
                name={castingIcons.CLOSE}
                fill={WHITE}
                width={16}
                height={16}
                isClose
              />
            </Button>
            <CastingInfo>
              <IconStyled name={castingIcons.CAST_CONNECTED} fill={GREEN} />
              {castingDeviceName ?? castingPlatform}
            </CastingInfo>
          </ContentWrapper>
          <ContentWrapper>
            <Button
              onClick={disableCallback}
              variants={variants.buttons}
            >
              <ButtonCopy>
                {localization.get(castingLabels.DISCONNECT)}
              </ButtonCopy>
            </Button>
          </ContentWrapper>
        </ScreenWrapper>
      )}
    </AnimatePresence>
  );
};

DisableCastingScreen.propTypes = {
  castingDeviceName: PropTypes.string,
  castingPlatform: PropTypes.string,
  disableCallback: PropTypes.func,
  showDisableScreen: PropTypes.bool,
  showDisableScreenCallback: PropTypes.func,
};

DisableCastingScreen.defaultProps = {
  showDisableScreen: false,
};

export default DisableCastingScreen;
