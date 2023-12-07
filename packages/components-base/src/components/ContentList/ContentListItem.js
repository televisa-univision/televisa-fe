import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import url from 'url';

import RouterContext from '@univision/fe-commons/dist/components/RouterContext';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import setPageData, { fetchPageData } from '@univision/fe-commons/dist/store/actions/page-actions';
import { fetchReactions } from '@univision/fe-commons/dist/store/slices/reactions/reactions-slice';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import getStyledTheme from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import { VISIBILITY_SENSOR_SCROLL_THROTTLE } from '@univision/fe-commons/dist/constants/spa';

import Styles from './ContentListItem.scss';

/**
 * Renders each individual item from the ContentList component
 */
class ContentListItem extends React.Component {
  static propTypes = {
    componentLoaded: PropTypes.bool,
    contentData: PropTypes.object,
    depth: PropTypes.number,
    fetchPageDataAction: PropTypes.func,
    fetchReactionsAction: PropTypes.func,
    initialLoad: PropTypes.bool,
    itemComponent: PropTypes.elementType,
    onNextItemFetched: PropTypes.func,
    setPageDataAction: PropTypes.func,
    supressTracking: PropTypes.bool,
    thirdPartyAdsDisabled: PropTypes.bool,
    trackItem: PropTypes.func,
    updateInitialLoad: PropTypes.func,
    updateLoader: PropTypes.func,
  };

  static defaultProps = {
    contentData: {},
    depth: 1,
    trackItem: () => {},
  };

  /**
   * Constructor
   * @param {Object} props Properties
   */
  constructor(props) {
    super(props);
    this.onItemVisibilityChange = this.onItemVisibilityChange.bind(this);
    this.onNextItemVisibilityChange = this.onNextItemVisibilityChange.bind(this);
    this.isInViewportCallback = null;
    this.setVisibleCallback = this.setVisibleCallback.bind(this);
    this.state = {
      content: props.contentData,
      isNextItemLoaded: false,
      isItemTracked: false,
    };
    this.ctx = null;
  }

  /**
   * Check if the component should update when the props/state changed
   * If current component is already loaded don't update
   * @param {Object} nextProps - the new props data
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    return !nextProps.componentLoaded;
  }

  /**
   * Triggered when an item visibility is changed
   * @param {boolean} isVisible Visibility state
   */
  onItemVisibilityChange(isVisible) {
    const {
      props: { supressTracking, initialLoad, updateInitialLoad },
      state: { isItemTracked, content },
    } = this;

    if (isVisible === true) {
      // Will trigger track event if allowed to track it and haven't triggered it yet.
      if (!supressTracking && !isItemTracked) {
        this.trackNewItem();
      }

      MainTracking.updateTracking({ data: content });
    }

    if (!initialLoad) {
      this.updatePageContext();
    } else {
      updateInitialLoad();
    }

    if (this.isInViewportCallback) {
      this.isInViewportCallback(isVisible);
    }
  }

  /**
   * Triggered when the next item visibility is changed
   * @param {boolean} isVisible Visibility state
   */
  onNextItemVisibilityChange(isVisible) {
    const { content, isNextItemLoaded } = this.state;

    if (isVisible === true && isValidObject(content.nextItem) && !isNextItemLoaded) {
      this.loadNextItem();
    }
  }

  /**
   * Set the callback from the item
   * @param {function} callback calback function
   */
  setVisibleCallback (callback) {
    if (callback && typeof callback === 'function') {
      this.isInViewportCallback = callback;
    }
  }

  /**
   * Updates the page title and uri
   */
  updatePageContext() {
    const { content } = this.state;
    const { setPageDataAction } = this.props;

    setPageDataAction({ data: content });
    MainTracking.updateTracking({ data: content });

    try {
      const { ctx } = this;
      const relativeUrl = toRelativeUrl(content.uri);
      const contentUrl = url.format({ pathname: relativeUrl });
      if (ctx && ctx.history) {
        ctx.history.replace(contentUrl);
      } else {
        window.history.replaceState(
          null,
          content.title,
          contentUrl,
        );
      }
    } catch (e) {
      clientLogging(e);
    }

    // Picking up SEO title if null, then fallback to title
    document.title = getKey(content, 'seo.title') || content.title;
  }

