import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import features from '@univision/fe-commons/dist/config/features';
import CardsCarousel from '../CardsCarousel';
import CarouselEnhancement from './CarouselEnhancement';

/**
 * Wrapper for carousel widegt
 * @param {Object} settings to conf the widget
 * @returns {JSX}
 */
const Carousel = ({ ...props }) => {
  const { hasEnhancement } = props;
  return hasEnhancement ? <CarouselEnhancement {...props} /> : <CardsCarousel {...props} />;
};

Carousel.propTypes = {
  settings: PropTypes.object,
  content: PropTypes.array,
  hasEnhancement: PropTypes.bool,
};

Carousel.defaultProps = {
  hasEnhancement: false,
};

/**
 * Maps redux state to component props.
 * @param {Object} state redux state
 * @returns {Object}
 */
const mapStateToProps = state => ({
  hasEnhancement: features.content.hasEnhancement(state),
});

export default connect(mapStateToProps)(Carousel);
