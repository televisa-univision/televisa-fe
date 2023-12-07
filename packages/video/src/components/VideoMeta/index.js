import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import url from 'url';
import styled from 'styled-components';
import RouterContext from '@univision/fe-commons/dist/components/RouterContext';
import Store from '@univision/fe-commons/dist/store/store';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import ThemeStyle from '@univision/fe-commons/dist/utils/themes/ThemeStyle';
import features from '@univision/fe-commons/dist/config/features';
import {
  hasKey,
  isValidArray,
  isValidFunction,
} from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import labelTypes from '@univision/fe-commons/dist/constants/labelTypes';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Label from '@univision/fe-components-base/dist/components/Label';
import Link from '@univision/fe-components-base/dist/components/Link';
import Truncate from '@univision/fe-components-base/dist/components/Truncate';
import Title from '@univision/fe-components-base/dist/components/Title';
import MultiAuthorDisplay from '@univision/fe-components-base/dist/components/MultiAuthorDisplay';
import { fetchReactions } from '@univision/fe-commons/dist/store/slices/reactions/reactions-slice';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';

import ClosedCaptions from './ClosedCaptions';

import Styles from './VideoMeta.scss';
import StyledComponent from './VideoMeta.styles';

const HeaderWrapper = styled.div`${StyledComponent.headerWrapper}`;
const TitleWrapper = styled.div`${StyledComponent.titleWrapper}`;

const LIVESTREAM_247_URL = '/noticias/en-vivo-noticias-24-7-livestream';

/**
 * VideoMeta component
 * @param {Object} variant props the component props
 * @returns {JSX}
 */
export default class VideoMeta extends React.Component {
  state = {};

  ctx = null;

  /* eslint camelcase: "off" */
  /* eslint-disable react/sort-comp */
  /**
   * componentWillMount React's lifecycle method
   */
  componentDidMount() {
    this.is_mounted = true;
  }

  /**
   * shouldComponentUpdate React's lifecycle method
   * @param {Object} nextProps incoming props
   * @returns {boolean} re-render if current video is playing
   */
  shouldComponentUpdate(nextProps) {
    const { program } = this.props;

    return nextProps.currentMcpId === nextProps.mcpid
      || nextProps.program?.title !== program?.title;
  }

  /**
   * componentWillReceiveProps React's lifecycle method
   * @param {Object} nextProps incoming props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onComponentWillReceiveProps(nextProps);
  }

  /**
   * componentWillUnmount
   */
  componentWillUnmount() {
    this.is_mounted = false;
  }

  /**
   * onComponentWillReceiveProps async fetches video metadata, updates state + history
   * @param {Object} nextProps incoming props
   */
  onComponentWillReceiveProps(nextProps) {
    const { mcpid, uid } = this.props;
    const { uid: nextUid, index, uri } = nextProps;

    if ((nextProps.mcpid !== mcpid && nextProps.currentMcpId === nextProps.mcpid)
      || (index === 0 && !window.location.href.includes(toRelativeUrl(uri)))) {
      if (uid !== nextUid) {
        Store.dispatch(fetchReactions({ contentIds: [nextUid] }));
      }

      if (nextProps.permalink && nextProps.title) {
        this.updatePageContext(nextProps.permalink, nextProps.title);
      }
    }
  }

  /**
   * getDescription() - get description w/ rich text support
   * @returns {string} description (text or html)
   */
  getDescription() {
    const { description } = this.props;

    if (isValidArray(description)) {
      return description
        .map((item) => {
          return hasKey(item, 'value') ? item.value : '';
        })
        .join('');
    }

    return description || '';
  }

  /**
   * updates page history state + title
   * @param {string} uri to navigate to, will be made relative
   * @param {string} title to update
   */
  updatePageContext(uri, title) {
    const { onClick } = this.props;
    if (this.is_mounted) {
      if (uri && !isValidFunction(onClick)) {
        const { ctx } = this;
        const parsedUri = url.parse(uri);
        const formattedUrl = url.format({
          pathname: parsedUri.path,
        });
        if (ctx && ctx.history) {
          ctx.history.replace(formattedUrl);
        } else {
          global.history.replaceState(
            null,
            title,
            formattedUrl
          );
        }
      }

      if (title) {
        this.updateTitle(title);
      }
    }
  }

  /**
   * updates page title
   * @param {string} title to update
   */
  updateTitle(title) {
    document.title = title;
    this.title = title;
  }

