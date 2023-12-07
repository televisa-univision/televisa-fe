import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';

import { getKey, loadExternalScript, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import { getBrandable, getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import credentials from './config/credentials.json';

/**
 * Wraps the logic required to render a The Weather Company (TWC) widget.
 */
export default class WxWidget extends React.Component {
  /**
   * Component constructor.
   * @param {Object} props Component props.
   */
  constructor(props) {
    super(props);
    this.onLoadEventName = 'wx-widgets-library-ready';
    this.scriptId = 'wx-widget-library';
    const marketCall = getKey(getBrandable(Store), 'tvStation.call', '');
    this.state = {
      latitude: getKey(marketCoordinates[marketCall], 'lat', ''),
      longitude: getKey(marketCoordinates[marketCall], 'long', ''),
      scriptLoaded: false,
    };

    this.notifyLibraryReady = this.notifyLibraryReady.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  /**
   * Fetches the user location to update the state and loads the TWC library.
   * The TWC library will be loaded exactly once, regardless how many WxWidgets are
   * present at the same time.
   */
  componentDidMount() {
    const {
      tracking,
    } = this.props;
    if (global.window.wxWidgets) {
      this.onLibraryLoaded();
    } else {
      loadExternalScript({
        id: this.scriptId,
        unique: true,
        src: `https://widgets.media.weather.com/wxwidget.loader.js?cid=${credentials.cid}`,
        onLoad: this.notifyLibraryReady,
      });
    }
    // Trigger the parsing whenever the library is loaded by this or another WxWidget.
    global.window.addEventListener('message', this.onMessage);
    if (tracking.onLoad) {
      WidgetTracker.track(WidgetTracker.events.engagement, {
        target: tracking.onLoad,
      });
    }
  }

  /**
   * The component should update the first time we load the external script.
   * @param {Object} nextProps - the new props data
   * @param {Object} nextState - the new state for this component
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const {
      scriptLoaded: wasLoaded,
    } = this.state;
    return nextState.scriptLoaded === true && !wasLoaded;
  }

  /**
   * Triggers the wx parsing when the component is updated.
   */
  componentDidUpdate() {
    const {
      scriptLoaded,
    } = this.state;

    const parse = getKey(this, 'lib.parse');
    if (scriptLoaded && isValidFunction(parse)) {
      parse();
    }
  }

  /**
   * Remove event listeners.
   */
  componentWillUnmount() {
    global.window.removeEventListener('message', this.onMessage);
  }

  /**
   * Trigger the parsing whenever the library is loaded by this or another WxWidget.
   * @param {Object} event Event.
   */
  onMessage(event) {
    if (event.data === this.onLoadEventName) {
      this.onLibraryLoaded();
    }
  }

  /**
   * Creates a reference to wxWidget library and updates the state to flag the library
   * as ready.
   */
  onLibraryLoaded() {
    this.lib = global.window.wxWidgets;
    this.setState({
      scriptLoaded: true,
    });
  }

  /**
   * Post a message to notify the library is ready. This message is processed by
   * the WxWidgets that are present in the page.
   */
  notifyLibraryReady() {
    global.window.postMessage(this.onLoadEventName, global.location.origin);
  }

  /**
   * Renders the TWC widget.
   * @returns {*}
   */
  render() {
    const {
      type,
      className,
      titleSettings,
      language,
      ...rest
    } = this.props;

    const {
      latitude,
      longitude,
      scriptLoaded,
    } = this.state;

    const geoLocation = {
      latitude,
      longitude,
    };

    return (
      <Fragment>
        {titleSettings && (
          <TopicBar
            settings={titleSettings}
            separator="top"
            align="left"
            theme={getTheme(Store)}
            titleTagElement="h2"
          />
        )}
        <div className={className}>
          {scriptLoaded && (
            <wx-widget
              type={type}
              language={language}
              {...geoLocation}
              {...rest}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

/**
 * Properties types.
 * @property {string} type              TWC widget type, defaults to "map".
 * @property {string} className         Custom css class name.
 * @property {Object} titleSettings     Title for the optional TopicBar.
 * @property {string} language          Language for the TWC Widget, defaults to "es".
 * @property {boolean} standalone       Whether to load the widget in an <iframe>
 * @property {boolean} enableTracking   Whether to track the widget
 */
WxWidget.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  titleSettings: PropTypes.shape({
    title: PropTypes.string,
  }),
  language: PropTypes.string,
  standalone: PropTypes.bool,
  tracking: PropTypes.shape({
    onLoad: PropTypes.string,
  }),
};

WxWidget.defaultProps = {
  type: 'map',
  language: 'es',
  standalone: true,
  tracking: {},
};
