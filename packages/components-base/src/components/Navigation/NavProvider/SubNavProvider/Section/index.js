import React from 'react';
import PropTypes from 'prop-types';
import { toRelativeUrl } from '@univision/fe-commons/dist/utils/helpers';
import ExposedNav from '../../../ExposedNav';
import getComponentRight from '../../helpers/getComponentRight';

/**
 * Section subnav
 * @param {Object} props of the component
 * @param {string} [brandableType] - brandable type of this section
 * @param {Array} [links] - list of links to be displayed in the exposed nav
 * @param {string} [pageUri] - current page uri
 * @param {string} [pageCategory] - current page category
 * @param {Object} [title] - object that will carry the title information
 * if it will be text only, logo or both, plus a link if necessary
 * @param {string} [contentType] current content type
 * @param {boolean} [withNavigation] if subnav should have navigation
 * @returns {JSX}
 */
const SectionSubNav = ({
  brandableType,
  links,
  pageUri,
  pageCategory,
  title,
  contentType,
  withNavigation,
}) => {
  const {
    link,
    logo,
    name,
    site,
    subtitle,
    logoMarket,
    isLocalesJob,
    isAskExperts,
    useCustomBranding,
  } = title || {};
  return (
    <ExposedNav
      componentRight={getComponentRight(brandableType, pageCategory)}
      links={links}
      logo={logo}
      logoMarket={logoMarket}
      site={site}
      title={name}
      subtitle={subtitle}
      uri={link}
      activeLink={toRelativeUrl(pageUri)}
      pageCategory={pageCategory}
      isLocalesCustom={isLocalesJob || isAskExperts}
      contentType={contentType}
      useCustomBranding={useCustomBranding}
      hideNavigation={!withNavigation}
    />
  );
};

SectionSubNav.propTypes = {
  brandableType: PropTypes.string,
  links: PropTypes.array,
  pageUri: PropTypes.string,
  pageCategory: PropTypes.string,
  title: PropTypes.object,
  contentType: PropTypes.string,
  withNavigation: PropTypes.bool,
};

export default SectionSubNav;
