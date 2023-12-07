import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';

import Store from '@univision/fe-commons/dist/store/store';
import {
  getKey,
  isValidArray,
  isValidNumber,
  deburrToLowerCase,
} from '@univision/fe-commons/dist/utils/helpers';
import { getPageData, getPageCategory } from '@univision/fe-commons/dist/store/storeHelpers';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import Title from '@univision/fe-components-base/dist/components/Title';
import ShowHeader from '@univision/fe-components-base/dist/components/Header/Shows/ShowHeader';
import features from '@univision/fe-commons/dist/config/features';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import defaultTab from '@univision/fe-commons/dist/config/data/shows/defaultTab.json';
import Tabs from '@univision/fe-components-base/dist/components/widgets/Tabs';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import ScrollTracker from '@univision/fe-commons/dist/components/tracking/ScrollTracker';
import { onMilestone } from '@univision/fe-commons/dist/utils/tracking/tealium/section/SectionTracker';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import { globalWidgetSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import MainWrapper from '../../layout/MainWrapper';
import Styles from './Show.scss';

/**
 * Show component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
class Show extends React.Component {
  /**
   * Component Properties
   * @param {Object} props component properties
   */
  constructor(props) {
    super(props);
    this.mainTabTitle = localization.get('videos');
    this.pageData = getPageData(Store) || {};
    this.primaryTopic = getKey(this.pageData, 'data.primaryTopic');
    this.title = getKey(this.pageData, 'data.title', '');
    this.theme = this.pageData.theme;
    const primaryTag = getKey(this.pageData, 'data.primaryTag.name');
    this.isLatinGrammy = primaryTag === 'latin grammy';
    const tabIndex = defaultTab[primaryTag];
    this.startTab = isValidNumber(tabIndex) ? tabIndex : 1;
    if (features.header.activeTab()) {
      this.startTab = parseInt(features.header.activeTab(), 10);
    }

    this.state = {
      tabVariant: this.startTab === 0 || features.shows.showsRedesign() ? 'dark' : 'light',
      currentTab: this.startTab,
    };

    const contents = getKey(this.pageData, 'data.staticWidgets.0.contents', []);
    const hasLongform = contents.some(item => getKey(item, 'longform'));
    if (hasLongform) {
      this.mainTabTitle = localization.get('fullEpisodes');
      if (!isValidNumber(tabIndex)) {
        this.startTab = (contents.length > 5) ? 0 : 1;
      }
    }
  }

  /**
  * Set title for track
  * @param {string} tabIndex component properties
  */
  setTitle(tabIndex) {
    const data = getKey(this.pageData, 'data', {});
    const title = `${this.title} - ${tabIndex ? this.mainTabTitle : localization.get('newsAndMore')}`;
    data.title = deburrToLowerCase(title);
    setPageData({ ...this.pageData, data });
    Tracker.fireEvent({ event: 'view_screen', title: data.title });
  }

  /**
   * Switch theme colors on tab change
   * @param {number} index Current tab
   */
  onTabChange = (index) => {
    const isMainTab = index === 0;

    // Use correct values based on tab index
    this.setState({
      tabVariant: isMainTab || features.shows.showsRedesign() ? 'dark' : 'light',
      currentTab: index,
    });
    this.setTitle(isMainTab);
  };

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const {
      title,
      pageData,
      primaryTopic,
      state: {
        tabVariant,
        currentTab,
      },
      props: {
        staticWidgets,
        widgets,
      },
    } = this;

    return (
      <Provider store={Store}>
        <div className={Styles[`showPage-${tabVariant}`]}>
          <MainWrapper state={Store.getState()}>
            <ShowHeader pageData={pageData} pageCategory={getPageCategory(Store)} />
            {!!primaryTopic && (
              <Title hidden element="h1">
                {primaryTopic}
              </Title>
            )}
            {!!title && primaryTopic !== title && (
              <Title hidden element="h1">
                {title}
              </Title>
            )}
            <ScrollTracker onMilestone={onMilestone} scrollKey={currentTab}>
              <div className="uvs-container">
                <div className={Styles['show-page']}>
                  <Tabs
                    onTabChange={this.onTabChange}
                    startTab={this.startTab}
                    hideFirstTab={this.isLatinGrammy}
                    hasGlobalWidget={isValidArray(globalWidgetSelector((Store.getState())))}
                  >
                    <div label={this.mainTabTitle}>
                      {staticWidgets}
                    </div>
                    <div label={localization.get('newsAndMore')}>
                      {widgets}
                    </div>
                  </Tabs>
                </div>
              </div>
            </ScrollTracker>
            {adHelper.getAd(AdTypes.YIELDMO_FOOTER_AD, { isLazyLoaded: false })}
            <Footer />
          </MainWrapper>
        </div>
      </Provider>
    );
  }
}

/**
 * propTypes
 * @property {Array} widgets - React widgets to be rendered in the page.
 */
Show.propTypes = {
  widgets: PropTypes.array.isRequired,
  staticWidgets: PropTypes.array,
};

export default Show;
