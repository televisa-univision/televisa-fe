import React from 'react';
import PropTypes from 'prop-types';

import ScrollTracker from '@univision/fe-commons/dist/components/tracking/ScrollTracker';
import { onMilestone } from '@univision/fe-commons/dist/utils/tracking/tealium/section/SectionTracker';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import SectionAdInjector from '@univision/fe-commons/dist/utils/ads/Section/sectionAdInjector';
import { radioPageSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import { YIELDMO_FOOTER_AD } from '@univision/fe-commons/dist/utils/ads/ad-types';
import addEPGBreakingNews from '@univision/fe-commons/dist/utils/helpers/epgChannel';

import ConnectedGlobalWidget from '../../base/GlobalWidget';
import OpeningWidgetWrapper from '../../base/OpeningWidgetWrapper';
import WidgetsFactory from '../../../utils/factories/widgetsFactory';
import ServerContent from './ServerContent';
import PageTitle from '../../base/PageTitle';

/**
 * Section component
 * @param {Object} props React Props for this component
 * @param {Object} props.pageData - pageData - Data coming from cms
 * @param {function} props.widgetsModifier - Function to manipulate widget list
 * @returns {JSX}
 */
const Section = ({ pageData, widgetsModifier }) => {
  if (!getKey(pageData, 'data.widgets')) {
    return null;
  }
  const { data } = pageData;
  const {
    seo,
    title,
    tvStation,
    uri,
  } = data;
  const pageDataToInjectAds = {
    ...pageData,
    data: {
      ...pageData.data,
      widgets: addEPGBreakingNews(data.widgets),
    },
  };

  const AdInjector = new SectionAdInjector(pageDataToInjectAds);
  const widgetsDataWithAds = AdInjector.getWidgetsWithAds();
  pageDataToInjectAds.data.widgets = widgetsDataWithAds;
  const SectionWidgetsFactory = new WidgetsFactory(pageDataToInjectAds);
  const parsedWidgets = SectionWidgetsFactory.parseWidgets();
  let widgets = parsedWidgets;
  if (isValidFunction(widgetsModifier)) {
    widgets = widgetsModifier(pageData, parsedWidgets);
  }

  return (
    <div>
      {
        /**
         * The SectionRadio component is showing the Global Widget before the NowPlaying component.
         */
        !radioPageSelector(pageData) && <ConnectedGlobalWidget />
      }
      <PageTitle
        tvStation={tvStation}
        seo={seo}
        title={title}
      />
      <ScrollTracker onMilestone={onMilestone}>
        <div className="uvs-container">
          <OpeningWidgetWrapper tvStation={tvStation} uri={uri} />
          {widgets}
        </div>
      </ScrollTracker>
      <ServerContent widgets={SectionWidgetsFactory.getLazyLoadedWidgets()} />
      {adHelper.getAd(YIELDMO_FOOTER_AD, { isLazyLoaded: false })}
      <div className="newsletterContainerSection" />
    </div>
  );
};

/**
 * propTypes
 * @property {Object} pageData - Data coming from cms
 */
Section.propTypes = {
  pageData: PropTypes.shape({
    data: PropTypes.shape({
      primaryTopic: PropTypes.string,
      seo: PropTypes.object,
      title: PropTypes.string,
      tvStation: PropTypes.object,
      type: PropTypes.string,
      uri: PropTypes.string,
      widgets: PropTypes.array,
    }),
    device: PropTypes.string,
    theme: PropTypes.object,
  }),
  widgetsModifier: PropTypes.func,
};

export default Section;
