import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import * as AdActions from '@univision/fe-commons/dist/store/actions/ads-actions';
import { getPageData, isTopAdInserted } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import {
  hasKey,
  truncateString,
} from '@univision/fe-commons/dist/utils/helpers';
import ResponsiveLoader from '@univision/fe-commons/dist/components/breakpoint/ResponsiveLoader';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import features from '@univision/fe-commons/dist/config/features';
import Title from '../../Title';
import * as sizes from '../../Picture/imageSizes';
import ContentCard from '../../ContentCard';
import TopicBar from '../../TopicBar';

import Styles from './ContentCardGrid.scss';

/**
 * Widget with five ContentCards.
 * @constructor
 */
class ContentCardGrid extends Component {
  /**
   * Constructor
   * @param {Object} props the component props
   */
  constructor(props) {
    super(props);
    this.isShow = features.shows.showsRedesign();
    this.variant = this.isShow ? 'dark' : 'light';
    const maxCardCount = 5;
    if (Array.isArray(props.content) && props.content.length) {
      this.cards = props.content.slice(0, maxCardCount);
    }
    this.topAdInserted = isTopAdInserted(Store);
  }

  getMobileStructure = () => this.cards.map((card, idx) => {
    const { device, mobileAsTabletView, withAd } = this.props;
    const withAdSettings = withAd && !this.topAdInserted && device === 'mobile';

    if (withAdSettings) {
      Store.dispatch(AdActions.insertTopAd());
    }

    // 0 = false so the first card gets the vertical layout and an ad.
    const child = idx ? (
      this.renderCard(idx, card, 'horizontal', 'mobile')
    ) : (
      <Fragment>
        {this.renderCard(idx, card, 'vertical', 'mobile', false, true)}
        {withAdSettings && (
        <div className={Styles.adCardMobile}>
          <ResponsiveLoader key="ad" breakpoints={['xxs', 'xs', 'sm']}>
            {adHelper.getAd(AdTypes.TOP_AD, { isLazyLoaded: false })}
          </ResponsiveLoader>
        </div>
        )}
      </Fragment>
    );

    if (mobileAsTabletView) {
      return (
        <div
          key={card.uid}
          className={classnames(Styles.card, {
            [Styles.colMobile]: idx,
            'col-xs-6': idx,
            'col-xs-12': !idx,
            [Styles.withAd]: !idx && withAdSettings,
          })}
        >
          {this.renderCard(idx, card, 'vertical', 'mobile', false, !idx)}
          {withAdSettings && !idx && (
            <div className={Styles.adCardMobile}>
              <ResponsiveLoader key="ad" breakpoints={['xxs', 'xs', 'sm']}>
                {adHelper.getAd(AdTypes.TOP_AD, { isLazyLoaded: false })}
              </ResponsiveLoader>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={card.uid}
        className={classnames(Styles.card, 'col-xs-12', {
          [Styles.withAd]: !idx && withAdSettings,
        })}
      >
        {child}
      </div>
    );
  });

  getTabletStructure = () => this.cards.map((card, idx) => (
    <div
      key={card.uid}
      className={classnames(Styles.card, {
        'col-sm-6': idx,
        'col-sm-12': !idx,
      })}
    >
      {this.renderCard(idx, card, 'vertical', 'tablet', false, !idx)}
    </div>
  ))

  getDesktopStructure = () => {
    const device = 'desktop';
    const { leadAlignment } = this.props;
    const leadCard = {
      ...this.cards[0],
      deviceSizeOverrides: {
        xl: sizes.MEDIUM,
        lg: sizes.MEDIUM,
        md: sizes.MEDIUM,
        sm: sizes.X_SMALL,
        xsm: sizes.X_SMALL,
      },
    };

    const secondaryCards = this.cards.slice(1);
    const colCardLimit = 2;
    const firstCol = [];
    const secondCol = [];
    secondaryCards.forEach(
      card => (firstCol.length < colCardLimit ? firstCol.push(card) : secondCol.push(card))
    );

    if (leadAlignment === 'left') {
      return (
        <Fragment>
          <div className={classnames(Styles.desktopColumn, 'col-md-6')}>
            {this.renderCard(0, leadCard, 'vertical', device, true, true)}
          </div>
          <div className={classnames(Styles.desktopColumn, Styles.grid, 'col-md-6')}>
            {secondaryCards.map((card, idx) => (
              <div key={card.uid} className="col-md-6">
                {this.renderCard(idx, card, 'vertical', device)}
              </div>
            ))}
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <div className={classnames(Styles.desktopColumn, 'col-md-3')}>
          {firstCol.map((card, idx) => this.renderCard(idx, card, 'vertical', device))}
        </div>
        <div className={classnames(Styles.desktopColumn, 'col-md-6')}>
          {this.renderCard(0, leadCard, 'vertical', device, false, true)}
        </div>
        <div className={classnames(Styles.desktopColumn, 'col-md-3')}>
          {secondCol.map((card, idx) => this.renderCard(idx, card, 'vertical', device))}
        </div>
      </Fragment>
    );
  };

  /**
   * renderCard
   * @param   {number} index the card content index
   * @param   {Object} content the card content
   * @param   {string} view the card view prop
   * @param   {string} deviceView the device view is built for
   * @param   {boolean} showDesc whether to show the description
   * @param   {boolean} isMain whether it is the main content card
   * @returns {jsx} the card
   */
  renderCard = (index, content, view, deviceView, showDesc, isMain) => {
    // Style for label
    const { theme, device } = this.props;

    return (
      /* eslint-disable react/destructuring-assignment */
      <ContentCard
        {...content}
        adType={AdTypes.TRIPLELIFT_NATIVE_AD}
        description={truncateString(content.description)}
        device={device}
        isMain={isMain}
        key={content.uid}
        onClick={this.props.onClick}
        showDesc={showDesc}
        showPlayer={isMain && content.type === 'video' && this.props.leadAlignment === 'left' && !content.longform}
        view={view}
        widgetContext={this.props.widgetContext}
        theme={theme}
        variant={this.variant}
      />
    );
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const {
      settings, theme, overlay, className, widgetContext,
    } = this.props;

    const pageData = getPageData(Store);
    const hasTitle = hasKey(settings, 'title');
    const primaryTag = hasKey(pageData, 'data.primaryTag.name') && pageData.data.primaryTag.name;
    if (this.cards) {
      return (
        <div className={classnames(
          className || '',
          { [Styles.dark]: this.isShow },
          'uvs-widget',
          Styles.container
        )}
        >
          {hasTitle ? (
            <TopicBar
              settings={settings}
              separator="top"
              theme={theme}
              widgetContext={widgetContext}
              variant={this.variant}
            />
          ) : (
            primaryTag && (
            <Title hidden element="h2">{`${localization.get('newsFrom')} ${primaryTag}`}</Title>
            )
          )}
          <div className={classnames(Styles.mobile, 'row')}>{this.getMobileStructure()}</div>
          <div className={classnames(Styles.tablet, 'row')}>{this.getTabletStructure()}</div>
          <div className={classnames(Styles.desktop, 'row')}>{this.getDesktopStructure()}</div>
          {overlay}
        </div>
      );
    }

    return null;
  }
}

/**
 * propTypes
 * @property {Array} content Array of content items to be used by this widget
 * @property {Object} settings Object with this widget's settings
 * @property {String} device the users device
 * @property {Object} theme the vertical theme
 * @property {Element} overlay react element
 * @property {Boolean} mobileAsTabletView show mobile as tablet view
 */
ContentCardGrid.propTypes = {
  withAd: PropTypes.bool,
  content: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  leadAlignment: PropTypes.oneOf(['center', 'left']),
  device: PropTypes.oneOf(['desktop', 'tablet', 'mobile']).isRequired,
  theme: PropTypes.object.isRequired,
  className: PropTypes.string,
  overlay: PropTypes.element,
  widgetContext: PropTypes.object,
  mobileAsTabletView: PropTypes.bool,
  onClick: PropTypes.func,
};

ContentCardGrid.defaultProps = {
  leadAlignment: 'center',
  widgetContext: {},
  withAd: true,
};

export default ContentCardGrid;
