import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import classnames from 'classnames';
import LazyLoad from 'react-lazyload';
import VisibilitySensor from 'react-visibility-sensor';

import Store from '@univision/fe-commons/dist/store/store';
import {
  getDevice,
  getPageCategory,
  getTheme,
} from '@univision/fe-commons/dist/store/storeHelpers';
import { parseWidgets } from 'app/utils/factories/widgetFactory';
import Header from '@univision/fe-components-base/dist/components/Header';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import ContentHeader from 'components/layout/ContentHeader/ContentHeader';
import ContentList from '@univision/fe-components-base/dist/components/ContentList';
import SlideshowMetadata from 'components/pages/HorizontalSlideshow/SlideshowMetadata/SlideshowMetadata';
import TagLabel from '@univision/fe-components-base/dist/components/TagLabel';
import RelatedTags from '@univision/fe-components-base/dist/components/RelatedTagsLegacy';
import ShareBar from '@univision/fe-components-base/dist/components/ShareBar';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import { CROSS_VERTICAL_LIST } from '@univision/fe-commons/dist/constants/widgetTypes';
import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import insertionPoints from '@univision/fe-components-base/dist/components/widgets/WithWidgets/insertionPoints.json';
import CivicScience from '@univision/fe-components-base/dist/components/widgets/CivicScience';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import ActionBar from '@univision/fe-components-base/dist/components/ActionBar';
import {
  exists,
  getKey,
  hasKey,
  isValidArray,
} from '@univision/fe-commons/dist/utils/helpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import Features from '@univision/fe-commons/dist/config/features';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import { VISIBILITY_SENSOR_SCROLL_THROTTLE } from '@univision/fe-commons/dist/constants/spa';
import GlobalWidget from '../../layout/GlobalWidget';
import MainWrapper from '../../layout/MainWrapper';
import VerticalSlideshowWrapper from './VerticalSlideshowWrapper/VerticalSlideshowWrapper';
import EndCard from '../HorizontalSlideshow/EndCard/EndCard';
import Styles from './VerticalSlideshow.scss';
import lazyloadConfig from '../../../utils/factories/lazyloadConfig.json';

/**
 * Wrapper for Vertical Slideshow Components
 */
class VerticalSlideshowPage extends Component {
  /**
   * Reducer function that gathers related slideshows when vertical stitching is enabled
   * @param {array} contents the accumulator that keeps the gathered slideshows
   * @param {Object} nextSlideshow the next slideshow in the list
   * @returns {array}
   */
  static gatherSlideshows(contents, nextSlideshow) {
    return [...contents, { uri: nextSlideshow.url }];
  }

  /**
   * Gets the initial contents for vertical slideshow stitching
   * @param {Object} mainSlideshow the page data of the first vertical slideshow
   * @returns {array}
   */
  static getContents(mainSlideshow) {
    const initialContents = [mainSlideshow];
    const slideshowCutoffIndex = Features.slideshows.vertical.limit - 1;
    const relatedSlideshows = (
      isValidArray(mainSlideshow.nextSlideshows)
      && mainSlideshow.nextSlideshows.slice(0, slideshowCutoffIndex)
    ) || [];

    return relatedSlideshows.reduce(VerticalSlideshowPage.gatherSlideshows, initialContents);
  }

  /**
   * Returns sharing options for a vertical slideshow
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {Object}
   */
  static getSharingOptions(page) {
    return getKey(page, 'sharing.options', {});
  }

  /**
   * Returns sharing data for a vertical slideshow
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {Object}
   */
  static getShareData(page) {
    return {
      title: getKey(page, 'title'),
      uid: getKey(page, 'uid'),
      primaryTag: getKey(page, 'primaryTag'),
      vertical: true,
      type: 'slideshow',
    };
  }

  /**
   * Get the author for a slide
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {Object | null}
   */
  static getAuthor(page) {
    if (hasKey(page, 'authors') && isValidArray(page.authors)) return page.authors;

    return null;
  }

  /**
   * Get the tempauthors for a slide
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {Object | null}
   */
  static getTempAuthors(page) {
    if (hasKey(page, 'tempAuthors') && isValidArray(page.tempAuthors)) return page.tempAuthors;

    return null;
  }

  /**
   * Reset endcard logic
   */
  static onRestartClick() {
    window.scrollTo(0, 0);
  }

