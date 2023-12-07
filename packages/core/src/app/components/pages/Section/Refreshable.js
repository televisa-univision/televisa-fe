import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import RefreshButton from '@univision/fe-components-base/dist/components/RefreshButton';
import { OpeningPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';
import {
  isEqual,
  pickObject,
  isValidArray,
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import fetch from '@univision/fe-commons/dist/utils/api/content/fetch';
import Store from '@univision/fe-commons/dist/store/store';
import Icon from '@univision/fe-icons/dist/components/Icon';
import {
  pageUriSelector,
  themeSelector,
} from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { parseWidgetsWithAds } from 'app/utils/factories/widgetFactory';
import { getTimestamp } from '@univision/fe-commons/dist/utils/datetime';
import features from '@univision/fe-commons/dist/config/features';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import userTiming from '@univision/fe-commons/dist/utils/performance/userTiming';
import { WIDGETS_RENDERED } from '@univision/fe-commons/dist/utils/performance/userTiming/marks';

import isRefreshable from './refreshableHelper';
import Styles from './Refreshable.scss';

/**
 * Component to allow user to refresh the content if CMS data changed
 * using a cache buster param and only if window is active
 * and feature enabled
 * @returns {JSX}
 */
class Refreshable extends React.PureComponent {
  /**
   * Helper to compare with Store widgets
   * @param {array} oldWidgets - Widgets from previous fetch api
   * @param {array} newWidgets - Widgets from api
   * @returns {boolean}
   */
  static isEqualWidgets(oldWidgets, newWidgets) {
    const keepKey = ['type', 'id', 'uid', 'uuid']; // I know, we like different names for the ID's :D
    const cleanOldWidgets = pickObject(oldWidgets, keepKey);
    const cleanNewWidgets = pickObject(newWidgets, keepKey);

    return isEqual(cleanOldWidgets, cleanNewWidgets);
  }

  /**
   * Component constructor
   * @param {Object} props - Component properties
   */
  constructor(props) {
    super(props);

    const state = Store.getState();
    this.pageUri = pageUriSelector(state);
    this.pageTheme = themeSelector(state);

    this.fetchData = this.fetchData.bind(this);
    this.fetchWithClick = this.fetchWithClick.bind(this);

    this.interval = 30; // 30 seconds
    this.currentData = null;
    this.state = {
      displayButton: false,
      displayWidgets: true,
      widgets: [...props.widgets],
    };
  }

  /**
   * Using didMount for initial personalization
   */
  componentDidMount() {
    userTiming(WIDGETS_RENDERED).finish();
    if (features.section.refreshable() && isRefreshable()) {
      this.refreshInterval = setInterval(this.fetchData, 1000 * this.interval);
    }
  }

  /**
   * Hook to allow personalization after verifying if profile change
   * @param {Object} prevProps - Preview props
   */
  componentDidUpdate(prevProps) {
    const { widgets } = this.props;
    if (!isEqual(prevProps.widgets, widgets)) {
      this.setParticularState({
        displayButton: false,
        widgets: [...widgets],
      });
    }
  }

  /**
   * Clean up the timer on unmount
   */
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  /**
   * Helper to set particular state
   * @param {Object} newState - Specific state to set
   */
  setParticularState(newState) {
    this.setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  }

  /**
   * Helper to fetch cms api and get new content
   * with flag to set data or just shoul button
   * @param {boolean} setData - Flag to use the fetch only for new content verification
   */
  fetchData(setData = false) {
    const { displayButton } = this.state;
    // fetch only if window / tab is active
    // and user triger the event or fetch button is hidden (to verify new content)
    if ((typeof document.visibilityState === 'undefined' || document.visibilityState === 'visible') && (setData || !displayButton)) {
      if (setData) {
        this.setParticularState({
          displayWidgets: false,
        });
      }
      fetch(this.pageUri, 'content', {
        // Adding catch buster paramenter to get fresh data based on time
        // to avoid origin saturation
        mrpts: getTimestamp(
          {
            secondsInterval: this.interval,
          },
          false
        ),
      }).then((data) => {
        this.afterFetchingData(setData, data);
      }).catch(() => {
        this.setParticularState({
          displayButton: false,
          displayWidgets: true,
        });
      });
    }
  }

  /**
   * Click callback handler
   * @returns {Object}
   */
  fetchWithClick() {
    WidgetTracker.track(WidgetTracker.events.engagement, { target: 'Refreshbutton-click' });
    if (features.section.hardRefresh()) {
      window.location.reload(true);
      return false;
    }
    return this.fetchData(true);
  }

  /**
   * Executed after fetching data
   * @param {boolean} setData - Flag to render or not new data
   * @param {Object} data - Data from API
   */
  afterFetchingData(setData, data) {
    if (setData) {
      this.setState({
        displayButton: false,
        displayWidgets: true,
        widgets: parseWidgetsWithAds(data),
      });
      // Scrolling up
      global.window.scrollTo(0, 0);
      WidgetTracker.track(WidgetTracker.events.engagement, { target: 'Refreshbutton-fetched' });
    } else if (!isValidObject(this.currentData)) {
      // get initial data on client side fetch and
      // not from store due the request is cached on the serves
      this.currentData = data;
    } else if (!this.constructor.isEqualWidgets(this.currentData.widgets, data.widgets)) {
      WidgetTracker.track(WidgetTracker.events.engagement, { target: 'Refreshbutton-new' });
      this.currentData = data;
      this.setParticularState({
        displayButton: true,
      });
    }
  }

  /**
   * Main render function
   * @returns {JSX}
   */
  render() {
    const { displayButton, displayWidgets, widgets } = this.state;
    const { displayRefreshButton } = this.props;
    return (
      <Fragment>
        {isValidArray(widgets) && displayWidgets && widgets}
        {!displayWidgets
          && [...Array(3).keys()].map(number => <OpeningPlaceholder key={number.toString()} />)
        }
        {(displayRefreshButton || displayButton) && (
          <RefreshButton
            onClick={this.fetchWithClick}
            theme={this.pageTheme}
            className={Styles.button}
          >
            <Icon name="refresh" size="small" fill="#ffffff" className={Styles.refresh} />
            <span className="uvs-font-a-bold">{localization.get('newContent')}</span>
          </RefreshButton>
        )}
      </Fragment>
    );
  }
}

/**
 * PropTypes
 * @property {array} widgets - List of default widgets
 * @property {string} fetchUrl - Url to be used
 * @property {function} afterFetch - After fetch callback
 * @property {boolean} displayRefreshIcon - Display button flag for visual test purpose
 */
Refreshable.propTypes = {
  widgets: PropTypes.array,
  displayRefreshButton: PropTypes.bool,
};

Refreshable.defaultProps = {
  displayRefreshButton: false,
};

export default Refreshable;
