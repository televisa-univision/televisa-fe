import React from 'react';
import PropTypes from 'prop-types';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import FullWidth from '../../fullwidth/AmpFullWidth.styles';
import { Caption, Credit } from './AmpInlineImage.styles';

/**
 * InlineImage to be rendered with or without caption
 * inline with other page content
 * @param {Object} image the image renditions
 * @param {string} caption the image description
 * @param {string} credit image attribution
 * @returns {JSX}
 */
const InlineImage = ({
  caption,
  credit,
  renditions,
  isLead,
}) => {
  const img = <amp-img src={getKey(renditions, '16x9-mobile.href')} width="400" height="225" layout="responsive" alt="an image" />;
  return (
    <>
      <FullWidth>
        {img}
      </FullWidth>
      {caption && (
        <Caption isLead={isLead}>
          <span>{caption}</span>
          {credit && <Credit>{localization.get('credit')}: {credit}</Credit>}
        </Caption>
      )}
    </>
  );
};

InlineImage.propTypes = {
  caption: PropTypes.string,
  credit: PropTypes.string,
  renditions: PropTypes.object.isRequired,
  isLead: PropTypes.bool,
};

InlineImage.defaultProps = {
  isLead: false,
};

export default InlineImage;
