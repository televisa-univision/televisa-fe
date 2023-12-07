import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { shouldRefresh, hideAdByIds } from '@univision/fe-commons/dist/store/actions/ads-actions';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import Truncate from '@univision/fe-components-base/dist/components/Truncate';
import * as sizes from '@univision/fe-components-base/dist/components/Picture/imageSizes';
import * as ratios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';

import SlideHeader from './SlideHeader';
import Styles from './ImageSlide.scss';
import GeneralStyles from '../HorizontalSlideshow.scss';
import { getFadeAnimationClassName } from '../helpers';

/**
 * ImageSlide component
 */
export default class ImageSlide extends React.Component {
  /**
   * set initial state
   */
  state = {
    truncateOpened: false,
  };

  /* eslint camelcase: "off" */
  /* eslint-disable react/sort-comp */
  /**
   * React life cycle
   * @param {Object} nextProps props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const state = Store.getState();
    if (nextProps && nextProps.active) {
      Store.dispatch(shouldRefresh(true));
      // Avoid calling multiple times when image is active
      if (state.dfpAds.hideAds.length) {
        Store.dispatch(hideAdByIds([]));
      }
    }
  }

  /**
   * Callback to detect when trucate component changes
   * @param {boolean} trucateState state of truncate component
   */
  onTruncateChanged = (trucateState) => {
    this.setState({ truncateOpened: trucateState });
  };

  /**
   * Renders mobile caption
   * @returns {JSX}
   */
  renderMobileCaption() {
    const {
      activeSlideNumber,
      content,
      endSlideNumber,
      hideCaption,
      image,
      pollQuestionOverride,
      reaction,
      renderSimpleStatus,
      showContent,
    } = this.props;

    return (
      <div
        className={classnames(
          'uvs-container',
          Styles.mobileCaption,
          getFadeAnimationClassName({ showContent }),
          {
            [Styles.reactionCaption]: reaction,
          }
        )}
      >
        {reaction && (
          <div className={Styles.statusText}>
            <div>
              <em>{activeSlideNumber}</em> de {endSlideNumber}
            </div>
          </div>
        )}
        {reaction && (
          <div className={Styles.pollQuestion}>
            {pollQuestionOverride || reaction.pollQuestion}
          </div>
        )}
        <div className={Styles.contentContainer}>
          {renderSimpleStatus && renderSimpleStatus({ className: GeneralStyles.simpleStatus })}
          {content && !hideCaption && (
            <Truncate
              className={GeneralStyles.slideDescription}
              html={content}
              onStateChanged={this.onTruncateChanged}
              text={content}
              trimLength={120}
            />
          )}
        </div>
        {image.credit && (
          <span className={Styles.credit} itemProp="caption">
            {`${localization.get('imageAuthor')}: ${image.credit}`}
          </span>
        )}
      </div>
    );
  }

  /**
   * Render component
   * @returns {JSX}
   */
  render() {
    const {
      activeSlideNumber,
      image,
      inline,
      meta,
      showContent,
      title,
    } = this.props;
    const deviceSizeOverrides = {
      xl: sizes.MEDIUM,
      lg: sizes.MEDIUM,
    };
    const imgWidth = getKey(image, 'renditions.original.width', 0);
    const imgHeigth = getKey(image, 'renditions.original.height', 0);
    const { truncateOpened } = this.state;
    /**
     * checking to see if img width is 0
     * as some images are missing widths and heights
     * if 0 then treat as horizontal
     * */
    const isImageVertical = imgWidth !== 0 && imgWidth < imgHeigth;
    const isMobile = getDevice(Store) === 'mobile';
    const replacesOpenCard = activeSlideNumber === 0;

    const bgImage = getRenditionUrl(getKey(image, 'renditions.original', {}), ratios.default['16x9'].sm);
    return (
      <ErrorBoundary>
        <div className={classnames(Styles.container, truncateOpened ? Styles.truncateOpened : '')}>
          <div
            className={Styles.background}
            style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
          />
          <div
            className={classnames(
              Styles.inner,
              isImageVertical ? Styles.verticalImg : Styles.horizontalImg,
              inline ? Styles.inline : ''
            )}
          >
            {isMobile && !inline && replacesOpenCard && (
              <SlideHeader
                className={classnames(
                  Styles.slideHeader,
                  getFadeAnimationClassName({ showContent })
                )}
                meta={meta}
                title={title}
              />
            )}
            <Picture
              alt=""
              image={image}
              deviceSizeOverrides={deviceSizeOverrides}
              aspectRatio={ratios.ASPECT_RATIO_HORIZONTAL_SLIDESHOW}
              className={Styles.blurOverride}
            />
          </div>
          {!inline && isMobile && this.renderMobileCaption()}
        </div>
      </ErrorBoundary>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
/**
 * propTypes
 * @property {boolean} active determines if it
 * @property {number} activeSlideNumber the number of the active slide
 * @property {string} content the caption content
 * @property {string} endSlideNumber the number of the end slide
 * @property {boolean} hideCaption determines if caption is hidden
 * @property {Object} image the image for the slide
 * @property {boolean} inline detemrines if it is an inline slideshow
 * @property {Object} meta the metadata for the slideshow
 * @property {string} pollQuestionOverride overrides poll question
 * @property {Object} reaction reaction slideshow details
 * @property {Function} renderSimpleStatus renders a simple status for the slide
 * @property {string} showContent determines if content is shown
 * @property {string} title the slideshow title
 */
ImageSlide.propTypes = {
  active: PropTypes.bool,
  activeSlideNumber: PropTypes.number,
  content: PropTypes.string,
  endSlideNumber: PropTypes.number,
  hideCaption: PropTypes.bool,
  image: PropTypes.shape({
    renditions: PropTypes.shape({
      '16x9-mobile': PropTypes.shape({
        href: PropTypes.string,
      }),
    }),
    credit: PropTypes.string,
  }).isRequired,
  inline: PropTypes.bool,
  meta: PropTypes.shape({
    author: PropTypes.array,
    date: PropTypes.string,
    source: PropTypes.string,
    sponsor: PropTypes.shape({
      link: PropTypes.string,
      logo: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  pollQuestionOverride: PropTypes.string,
  reaction: PropTypes.object,
  renderSimpleStatus: PropTypes.func,
  showContent: PropTypes.bool,
  title: PropTypes.string,
};
