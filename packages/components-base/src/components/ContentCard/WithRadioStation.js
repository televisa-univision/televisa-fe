import React from 'react';

import { exists, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import IconWrapper from '../IconWrapper';

/**
 * HOC to proxy porps if promo is radioStation
 * @param {Oject} WrappedComponent to be proxy
 * @param {string} contentPropName prop to be used to inject marker
 * @param {number} position of the native
 * @returns {React.Component}
 */
export default function (WrappedComponent) {
  /**
   * HOC to add appropriate props to content cards if promo is radioStation
   * @param {Object} props of component
   * @returns {React.Component}
   */
  const WithRadioStation = (props) => {
    const newProps = Object.assign({}, props);
    if (newProps.type === 'radiostation') {
      if (exists(newProps.primaryTag)) {
        // Overriding tag name to always show 'Radio Station'
        newProps.primaryTag.name = localization.get('radioStation');
      }
      if (hasKey(newProps, 'radioStation.featuredStationsPromoImage')) {
        newProps.image = newProps.radioStation.featuredStationsPromoImage;
      }

      newProps.customIcon = (
        <IconWrapper iconName="radio" />
      );
    }
    /**
    * On render it returns wrapped component
    * The children need to be wrapped in individual divs.
    * @returns {JSX}
    */
    return <WrappedComponent {...newProps} />;
  };

  return WithRadioStation;
}
