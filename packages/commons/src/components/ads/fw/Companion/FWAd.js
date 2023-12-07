import React from 'react';
import PropTypes from 'prop-types';

import AdWrapper from '../../AdWrapper';

/**
 * FWAd companion ad component
 * @param {Object} props the component props
 * @returns {XML}
 * @constructor
 */
const FWAd = ({ adSetting }) => {
  return (
    <AdWrapper>
      <span id="videocompanion" className="_fwph">
        <form id="_fw_form_videocompanion" style={{ display: 'none' }}>
          <input
            type="hidden"
            name="_fw_input_videocompanion"
            id="_fw_input_videocompanion"
            value={adSetting}
          />
        </form>
        <span id="_fw_container_videocompanion" className="_fwac " />
      </span>
    </AdWrapper>
  );
};

/**
 * propTypes
 * @type {{adSetting: *}}
 */
FWAd.propTypes = {
  adSetting: PropTypes.string,
};

export default FWAd;
