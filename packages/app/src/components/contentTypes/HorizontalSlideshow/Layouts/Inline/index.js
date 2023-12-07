import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import classnames from 'classnames';

import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import dfpManager from '@univision/fe-commons/dist/utils/ads/dfpManager';

import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Caption from '@univision/fe-components-base/dist/components/Caption';
import ThemeStyle from '@univision/fe-commons/dist/utils/themes/ThemeStyle';
import { VISIBILITY_SENSOR_SCROLL_THROTTLE } from '@univision/fe-commons/dist/constants/spa';

import ConnectedSlider from '../../Slider';
import Status from '../../Status';
import Styles, { footer } from './Inline.scss';

/**
 * Inline layout
 */
class Inline extends Component {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  /**
   * Refresh the ads on slide change
   * @param {Object} prevProps the previous props
   */
  componentDidUpdate(prevProps) {
    const { activeSlideIndex, isLead } = this.props;

    if (prevProps.activeSlideIndex !== activeSlideIndex && isLead) {
      dfpManager.refreshAds();
    }
  }

  /**
   * Abort the slideshow if out of view
   * @param {boolean} isVisible whether the slideshow is visible or not
   */
  handleVisibilityChange(isVisible) {
    const { actions } = this.props;
    if (!isVisible) actions.abortAutoplay();
  }

  /**
   * Render method
   * @returns {JSX}
   */
  render() {
    const {
      uid,
      slides,
      title,
      primaryTag,
      meta,
      isLead,
      activeSlideCaption,
      activeSlideNumber,
      endSlideNumber,
      status,
      activeSlideIndex,
      endSlideIndex,
      actions,
      isFullWidth,
      className,
      theme,
    } = this.props;

    const activeSlideCredit = hasKey(slides[activeSlideIndex], 'image.credit')
    && slides[activeSlideIndex].image.credit;

    const slider = (
      <ConnectedSlider
        uid={uid}
        title={title}
        primaryTag={primaryTag}
        inline
        slides={slides}
        actions={actions}
        activeSlideIndex={activeSlideIndex}
        activeSlideNumber={activeSlideNumber}
        endSlideIndex={endSlideIndex}
        endSlideNumber={endSlideNumber}
        goToPrevSlide={actions.goToPrevSlide}
        goToNextSlide={actions.goToNextSlide}
      />
    );

    return (
      <div className={classnames(Styles.container, className)}>
        {!isLead && <h2>{title}</h2>}
        <VisibilitySensor
          partialVisibility
          scrollCheck
          intervalCheck={false}
          scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
          onChange={this.handleVisibilityChange}
        >
          {isFullWidth ? (
            <FullWidth breakpoints={['xxs', 'xs']}>
              {React.cloneElement(slider, { isFullWidth: true })}
            </FullWidth>
          ) : slider}
        </VisibilitySensor>
        <ThemeStyle parentCssElement={`.${footer}`}>
          <div className={footer}>
            <Status
              inline
              actions={actions}
              running={status.running}
              progress={status.progress}
              activeSlideNumber={activeSlideNumber}
              endSlideNumber={endSlideNumber}
              isEndOfSlideshow={activeSlideIndex === endSlideIndex}
              uid={uid}
              title={title}
              primaryTag={primaryTag}
            />
            <div className={Styles.slideInfo}>
              {activeSlideCaption && (
                <Caption
                  content={activeSlideCaption}
                  credit={activeSlideCredit}
                  type="article"
                  className={Styles.caption}
                  theme={theme}
                />
              )}
              {meta && <div className={Styles.slideSource}>{meta.source}</div>}
            </div>
          </div>
        </ThemeStyle>
      </div>
    );
  }
}

Inline.propTypes = {
  uid: PropTypes.string,
  isLead: PropTypes.bool,
  slides: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.shape({
      href: PropTypes.string,
      credit: PropTypes.string,
    }),
  })).isRequired,
  title: PropTypes.string,
  primaryTag: PropTypes.object,
  meta: PropTypes.object,
  activeSlideCaption: PropTypes.string,
  activeSlideNumber: PropTypes.number,
  endSlideNumber: PropTypes.number,
  status: PropTypes.shape({
    running: PropTypes.bool,
    progress: PropTypes.number,
  }).isRequired,
  theme: PropTypes.object,
  activeSlideIndex: PropTypes.number.isRequired,
  endSlideIndex: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    goToPrevSlide: PropTypes.func.isRequired,
    goToNextSlide: PropTypes.func.isRequired,
    togglePlaying: PropTypes.func.isRequired,
    abortAutoplay: PropTypes.func.isRequired,
  }),
  isFullWidth: PropTypes.bool,
  className: PropTypes.string,
};

Inline.defaultProps = {
  isLead: false,
  isFullWidth: false,
};

export default Inline;
