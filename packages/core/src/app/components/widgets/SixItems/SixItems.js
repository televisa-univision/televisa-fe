import PropTypes from 'prop-types';
import React from 'react';

import Store from '@univision/fe-commons/dist/store/store';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { getTheme, getDevice, getPageData } from '@univision/fe-commons/dist/store/storeHelpers';
import PromoItem from '@univision/fe-components-base/dist/components/PromoItem';
import TopicBar from '@univision/fe-components-base/dist/components/TopicBar';
import Title from '@univision/fe-components-base/dist/components/Title';
import * as ratios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';
import { exists, getKey, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import WithNative from '@univision/fe-commons/dist/components/ads/dfp/Native/WithNativeContent';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';
import Styles from './SixItems.scss';

/**
 * Widget with Six Items.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const SixItems = ({ content, settings }) => {
  const hasTitle = hasKey(settings, 'title');
  const pageData = getPageData(Store);
  const primaryTag = getKey(pageData, 'data.primaryTag.name', undefined);

  if (exists(content) && content.length > 0) {
    const PromoWithNative = WithNative(PromoItem);
    const maxItems = 6;
    const nativeProps = {
      adType: AdTypes.TRIPLELIFT_NATIVE_AD,
    };
    // PromoItem grid 6x1 where the first item has vertical view
    const mobileStructure = content
      .filter((contentData, index) => index < maxItems)
      .map((contentData, index) => (
        <div key={content.uid} className="col-xs-12">
          <PromoWithNative
            {...contentData}
            key={contentData.uid}
            view={index !== 0 ? 'horizontal' : 'vertical'}
            onDevice="mobile"
            actualDevice={getDevice(Store)}
            {...nativeProps}
          />
        </div>
      ));
    // PromoItem grid 3x3 where all have vertical view
    const tabletStructure = content
      .filter((contentData, index) => index < maxItems)
      .map(contentData => (
        <div key={contentData.uid} className="col-sm-4">
          <PromoWithNative
            {...contentData}
            key={contentData.uid}
            onDevice="tablet"
            actualDevice={getDevice(Store)}
            {...nativeProps}
          />
        </div>
      ));
    // PromoItem grid 3x3 where three first have vertical view and the other horizontal view
    const desktopStructure = content
      .filter((contecontentDatant, index) => index < maxItems)
      .map((contentData, index) => (
        <div key={content.uid} className={`col-md-4 ${index < 3 ? Styles.aboveRow : ''}`}>
          <PromoWithNative
            {...content}
            aspectRatio={index < 3 ? ratios.ASPECT_RATIO_16X9 : ratios.ASPECT_RATIO_1X1}
            key={content.uid}
            view={index < 3 ? 'vertical' : 'horizontal'}
            theme={index < 3 ? 'light' : 'gray'}
            onDevice="desktop"
            actualDevice={getDevice(Store)}
            {...nativeProps}
          />
        </div>
      ));

    return (
      <div className={`uvs-widget ${hasTitle ? Styles.container : Styles.noTitle}`}>
        {hasTitle && (
          <TopicBar settings={settings} separator="bottom" align="center" theme={getTheme(Store)} />
        )}
        {!hasTitle
          && !!primaryTag && (
            <Title hidden element="h2">{`${localization.get('newsFrom')} ${primaryTag}`}</Title>
        )}
        <div className={`${Styles.mobile} row`}>{mobileStructure}</div>
        <div className={`${Styles.tablet} row`}>{tabletStructure}</div>
        <div className={`${Styles.desktop} row`}>{desktopStructure}</div>
      </div>
    );
  }
  return <div />;
};

/**
 * propTypes
 * @property {Array} content Array of content items to be used by this widget
 * @property {Object} settings Object with this widget's settings
 */
SixItems.propTypes = {
  content: PropTypes.array,
  settings: PropTypes.object,
};

export default SixItems;
