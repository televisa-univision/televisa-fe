import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import { BLACK_80 } from '@univision/fe-utilities/styled/constants';
import isClientSide from '@univision/fe-utilities/helpers/common/isClientSide';
import localStorage from '@univision/fe-utilities/storage/localStorage';
import localization from '@univision/fe-utilities/localization';
import AnimatedModalBackGround from '@univision/fe-components-base/dist/components/AnimatedModalBackground';
import Title from '@univision/fe-components-base/dist/components/Title';
import Image from '@univision/fe-components-base/dist/components/Image';
import CastingTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/CastingTracker';

import {
  variants,
  variantExplainer,
  SHOW,
  HIDDEN,
  EXPLAINER_ID,
  UNDERSTOOD,
  CASTING_IMAGE,
  SKIP,
  CASTING_TITLE,
  CASTING_COPY,
  INT_RADIX,
  TRACK_CLOSING,
  TRACK_UNDERSTOOD,
} from './CastingExplainer.animations';
import Styles from './CastingExplainer.styles';

const Arrow = styled.div`${Styles.arrow}`;
const ButtonWrapper = styled.div`${Styles.buttonWrapper}`;
const ExplainerCopy = styled(motion.div)`${Styles.explainerCopy}`;
const ExternalWrapper = styled.div`${Styles.externalWrapper}`;
const ExternalButtonWrapper = styled(motion.div)`${Styles.externalButtonWrapper}`;
const Label = styled.div`${Styles.label}`;
const ImageWrapper = styled(motion.div)`${Styles.imageWrapper}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const TextButton = styled.div`${Styles.textButton}`;
const TitleStyled = styled(Title).attrs({
  fontName: 'uvs-font-b-bold',
})`${Styles.title}`;
const Wrapper = styled(motion.div)`${Styles.wrapper}`;

/**
 * Get number of times that the explainer has been shown
 * @param {string} explainerId - explainer identifier for localstorage
 * @returns {number}
 */
function getExplainerCount(explainerId) {
  const explainerValue = localStorage.get(explainerId) || 0;
  // backward compatibility with true old storage
  return explainerValue === 'true' ? 1 : parseInt(explainerValue, INT_RADIX);
}

/**
 * Increment explainer show count and save in storage
 * @param {string} explainerId - explainer identifier for localstorage
 */
function incrementExplainerCount(explainerId) {
  const explainerCount = getExplainerCount(explainerId);
  localStorage.set(explainerId, explainerCount + 1);
}

/**
 * Track explainer display and click envents
 * @param {string} target - the tracking target
 */
function trackClick(target = null) {
  CastingTracker.track(
    CastingTracker.events.explainerClick,
    target,
  );
}

/**
 * Casting Explainer Component
 * @param {Object} props - component props
 * @param {number} [props.arrowPosition] - Number 0 -100 to position the arrow
 * @param {string} [props.className] - The modifies class name
 * @param {Object} [props.close] - To force the close from parent
 * @param {string} [props.explainerId] - Id for localstorage
 * @param {bool} [props.showExplainerUp] - To show explainer up
 * @param {bool} [props.showArrowRight] - To show arrow at right position
 * @param {number} [props.showTimes] - How many times to show the explainer
 * @param {boolean} [props.showExplainer] - To handle from parent to be shown or not
 * @param {Object} [props.theme] - the theme object
 * @returns {JSX}
 */
const CastingExplainer = ({
  arrowPosition,
  className,
  close,
  explainerCopy,
  explainerId,
  explainerTitle,
  showExplainerUp,
  showArrowRight,
  showTimes,
  showExplainer,
  theme,
}) => {
  if (close) incrementExplainerCount(explainerId);

  const [closeExplainer, setCloseExplainer] = useState(false);
  let canBeShown = showExplainer;

  if (isClientSide() && explainerId && canBeShown) {
    canBeShown = showTimes ? getExplainerCount(explainerId) < showTimes : canBeShown;
  }

  /**
   * Handle closing click
   * @param {Object} event - react click event
   */
  const handleClick = useCallback((event) => {
    // eslint-disable-next-line babel/no-unused-expressions
    event?.preventDefault();
    incrementExplainerCount(explainerId);
    trackClick(TRACK_CLOSING);
    setCloseExplainer(true);
  }, [explainerId]);

  /**
   * Handle close pop up click
   * @param {Object} event - react click event
   */
  const handlePopUpClick = useCallback((event) => {
    // eslint-disable-next-line babel/no-unused-expressions
    event?.preventDefault();
    incrementExplainerCount(explainerId);
    trackClick(TRACK_UNDERSTOOD);
    setCloseExplainer(true);
  }, [explainerId]);

  if (!canBeShown) return null;

  if (isClientSide()) {
    trackClick();
  }
  return (
    <Wrapper
      closeExplainer={closeExplainer}
    >
      <AnimatePresence>
        {!closeExplainer && (
          <InnerWrapper
            theme={theme}
            className={className}
          >
            <ExternalButtonWrapper
              initial={HIDDEN}
              animate={SHOW}
              exit={HIDDEN}
              variants={variants.skip}
              onClick={handleClick}
            >
              <TextButton>
                {localization.get(SKIP)}
              </TextButton>
            </ExternalButtonWrapper>
            <ExternalWrapper showExplainerUp={showExplainerUp}>
              <ImageWrapper
                initial={HIDDEN}
                animate={SHOW}
                exit={HIDDEN}
                variants={variants.image}
                showExplainerUp={showExplainerUp}
              >
                <Image
                  src={CASTING_IMAGE}
                />
              </ImageWrapper>
              <ExplainerCopy
                initial={HIDDEN}
                animate={SHOW}
                exit={HIDDEN}
                variants={variantExplainer({ showExplainerUp, showArrowRight })}
                showExplainerUp={showExplainerUp}
              >
                <TitleStyled>
                  {explainerTitle}
                </TitleStyled>
                <Label>
                  {explainerCopy}
                </Label>
                <ButtonWrapper onClick={handlePopUpClick}>
                  <TextButton>
                    {localization.get(UNDERSTOOD)}
                  </TextButton>
                </ButtonWrapper>
                <Arrow
                  position={arrowPosition}
                  showExplainerUp={showExplainerUp}
                  showArrowRight={showArrowRight}
                  theme={theme}
                />
              </ExplainerCopy>
            </ExternalWrapper>
          </InnerWrapper>
        )}
      </AnimatePresence>
      <AnimatedModalBackGround
        isVisible={!closeExplainer}
        onClick={handleClick}
        backgroundColor={BLACK_80}
      />
    </Wrapper>
  );
};

CastingExplainer.defaultProps = {
  arrowPosition: 20,
  explainerId: EXPLAINER_ID,
  explainerTitle: localization.get(CASTING_TITLE),
  explainerCopy: localization.get(CASTING_COPY),
  showArrowRight: true,
  showExplainer: false,
  showExplainerUp: true,
};

CastingExplainer.propTypes = {
  arrowPosition: PropTypes.number,
  className: PropTypes.string,
  close: PropTypes.bool,
  explainerCopy: PropTypes.string,
  explainerId: PropTypes.string,
  explainerTitle: PropTypes.string,
  theme: PropTypes.object,
  showExplainerUp: PropTypes.bool,
  showArrowRight: PropTypes.bool,
  showTimes: PropTypes.number,
  showExplainer: PropTypes.bool,
};

export default CastingExplainer;
