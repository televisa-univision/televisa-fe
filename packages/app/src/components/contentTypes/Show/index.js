import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidNumber from '@univision/fe-utilities/helpers/common/isValidNumber';
import toDeburr from '@univision/fe-utilities/helpers/string/toDeburr';
import localization from '@univision/fe-utilities/localization';
import Title from '@univision/fe-components-base/dist/components/Title';
import features from '@univision/fe-commons/dist/config/features';
import defaultTab from '@univision/fe-commons/dist/config/data/shows/defaultTab.json';
import Tabs from '@univision/fe-components-base/dist/components/widgets/Tabs';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import ScrollTracker from '@univision/fe-commons/dist/components/tracking/ScrollTracker';
import { onMilestone } from '@univision/fe-commons/dist/utils/tracking/tealium/section/SectionTracker';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import { globalWidgetSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import SectionAdInjector from '@univision/fe-commons/dist/utils/ads/Section/sectionAdInjector';
import WidgetsFactory from '../../../utils/factories/widgetsFactory';
import Styles from './Show.styles';
import ConnectedGlobalWidget from '../../base/GlobalWidget';

export const ShowBackground = styled.div`${Styles.showBackground}`;

/**
 * Show component
 * @param {Object} pageData Page data
 * @returns {JSX}
 */
function Show({ pageData }) {
  /**
   * Component Properties
   * @param {Object} props component properties
   */
  const {
    data,
  } = pageData;
  const {
    primaryTopic,
    title,
  } = data;
  const pageDataToInjectAds = {
    ...pageData,
    data: {
      ...pageData.data,
      widgets: data.widgets,
    },
  };

  const originalTitle = title;
  // eslint-disable-next-line react/prop-types
  const primaryTag = data?.primaryTag?.name;
  const AdInjector = new SectionAdInjector(pageData);
  const widgetsDataWithAds = AdInjector.getWidgetsWithAds();
  pageDataToInjectAds.data.widgets = widgetsDataWithAds;
  const SectionWidgetsFactory = new WidgetsFactory(pageDataToInjectAds);
  const parsedWidgets = SectionWidgetsFactory.parseWidgets();
  const StaticSectionWidgetsFactory = new WidgetsFactory(pageData, 'staticWidgets');
  const parsedStaticWidgets = StaticSectionWidgetsFactory.parseWidgets();

  let mainTabTitle = localization.get('videos');
  const isLatinGrammy = primaryTag === 'latin grammy';
  const tabIndex = defaultTab[primaryTag];
  let startTab = isValidNumber(tabIndex) ? tabIndex : 1;
  if (features.header.activeTab()) {
    startTab = parseInt(features.header.activeTab(), 10);
  }
  const contents = getKey(pageData, 'data.staticWidgets.0.contents', []);
  const hasLongform = contents.some(item => getKey(item, 'longform'));
  if (hasLongform) {
    if (!isValidNumber(tabIndex)) {
      startTab = (contents.length > 5) ? 0 : 1;
    }
    mainTabTitle = localization.get('fullEpisodes');
  }

  /**
   * State management
   */
  const [tabVariant, setVariant] = useState(startTab === 0 || features.shows.showsRedesign()
    ? 'dark'
    : 'light');
  const [currentTab, setCurrentTab] = useState(startTab);
  const [currentTitle, setCurrentTitle] = useState(`${title} - ${startTab === 0
    ? mainTabTitle
    : localization.get('newsAndMore')}`);

  /**
   * Set title for track
   * @param {bool} isMainTab is main tab on
   */
  const setTitle = (isMainTab) => {
    const newTitle = toDeburr(`${originalTitle} - ${isMainTab ? mainTabTitle : localization.get('newsAndMore')}`,
      { lowercase: true });
    setCurrentTitle(newTitle);
    Tracker.fireEvent({ event: 'view_screen', title: newTitle });
  };

  /**
   * Switch theme colors on tab change
   * @param {number} index Current tab
   */
  const onTabChange = (index) => {
    const isMainTab = index === 0;

    // Use correct values based on tab index
    setVariant(isMainTab || features.shows.showsRedesign() ? 'dark' : 'light');
    setCurrentTab(index);

    setTitle(isMainTab);
  };

  /**
   * Render
   * @returns {JSX}
   */
  return (
    <ShowBackground tabVariant={tabVariant}>
      <ConnectedGlobalWidget />
      {!!primaryTopic && (
        <Title hidden element="h1">
          {primaryTopic}
        </Title>
      )}
      {!!currentTitle && primaryTopic !== currentTitle && (
        <Title hidden element="h1">
          {currentTitle}
        </Title>
      )}
      <ScrollTracker onMilestone={onMilestone} scrollKey={currentTab.toString()}>
        <div className="uvs-container">
          <div className={Styles['show-page']}>
            <Tabs
              onTabChange={onTabChange}
              startTab={startTab}
              hideFirstTab={isLatinGrammy}
              hasGlobalWidget={isValidArray(globalWidgetSelector({ page: pageData }))}
            >
              <div label={mainTabTitle}>
                {parsedStaticWidgets}
              </div>
              <div label={localization.get('newsAndMore')}>
                {parsedWidgets}
              </div>
            </Tabs>
          </div>
        </div>
      </ScrollTracker>
      {adHelper.getAd(AdTypes.YIELDMO_FOOTER_AD, { isLazyLoaded: false })}
    </ShowBackground>
  );
}

Show.propTypes = {
  pageData: PropTypes.shape({
    data: PropTypes.shape({
      widgets: PropTypes.array,
      primaryTopic: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
};

export default Show;
