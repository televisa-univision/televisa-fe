import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import classnames from 'classnames';
import {
  getKey,
  hasKey,
  isBreakingNews,
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import createTimer from '@univision/fe-commons/dist/utils/timer';
import { asDeferrer } from '@univision/fe-commons/dist/utils/deferrer';
import Link from '../Link';
import Styles from './NotificationBanner.scss';
import config from './configs';

/**
 * NotificationBanner Component
 */
@asDeferrer
class NotificationBanner extends Component {
  /**
   * Setup the state
   */
  state = {
    activeItem: 0,
    maxItemHeight: 0,
  };

  /**
   * constructor
   */
  constructor() {
    super();
    this.debounceSetMaxItemHeight = debounce(this.setMaxItemHeight, 100).bind(this);
    this.notificationList = React.createRef();
  }

  /**
   * Call initTimer if there are multiple items
   */
  componentDidMount() {
    const { content } = this.props;
    if (content && content.length > 1) {
      this.defer(() => {
        this.setMaxItemHeight();
      });
      this.initTimer();
    }
    window.addEventListener('resize', this.debounceSetMaxItemHeight);
  }

  /**
   * Cleanup event listeners
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceSetMaxItemHeight);
    if (this.timer) {
      this.timer.cancel();
    }
  }

  /**
   * Callback when interval is completed
   */
  onIntervalEnd = () => {
    const {
      props: {
        content,
      },
      state: {
        activeItem: currentActive,
      },
    } = this;
    const isLastActiveItem = currentActive === content.length - 1;

    this.setState(({ activeItem }) => ({
      activeItem: !isLastActiveItem ? activeItem + 1 : 0,
    }));
  };

  /**
   * Set max height depending of the highest item into the list
   */
  setMaxItemHeight = () => {
    const list = this.notificationList.current;
    const childNodes = list && list.childNodes;
    if (!isValidObject(childNodes)) {
      return;
    }
    const heights = Object.values(childNodes).map((el) => {
      return el.clientHeight;
    });
    const maxHeight = Math.max.apply(null, heights);
    this.setState({ maxItemHeight: maxHeight });
  };

  /**
   * Setup a timer
   */
  initTimer = () => {
    const { settings } = config;
    this.timer = createTimer(settings.duration, this.onIntervalEnd);
  };

  /**
   * Render multiple item
   * @param {Object} items content to be rendered
   * @returns {JSX}
   */
  renderMultitpleItems = (items) => {
    const { activeItem, maxItemHeight } = this.state;
    const { settings } = config;
    return (
      <div className={Styles.wrapper}>
        <ul
          className={Styles.multipleItems}
          ref={this.notificationList}
          style={{ height: maxItemHeight }}
        >
          {items.map((item, i) => {
            if (i <= settings.maxItems - 1) {
              return (
                <li
                  className={activeItem === i ? Styles.activeItem : ''}
                  key={getKey(item, 'uid', '')}
                >
                  {this.renderSingleItem(item)}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  };

  /**
   * Render single item
   * @param {Object} item content to be rendered
   * @returns {JSX}
   */
  renderSingleItem = (item) => {
    const contentLink = getKey(item, 'uri', '');
    if (item && item.title) {
      return (
        <Link href={contentLink}>
          <span className={Styles.text}>{item.title}</span>
        </Link>
      );
    }
    return null;
  };

  /**
   * Render items method
   * @param {Object} items content to be rendered
   * @returns {JSX}
   */
  renderItems = (items) => {
    if (items && items.length > 1) {
      return this.renderMultitpleItems(items);
    }
    return this.renderSingleItem(items[0]);
  };

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const { content, settings, theme } = this.props;
    const hasContent = Array.isArray(content) && content.length > 0;
    const breakingNews = hasContent && isBreakingNews(content[0]);
    const titleLink = getKey(settings, 'titleLink', { href: '' });
    let titleStyle = {};
    if (!breakingNews && hasKey(theme, 'primary')) {
      // don't apply theme if `breakng news`
      titleStyle = { backgroundColor: theme.primary };
    }
    return (
      <div
        className={classnames('uvs-widget-lead', Styles.notificationBanner, {
          [Styles.breakingNews]: breakingNews,
        })}
      >
        {hasContent && (
          <div className={`row ${Styles.notification}`}>
            <div className={`col ${Styles.content}`}>
              <div className={`uvs-font-a-bold ${Styles.title}`} style={titleStyle}>
                <Link {...titleLink}>{getKey(settings, 'title', '')}</Link>
              </div>
              <div className={Styles.copy}>{this.renderItems(content)}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

/**
 * propTypes
 * @property {array} content Array of content items to be used by this widget
 * @property {object} settings for topic bar to be used by this widget
 * @property {object} theme for custom styling
 */
NotificationBanner.propTypes = {
  content: PropTypes.array.isRequired,
  settings: PropTypes.object,
  theme: PropTypes.object,
};

export default NotificationBanner;
