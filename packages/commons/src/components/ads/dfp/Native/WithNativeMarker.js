import React from 'react';

import { exists } from '../../../../utils/helpers';

const NATIVE_AD_KEY = 'NATIVE_AD_RENDERING_KEY';

/**
 * HOC to add showNative marker
 * @param {Object} WrappedComponent to be proxy
 * @param {string} contentPropName prop to be used to inject marker
 * @param {number} position of the native
 * @returns {React.Component}
 */
export default function WithNativeMarkerHOC(WrappedComponent, contentPropName, position) {
  /**
   * HOC to add showNative marker
   * This will defined in what position the ad will be displayed
   * @param {Object} props of component
   * @returns {React.Component}
   */
  const WithNativeMarker = (props) => {
    const newProps = props;
    /* eslint-disable react/destructuring-assignment */
    const content = props[contentPropName];
    const pos = position || content.length;
    if (
      exists(content)
      && Array.isArray(content)
      && exists(content[pos - 1])
      && Object.keys(content[pos - 1]).length
    ) {
      if (contentPropName === 'contentList' || contentPropName === 'content') {
        const cardProps = newProps[contentPropName][pos - 1];
        cardProps.showNative = true;
        cardProps.nativeAdKey = NATIVE_AD_KEY;
      } else {
        const [, cardProps] = newProps[contentPropName][position - 1];
        cardProps.showNative = true;
        cardProps.nativeAdKey = NATIVE_AD_KEY;
      }
    }
    /**
     * On render it returns the ad
     * The children need to be wrapped in individual divs.
     * @returns {JSX}
     */
    return <WrappedComponent {...newProps} />;
  };
  return WithNativeMarker;
}
