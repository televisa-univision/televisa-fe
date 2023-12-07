import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import TagLabel from '@univision/fe-components-base/dist/components/TagLabel';
import RelatedTags from '@univision/fe-components-base/dist/components/RelatedTagsLegacy';
import Meta from '@univision/fe-components-base/dist/components/Meta/Meta';
import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import insertionPoints from '@univision/fe-components-base/dist/components/widgets/WithWidgets/insertionPoints.json';
import CivicScience from '@univision/fe-components-base/dist/components/widgets/CivicScience';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import {
  getKey,
  hasKey,
  isValidArray,
} from '@univision/fe-commons/dist/utils/helpers';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import features from '@univision/fe-commons/dist/config/features';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import SlideshowTracker from '@univision/fe-commons/dist/utils/tracking/tealium/slideshow/SlideshowTracker';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import ActionBar from '@univision/fe-components-base/dist/components/ActionBar';

import { LIST_WIDGET } from '@univision/fe-commons/dist/constants/widgetTypes';
import { isVerticalTelevisaByUri } from '@univision/fe-commons/src/utils/header/helpers';
import WidgetsFactory from '../../../utils/factories/widgetsFactory';
import ContentHeader from '../../base/ContentHeader';
import VerticalSlideshowWrapper from './VerticalSlideshowWrapper';
import lazyloadConfig from '../../../utils/factories/widgetsFactory/lazyloadConfig.json';
import SlideshowMetadata from '../HorizontalSlideshow/SlideshowMetadata';
import ConnectedEndCard from '../HorizontalSlideshow/EndCard';
import ContentList from '../../base/ContentList';
import ConnectedGlobalWidget from '../../base/GlobalWidget';

import LegacyStyles from './VerticalSlideshow.scss';
import Styles from './VerticalSlideshow.styles';

