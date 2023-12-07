import React, { useEffect, Fragment } from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import { getKey, toRelativeUrl } from '@univision/fe-commons/dist/utils/helpers';
import Title from '@univision/fe-components-base/dist/components/Title';
import Header from '@univision/fe-components-base/dist/components/Header';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';
import ThemeProvider from '@univision/fe-commons/dist/components/ThemeProvider';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import ScrollTracker from '@univision/fe-commons/dist/components/tracking/ScrollTracker';
import { onMilestone } from '@univision/fe-commons/dist/utils/tracking/tealium/section/SectionTracker';
import { getPageData, getPageCategory, getPageUrl } from '@univision/fe-commons/dist/store/storeHelpers';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import { currentMarketUriSelector } from '@univision/fe-commons/dist/store/selectors/local-selectors';
import OpeningWeatherForecastPlaceholder from '@univision/fe-components-base/dist/components/Placeholder/OpeningWeatherForecast';

import userTiming from '@univision/fe-commons/dist/utils/performance/userTiming';
import { SECTION_RENDERED } from '@univision/fe-commons/dist/utils/performance/userTiming/marks';
import features from '@univision/fe-commons/dist/config/features';

import MainWrapper from '../../layout/MainWrapper';
import Refreshable from './Refreshable';
import isRefreshable from './refreshableHelper';

import Styles from './Section.scss';

/**
 * Section component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const Section = ({ widgets }) => {
  useEffect(() => {
    userTiming(SECTION_RENDERED).finish();
  }, []);

  const pageData = getPageData(Store);
  const primaryTopic = getKey(pageData, 'data.primaryTopic');
  const title = getKey(pageData, 'data.title');
  const pageCategory = getPageCategory(Store);
  const dark = features.shows.showsRedesign() && Styles.dark;
  const shouldUseRefreshable = features.section.refreshable() && isRefreshable();
  const localMarketUri = toRelativeUrl(currentMarketUriSelector(Store.getState()));
  const currentPage = getPageUrl(Store);
  const isLocalPage = `${localMarketUri}/tiempo` === currentPage;
  let OpeningWidgetController = null;

  if (isLocalPage) {
    OpeningWidgetController = Loadable({
      loader: () => import(/* webpackChunkName: "localMarketsWidgets" */ '@univision/fe-local/dist/components/connected/OpeningWeatherForecast'),
      loading: OpeningWeatherForecastPlaceholder,
    });
  }

  return (
    <Provider store={Store}>
      <ThemeProvider pageCategory={pageCategory}>
        <div className={dark}>
          <MainWrapper state={Store.getState()}>
            <Header pageData={pageData.data} pageCategory={pageCategory} />
            {!!primaryTopic && (
              <Title hidden element="h1">
                {primaryTopic}
              </Title>
            )}
            {!!title && primaryTopic !== title && (
              <Title hidden element="h2">
                {title}
              </Title>
            )}
            <ScrollTracker onMilestone={onMilestone}>
              <div className="uvs-container">
                <div className={Styles['section-page']}>
                  <Fragment>
                    {isLocalPage && <OpeningWidgetController />}
                    {shouldUseRefreshable ? <Refreshable widgets={widgets} /> : widgets}
                  </Fragment>
                </div>
              </div>
            </ScrollTracker>
            {adHelper.getAd(AdTypes.YIELDMO_FOOTER_AD, { isLazyLoaded: false })}
            <div className="newsletterContainerSection" />
            <Footer />
          </MainWrapper>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

/**
 * propTypes
 * @property {Array} widgets - React widgets to be rendered in the page
 */
Section.propTypes = {
  widgets: PropTypes.array.isRequired,
};

export default Section;