  /**
   * render
   * @returns {JSX}
   */
  render() {
    const {
      authors,
      captions,
      category,
      context,
      device,
      isClickable,
      isNewsDigitalChannel,
      isExpanded,
      isLivestreamPage,
      onClick,
      program,
      showLiveLabel,
      showUpdateDate,
      simple,
      smallVersion,
      theme,
      updateDate,
      uri,
      variant,
      video,
    } = this.props;

    if (!video) return null;

    /* Title - Description */
    const isWorldCupMVP = features.deportes.isWorldCupMVP();
    const videoUrl = uri || video.uri;
    const clickable = isClickable && (videoUrl || isValidFunction(onClick));
    const titleElement = clickable ? 'h3' : 'h1';
    const description = this.getDescription();
    const isMobile = device === 'mobile';
    const titleDescription = (
      <TitleWrapper isMobile={isMobile} isNewsDigitalChannel={isNewsDigitalChannel}>
        <div className="row no-gutters">
          <div className={`col-12 ${Styles.containerTitle}`}>
            {showLiveLabel && !isNewsDigitalChannel && isLivestreamPage && (
              <Label
                className={Styles.label}
                label={localization.get('livestream')}
                smallSize
                type={labelTypes.LIVE}
                hasLiveIcon
              />
            )}
            <Title
              element={titleElement}
              className={classNames({ [Styles.isWorldCupMVP]: isWorldCupMVP }, Styles.title)}
              theme={theme}
            >
              {isNewsDigitalChannel && !isLivestreamPage && (
                <div className={Styles.channelLogo}>
                  <Link href={LIVESTREAM_247_URL}>
                    <Icon name="live247" viewBox="0 0 127 20" />
                  </Link>
                </div>
              )}
              <strong>{video.isLivestream ? program?.title : video.title}</strong>
            </Title>
            {program && video.isLivestream && (
              <span className={`uvs-font-c-regular ${Styles.programTime}`}>
                {program.startTimeDisplay} - {program.endTimeDisplay}
              </span>
            )}
          </div>
        </div>
        {!simple && (
          <div className="row no-gutters">
            <div className="col-12">
              <ThemeStyle>
                {isMobile ? (
                  <Truncate
                    text={video.description}
                    html={description}
                    truncateOn={['mobile', 'tablet']}
                    className={classNames('uvs-font-a-light', Styles.description)}
                    openLabel={localization.get('readLess')}
                    closedLabel={localization.get('readMore')}
                    device={device}
                    variant={variant}
                  />
                ) : (
                  <div className={classNames({ [Styles.isWorldCupMVP_description]: isWorldCupMVP }, 'uvs-font-a-light', Styles.description)}>
                    {/* if desktop + html description, we need to inject directly */
                    /* eslint-disable react/no-danger */}
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </div>
                )}
              </ThemeStyle>
            </div>
          </div>
        )}
      </TitleWrapper>
    );

    /* Authors - Date */
    const newAuthors = isValidArray(authors) ? authors.map((author) => {
      return {
        uri: author?.uri || null,
        link: author?.permalink || null,
        title: author?.name ?? author?.fullName,
      };
    }) : [{
      title: video.source,
    }];

    return (
      <RouterContext.Consumer>
        {
          (ctx) => {
            this.ctx = context || ctx;

            return (
              <HeaderWrapper isMobile={isMobile}>
                <header className={classNames(
                  Styles.header,
                  Styles[`variant_${variant}`],
                  { [Styles.smallVersion]: smallVersion },
                  { [Styles.livestreamPage]: isLivestreamPage },
                  { [Styles.expanded]: isExpanded },
                  { [Styles.simple]: simple },
                )}
                >
                  {category && !isNewsDigitalChannel && <span className={classNames('uvs-font-c-bold', Styles.category)}>{category}</span>}
                  {clickable ? (
                    <Link
                      context={this.ctx}
                      href={videoUrl}
                      onClick={onClick}
                    >
                      {titleDescription}
                    </Link>
                  ) : (
                    titleDescription
                  )}
                  {!smallVersion && (
                    <div className={`row ${Styles.infoMetaWrapper}`}>
                      <div className={classNames('col-sm-6 col-md-6', Styles.authorsWrapper)}>
                        {!isLivestreamPage && (
                          <MultiAuthorDisplay
                            authors={newAuthors}
                            videoMeta
                            date={video.publishDate}
                            authorClassName={classNames({ [Styles.authorDark]: variant === 'dark' })}
                            showUpdateDate={showUpdateDate}
                            updateDate={updateDate}
                          />
                        )}
                      </div>
                      <ClosedCaptions captions={captions} mcpId={video.mcpid} />
                    </div>
                  )}
                </header>
              </HeaderWrapper>
            );
          }
        }
      </RouterContext.Consumer>
    );
  }
}

VideoMeta.defaultProps = {
  isClickable: false,
  isNewsDigitalChannel: false,
  showLiveLabel: false,
  smallVersion: false,
  variant: 'light',
};

/* eslint-disable react/no-unused-prop-types */
VideoMeta.propTypes = {
  authors: PropTypes.array,
  captions: PropTypes.array,
  category: PropTypes.string,
  context: PropTypes.object,
  currentMcpId: PropTypes.string,
  description: PropTypes.string,
  device: PropTypes.string,
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  isClickable: PropTypes.bool,
  isNewsDigitalChannel: PropTypes.bool,
  isExpanded: PropTypes.bool,
  isLivestreamPage: PropTypes.bool,
  mcpid: PropTypes.string,
  nodeId: PropTypes.string,
  onClick: PropTypes.func,
  pageData: PropTypes.object,
  program: PropTypes.object,
  shareButtonClick: PropTypes.func,
  sharingOptions: PropTypes.object,
  showLiveLabel: PropTypes.bool,
  showUpdateDate: PropTypes.bool,
  simple: PropTypes.bool,
  smallVersion: PropTypes.bool,
  theme: PropTypes.object,
  title: PropTypes.string,
  uid: PropTypes.string,
  updateDate: PropTypes.string,
  uri: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
  video: PropTypes.object,
};
