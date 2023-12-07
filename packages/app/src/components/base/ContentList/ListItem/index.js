import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import url from 'url';

import { fetchReactions } from '@univision/fe-commons/dist/store/slices/reactions/reactions-slice';
import { themeSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import RouterContext from '@univision/fe-commons/dist/components/RouterContext';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import MainTracking from '@univision/fe-commons/dist/components/tracking/MainTracking';
import { VISIBILITY_SENSOR_SCROLL_THROTTLE } from '@univision/fe-commons/dist/constants/spa';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import { getPermutiveSchema } from '@univision/fe-commons/dist/utils/ads/vendors/permutiveLoader';
import features from '@univision/fe-commons/dist/config/features';

import { getContent } from '../../../../services/webapi';
import Styles from './ListItem.scss';

/**
 * Renders each individual item from the ContentList component
 */
export class ListItem extends React.Component {
  static propTypes = {
    componentLoaded: PropTypes.bool,
    contentData: PropTypes.object,
    depth: PropTypes.number,
    fetchReactionsAction: PropTypes.func,
    initialLoad: PropTypes.bool,
    itemComponent: PropTypes.elementType,
    onNextItemFetched: PropTypes.func,
    pageData: PropTypes.object,
    supressTracking: PropTypes.bool,
    theme: PropTypes.object,
    thirdPartyAdsDisabled: PropTypes.bool,
    trackItem: PropTypes.func,
    updateInitialLoad: PropTypes.func,
    updateLoader: PropTypes.func,
  };

  static defaultProps = {
    contentData: {},
    depth: 1,
    trackItem: () => { },
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

      if (!initialLoad) {
        this.updatePageContext();
      } else {
        updateInitialLoad();
      }
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
    const { initialLoad } = this.props;

    if (
      isVisible === true
      && isValidObject(content.nextItem)
      && !isNextItemLoaded && !initialLoad
    ) {
      this.loadNextItem().then((response) => {
        // we need to dispatch this addon for infinite scroll
        const commonTracking = response?.data?.analyticsData?.web?.common;
        // eslint-disable-next-line babel/no-unused-expressions
        window.permutive?.addon('web', getPermutiveSchema(commonTracking));
      });
    }
  }

  /**
   * Set the callback from the item
   * @param {function} callback calback function
   */
  setVisibleCallback(callback) {
    if (callback && typeof callback === 'function') {
      this.isInViewportCallback = callback;
    }
  }

  /**
   * Updates the page title and uri
   */
  updatePageContext() {
    const { content } = this.state;

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
      e.message = `Error updating pageContext: ${e.message}`;
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
  async loadNextItem() {
    const {
      props: {
        onNextItemFetched,
        updateLoader,
        pageData,
        fetchReactionsAction,
      },
      state: { content },
    } = this;

    updateLoader({ displayLoader: true });

    const contentUrl = pageData.config?.syndicator?.content;
    const uri = content?.nextItem?.uri;

    return getContent(uri, { contentUrl }).then((response) => {
      if (hasKey(response, 'data')) {
        fetchReactionsAction({ contentIds: [response.data.uid] });
        onNextItemFetched(response.data, () => {
          this.setState({ isNextItemLoaded: true });
        });
      }

      return response;
    }).catch(() => {
      updateLoader({ displayLoader: false });
    });
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
    const isTelevisaSite = features.televisa.isTelevisaSite();
    const {
      depth,
      itemComponent: ItemComponent,
      thirdPartyAdsDisabled,
      pageData,
    } = this.props;
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
                pageData={pageData}
                thirdPartyAdsDisabled={thirdPartyAdsDisabled}
                isInViewportCallback={this.setVisibleCallback}
              />
            }
            {isValidObject(content.nextItem) && (
              <VisibilitySensor
                onChange={this.onNextItemVisibilityChange}
                offset={{ bottom: -innerHeight }}
                partialVisibility
                scrollCheck
                intervalCheck={false}
                scrollThrottle={VISIBILITY_SENSOR_SCROLL_THROTTLE}
              >
                <div className={isTelevisaSite
                  ? Styles.moreContentTelevisa : Styles.moreContent}
                >
                  <p>{localization.get('moreContentOfInterest')}</p>
                </div>
              </VisibilitySensor>
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
    const { theme } = this.props;
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

/**
 * Connector to map requestParams and theme to ListItem component
 * @param {Object} state of the app
 * @returns {Object}
 */
export const mapStateToProps = state => ({
  theme: themeSelector(state),
});

const actionCreators = {
  fetchReactionsAction: fetchReactions,
};

export default connect(mapStateToProps, actionCreators)(ListItem);
