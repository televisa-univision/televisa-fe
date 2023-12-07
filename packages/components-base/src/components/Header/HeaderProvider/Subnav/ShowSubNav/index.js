import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import Features from '@univision/fe-commons/dist/config/features';
import ShortTitle from '../../../Shows/ShortTitle';
import Breadcrumb from '../../../Shows/Breadcrumb';

/**
 * Show SubNav component
 * @param {Object} props of the component
 * @returns {JSX}
 */
const ShowSubNav = ({
  links, pageType, subNavBackground, sectionTitle, sectionUrl, variant,
}) => {
  const {
    color: backgroundColor,
    image: backgroundImage,
  } = subNavBackground;

  // For articles we always want the breadcrumb to be light
  const breadcrumbVariant = pageType === 'video' ? variant : 'light';
  const hideBreadcrumb = Features.shows.hideBreadcrumb();
  return (
    <Fragment>
      <ShortTitle
        title={sectionTitle}
        uri={sectionUrl}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
      />
      {
        !hideBreadcrumb
          && isValidArray(links) && <Breadcrumb variant={breadcrumbVariant} links={links} />
      }
    </Fragment>
  );
};

/**
 * propTypes
 * @type {{HeaderProvider: *}}
 */
ShowSubNav.propTypes = {
  links: PropTypes.array,
  pageType: PropTypes.string,
  sectionTitle: PropTypes.string,
  sectionUrl: PropTypes.string,
  subNavBackground: PropTypes.object,
  variant: PropTypes.oneOf(
    ['light', 'dark']
  ),
};

ShowSubNav.defaultProps = {
  variant: 'dark',
  subNavBackground: {},
};

export default ShowSubNav;
