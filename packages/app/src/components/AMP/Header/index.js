import React from 'react';
import PropTypes from 'prop-types';

import getLogo from './logos';
import { DarkHeader, LightHeader, CustomHeader } from './Header.styles';

/**
 * Header for AMP pages
 * @param {Object} props for the component
 * @returns {XML}
 * @constructor
 */
const AmpHeader = ({
 pageCategory,
 pageData,
 siteName,
 theme,
}) => {
  const logo = getLogo(pageData, pageCategory, siteName);
  const {
    variant,
    url,
  } = logo;

  const logoOptions = {
    width: 120,
    height: 30,
    ...logo,
  };

  let Header = variant === 'dark' ? DarkHeader : LightHeader;
  if (theme?.ampHeaderBackgroundColor) {
    Header = CustomHeader({ theme });
  }

  return (
    <Header>
      <a href={url}>
        <amp-img
          width={logoOptions.width}
          height={logoOptions.height}
          src={logoOptions.src}
        />
      </a>
    </Header>
  );
};

export default AmpHeader;

AmpHeader.propTypes = {
  pageCategory: PropTypes.string,
  pageData: PropTypes.object,
  siteName: PropTypes.string,
  theme: PropTypes.object,
};
