import PropTypes from 'prop-types';
import React from 'react';
import Store from '../../../../store/store';
import * as Actions from '../../../../store/actions/ads-actions';
import dfpManager from '../../../../utils/ads/dfpManager';
import { asDeferrer } from '../../../../utils/deferrer';
import thirdPartyFeatures from '../../../../config/features/thirdParties';

/**
 * DFP Ad wrapper component
 * @access public
 * @extends {React.Component}
 */
@asDeferrer
class DFPAd extends React.Component {
  /**
   * Call displays methods after all ads got mounted
   */
  componentDidMount() {
    // Let's defer the prefetch of the ads so the main thread can complete
    // any pending paint, redraw, etc
    if (!thirdPartyFeatures.isDFPDisabled()) {
      this.defer(() => {
        Store.dispatch(Actions.displayAdsAboveTheFold());
        dfpManager.preFetchAds();
      });
    }
  }

  /**
   * Component wrapper to sync ads status using {@link dfpManager}
   * @returns {JSX}
   */
  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Array} children Children elements passed to this component
 */
DFPAd.propTypes = {
  children: PropTypes.node,
};

export default DFPAd;
