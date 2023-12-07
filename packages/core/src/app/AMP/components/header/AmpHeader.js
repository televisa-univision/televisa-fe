import React from 'react';
import PropTypes from 'prop-types';

import getLogo from './logos';
import { DarkHeader, LightHeader } from './AmpHeader.styles';

/**
 * Header for AMP pages
 * @param {Object} props for the component
 * @returns {XML}
 * @constructor
 */
const AmpHeader = ({ pageCategory, pageData }) => {
  const logo = getLogo(pageData, pageCategory);
  const {
    variant,
    url,
  } = logo;

  const logoOptions = {
    width: 120,
    height: 30,
    ...logo,
  };
  const Header = variant === 'dark' ? DarkHeader : LightHeader;
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
};
