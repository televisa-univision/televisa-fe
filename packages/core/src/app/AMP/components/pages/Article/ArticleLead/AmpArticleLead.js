import React from 'react';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import { getPageData } from '@univision/fe-commons/dist/store/storeHelpers';

import FullWidth from '../../../fullwidth/AmpFullWidth.styles';
import AmpInlineSlideshow from '../../HorizontalSlideshow/Layouts/Inline/AmpInlineSlideshow';
import AmpVideo from '../../../widgets/Video/AmpVideo';
import AmpInlineImage from '../../../enhancements/image/AmpInlineImage';

/**
 * ArticleLead
 * @param {Object} props component props
 * @returns {JSX}
 */
export default function ArticleLead({ lead }) {
  let child = null;
  switch (lead.type) {
    case 'image': {
      child = <AmpInlineImage {...lead} isLead />;
      break;
    }
    case 'video': {
      child = (
        <FullWidth>
          <AmpVideo {...lead} widgetData={lead} pageData={getPageData(Store)} autoplay />
        </FullWidth>
      );
      break;
    }
    case 'slideshow': {
      child = (
        <FullWidth>
          <AmpInlineSlideshow {...lead} type="inline" autoplay={false} isLead />
        </FullWidth>
      );
      break;
    }
    default:
      child = null;
  }

  return <div>{child}</div>;
}

/**
 * propTypes
 * @property {Object} lead the lead object from API
 * @property {String} lead.type the type of lead to display
 */
ArticleLead.propTypes = {
  lead: PropTypes.shape({
    type: PropTypes.oneOf(['image', 'video', 'slideshow']),
    renditions: PropTypes.shape({
      original: PropTypes.shape({
        href: PropTypes.string,
      }),
    }),
  }),
  isFullWidth: PropTypes.bool,
};

ArticleLead.defaultProps = {
  lead: {},
  isFullWidth: false,
};
