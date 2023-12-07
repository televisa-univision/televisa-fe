import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Store from '@univision/fe-commons/dist/store/store';
import getThemeFromURL from '@univision/fe-commons/dist/utils/themes/themes';
import { LIVE, LONGFORM } from '@univision/fe-commons/dist/constants/labelTypes';
import { globalComponents } from '@univision/fe-commons/dist/config';
import { ROOT_VERTICAL } from '@univision/fe-commons/dist/constants/sites';
import { getPageData, getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import {
  exists,
  hasKey,
  getKey,
  isValidArray,
  truncateString,
  isValidFunction,
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import { shouldRenderBySchedule } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import DateTime from '@univision/shared-components/dist/components/v2/DateTime';
import features from '@univision/fe-commons/dist/config/features';
import { STANDARD } from '@univision/fe-commons/dist/constants/contentPriorities';
import {
  GREY_BLACK, WHITE, DARKER_GREY, SEA_BUCKTHORN, LIGHT_VARIANT,
} from '@univision/fe-utilities/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';

import { CONECTA, MAX_TITLE_CHARS_LENGTH } from './constants/contentCard';
import Label from '../Label';
import Link from '../Link';
import Picture from '../Picture';
import ProgressBar from '../ProgressBar';
import Title from '../Title';
import Clickable from '../Clickable';
import iconHelpers from '../IconWrapper/helpers';
import Author from '../Author';
import FullWidth from '../FullWidth';
import Description from '../Description';
import Tag from '../Tag';
import IconWrapper from '../IconWrapper';
import * as sizes from '../Picture/imageSizes';
import WithRadioStation from './WithRadioStation';
import Styles from './ContentCard.scss';
import DurationLabel from '../DurationLabel';
/**
 * Basic building block for image+text based container components
 * e.g. widgets like {@link FiveItem}
 * @param {Object} props React Props for this component
 * @returns {jsx}
 * @constructor
 */
const ContentCard = (props) => {
  const {
    airTime,
    articleType,
    authRequired,
    className,
    contentPriority,
    customIcon,
    description,
    deviceSizeOverrides,
    hasNewLabel,
    iconContent,
    image,
    isAnchor,
    isLead,
    isMain,
    feedConsumer,
    labelSize,
    leadType,
    longform,
    mcpid,
    number,
    onClick,
    onImageError,
    publishDate,
    preloadImage,
    playlist,
    refCallback,
    secLabel,
    sharing,
    showAuthor,
    showDesc,
    showIcon,
    showInPlaylist,
    showNumberOnly,
    showPlayer,
    showBtnLongform,
    showText,
    tag,
    tagVertical,
    target,
    theme,
    title,
    titleElement,
    type,
    uid,
    uri,
    variant,
    videoType,
    view,
    widgetContext,
    wrapperElement: WrapperElement,
    overlay,
    schedule,
    adSettings,
    ...mainVideo
  } = props;

  let shouldRender = true;
  if (schedule) shouldRender = shouldRenderBySchedule(schedule.schedules);
  const iconName = iconHelpers.getContentClass(type, articleType);

  let currentVideoData;
  if (mcpid && features.video.enableResume()) {
    const videoHistory = LocalStorage.getObject('videoHistory');
    currentVideoData = getKey(videoHistory, mcpid);
  }

  const isVideoResume = !showPlayer && currentVideoData && currentVideoData.currentTime
    && currentVideoData.duration;

  const tagTheme = getThemeFromVertical(tagVertical);
  const tagColor = variant === LIGHT_VARIANT && tagTheme ? tagTheme?.primary : WHITE;

  /**
   * Trigger click tracking event
   * @param {string} eventTarget target of the event
   */
  const triggerTrackingEvent = (eventTarget) => {
    WidgetTracker.track(WidgetTracker.events.click, {
      widgetContext,
      target: eventTarget,
      contentTitle: title,
      contentUid: uid,
    });
  };

  /**
   * Trigger the onClick callback and track the click on the content
   */
  const onClickContent = (...args) => {
    if (isValidFunction(onClick)) {
      onClick.apply(this, args);
    }

    if (!showPlayer) {
      triggerTrackingEvent('content');
    }
  };

  // Set the content label for a longform video which
  // requires authentication or is the latest episode
  let contentLabelTag;
  if (feedConsumer === CONECTA) {
    contentLabelTag = localization.get('vote');
  } else if (longform) {
    if (hasNewLabel) {
      contentLabelTag = localization.get('episodeNew');
    } else if (!authRequired) {
      contentLabelTag = localization.get('episodeFree');
    }
  }

  const overrides = deviceSizeOverrides || {
    xl: sizes.X_SMALL,
    lg: sizes.X_SMALL,
    md: sizes.X_SMALL,
    sm: sizes.X_SMALL,
    xsm: sizes.XX_SMALL,
  };

  const { data } = getPageData(Store) || {};
  const useBigIcon = isLead || isMain;
  const isVertical = view === 'vertical';
  const isHorizontal = view === 'horizontal';
  const isMobile = getDevice(Store) === 'mobile';
  let cardNumberColor;

  if (variant === 'dark' && features.shows.showsRedesign()) {
    cardNumberColor = GREY_BLACK;
  } else if (getKey(data, 'vertical') === ROOT_VERTICAL && uri) {
    cardNumberColor = getKey(getThemeFromURL(uri), 'primary', themes.black.primary);
  } else {
    cardNumberColor = isValidObject(theme) ? theme.primary : themes.black.primary;
  }

  const pictureProps = {
    alt: title,
    classname: Styles.pictureWrapper,
    image,
    deviceSizeOverrides: overrides,
    onImageError,
    preload: preloadImage,
  };

  if (typeof image === 'string') {
    pictureProps.overrideImageUrl = image;
    pictureProps.image = null;
  }

  const hasLiveStream = features.video.hasLivestream(leadType, type, videoType);

  const widgetData = {
    authRequired,
    adSettings,
    description,
    longform,
    image,
    mcpid,
    title,
    playlist,
    publishDate,
    sharing,
    uid,
    uri,
    videoType,
    ...mainVideo,
  };

  const imageEl = (
    <Fragment>
      <div
        className={classnames(Styles.imageWrapper, {
          [Styles.imageWrapperWithNumber]: exists(number),
          'col-6 col-sm-4 pl-0': !isVertical && !showInPlaylist,
          'col-6 px-0': !isVertical && showInPlaylist && !(isAnchor && !isMobile),
          'col-5 px-0': !isVertical && showInPlaylist && isAnchor && !isMobile,
          'col-12 px-0': isVertical && showInPlaylist,
        })}
      >
        {number && (
          <div
            className={classnames(Styles.cardNumber, 'uvs-font-b-bold')}
            style={{ background: cardNumberColor }}
          >
            {number}
          </div>
        )}

        {showPlayer && (
          <div className={Styles.videoPlayer}>
            <VideoPlayer
              disableVideoAds={adSettings?.disableVideoAds}
              autoplay={false}
              smallMeta
              hidePlaylist
              onClick={onClickContent}
              variant={variant}
              widgetData={widgetData}
            />
          </div>
        )}

        {!showPlayer && (
        <Link href={uri} className={classnames(Styles.link, showInPlaylist ? Styles.overlayImage : '')} target={target} onClick={onClickContent}>
          {(exists(image) ? <Picture {...pictureProps} /> : <Picture />)}
          {showIcon
            && (customIcon
              || (iconName && (
              <IconWrapper
                iconName={iconName}
                content={iconContent}
                iconSize={useBigIcon ? 20 : 14}
                className={useBigIcon ? Styles.imageWrapperIcon : ''}
              />
              ))
            )}
          {exists(secLabel) && <div className={Styles.secondaryLabelWrapper}>{secLabel}</div>}
          {overlay}
          {showInPlaylist
            ? <DurationLabel iconSize={10} contentProps={props} />
            : <DurationLabel contentProps={props} />
          }
          {exists(contentLabelTag) && !showInPlaylist && (
            <Label
              className={Styles.label}
              smallSize={labelSize === 'small'}
              label={contentLabelTag}
              type={LONGFORM}
            />
          )}
        </Link>
        )}
      </div>
    </Fragment>
  );

  // Author
  let { author } = props;
  // Assign authors if authors array is passed in props
  const { authors } = props;
  if (isValidArray(authors)) {
    if (hasKey(authors[0], 'title')) {
      author = authors[0].title;
    } else if (hasKey(authors[0], 'fullName')) {
      author = authors[0].fullName;
    }
  }

  /**
   * Rendering of {ContentCard}
   * Relies on the Picture component to decide which image rendition to use
   */

  return (
    <WrapperElement
      className={classnames(Styles.contentCard, Styles[view], className, {
        [Styles.dark]: variant === 'dark',
        [Styles.showInPlaylist]: showInPlaylist,
      }, 'row mx-0')}
      ref={refCallback}
      data-href={uri}
    >
      {shouldRender
        ? (
          <>
            {showNumberOnly && <div className={Styles.listNumber}>{`${number}.`}</div>}
            {!showNumberOnly && (isMain ? <FullWidth className={Styles.imageFull} breakpoints={['xxs']}>{imageEl}</FullWidth> : imageEl)}
            {isVideoResume && (
              <ProgressBar
                className={Styles.videoResume}
                percent={currentVideoData.currentTime / currentVideoData.duration * 100}
                strokeColor={SEA_BUCKTHORN}
                trailSize={4}
                trailColor={DARKER_GREY}
              />
            )}
            <div className={classnames(Styles.textWrapper, {
              'col-6 col-sm-8 pr-0': (!isVertical && !showNumberOnly && !showInPlaylist),
              'col-6 px-0': !isVertical && showInPlaylist && !(isAnchor && !isMobile),
              'col-7 px-0': !isVertical && showInPlaylist && isAnchor && !isMobile,
              'col-12 px-0': isVertical && showInPlaylist,
            })}
            >
              <Link className={Styles.containerMeta} href={uri} onClick={onClickContent}>
                {tag && showInPlaylist && (
                <Tag
                  style={{ color: tagColor }}
                  className={Styles.simpleTag}
                  name={tag}
                />
                )}
                {exists(showText) && !showPlayer && (
                <Title
                  size={isMain ? 'large' : 'small'}
                  className={classnames(Styles.title, {
                    [Styles.isAnchor]: isAnchor,
                  })}
                  element={titleElement}
                >
                  <span className="uvs-text-hover uvs-text-link uvs-font-b-bold">
                    {exists(contentLabelTag) && showInPlaylist && (
                    <Label
                      className={Styles.label}
                      smallSize={labelSize === 'small'}
                      label={contentLabelTag}
                      type={LONGFORM}
                    />
                    )}
                    {hasLiveStream && (
                      <Label
                        className={Styles.label}
                        contentPriority={contentPriority}
                        hasLiveIcon
                        smallSize={labelSize === 'small'}
                        label={localization.get('livestream')}
                        type={LIVE}
                      />
                    )}
                    {truncateString(title, MAX_TITLE_CHARS_LENGTH, '')}
                  </span>
                </Title>
                )}
              </Link>
              {!showPlayer && (
              <>
                {exists(airTime) && (
                <Description className={classnames(Styles.airTime, 'uvs-font-a-regular', variant)}>{airTime}</Description>
                )}
                {exists(description) && (showDesc || isHorizontal) && (
                <Description size="small" className={classnames(Styles.description, 'uvs-font-a-regular')}>
                  {truncateString(description, globalComponents.truncate.description, '')}
                </Description>
                )}
                <div className={Styles.textWrapperInfo}>
                  {!exists(longform) && exists(author) && showAuthor
                  && <Author size="small" fullName={author} className={Styles.author} />}
                  <DateTime date={publishDate} format="MMMM DD YYYY" className={`uvs-font-c-regular ${Styles.date}`} />
                  {exists(longform) && showBtnLongform && showInPlaylist && (
                    <span className={classnames(Styles.viewEpisode, 'uvs-font-c-regular')}>
                      {localization.get('viewEpisode')}
                      <Icon name="key" size={12} fill={variant === 'dark' ? WHITE : DARKER_GREY} />
                    </span>
                  )}
                </div>
                {exists(longform) && showBtnLongform && !showInPlaylist && (
                <Clickable
                  type="link"
                  appearance="auth"
                  href={uri}
                  label={localization.get('viewEpisode')}
                  size="small"
                  className={Styles.longform}
                  authRequired={authRequired}
                  onClick={onClickContent}
                />
                )}
              </>
              )}
            </div>
          </>
        )
        : (
          <Picture
            alt={schedule.title}
            image={schedule.image}
            deviceSizeOverrides={overrides}
            onImageError
            preload={preloadImage}
          />
        )}
    </WrapperElement>
  );
};

/**
 * propTypes
 * @property {Object} renditions Object containing data different image renditions available
 * @property {string} title_text Text that represents the title for this item
 * @property {string} uri URL to reach the full representation of the content in this promo
 * @property {boolean} showTag Boolean value to show tag below image
 * @property {boolean} showText Boolean value to show the text below image
 * @property {boolean} showIcon Boolean value to show icon overlay
 * @property {boolean} showNumberOnly Used for show the numbers without images
 * @property {string} iconContent Text content besides the icon
 * @property {string} articleType The article content type
 * @property {string} airTime Text that represents the aireTime when contentcard is a show
 * @property {string} feedConsumer Text that represents consumer content
 */
ContentCard.propTypes = {
  airTime: PropTypes.string,
  articleType: PropTypes.string,
  author: PropTypes.string,
  authors: PropTypes.array,
  authRequired: PropTypes.bool,
  category: PropTypes.string,
  className: PropTypes.string,
  contentPriority: PropTypes.string,
  customIcon: PropTypes.node,
  description: PropTypes.string,
  deviceSizeOverrides: PropTypes.object,
  feedConsumer: PropTypes.string,
  hasNewLabel: PropTypes.bool,
  image: PropTypes.object,
  iconContent: PropTypes.string,
  isAnchor: PropTypes.bool,
  isLead: PropTypes.bool,
  isMain: PropTypes.bool,
  labelSize: PropTypes.oneOf(['small', 'medium', 'large']),
  longform: PropTypes.bool,
  mcpid: PropTypes.string,
  number: PropTypes.number,
  onClick: PropTypes.func,
  onImageError: PropTypes.func,
  overlay: PropTypes.any,
  playlist: PropTypes.array,
  primaryTag: PropTypes.object,
  publishDate: PropTypes.string,
  preloadImage: PropTypes.bool,
  refCallback: PropTypes.func,
  secLabel: PropTypes.node,
  secondaryTags: PropTypes.array,
  sharing: PropTypes.object,
  schedule: PropTypes.array,
  showAuthor: PropTypes.bool,
  showDesc: PropTypes.bool,
  showInPlaylist: PropTypes.bool,
  showIcon: PropTypes.bool,
  showNumberOnly: PropTypes.bool,
  showPlayer: PropTypes.bool,
  showBtnLongform: PropTypes.bool,
  showTag: PropTypes.bool,
  showText: PropTypes.bool,
  tag: PropTypes.string,
  tagVertical: PropTypes.string,
  target: PropTypes.oneOf(['_blank', '_self']),
  theme: PropTypes.object,
  title: PropTypes.string,
  titleElement: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  type: PropTypes.string.isRequired,
  leadType: PropTypes.string,
  uid: PropTypes.string,
  uri: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
  videoType: PropTypes.string,
  view: PropTypes.oneOf(['vertical', 'horizontal', 'list']),
  wrapperElement: PropTypes.string,
  widgetContext: PropTypes.object,
  adSettings: PropTypes.object,
};

/**
 * Default Prop Values
 */
ContentCard.defaultProps = {
  className: '',
  contentPriority: STANDARD,
  isAnchor: false,
  isMain: false,
  number: null,
  preloadImage: true,
  publishDate: null,
  showAuthor: true,
  showDesc: false,
  showIcon: true,
  showNumberOnly: false,
  showBtnLongform: true,
  showInPlaylist: false,
  showTag: true,
  showText: true,
  isLead: false,
  view: 'vertical',
  wrapperElement: 'div',
  widgetContext: {},
  titleElement: 'h3',
  variant: 'light',
};

export default WithRadioStation(ContentCard);