  /**
   * Tracks a page view event for vertical slideshows when VSS is enabled
   * @param {Object} eventData the event data that gets passed in from
   * ContentList
   */
  static trackVerticalSlideshowPageView(eventData) {
    const { depth, ...filteredEventData } = eventData;
    filteredEventData.slideshowDepth = depth;
    filteredEventData.overrides = {
      slideshow_type: 'vertical_slideshow',
    };

    SlideshowTracker.track(
      SlideshowTracker.events.slideshowPageView,
      filteredEventData
    );
  }

  /**
   * Render a RelatedTags component if the prop is available as an array
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {JSX}
   */
  static renderRelatedTags(page) {
    if (hasKey(page, 'secondaryTags') && isValidArray(page.secondaryTags)) {
      return (
        <div className="uvs-container">
          <RelatedTags contents={page.secondaryTags} className={Styles.relatedTags} />
        </div>
      );
    }

    return null;
  }

  /**
   * Render the CivicScience widget
   * @returns {JSX}
   */
  static renderCivicScience() {
    return (
      <div className="uvs-container">
        <div className={classnames('row', Styles.flexCenter)}>
          <div className="col-md-8">
            <CivicScience />
          </div>
        </div>
      </div>
    );
  }

  /**
   * Renders the vertical slideshow page top ad
   * @returns {JSX}
   */
  static renderTopAd() {
    return (
      <div className={Styles.adContainer}>
        {adHelper.getAd(AdTypes.SLIDESHOW_TOP_AD)}
      </div>
    );
  }

  /**
   * VerticalSlideshowPage generator
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);

    /**
     * Setting of initial state for this component
     * @type {{lastTracked: bool}}
     */
    this.state = {
      endCardTracked: false,
    };