const FlexCenter = styled.div`${Styles.flexCenter}`;
const AdContainer = styled.div`${Styles.adContainer}`;
const StitchedActionBarCol = styled.div`${Styles.stitchedActionBarCol}`;
const Offset = styled.div`${Styles.offset}`;
const PrimaryTagContainer = styled.div`${Styles.primaryTagContainer}`;
const MetaWrapper = styled.div`${Styles.meta}`;
const Container = styled.div`${Styles.container}`;
const Main = styled.div`${Styles.main}`;
const WidgetsContainer = styled.div`${Styles.widgetsContainer}`;
const ContentHeaderWrapper = styled(ContentHeader)`${Styles.contentHeader}`;

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
    const slideshowCutoffIndex = features.slideshows.vertical.limit - 1;
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
   * Render a RelatedTags component if the prop is available as an array
   * @param {Object} page the corresponding page data for the vertical slideshow
   * @returns {JSX}
   */
  static renderRelatedTags(page) {
    if (hasKey(page, 'secondaryTags') && isValidArray(page.secondaryTags)) {
      return (
        <div className="uvs-container">
          <RelatedTags contents={page.secondaryTags} className={LegacyStyles.relatedTags} />
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
        <FlexCenter className="row">
          <div className="col-md-8">
            <CivicScience />
          </div>
        </FlexCenter>
      </div>
    );
  }

  /**
   * Renders the vertical slideshow page top ad
   * @returns {JSX}
   */
  static renderTopAd() {
    return (
      <AdContainer>
        {adHelper.getAd(AdTypes.SLIDESHOW_TOP_AD)}
      </AdContainer>
    );
  }

  /**
   * VerticalSlideshowPage generator
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);

    const widgetsFactory = new WidgetsFactory(props.pageData);

    this.timeout = null;
    this.device = getKey(props.pageData, 'device');
    this.theme = getKey(props.pageData, 'theme');
    this.slideshowLimit = features.slideshows.vertical.limit;
    this.parsedWidgets = widgetsFactory.getWidgetComponent(LIST_WIDGET);
    this.stitchingEnabled = features.slideshows.vertical.stitchingEnabled();
    this.renderStitchedSlideshow = this.renderStitchedSlideshow.bind(this);
    this.handleEndCardVisibility = this.handleEndCardVisibility.bind(this);
    this.isTelevisaSite = isVerticalTelevisaByUri(props.pageData.site);
  }

  /**
   * Scroll to slide if there is a slide hash
   */
  componentDidMount() {
    if (window.location.hash) {
      this.timeout = setTimeout(() => {
        const imageEl = document.getElementById(window.location.hash.substring(1));

        if (imageEl) imageEl.scrollIntoView();
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
   */
  handleEndCardVisibility() {
    const {
      pageData: { data },
    } = this.props;
    const eventData = {
      activeSlide: {},
      activeSlideNumber: 'end_card',
      primaryTag: data?.primaryTag,
      slidesLength: data?.slides?.length,
      title: data?.title,
      uid: data?.uid,
      vertical: true,
    };

    if (this.stitchingEnabled) {
      eventData.slideshowDepth = this.slideshowLimit;
    }

    SlideshowTracker.track(SlideshowTracker.events.change, eventData);

    comScoreManager.beacon();
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
    const shareData = VerticalSlideshowPage.getShareData(page);
    return (
      <FullWidth breakpoints={['xxs', 'xs']} className={className}>
        <ActionBar
          type={getKey(this.theme, 'actionBarType', '')}
          contentId={uid}
          isContentLayout
          contentType={shareData?.type}
          contentTitle={shareData?.title}
          sharingOptions={VerticalSlideshowPage.getSharingOptions(page)}
          showCtaShare
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
          <StitchedActionBarCol className="col-md-10">
            {this.renderActionBar(page, LegacyStyles.stitchedActionBar)}
          </StitchedActionBarCol>
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
    const { pageData } = this.props;
    const {
      description,
      primaryTag,
      publishDate,
      richTextDescription,
      secondaryTags,
      showUpdateDate,
      source,
      sponsor,
      title,
      updateDate,
    } = page;

    const tagLabel = (isValidArray(secondaryTags) && secondaryTags[0]) || primaryTag;
    const secondaryTagLabel = secondaryTags
      && secondaryTags.length > 0 ? secondaryTags[0].name : null;
    return (
      <div data-element-name="vertical-slideshow-header" className={LegacyStyles.header}>
        <div className="uvs-container">
          <div className="row no-gutters">
            <Offset
              className={classnames(
                'col-md-10',
                'col-lg-8',
              )}
            >
              <PrimaryTagContainer isTelevisa={this.isTelevisaSite}>
                {tagLabel && !features.shows.hideTagLabel() && (
                  <TagLabel
                    className={this.isTelevisaSite
                      ? LegacyStyles.primaryTagTelevisa : LegacyStyles.primaryTag}
                    style={{
                      color: pageData.theme?.slideshowTitleTheme || pageData.theme?.primary,
                    }}
                    tag={tagLabel}
                  />
                )}
              </PrimaryTagContainer>
              <ContentHeaderWrapper
                isTelevisa={this.isTelevisaSite}
                dark
                theme={pageData.theme}
                featuredTag={secondaryTagLabel}
                description={description}
                richTextDescription={richTextDescription}
                title={title}
              />
              <MetaWrapper>
                <Meta
                  authors={VerticalSlideshowPage.getAuthor(page)}
                  date={publishDate}
                  showAvatar
                  showUpdateDate={showUpdateDate}
                  source={source}
                  sponsor={sponsor}
                  tempAuthors={VerticalSlideshowPage.getTempAuthors(page)}
                  modifierClass={LegacyStyles.headerActionBarMeta}
                  updateDate={updateDate}
                />
                {this.renderActionBar(page, LegacyStyles.headerActionBar)}
              </MetaWrapper>
            </Offset>
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

    if (nextSlideshows) {
      return (
        <LazyLoad height={lazyLoaderHeight} offset={lazyLoaderOffset} once>
          <ConnectedEndCard
            className={LegacyStyles.endCard}
            data={nextSlideshows}
            onCardVisibility={this.handleEndCardVisibility}
            onRestartClick={VerticalSlideshowPage.onRestartClick}
            shareData={VerticalSlideshowPage.getShareData(page)}
            sharingOptions={VerticalSlideshowPage.getSharingOptions(page)}
            slideshowType="vertical"
          />
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
    const { pageData } = this.props;
    const theme = getKey(pageData, 'theme');
    const {
      primaryTag,
      sharing,
      slides,
      title,
      uid,
    } = page;
    const sharingOptions = getKey(sharing, 'options', {});

    const firstSlide = slides[0];
    const content = getKey(firstSlide, 'content', firstSlide?.image);

    return (
      <>
        {this.renderSlideshowHeader(page)}
        {depth === 1 && content?.type === 'image' && VerticalSlideshowPage.renderTopAd()}
        <VerticalSlideshowWrapper
          device={this.device}
          depth={depth}
          primaryTag={primaryTag}
          sharingOptions={sharingOptions}
          slides={slides}
          theme={theme}
          title={title}
          uid={uid}
        />
        {this.renderStitchedSlideshowActionBar(page)}
        {VerticalSlideshowPage.renderRelatedTags(page)}
        {depth === 1 && (
          <>
            <div className="newsletterContainerSlideshow" />
            {VerticalSlideshowPage.renderCivicScience()}
            <WidgetsContainer>
              {this.parsedWidgets}
            </WidgetsContainer>
          </>
        )}
        {depth === this.slideshowLimit && this.renderEndCard(page)}
      </>
    );
  }

  /**
   * Renders either a single vertical slideshow or a list of vertical slideshows, depending on
   * whether vertical slideshow stitching is enabled.
   * @returns {JSX}
   */
  renderVerticalSlideshow() {
    const { pageData } = this.props;
    const {
      primaryTag,
      sharing,
      slides,
      title,
      uid,
    } = pageData?.data;

    return this.stitchingEnabled
      ? (
        <ContentList
          pageData={pageData}
          contents={VerticalSlideshowPage.getContents(pageData?.data)}
          itemComponent={this.renderStitchedSlideshow}
          limit={this.slideshowLimit}
          thirdPartyAdsDisabled={false}
          trackItem={VerticalSlideshowPage.trackVerticalSlideshowPageView}
        />
      ) : (
        <VerticalSlideshowWrapper
          primaryTag={primaryTag}
          sharingOptions={sharing?.options}
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
    const { pageData } = this.props;
    const page = pageData.data;
    const slides = getKey(pageData, 'data.slides');

    if (!isValidArray(slides)) return null;

    const firstSlide = slides[0];
    const firstContent = getKey(firstSlide, 'content', firstSlide.image);
    const WidgetsBelowContent = WithWidgets(null, [insertionPoints.belowContentBody]);

    return (
      <>
        <SlideshowMetadata page={page} />
        <Container>
          <ConnectedGlobalWidget />
          {!this.stitchingEnabled && this.renderSlideshowHeader(page)}

          <Main data-element-name="vertical-slideshow-main">
            {!this.stitchingEnabled && firstContent.type === 'image' && VerticalSlideshowPage.renderTopAd()}

            {this.renderVerticalSlideshow()}

            {!this.stitchingEnabled && VerticalSlideshowPage.renderCivicScience()}

            {!this.stitchingEnabled && this.renderEndCard(page)}

            {!this.stitchingEnabled && VerticalSlideshowPage.renderRelatedTags(page)}

            <div className="newsletterContainerSlideshow" />

            <WidgetsContainer className="uvs-container">
              <WidgetsBelowContent />
            </WidgetsContainer>
          </Main>
        </Container>
      </>
    );
  }
}

VerticalSlideshowPage.propTypes = {
  pageData: PropTypes.object,
};

VerticalSlideshowPage.defaultProps = {
  pageData: {},
};

export default VerticalSlideshowPage;
