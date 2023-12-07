import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ShortTitle from '../../../ShortTitle';
import getComponentRight from '../../helpers/getComponentRight';
/**
 * Default SubNav
 * @param {Object} props of the component
 * @param {string} [brandableType] - brandable type of this section
 * @param {string} contentType Page content type, from page.data.type
 * @param {string} slideshowType Vertical or Horizontal slideshow
 * @param {Object} [title] - object that will carry the title information
 * if it will be text only, logo or both, plus a link if necessary
 * @param {string} variant Light or dark variant of the content
 * @param {string} pageCategory page category
 * @returns {JSX}
 */
const ContentSubNav = ({
  brandableType,
  contentType,
  slideshowType,
  title,
  variant,
  pageCategory,
}) => {
  const {
    link,
    logo,
    name,
    site,
  } = title || {};
  return (
    <Fragment>
      <ShortTitle
        componentRight={getComponentRight(brandableType, pageCategory)}
        contentType={contentType}
        logo={logo}
        slideshowType={slideshowType}
        site={site}
        title={name}
        uri={link}
        variant={variant}
      />
    </Fragment>
  );
};

ContentSubNav.propTypes = {
  brandableType: PropTypes.string,
  contentType: PropTypes.string,
  slideshowType: PropTypes.string,
  title: PropTypes.object,
  variant: PropTypes.string,
  pageCategory: PropTypes.string,
};

export default ContentSubNav;
