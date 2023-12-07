import React, {
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  useMotionValue,
  useSpring,
} from 'framer-motion';

import {
  getKey,
  isValidNumber,
} from '@univision/fe-commons/dist/utils/helpers';

import Styles from './MobileCarousel.styles';

const MaskContainer = styled.div`${Styles.maskContainer}`;
const MaskWrapper = styled.div`${Styles.maskWrapper}`;

/**
 * MobileCarousel
 * @param {Object} props - component props
 * @param {Array|element|func|Node} props.children - component child
 * @param {bool} props.doMobileAnimation - if true, it will allow animations
 * @param {bool} props.hasDesktopSSROverflow - if true, it will display SSR for desktop
 * @param {bool} props.isSnap - if true, it will snap to grid
 * @param {string} props.maskContainerClassName - mask container modifier class
 * @param {string} props.maskWrapperClassName - mask wrapper modifier class
 * @param {number} props.mobileGoToPage - target page to scroll
 * @param {bool} props.mobileRerender - if true, it will rerender
 * @param {bool} props.mobileScrollAnimated - if true, it will animate page scrolling
 * @param {number} props.offsetMargin - offset margin
 * @param {Object} props.slidesRefs - slides refs
 * @returns {JSX}
 */
const MobileCarousel = ({
  children,
  doMobileAnimation,
  hasDesktopSSROverflow,
  isSnap,
  maskContainerClassName,
  maskWrapperClassName,
  mobileGoToPage,
  mobileRerender,
  mobileScrollAnimated,
  offsetMargin,
  slidesRefs,
}) => {
  const maskRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);
  // framer motion value
  const motionValue = useMotionValue(0);
  // framer spring animation, the value its set by motionValue
  // and updates based in the changes done to it, framer it's use
  // to animate scrollLeft (a not animatable property)
  const spring = useSpring(motionValue, {
    damping: 30, restDelta: 0.5, restSpeed: 0.5, stiffness: 230,
  });

  useLayoutEffect(() => {
    let scrollAnimationEnd = 0;

    /* istanbul ignore next */
    // eslint-disable-next-line require-jsdoc
    function updateScroll(value) {
      const shouldAnimate = Math.abs(scrollAnimationEnd - value) > 1;

      if (shouldAnimate) {
        if (!isAnimating) {
          setIsAnimating(true);
        }
        maskRef.current.scrollLeft = value;
      } else {
        maskRef.current.scrollLeft = scrollAnimationEnd;
        spring.destroy();
        if (isAnimating) {
          setIsAnimating(false);
        }
      }
    }

    if (isValidNumber(mobileGoToPage)) {
      const elementToScroll = slidesRefs.get(mobileGoToPage);
      const windowInnerWidth = getKey(global.window, 'innerWidth', 0);
      const offsetX = (windowInnerWidth - elementToScroll.offsetWidth) / 2;
      const endValue = Math.min(elementToScroll
        .offsetLeft - offsetX - offsetMargin, maskRef.current.scrollWidth - windowInnerWidth);
      const currentScroll = maskRef.current.scrollLeft;
      motionValue.current = currentScroll;
      spring.current = currentScroll;
      /* istanbul ignore next */
      scrollAnimationEnd = endValue < 0 ? 0 : endValue - 7;

      if (doMobileAnimation) {
        motionValue.set(endValue);
      }

      if (!mobileScrollAnimated) {
        maskRef.current.scrollLeft = endValue;
      }
    }

    /* istanbul ignore next */
    return mobileScrollAnimated ? spring.onChange(updateScroll) : () => null;
  }, [
    mobileGoToPage,
    motionValue,
    offsetMargin,
    slidesRefs,
    spring,
    isAnimating,
    mobileRerender,
    doMobileAnimation,
    mobileScrollAnimated,
  ]);

  useLayoutEffect(() => {
    if (mobileScrollAnimated && isSnap) {
      /* istanbul ignore next */
      if (isAnimating) {
        maskRef.current.style.scrollSnapType = 'none';
        maskRef.current.style.pointerEvents = 'none';
      } else {
        maskRef.current.style.scrollSnapType = 'x mandatory';
        maskRef.current.style.pointerEvents = 'auto';
      }
    }
  }, [isAnimating, mobileScrollAnimated, isSnap]);

  return (
    <MaskWrapper
      isSnap={isSnap}
      className={maskWrapperClassName}
      ref={maskRef}
      hasDesktopSSROverflow={hasDesktopSSROverflow}
    >
      <MaskContainer
        className={maskContainerClassName}
      >
        {children}
      </MaskContainer>
    </MaskWrapper>
  );
};

MobileCarousel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  doMobileAnimation: PropTypes.bool,
  hasDesktopSSROverflow: PropTypes.bool,
  isSnap: PropTypes.bool,
  maskContainerClassName: PropTypes.string,
  maskWrapperClassName: PropTypes.string,
  mobileGoToPage: PropTypes.number,
  mobileRerender: PropTypes.bool,
  mobileScrollAnimated: PropTypes.bool,
  offsetMargin: PropTypes.number,
  slidesRefs: PropTypes.object,
};

MobileCarousel.defaultProps = {
  offsetMargin: 0,
};

export default MobileCarousel;
