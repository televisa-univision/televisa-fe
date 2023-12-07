import React from 'react';
import PropTypes from 'prop-types';

import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

/**
 * AdSlide component
 */
export default class Ad extends React.Component {
  /**
   * Initialize ad visual state
   */
  constructor() {
    super();
    this.displayed = false;
  }

  /**
   * React life cycle
   * @param {Object} nextProps props
   * @returns {boolean}
   */
  shouldComponentUpdate() {
    // Helper to avoid early ad call
    return !this.displayed;
  }

  /**
   * Render component
   * @returns {JSX}
   */
  render() {
    const { active, advertisement } = this.props;

    if (active && !this.displayed) {
      this.displayed = true;

      return (
        <div>
          {exists(advertisement)
            ? advertisement
            : adHelper.getAd(AdTypes.IN_SLIDE_AD, { isLazyLoaded: false, hasBg: false })}
        </div>
      );
    }

    return null;
  }
}

Ad.propTypes = {
  active: PropTypes.bool,
  advertisement: PropTypes.object,
};