    this.timeout = null;
    this.theme = getTheme(Store);
    this.device = getDevice(Store);
    this.stitchingEnabled = Features.slideshows.vertical.stitchingEnabled();
    this.handleEndCardVisibility = this.handleEndCardVisibility.bind(this);
    this.renderStitchedSlideshow = this.renderStitchedSlideshow.bind(this);
    this.hasActionBar = Features.actionBar.hasActionBar(Store.getState());
  }

  /**
   * Scroll to slide if there is a slide hash
   */
  componentDidMount() {
    if (window.location.hash) {
      this.timeout = setTimeout(() => {
        document.getElementById(window.location.hash.substring(1)).scrollIntoView();
      }, 500);
    }
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * Handles end card visibility. If visible will trigger a tracking event once.
   * @param {bool} isVisible flag to mark if end card is visible
   * @param {Object} page the corresponding page data for the vertical slideshow
   */
  handleEndCardVisibility(isVisible, page) {
    const {
      primaryTag,
      slides,
      title,
      uid,
    } = page;
    const { endCardTracked } = this.state;
    const eventData = {
      activeSlide: {},
      activeSlideNumber: 'end_card',
      primaryTag,
      slidesLength: slides.length,
      title,
      uid,
      vertical: true,
    };

    if (this.stitchingEnabled) {
      eventData.slideshowDepth = Features.slideshows.vertical.limit;
    }

    if (isVisible && !endCardTracked) {
      this.setState({ endCardTracked: true });
      SlideshowTracker.track(SlideshowTracker.events.change, eventData);
      comScoreManager.beacon();
    }
  }

  /**
 * Social sharing tracking callback
 * @param {string} page corresponding page data for the vertical slideshow
 * @param {string} name of social media
 */
  onShareButtonClick(page, name) { // eslint-disable-line class-methods-use-this
    SocialTracker.track(
      SocialTracker.events.share, {
      name,
      ...VerticalSlideshowPage.getShareData(page),
    }
    );
  }

  /**
   * Renders the action bar for a specific vertical slideshow
   * @param {Object} page - corresponding page data for the vertical slideshow
   * @param {string} className - className for the wrapper
   * @returns {JSX}
   */
  renderActionBar(page, className) {
    const {
      uid,
    } = page;

    return (
      <FullWidth breakpoints={['xxs', 'xs']} className={className}>
        <ActionBar
          type={getKey(this.theme, 'actionBarType', '')}
          contentId={uid}
          isContentLayout
          sharingOptions={VerticalSlideshowPage.getSharingOptions(page)}
          showCtaShare
          // eslint-disable-next-line react/jsx-no-bind
          onShareButtonClick={this.onShareButtonClick.bind(this, page)}
        />
      </FullWidth>
    );
  }

  /**
   * Renders the action bar for a stitched vertical slideshow
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {JSX}
   */
  renderStitchedSlideshowActionBar(page) {
    return (
      <div className="uvs-container">
        <div className="row">
          <div className={`col-md-10 ${Styles.stitchedActionBarCol}`}>
            {this.renderActionBar(page, Styles.stitchedActionBar)}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Renders the share bar for a specific vertical slideshow
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @param {Object} props optional props for the share bar component
   * @returns {JSX}
   */
  renderShareBar(page, props) {
    return (
      <ShareBar
        device={this.device}
        onClick={name => SocialTracker.track(SocialTracker.events.share, {
          name,
          ...VerticalSlideshowPage.getShareData(page),
        })}
        padLeft={false}
        sharingOptions={VerticalSlideshowPage.getSharingOptions(page)}
        theme="rounded"
        {...props}
      />
    );
  }

  /**
   * Renders the share bar for a stitched vertical slideshow
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {JSX}
   */
  renderStitchedSlideshowShareBar(page) {
    return (
      <div className="uvs-container">
        <FullWidth breakpoints={['xxs', 'xs']}>
          <div className={Styles.striped} />
        </FullWidth>
        <div className={classnames('row', Styles.flexCenter)}>
          {this.renderShareBar(page, { className: Styles.slideshowShareBar, showShareClue: true })}
        </div>
      </div>
    );
  }

  /**
   * Renders the header for a single vertical slideshow
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {JSX}
   */
  renderSlideshowHeader(page) {
    const {
      description,
      primaryTag,
      publishDate,
      richTextDescription,
      secondaryTags,
      source,
      sponsor,
      title,
    } = page;

    const tagLabel = (isValidArray(secondaryTags) && secondaryTags[0]) || primaryTag;

    return (
      <div data-element-name="vertical-slideshow-header" className={Styles.header}>
        <div className="uvs-container">
          <div className="row no-gutters">
            <div
              className={classnames(
                'col-md-10',
                'col-lg-8',
                Styles.offset_md_1,
                Styles.offset_lg_2
              )}
            >
              <div className={Styles.primaryTagContainer}>
                {tagLabel && !Features.shows.hideTagLabel() && (
                  <TagLabel
                    className={Styles.primaryTag}
                    style={{ color: this.theme.primary }}
                    tag={tagLabel}
                  />
                )}
              </div>
              <ContentHeader
                className={Styles.contentHeader}
                dark
                description={description}
                richTextDescription={richTextDescription}
                title={title}
              />
              <div className={Styles.meta}>
                <Meta
                  authors={VerticalSlideshowPage.getAuthor(page)}
                  date={publishDate}
                  showAvatar
                  source={source}
                  sponsor={sponsor}
                  tempAuthors={VerticalSlideshowPage.getTempAuthors(page)}
                  modifierClass={
                    classnames({
                      [Styles.headerActionBarMeta]: this.hasActionBar,
                    })
                  }
                />
                {
                  this.hasActionBar
                    ? this.renderActionBar(page, Styles.headerActionBar)
                    : this.renderShareBar(page, { className: Styles.headerShareBar, compact: true })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Render the Endcard if there is next slideshow available in the page data
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {JSX}
   */
  renderEndCard(page) {
    const { nextSlideshows } = page;
    const lazyLoaderHeight = lazyloadConfig.VerticalSlideshow[this.device].height;
    const lazyLoaderOffset = lazyloadConfig.VerticalSlideshow[this.device].offset;

    if (exists(nextSlideshows)) {
      return (
        <LazyLoad height={lazyLoaderHeight} offset={lazyLoaderOffset} once>
          <VisibilitySensor
            partialVisibility
            minTopValue={300}
            scrollCheck
            intervalCheck={false}
            scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
            onChange={isVisible => this.handleEndCardVisibility(isVisible, page)}
          >
            <EndCard
              className={Styles.endCard}
              data={nextSlideshows}
              onRestartClick={VerticalSlideshowPage.onRestartClick}
              shareData={VerticalSlideshowPage.getShareData(page)}
              sharingOptions={VerticalSlideshowPage.getSharingOptions(page)}
              slideshowType="vertical"
            />
          </VisibilitySensor>
        </LazyLoad>
      );
    }

    return null;
  }

  /**
   * Renders a stitched vertical slideshow. props comes from ContentListItem, check the component
   * interface for more info on how it works.
   * @param {Object} props the props that the ContentListItem uses to render each item in the
   * ContentList
   * @param {Object} props.content the actual content that the item is supposed to render, in this
   * case the page corresponding to a vertical slideshow
   * @param {number} props.depth the item's depth in the infinite scrolling component
   * @returns {JSX}
   */
  renderStitchedSlideshow(props) {
    const { content: page, depth } = props;
    const {
      primaryTag,
      sharing,
      slides,
      title,
      uid,
    } = page;

    const firstSlide = slides[0];
    const content = firstSlide?.content || firstSlide?.image;
    let widgets = null;
    if (isValidArray(page?.widgets)) {
      widgets = page.widgets.filter(widget => widget?.type === CROSS_VERTICAL_LIST);
    }
    return (
      <Fragment>
        {this.renderSlideshowHeader(page)}
        {depth === 1 && content?.type === 'image' && VerticalSlideshowPage.renderTopAd()}
        <VerticalSlideshowWrapper
          depth={depth}
          primaryTag={primaryTag}
          sharing={sharing}
          slides={slides}
          title={title}
          uid={uid}
        />
        {
          this.hasActionBar
            ? this.renderStitchedSlideshowActionBar(page)
            : this.renderStitchedSlideshowShareBar(page)
        }
        {VerticalSlideshowPage.renderRelatedTags(page)}
        {depth === 1 && (
          <>
            <div className="newsletterContainerSlideshow" />
            {VerticalSlideshowPage.renderCivicScience()}
            <div className={Styles.widgetsContainer}>{parseWidgets({ widgets }, true)}</div>
          </>
        )}
        {depth === Features.slideshows.vertical.limit && this.renderEndCard(page)}
      </Fragment>
    );
  }

  /**
   * Renders either a single vertical slideshow or a list of vertical slideshows, depending on
   * whether vertical slideshow stitching is enabled.
   * @returns {JSX}
   */
  renderVerticalSlideshow() {
    const { page } = this.props;
    const {
      primaryTag,
      sharing,
      slides,
      title,
      uid,
    } = page;

    return this.stitchingEnabled
      ? (
        <ContentList
          contents={VerticalSlideshowPage.getContents(page)}
          itemComponent={this.renderStitchedSlideshow}
          limit={Features.slideshows.vertical.limit}
          thirdPartyAdsDisabled={false}
          trackItem={VerticalSlideshowPage.trackVerticalSlideshowPageView}
        />
      ) : (
        <VerticalSlideshowWrapper
          primaryTag={primaryTag}
          sharing={sharing}
          slides={slides}
          title={title}
          uid={uid}
        />
      );
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { page } = this.props;
    const slides = getKey(page, 'slides');

    if (!isValidArray(slides)) return null;

    const firstSlide = slides[0];
    const firstContent = getKey(firstSlide, 'content', firstSlide.image);
    const WidgetsBelowContent = WithWidgets(null, [insertionPoints.belowContentBody]);

    return (
      <Provider store={Store}>
        <Fragment>
          <MainWrapper
            connectTracking={this.stitchingEnabled}
            state={Store.getState()}
          >
            <SlideshowMetadata {...this.props} />
            <div className={Styles.container}>
              <Header
                cancelUpdate={this.stitchingEnabled}
                pageCategory={getPageCategory(Store)}
                pageData={page}
              />
              <GlobalWidget />

              {!this.stitchingEnabled && this.renderSlideshowHeader(page)}

              <div data-element-name="vertical-slideshow-main" className={Styles.main}>
                {!this.stitchingEnabled && firstContent.type === 'image' && VerticalSlideshowPage.renderTopAd()}

                {this.renderVerticalSlideshow()}

                {!this.stitchingEnabled && VerticalSlideshowPage.renderCivicScience()}

                {!this.stitchingEnabled && this.renderEndCard(page)}

                {!this.stitchingEnabled && VerticalSlideshowPage.renderRelatedTags(page)}

                <div className="newsletterContainerSlideshow" />

                <div className={classnames('uvs-container', Styles.widgetsContainer)}>
                  <WidgetsBelowContent />
                </div>

              </div>
            </div>
            <Footer />
          </MainWrapper>
        </Fragment>
      </Provider>
    );
  }
}

VerticalSlideshowPage.propTypes = {
  page: PropTypes.object,
};

export default VerticalSlideshowPage;
