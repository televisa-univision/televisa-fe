import React from 'react';
import PropTypes from 'prop-types';

import ContentCard from '@univision/fe-components-base/dist/components/ContentCard';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import Store from '@univision/fe-commons/dist/store/store';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import comScoreManager from '@univision/fe-commons/dist/utils/tracking/comScore/comScoreManager';
import {
  getDevice,
  getPageData,
  getTheme,
} from '@univision/fe-commons/dist/store/storeHelpers';
import { isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';
import fetchContent from '@univision/fe-commons/dist/utils/api/content/fetch';
import Loading from '@univision/fe-components-base/dist/components/Loading';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import Styles from './LongformVideoList.scss';

/**
 * [LongformList component]
 * @param {Array} content The first number.
 * @extends React
 */
class LongFormVideoList extends React.Component {
  /**
   * contrusctor
   * @param {Object} props component props
   */
  constructor(props) {
    super(props);
    this.device = getDevice(Store);
    const { content } = this.props;
    this.content = content || [];
    this.limit = 20;
    this.more = 20;
    this.offset = 0;
    this.state = {
      endContainer: false,
      isFetching: false,
      label: '',
    };
  }

  /**
   * Call for initialize the state of the boton
   */
  componentDidMount() {
    this.switchButton(this.content);
  }

  loadMore = async () => {
    const { isFetching } = this.state;
    if (isFetching) {
      return;
    }
    const pageData = getPageData(Store);
    this.setIsLoading();
    this.trackClick();
    this.offset = this.offset + this.more;
    const url = getKey(pageData, 'data.show.uri', '');
    if (url === '') {
      this.setErrorApp();
      return;
    }
    try {
      const result = await fetchContent(url, 'content', { offset: this.offset, limit: this.limit });
      const { staticWidgets } = result;
      const newContent = getKey(staticWidgets, '0.contents', []);
      if (!isValidArray(newContent)) {
        this.setEndVideos();
        return;
      }
      comScoreManager.beacon();
      this.content = this.content.concat(newContent);
      this.switchButton(newContent);
    } catch (e) {
      this.setErrorApp();
    }
  }

  setInitialState = () => {
    this.setState({
      isFetching: false,
      label: localization.get('loadMoreContents'),
    });
  }

  setIsLoading = () => {
    this.setState({
      isFetching: true,
      label: localization.get('loading'),
    });
  }

  setEndVideos = () => {
    this.setState({
      endContainer: true,
      isFetching: false,
      label: localization.get('endVideos'),
    });
  }

  setErrorApp = () => {
    this.setState({
      isFetching: false,
      label: localization.get('errorApp'),
    });
  }

  switchButton = (content) => {
    if (isValidArray(content) && content.length < this.limit) {
      this.setEndVideos();
    } else {
      this.setInitialState();
    }
  }

  /**
   * Triggers tracking event for clicks
   */
  trackClick() {
    const { widgetContext } = this.props;
    WidgetTracker.track(WidgetTracker.events.click, {
      widgetContext,
      target: 'ver_mas',
    });
  }

  /**
   * Render content cards
   * @returns {JSX}
   */
  renderCards() {
    const { widgetContext } = this.props;
    if (!isValidArray(this.content)) return null;
    const contentCards = this.content.map((item) => {
      return (
        <div
          key={item.uid}
          className={`col-sm-6 col-md-3 ${Styles.cardWrapper}`}
        >
          <ContentCard
            {...item}
            device={this.device}
            image={item.image}
            primaryTag={item.primaryTag}
            showIcon
            showAuthor={false}
            showTag={false}
            longformPlayList
            showBtnLongform
            title={item.title}
            variant="dark"
            view={this.device === 'mobile' ? 'horizontal' : 'vertical'}
            type="video"
            widgetContext={widgetContext}
            smallCard={this.device === 'mobile'}
          />
        </div>
      );
    });
    return contentCards;
  }

  /**
   * Load more items into the list
   * @returns {JSX}
   */
  renderLoadMoreButton() {
    const { endContainer, isFetching, label } = this.state;
    const styles = endContainer && Styles.endVideos;
    const icon = !endContainer && 'arrowDownLegacy';
    return (
      <div className={Styles.buttonContainer}>
        <Clickable
          appearance="primary"
          icon={icon}
          label={label}
          className={`${styles} col-sm-6 col-md-6}`}
          onClick={!isFetching && this.loadMore}
          theme="dark"
          disabled={endContainer}
        />
      </div>
    );
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const { isFetching } = this.state;
    const loading = isFetching && <Loading theme={getTheme(Store)} />;
    return (
      <div className={Styles.contentWrapper}>
        <div className={Styles.selectorWrapper} />
        <div className={`row ${Styles.cardsWrapper}`}>
          {this.renderCards()}
          {loading}
        </div>
        <div className={Styles.loadMoreWrapper}>
          {this.renderLoadMoreButton()}
        </div>
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Array} content items to render
 * @property {Object} widgetContext context of current widget
 */
LongFormVideoList.propTypes = {
  content: PropTypes.array,
  widgetContext: PropTypes.object,
};

/**
 * Default Prop Values
 */
ContentCard.defaultProps = {
  content: [],
};

export default LongFormVideoList;
