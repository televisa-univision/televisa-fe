import React from 'react';
import PropTypes from 'prop-types';

import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import { AD_LAYOUT_RAIL_BOTTOM, AD_LAYOUT_RAIL } from '../layouts';
import Styles from './DesktopView.scss';

/**
 * Component to render in mobile
 * @param {Object} props to be used
 * @param {Node} props.children - node children to be rendered
 * @param {function} [props.onRegisterSlot] - callback to listen ad registration
 * @param {string} [props.layout] - name of teh layout to be rendered
 * @param {string} [props.refreshable=false] - true adds ads that allows be refreshed
 * @constructor
 */
const DesktopView = ({
  children,
  onRegisterSlot,
  layout,
  refreshable,
}) => {
  let sidebarAd = AdTypes.WIDGET_AD;
  let bottomAd = AdTypes.TOP_AD;
  if (refreshable) {
    sidebarAd = AdTypes.WIDGET_AD_REFRESHABLE;
    bottomAd = AdTypes.TOP_AD_NO_FLEX;
  }
  return (
    <div className="row uvs-widget">
      <div className={Styles.widget}>{children}</div>
      <div className={Styles.sidebar}>
        {adHelper.getAd(sidebarAd, { isLazyLoaded: false, onRegisterSlot })}
      </div>
      {layout === AD_LAYOUT_RAIL_BOTTOM && (
        <div className={`uvs-ad-full-width ${Styles.bottom}`}>
          {adHelper.getAd(bottomAd, {
            isLazyLoaded: true,
            onRegisterSlot,
          })}
        </div>
      )}
    </div>
  );
};

DesktopView.propTypes = {
  children: PropTypes.node,
  onRegisterSlot: PropTypes.func,
  layout: PropTypes.oneOf([AD_LAYOUT_RAIL, AD_LAYOUT_RAIL_BOTTOM]),
  refreshable: PropTypes.bool,
};

DesktopView.defaultProps = {
  refreshable: false,
};

export default DesktopView;
