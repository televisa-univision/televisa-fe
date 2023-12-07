import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { pageSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import FullWidth from '../../../FullWidth/FullWidth.styles';
import AmpInlineSlideshow from '../../HorizontalSlideshow/Layouts/Inline';
import AmpVideo from '../../../Video';
import AmpInlineImage from '../enhancements/Image';

/**
 * ArticleLead
 * @param {Object} props component props
 * @returns {JSX}
 */
export default function ArticleLead({ lead }) {
  const pageData = useSelector(pageSelector);
  let child = null;
  switch (lead.type) {
    case 'image': {
      child = <AmpInlineImage {...lead} isLead />;
      break;
    }
    case 'video': {
      child = (
        <FullWidth>
          <AmpVideo {...lead} widgetData={lead} pageData={pageData} autoplay />
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
