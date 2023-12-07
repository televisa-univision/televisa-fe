import React from 'react';
import PropTypes from 'prop-types';

import adHelper from '../../../../utils/ads/adHelper';
import AdSettings from '../../../../utils/ads/adSettings.json';
import DFPAd from '../DFPAd';

/**
 * Wrapper to provide hide show functionality for items below flex ad units when needed
 * @access public
 * @extends {React.Component}
 */
export default class DFPAdFlexWrapper extends React.Component {
  /**
   * DFP ad generator
   * @param {Object} props React Props for this component
   * @constructor
   */
  constructor(props) {
    super(props);

    /**
     * Setting of initial state for this component
     * @type {{id: null, device: string}}
     */
    this.state = {
      displayChildren: false,
    };
    this.afterAdRenders = this.afterAdRenders.bind(this);
  }

  /**
   * Callback to hide children
   * @param {Object} event called
   */
  afterAdRenders = (event) => {
    if (event && Array.isArray(event.size) && event.size[1] <= 300) {
      this.setState({ displayChildren: true });
    }
  };

  /**
   * Render children when small ad
   * @returns {JSX}
   */
  render() {
    const {
      state: { displayChildren },
      props: { adType, children, className },
    } = this;

    if (adType) {
      const adSettings = adHelper.getSettings(AdSettings[adType]);
      if (Object.keys(adSettings).length) {
        return (
          <div className={className}>
            <DFPAd {...adSettings} hasBg={false} callback={this.afterAdRenders} />
            {displayChildren && children}
          </div>
        );
      }
    }

    return children;
  }
}

/**
 * propTypes
 * @type {{adType: Ad to be called}}
 */
DFPAdFlexWrapper.propTypes = {
  adType: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
