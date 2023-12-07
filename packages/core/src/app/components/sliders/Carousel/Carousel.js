import PropTypes from 'prop-types';
import React from 'react';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import CoreSlider from '@univision/fe-components-base/dist/components/CoreSlider';
import sliderSettings from './sliderSettings.json';

/**
 * Carousel widget component based on the {@link CoreSlider} library.
 * @param {Object} props Component properties
 * @returns {JSX}
 * @constructor
 */
const Carousel = ({ children, settings }) => {
  const settingsData = hasKey(settings, 'type')
    ? Object.assign({}, settings, sliderSettings[settings.type])
    : Object.assign({}, settings, sliderSettings.Carousel);

  /**
   * On render it wraps its children on a carousel powered by {@link CoreSlider}
   * The children need to be wrapped in individual divs.
   * @see https://github.com/akiran/react-slick/issues/640
   * @example
   *  <Carousel type="Carousel">
   *      <div key={item.uuid}><PromoItem key={item.uuid} {...item} /></div>
   *      <div key={item.uuid}><PromoItem key={item.uuid} {...item} /></div>
   * </Carousel>
   *
   * @returns {JSX}
   */
  return (
    <div className="carousel-widget">
      {children !== null
        && children !== '' && <CoreSlider settings={settingsData}>{children}</CoreSlider>}
    </div>
  );
};

/**
 * propTypes
 * @property {Array} children Children elements passed to this component
 */
Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.object,
};

Carousel.defaultProps = {
  settings: {},
};

export default Carousel;
