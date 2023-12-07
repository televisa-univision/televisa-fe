import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import { globalComponents } from '@univision/fe-commons/dist/config';
import {
  exists,
  hasKey,
  isValidArray,
  truncateString,
} from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import Link from '../Link';
import Title from '../Title';
import Clickable from '../Clickable';
import Author from '../Author';
import BackgroundImage from '../BackgroundImage';
import Description from '../Description';
import DurationLabel from '../DurationLabel';
import LiveLabel from '../LiveLabel';
import IconWrapper from '../IconWrapper';

import iconHelpers from '../IconWrapper/helpers';

import Styles from './FeaturedCard.scss';

/**
 * Basic building block for featured card based components
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const FeaturedCard = (props) => {
  const {
    authors,
    adSettings,
    articleType,
    authRequired,
    className,
    description,
    device,
    hasAutoPlayControls,
    image,
    longform,
    mcpId,
    overlay,
    playlist,
    sharing,
    showPlayer,
    showIcon,
    title,
    type,
    uid,
    uri,
    variant,
    videoType,
    widgetContext,
    ...mainVideo
  } = props;
  const iconClass = iconHelpers.getContentClass(type, articleType);
  const widgetData = {
    authors,
    authRequired,
    adSettings,
    description,
    longform,
    image,
    mcpid: mcpId,
    title,
    playlist,
    sharing,
    uid,
    uri,
    videoType,
    ...mainVideo,
  };
  // Author
  let { author } = props;
  // Assign authors if authors array is passed in props
  if (isValidArray(authors)) {
    const firstAuthor = authors[0];
    if (hasKey(firstAuthor, 'title')) {
      author = firstAuthor.title;
    } else if (hasKey(firstAuthor, 'fullName')) {
      author = firstAuthor.fullName;
    }
  }

  /**
   * Handles tracking click
   * @returns {function}
   */
  const handleClick = () => WidgetTracker.track(WidgetTracker.events.click, {
    widgetContext,
    target: 'content',
    contentTitle: title,
    contentUid: uid,
  });

  return (
    <div className={classnames('row', Styles.container, { [className]: exists(className) })}>
      <div className="col-md-8 col-xs-12 px-0">
        {showPlayer && (
          <VideoPlayer
            disableVideoAds={adSettings?.disableVideoAds}
            hideMeta
            hidePlaylist
            widgetData={widgetData}
          />
        )}
        {!showPlayer && image && (
          <Fragment>
            <div className={Styles.imageWrapper}>
              <BackgroundImage device={device} image={image} className={Styles.backgroundImage} />
            </div>
            <LiveLabel
              authRequired={authRequired}
              size="large"
              iconSize={16}
              type={type}
              videoType={videoType}
            />
            {showIcon && iconClass && (
              <IconWrapper iconName={iconClass} iconSize={20} variant="dark" className={Styles.imageWrapperIcon} />
            )}
            <DurationLabel className={Styles.imageDuration} contentProps={props} />
            {overlay}
          </Fragment>
        )}
      </div>
      <div className={classnames('col-md-4 col-xs-12 px-0',
        Styles.textContainer)}
      >
        <Link
          href={uri}
          className={classnames('row mx-0', Styles.link, {
            [Styles.light]: variant === 'light',
          })}
          onClick={handleClick}
        >
          <div
            className={classnames(Styles.textWrapper, 'col-md-12 col-xs-12', {
              [Styles.hasAutoPlayControls]: hasAutoPlayControls,
            })}
          >
            <div className={Styles.icon}>
              {showIcon && iconClass && <Icon name={iconClass} size="24" variant={variant === 'dark' ? 'light' : undefined} />}
              <DurationLabel
                contentProps={props}
                iconSize="small"
                size="medium"
                position="relative"
                className={Styles.duration}
              />
            </div>
            <Title size="large" className={classnames(Styles.title, 'uvs-font-a-bold')}>
              {truncateString(title, globalComponents.truncate.title, '')}
            </Title>
            <Description size="small" className={classnames(Styles.description, 'uvs-font-a-regular')}>
              {truncateString(description, globalComponents.truncate.description, '...', true, false)}
            </Description>
            <div className={Styles.textWrapperEnd}>
              {author && <Author size="small" fullName={author} className={Styles.author} />}
            </div>
            {longform && (
              <Clickable
                type="link"
                appearance="auth"
                href={uri}
                label={localization.get('viewEpisode')}
                size="small"
                className={Styles.longform}
                authRequired={authRequired}
              />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {content} component content
 */
FeaturedCard.propTypes = {
  adSettings: PropTypes.object,
  articleType: PropTypes.string,
  author: PropTypes.string,
  authors: PropTypes.array,
  authRequired: PropTypes.bool,
  className: PropTypes.string,
  description: PropTypes.string,
  device: PropTypes.string,
  hasAutoPlayControls: PropTypes.bool,
  image: PropTypes.shape({
    renditions: PropTypes.object,
  }),
  longform: PropTypes.object,
  mcpId: PropTypes.string,
  overlay: PropTypes.any,
  playlist: PropTypes.array,
  sharing: PropTypes.object,
  showIcon: PropTypes.bool,
  showPlayer: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  uid: PropTypes.string,
  uri: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
  videoType: PropTypes.string,
  widgetContext: PropTypes.object,
};

/**
 * Default props values
 * @property {object} default content
 */
FeaturedCard.defaultProps = {
  authors: [],
  authRequired: false,
  device: 'mobile',
  title: '',
  type: 'externalcontent',
  uri: '',
  image: {
    renditions: {},
  },
  showIcon: true,
  widgetContext: {},
  variant: 'dark',
};

export default FeaturedCard;
