import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';

import { HORIZONTAL_SLIDESHOW, VERTICAL_SLIDESHOW, REACTIONS_SLIDESHOW } from '@univision/fe-commons/dist/constants/slideshowTypes';
import { isStickySlideshowSelector } from '@univision/fe-commons/dist/store/selectors/horizontal-slideshow-selectors';

import { PagePlaceholder } from '../../base/Placeholders/PagePlaceholder';

const slideshowTypes = {
  horizontalslideshow: dynamic(() => import(/* webpackChunkName: "horizontal-slideshow-lazy-ssr-cpm" */ '../HorizontalSlideshow'), { loading: PagePlaceholder }),
  verticalslideshow: dynamic(() => import(/* webpackChunkName: "vertical-slideshow-lazy-ssr-cpm" */ '../VerticalSlideshow'), { loading: PagePlaceholder }),
};

/**
 * Gets slideshowType based of pageData
 * @param {Object} data - The page object from content API
 * @param {bool} isStickySlideshow - determine if the current slideshow is sticky
 * @returns {string}
 */
const getSlideshowType = (data, isStickySlideshow) => {
  if (!data) return null;

  if (isStickySlideshow) {
    return HORIZONTAL_SLIDESHOW;
  }

  switch (data.slideshowType) {
    case HORIZONTAL_SLIDESHOW:
    case VERTICAL_SLIDESHOW:
      return data.slideshowType;

    case REACTIONS_SLIDESHOW:
      return HORIZONTAL_SLIDESHOW;
    default:
      break;
  }

  return data.vertical
    ? VERTICAL_SLIDESHOW
    : HORIZONTAL_SLIDESHOW;
};

/**
 * returns if current uri is equal to the previous one
 * this component re-renders only if the uri has changed
 * @param {Object} prevProps received in the component
 * @param {Object} nextProps received in the component
 * @returns {bool}
 */
export function isUriEqual(prevProps, nextProps) {
  return prevProps.pageData?.data?.uri === nextProps.pageData?.data?.uri;
}

/**
 * SlideshowWrapper component to determine slideshowType rendered
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
export const SlideshowWrapper = React.memo(({ pageData, isStickySlideshow }) => {
  const data = pageData?.data;
  const slideshowType = getSlideshowType(data, isStickySlideshow);
  const Slideshow = slideshowTypes[slideshowType];

  if (!Slideshow) return null;

  return <Slideshow pageData={pageData} />;
}, isUriEqual);

/**
 * propTypes
 * @property {bool} isStickySlideshow - determine if the current slideshow is sticky
 * @property {Object} pageData - The page object from content API
 * @property {Object} pageData.data - The data object from content API
 */
SlideshowWrapper.propTypes = {
  isStickySlideshow: PropTypes.bool,
  pageData: PropTypes.object,
};

/**
 * Default Prop Values
 */
SlideshowWrapper.defaultProps = {
  pageData: {},
};

/**
 * Connector to be called when state change
 * @param {Object} state of the app
 * @returns {Object}
 */
export const mapStateToProps = state => ({
  isStickySlideshow: isStickySlideshowSelector(state),
});

export default connect(
  mapStateToProps,
)(SlideshowWrapper);
