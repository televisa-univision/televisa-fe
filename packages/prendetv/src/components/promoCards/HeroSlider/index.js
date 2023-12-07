/**
 * @module PrendeTV HeroSlider
 */
import React, {
  useContext, useMemo, useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';

import arrow from '@univision/fe-commons/dist/assets/images/icon-arrow-right.svg';
import { useInterval } from '@univision/fe-commons/dist/utils/hooks';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import CTA from '../../CTA';
import PrendeTVContext from '../../../context';
import PrendeTvVideo from '../../Video';
import Styles from './HeroSlider.styles';

const Arrow = styled.div`${Styles.arrow}`;
const Dot = styled.span`${Styles.dot}`;
const DotContainer = styled.div`${Styles.dotContainer}`;
const Gradient = styled.div`${Styles.gradient}`;
const Image = styled.img`${Styles.image}`;
const ImageContainer = styled.div`${Styles.imageContainer}`;
const CustomCTA = styled(CTA)`${Styles.link}`;
const Slide = styled.div`${Styles.slide}`;
const SliderContainer = styled.div`${Styles.sliderContainer}`;
const Wrapper = styled.div`${Styles.wrapper}`;

const IMAGE_TYPE = 'imagepromocard';
const VIDEO_TYPE = 'videopromocard';
const TRANSITION_TIME = 300;

/**
 * PrendeTV HeroSlider component
 * @param {array} lead - array with objects for each slide
 * @param {number} transition - time for transition effect in milliseconds
 * @param {bool} autoPlay=true - false is do not want the slider to change slides automatically
 * @returns {JSX.Element}
 */
const HeroSlider = ({ items: lead, transition, autoPlay = true }) => {
  const { device } = useContext(PrendeTVContext);
  const isMobile = device === 'mobile';
  const callToActionText = localization.get('watchNow').toUpperCase();
  const slidePages = lead && lead.length;
  const speed = transition || (3000 + TRANSITION_TIME);
  const playAutomatically = (slidePages > 1) ? autoPlay : false;

  const [state, setState] = useState({
    activeSlide: 0,
    activeSlidePosition: 0,
    activeType: lead[0]?.type,
    transitionTime: TRANSITION_TIME,
    loop: false,
  });

  const { activeType } = state;

  /**
   * Set active slide
   * @param {number} activeSlide - new active slide
   * @param {bool} isLoop=false - it is true when is a loop (when activeSlide is the first one)
   */
  const handleActiveSlide = useCallback(
    (activeSlide, isLoop = false) => {
      const newSlidePosition = activeSlide * (-100);
      const loop = (activeSlide >= slidePages - 1);
      setState({
        ...state,
        activeSlide,
        activeSlidePosition: newSlidePosition,
        activeType: lead[activeSlide].type,
        loop,
        transitionTime: isLoop ? 0 : TRANSITION_TIME,
      });
    }, [lead, slidePages, state]
  );

  /**
   * Handle inifinitive loop effect in slider
   * @param {number} activeSlide - current active slide index
   */
  const handleLoopEffect = useCallback(
    (activeSlide) => {
      setState({
        ...state,
        activeType: lead[activeSlide].type,
        activeSlidePosition: slidePages * (-100),
      });

      setTimeout(() => {
        handleActiveSlide(activeSlide, true);
      }, TRANSITION_TIME);
    }, [handleActiveSlide, lead, slidePages, state]
  );

  /**
   * Previous slide
   */
  const handlePreviousSlide = useCallback(
    () => {
      let activeSlide = slidePages - 1;
      const slideId = state.activeSlide;
      if (slideId > 0) {
        activeSlide = slideId - 1;
      }
      handleActiveSlide(activeSlide);
    }, [handleActiveSlide, slidePages, state.activeSlide]
  );

  /**
   * Next slide
   */
  const handleNextSlide = useCallback(
    () => {
      let activeSlide = 0;
      const slideId = state.activeSlide;
      if (slideId < (slidePages - 1)) {
        activeSlide = slideId + 1;
      }
      if (activeSlide === 0 && lead[activeSlide].type !== VIDEO_TYPE) {
        handleLoopEffect(activeSlide);
      } else {
        handleActiveSlide(activeSlide);
      }
    }, [handleActiveSlide, handleLoopEffect, lead, slidePages, state.activeSlide]
  );

  useInterval(useCallback(
    () => {
      if (playAutomatically && activeType !== VIDEO_TYPE) {
        handleNextSlide();
      }
    }, [activeType, playAutomatically, handleNextSlide],
  ), speed);

  const slides = useMemo(() => {
    return lead.map((slide, index) => {
      const { callToAction, type, uid } = slide;

      return (
        <Slide
          active={(state.activeSlide === index) && true}
          className={`${(type === VIDEO_TYPE ? 'videoSlide' : 'imageSlide')} ${((index === 0 && state.loop) ? 'loop' : '')}`}
          slideId={index}
          slidePages={slidePages}
          key={uid}
        >
          {
            type === IMAGE_TYPE ? (
              <>
                <ImageContainer>
                  <Gradient isMobile={isMobile} />
                  <Image
                    alt="HeroSlider"
                    src={(
                      isMobile && slide?.imageMobile?.renditions?.original?.href)
                      ? slide.imageMobile.renditions.original.href
                      : slide?.imageDesktop?.renditions?.original?.href}
                  />
                  {
                    (callToAction?.link)
                    && <CustomCTA href={callToAction.link?.href} target={callToAction.link?.target || '_blank'} text={callToActionText} />
                  }
                </ImageContainer>
              </>
            ) : (
              <>
                <PrendeTvVideo
                  callToAction={callToAction}
                  lead={slide.video}
                  active={state.activeSlide === index}
                  handleVideoCallback={playAutomatically ? handleNextSlide : null}
                />
              </>
            )
          }
        </Slide>
      );
    });
  }, [lead, state, callToActionText, handleNextSlide, isMobile, slidePages,
    playAutomatically]);

  const dots = useMemo(() => {
    return lead.map((slide, index) => {
      return (
        <Dot
          key={slide.uid}
          className={`${index === state.activeSlide ? 'active' : ''}`}
        />
      );
    });
  }, [lead, state]);

  return (
    <Wrapper
      isMobile={isMobile}
      activeSlideId={
        (activeType === IMAGE_TYPE)
          ? lead[state.activeSlide].uid
          : lead[state.activeSlide].video.uid
      }
      activeTypeVideo={activeType === VIDEO_TYPE}
    >
      <SliderContainer
        posX={state.activeSlidePosition}
        transitionTime={state.transitionTime}
        transitionDelay={(activeType === VIDEO_TYPE) ? 0 : 100}
      >
        {slides}
      </SliderContainer>
      {(slidePages > 1)
        && (
          <>
            <Arrow className="prev" onClick={handlePreviousSlide}>
              <img
                alt={localization.get('previous')}
                src={arrow}
              />
            </Arrow>
            <Arrow className="next" onClick={handleNextSlide}>
              <img
                alt={localization.get('next')}
                src={arrow}
              />
            </Arrow>
            <DotContainer>
              {dots}
            </DotContainer>
          </>
        )}
    </Wrapper>
  );
};

HeroSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    uri: PropTypes.string,
    mcpid: PropTypes.string,
    publishDate: PropTypes.string,
    image: PropTypes.object,
    sharing: PropTypes.object,
  })),
  transition: PropTypes.number,
  autoPlay: PropTypes.bool,
};

export default HeroSlider;
