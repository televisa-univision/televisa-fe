import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import LazyLoad from 'react-lazyload';
import Loadable from 'react-loadable';

import { hasKey, getKey } from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import ScrollTracker from '@univision/fe-commons/dist/components/tracking/ScrollTracker';
import { onMilestone } from '@univision/fe-commons/dist/utils/tracking/tealium/section/SectionTracker';
import {
  getTheme,
  getDevice,
  getPageData,
  getBrandable,
} from '@univision/fe-commons/dist/store/storeHelpers';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import {
  ContentPlaceholder,
} from '@univision/fe-components-base/dist/components/Placeholder';
import Header from '@univision/fe-components-base/dist/components/Header';
import Title from '@univision/fe-components-base/dist/components/Title';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import localization from '@univision/fe-local/dist/utils/localization';
import { getRadioStationProps } from '@univision/fe-local/dist/utils/helpers';
import NowPlaying from '@univision/fe-local/dist/components/connected/NowPlaying/NowPlaying';
import Footer from '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper';

import MainWrapper from '../../layout/MainWrapper';
import Styles from './SectionRadio.scss';

/**
 * Container component representing a Section page
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const SectionRadio = ({ widgets, store }) => {
  if (!store) {
    return null;
  }

  const brandable = getBrandable(Store);
  const state = store.getState();
  const theme = getTheme(store);
  const device = getDevice(store);
  const pageState = getPageData(store);
  const pageData = pageState.data || null;
  const defaultChartImage = getKey(brandable, 'image.renditions.original.href', null);

  const StationList = Loadable({
    loader: () => import(/* webpackChunkName: "radioStationList" */ '@univision/fe-local/dist/components/widgets/StationByGenreList/StationList'),
    loading: ContentPlaceholder,
  });

  return (
    <Provider store={Store}>
      <div>
        {pageData && (
          <div>
            <MainWrapper state={state}>
              <Header pageData={pageData} pageCategory={pageCategories.RADIO} />
              <Title hidden element="h1">
                {pageData.title}
              </Title>
              <ScrollTracker onMilestone={onMilestone}>
                <Fragment>
                  {hasKey(brandable, 'data.abacast.mp3Stream')
                    || hasKey(brandable, 'pageData.abacast.mp3Stream') && (
                      <NowPlaying
                        defaultChartImage={defaultChartImage}
                        device={device}
                        theme={theme}
                        {...getRadioStationProps(brandable.data)}
                      />
                    )}
                  <div className="uvs-container">
                    <div className="uvs-ad-full-width">
                      {adHelper.getAd(AdTypes.TOP_AD, { isLazyLoaded: false })}
                    </div>
                    <div className={Styles['section-page']}>
                      {adHelper.injectFullWidthAds({ widgets })}
                    </div>
                  </div>
                  {Array.isArray(getKey(brandable, 'relatedStations')) && (
                    <div className="uvs-container widget" data-position={widgets.length}>
                      <LazyLoad height={200} offset={400} once>
                        <div className="uvs-widget">
                          <TopicBar
                            settings={{ title: localization.get('relatedStations') }}
                            align="center"
                            separator="bottom"
                            theme={theme}
                          />
                          <StationList
                            key="StationList"
                            stations={brandable.relatedStations.slice(0, 4)}
                            device={device}
                          />
                        </div>
                      </LazyLoad>
                    </div>
                  )}
                </Fragment>
              </ScrollTracker>
              <Footer />
            </MainWrapper>
          </div>
        )}
      </div>
    </Provider>
  );
};

/**
 * propTypes
 * @property {Array} widgets - React widgets to be rendered in the page
 */
SectionRadio.propTypes = {
  widgets: PropTypes.array.isRequired,
  store: PropTypes.object.isRequired,
};

export default SectionRadio;
