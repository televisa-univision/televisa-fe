import React from 'react';
import PropTypes from 'prop-types';

import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import { AD_LAYOUT_RAIL_BOTTOM, AD_LAYOUT_RAIL } from '../layouts';

/**
 * Component to render in mobile
 * @param {Object} props to be used
 * @param {Node} props.children - node children to be rendered
 * @param {function} [props.onRegisterSlot] - callback to listen ad registration
 * @param {string} [props.layout] - name of teh layout to be rendered
 * @param {string} [props.refreshable=false] - true adds ads that allows be refreshed
 * @constructor
 */
const MobileView = ({
  children,
  onRegisterSlot,
  layout,
  refreshable,
}) => {
  const mobileAd = refreshable ? AdTypes.TOP_AD_NO_FLEX : AdTypes.TOP_AD;
  return (
    <div className="uvs-widget">
      {adHelper.getAd(mobileAd, { isLazyLoaded: false, onRegisterSlot })}
      {children}
      {layout === AD_LAYOUT_RAIL_BOTTOM && (
        <div className="uvs-ad-full-width">
          {adHelper.getAd(mobileAd, {
            isLazyLoaded: true,
            onRegisterSlot,
          })}
        </div>
      )}
    </div>
  );
};

MobileView.propTypes = {
  children: PropTypes.node,
  onRegisterSlot: PropTypes.func,
  layout: PropTypes.oneOf([AD_LAYOUT_RAIL, AD_LAYOUT_RAIL_BOTTOM]),
  refreshable: PropTypes.bool,
};

MobileView.defaultProps = {
  refreshable: false,
};

export default MobileView;