  /**
   * Fetches the next item data using the web-api proxy.
   * The data is sent to the ContentList so the next item is loaded.
   * @returns {Promise}
   */
  loadNextItem() {
    const {
      props: {
        fetchPageDataAction,
        fetchReactionsAction,
        onNextItemFetched,
        updateLoader,
      },
      state: { content },
    } = this;

    updateLoader({ displayLoader: true });

    return fetchPageDataAction(content.nextItem.uri, {
      themeFn: getStyledTheme,
      meta: {
        initiator: 'infinite-scrolling',
      },
    })
      .then((response) => {
        if (hasKey(response, 'value.data')) {
          fetchReactionsAction({ contentIds: [response.value.data.uid] });
          onNextItemFetched(response.value.data, () => {
            this.setState({ isNextItemLoaded: true });
          });
        }
      })
      .catch(() => updateLoader({ displayLoader: false }));
  }

  /**
   * Triggers the new item event
   */
  trackNewItem() {
    const { depth, trackItem } = this.props;
    const { content } = this.state;
    const trackingData = MainTracking.getTrackingConfig({ data: content });

    trackItem({
      ...trackingData,
      depth,
    });

    // Comscore tracking
    comScoreManager.beacon();

    this.setState({ isItemTracked: true });
  }

  /**
   * Renders the component for the current content
   * @returns {JSX}
   */
  renderContent() {
    const { content } = this.state;
    const { depth, itemComponent: ItemComponent, thirdPartyAdsDisabled } = this.props;
    const innerHeight = isValidObject(global.window) ? global.window.innerHeight : 800;
    const topOffset = innerHeight * 0.6;

    return (
      <VisibilitySensor
        onChange={this.onItemVisibilityChange}
        minTopValue={topOffset}
        partialVisibility
        scrollCheck
        intervalCheck={false}
        scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
        offset={{ top: innerHeight / 2 }}
      >
        <div>
          <ErrorBoundary fallbackRender={() => null}>
            {
              <ItemComponent
                content={content}
                depth={depth}
                thirdPartyAdsDisabled={thirdPartyAdsDisabled}
                isInViewportCallback={this.setVisibleCallback}
              />
            }
            {isValidObject(content.nextItem) && (
            <Fragment>
              {!thirdPartyAdsDisabled && depth > 1
                && adHelper.getAd(AdTypes.YIELDMO_FOOTER_AD)}
              <VisibilitySensor
                onChange={this.onNextItemVisibilityChange}
                offset={{ bottom: -innerHeight }}
                partialVisibility
                scrollCheck
                intervalCheck={false}
                scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
              >
                <div className={Styles.moreContent}>
                  <p>{localization.get('moreContentOfInterest')}</p>
                </div>
              </VisibilitySensor>
            </Fragment>
            )}
          </ErrorBoundary>
        </div>
      </VisibilitySensor>
    );
  }

  /**
   * Renders an individual content item
   * @returns {JSX}
   */
  render() {
    const theme = getTheme(Store);
    return (
      <RouterContext.Consumer>
        {
          (ctx) => {
            this.ctx = ctx;
            return (
              <div className={Styles.item} style={{ borderColor: theme.primary }}>
                {this.renderContent()}
              </div>
            );
          }
        }
      </RouterContext.Consumer>
    );
  }
}

const actionCreators = {
  fetchPageDataAction: fetchPageData,
  setPageDataAction: setPageData,
  fetchReactionsAction: fetchReactions,
};

export default connect(null, actionCreators)(ContentListItem);
