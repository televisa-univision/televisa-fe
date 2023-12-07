import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import DFPAdsProvider from '../DFPAdsProvider';
import BKPIndicator from '../../../breakpoint/BreakPointIndicator';
import { pageData } from '../../../../config/storyMocks';
import WithNativeContent from './WithNativeContent';
import WithNativeMarker from './WithNativeMarker';
import Styles from './WithNative.stories.scss';
import * as AdTypes from '../../../../utils/ads/ad-types';

/**
 * Sample component
 * @param {array} content to be displayed
 * @returns {Object}
 */
const GridCmp = ({ content }) => content.map(item => (
  <div className={Styles.wrapper}>
    {Object.keys(item).map(key => (
      <p>
        {key}
        {' '}
-
        {item[key].toString()}
      </p>
    ))}
  </div>
));

storiesOf('Ads/WithNativeMarker HOC', module)
  .add(
    'default component',
    withInfo('Simple grid component')(() => {
      const sampleContent = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
      return <GridCmp content={sampleContent} />;
    })
  )
  .add(
    'with native marker in 3 position',
    withInfo('Marker for native ad')(() => {
      const sampleContent = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
      const GridWithNativeMarker = WithNativeMarker(GridCmp, 'content', 3);
      return <GridWithNativeMarker content={sampleContent} />;
    })
  )
  .add('with tripleLift native content in 1 position', () => {
    /**
     * Sample item component
     * @returns {Object}
     */
    const ItemCpm = () => <div className={Styles.block} />;

    /**
     * Sample component
     * @param {array} content to be displayed
     * @returns {Object}
     */
    const GridWithNativeCmp = ({ content }) => {
      const ItemWidthNativeContent = WithNativeContent(ItemCpm);
      return content.map(item => (
        <div className={Styles.wrapper}>
          <ItemWidthNativeContent
            {...item}
            onDevice="mobile"
            actualDevice="mobile"
            adType={AdTypes.TRIPLELIFT_NATIVE_AD}
            oneTimeCall={false}
          />
        </div>
      ));
    };
    const sampleContent = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    const GridWithNativeMarker = WithNativeMarker(GridWithNativeCmp, 'content', 1);
    return (
      <div>
        <BKPIndicator />
        <DFPAdsProvider
          env={pageData.env}
          settings={pageData.data.adSettings}
          requestParams={pageData.requestParams}
          contentType={pageData.data.type}
        >
          <GridWithNativeMarker content={sampleContent} />
        </DFPAdsProvider>
      </div>
    );
  })
  .add('with regular json native content in 2 position', () => {
    /**
     * Sample item component
     * @returns {Object}
     */
    const ItemCpm = () => <div className={Styles.block} />;

    /**
     * Sample component
     * @param {array} content to be displayed
     * @returns {Object}
     */
    const GridWithNativeCmp = ({ content }) => {
      const ItemWidthNativeContent = WithNativeContent(ItemCpm);
      // uvsNativeAdItem need to be defined to be able to override fter calliing ad
      if (typeof window !== 'undefined') {
        window.uvsNativeAdItem = {};
      }

      return content.map(item => (
        <div className={Styles.wrapper}>
          <ItemWidthNativeContent
            {...item}
            onDevice="mobile"
            actualDevice="mobile"
            adType={AdTypes.NATIVE_AD}
            oneTimeCall={false}
          />
        </div>
      ));
    };
    GridWithNativeCmp.propTypes = {
      content: PropTypes.array,
    };

    const sampleContent = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    const GridWithNativeMarker = WithNativeMarker(GridWithNativeCmp, 'content', 2);
    return (
      <div>
        <BKPIndicator />
        <DFPAdsProvider
          env={pageData.env}
          settings={pageData.data.adSettings}
          requestParams={pageData.requestParams}
          contentType={pageData.data.type}
        >
          <GridWithNativeMarker content={sampleContent} />
        </DFPAdsProvider>
      </div>
    );
  });
