/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DIGITAL_CHANNEL } from '@univision/fe-commons/dist/constants/pageCategories';
import ResponsiveLoader from '@univision/fe-commons/dist/components/breakpoint/ResponsiveLoader';
import { exists, getKey, scrollTo } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Store from '@univision/fe-commons/dist/store/store';
import helperTheme from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import { getDevice, getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import Carousel from '@univision/fe-components-base/dist/components/Carousel';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';

import PlaylistPlaceholder from './PlaylistPlaceholder';
import PlaylistContentCard from './PlaylistContentCard';

import Styles from './ResponsivePlaylist.scss';
import StyledComponent from './ResponsivePlaylist.styles';

const MoreButtonWrapper = styled.div`${StyledComponent.moreButtonWrapper}`;
const PlaylistCard = styled(PlaylistContentCard)`${StyledComponent.playlistContentCard}`;

/**
 * Use horizontal react-slick slider for mobile
 * and vertical native scrolling div on desktop
 * @deprecated
 * @returns {JSX}
 */
/* istanbul ignore next */
export default class ResponsivePlaylist extends React.Component {
  /**
   * determine playlist size and set initial state
   * @param {Object} props component props
   */
  constructor(props) {
    super(props);
    const { isNewsDigitalChannel } = this.props;

    this.device = getDevice(Store);
    switch (this.device) {
      case 'desktop':
        this.itemCount = Infinity;
        break;
      default:
        this.itemCount = 4;
    }

    this.addPlaylistItem = this.addPlaylistItem.bind(this);
    this.playlistInnerRef = this.playlistInnerRef.bind(this);

    this.state = {
      page: 1,
    };

    this.playlistInner = null;
    this.playlistItems = [];
    this.theme = isNewsDigitalChannel ? helperTheme(DIGITAL_CHANNEL) : getTheme(Store);
  }

  /* eslint camelcase: "off" */
  /* eslint-disable react/sort-comp */
  /**
   * scroll to next element if auto-scroll is enabled
   * @param {Object} nextProps the incoming props
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { activeIndex, autoScroll } = nextProps;

    if (autoScroll && this.playlistItems[activeIndex]) {
      this.scrollToElement(this.playlistItems[activeIndex]);
    }
  }

  /**
   * adds playlist item to local object
   * @param {Node} contentCard for playlist item
   * @param {number} i index in playlist (optional)
   */
  addPlaylistItem(contentCard, i = null) {
    if (i === null) {
      this.playlistItems.push(contentCard);
    } else {
      this.playlistItems[i] = contentCard;
    }
  }

  /**
   * [loadMore description]
   */
  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  /**
   * ref for <div class="playlistInner"> to set container for animated scrolling
   * written like this for better unit testing :)
   * @param {Node} ele to map
   */
  playlistInnerRef(ele) {
    this.playlistInner = ele;
  }

  /**
   * scrolls to active playlist element, climbs up the chain to find playlist wrapper
   * @param {Node} element to scroll to
   * @param {number} duration of animation, 0 for no animation
   */
  scrollToElement(element, duration = 400) {
    if (element && this.playlistInner) {
      scrollTo(this.playlistInner, element.offsetTop, duration);
    }
  }

  /**
   * render contentCard with appropriate layout prop based on device.
   * Function here so we dont duplicate props per breakpoint
   * @param   {Object} c the content object
   * @param   {number} i the card index
   * @param   {string} view horizontal|vertical
   * @returns {jsx} the content card
   */
  renderContentCard = (c, i, view) => {
    const {
      content,
      onClick,
      activeIndex,
      playlistView,
      variant,
      widgetContext,
      isAnchor,
      isNewsDigitalChannel,
      playlistMeta,
    } = this.props;
    const currentMcpId = getKey(content[activeIndex], 'mcpid');

    const showBtnLongform = !!(c.authRequired && c.longform);
    return (
      <PlaylistCard
        content={c}
        index={i}
        isAnchor={isAnchor}
        isCurrentItem={currentMcpId === c.mcpid}
        isNewsDigitalChannel={isNewsDigitalChannel}
        key={c.mcpid}
        longform={c.longform}
        onClick={onClick}
        playlistView={playlistView}
        refCallback={
          /* istanbul ignore next */
          node => this.addPlaylistItem(node, i)
        }
        showBtnLongform={showBtnLongform}
        tagVideo={playlistMeta && playlistMeta[c.mcpid]?.section?.name}
        theme={this.theme}
        useShortTitle={exists(playlistView)}
        variant={variant}
        verticalVideo={playlistMeta && playlistMeta[c.mcpid]?.adSettings?.targeting?.vertical}
        view={view}
        widgetContext={widgetContext}
      />
    );
  };

  /**
   * render
   * @returns {JSX} the view
   */
  render() {
    const {
      breakpoints,
      content,
      className,
      maxHeight,
      playlistView,
      showLoadMore,
      loading,
      longformPlayList,
      variant,
    } = this.props;
    const { page } = this.state;
    const playlistSize = page * this.itemCount;

    if (!content.length || loading) {
      return (
        <PlaylistPlaceholder
          maxHeight={maxHeight}
          playlistView={playlistView}
          theme={this.theme}
        />
      );
    }

    const separatorSize = this.device === 'desktop' ? 20 : 8;
    const itemsToBeDisplayed = {
      xs: 2,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
    };
    const playlistContent = showLoadMore ? content.slice(0, playlistSize) : content;
    return (
      <Fragment>
        {!exists(playlistView) && (
          <ResponsiveLoader breakpoints={['xs', 'sm']}>
            <>
              {playlistContent.map((c, i) => (
                <div key={`playlistContent_${c.mcpid}`} className={Styles.videoCardContainer}>
                  {this.renderContentCard(c, i, 'horizontal')}
                </div>
              ))}
            </>
            {!longformPlayList && showLoadMore && playlistSize < content.length && (
              <MoreButtonWrapper theme={this.theme}>
                <Clickable
                  appearance="secondary"
                  label={localization.get('loadMore')}
                  icon="arrowDownLegacy"
                  align="center"
                  className={Styles.loadMore}
                  onClick={this.loadMore}
                  theme={this.theme}
                  type="button"
                  variant={variant}
                />
              </MoreButtonWrapper>
            )}
          </ResponsiveLoader>
        )}
        <div className={`${Styles.playlistOuter} ${className} ${Styles[playlistView]}`}>
          <div
            className={Styles.playlistInner}
            ref={this.playlistInnerRef.bind(this)}
            style={{ maxHeight }}
          >
            {!exists(playlistView) && (
              <Fragment>
                <ResponsiveLoader breakpoints={breakpoints.vertical}>
                  <div className={Styles.playlistTablet}>
                    {content.map((c, i) => this.renderContentCard(c, i, 'vertical'))}
                  </div>
                </ResponsiveLoader>
                <ResponsiveLoader breakpoints={breakpoints.horizontal}>
                  <div className={Styles.playlistDesktop}>
                    {content.map((c, i) => this.renderContentCard(c, i, 'horizontal'))}
                  </div>
                </ResponsiveLoader>
              </Fragment>
            )}

            {exists(playlistView) && (
              <div>
                <Carousel
                  arrowTheme="light"
                  usePagination
                  itemsToBeDisplayed={itemsToBeDisplayed}
                  mobilePeek={20}
                  separator={separatorSize}
                  leftArrowClassName={Styles.arrowLeft}
                  rightArrowClassName={Styles.arrowRight}
                  componentClass={Styles.componentClass}
                >
                  {content.map((c, i) => this.renderContentCard(c, i, 'vertical'))}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
ResponsivePlaylist.propTypes = {
  autoScroll: PropTypes.bool,
  breakpoints: PropTypes.object,
  content: PropTypes.array.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isAnchor: PropTypes.bool,
  isNewsDigitalChannel: PropTypes.bool,
  activeIndex: PropTypes.number.isRequired,
  playlistMeta: PropTypes.object,
  playlistView: PropTypes.string,
  variant: PropTypes.string,
  loading: PropTypes.bool,
  longformPlayList: PropTypes.bool,
  maxHeight: PropTypes.number,
  showLoadMore: PropTypes.bool,
  widgetContext: PropTypes.object,
};

ResponsivePlaylist.defaultProps = {
  autoScroll: false,
  breakpoints: {
    horizontal: ['md', 'lg', 'xl'],
    vertical: ['sm'],
  },
  isNewsDigitalChannel: false,
  variant: 'light',
  showLoadMore: true,
};
