import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Link from '../Link';
import Image from '../Image';

/**
 * Logo compound component.
 * {@link Link}
 * @param {Object} alt logo image
 * @param {Object} className style rules
 * @param {boolean} checkUserLocation if true, check user location before redirect
 * @param {Object} logoMap image mapping
 * @param {Object} onClick click callback
 * @param {string} site Site name
 * @param {Object} src image src
 * @param {Object} uri href path
 * @returns {JSX}
 * @constructor
 */
const Logo = ({
  alt,
  className,
  checkUserLocation,
  logoMap,
  onClick,
  src,
  site,
  uri,
}) => {
  if (!src) return null;
  const imageProps = {
    className, src, alt,
  };

  const hasMap = Array.isArray(logoMap);
  if (hasMap) {
    imageProps.useMap = `map-${imageProps.className}-${imageProps.src}`;
  }

  const image = <Image {...imageProps} />;
  let logoElement = image;

  if (hasMap) {
    logoElement = (
      <Fragment>
        {image}
        <map name={imageProps.useMap}>
          {logoMap.map(area => (
            <area
              key={`${imageProps.useMap}-${area.href}`}
              alt="Area"
              {...area}
            />
          ))}
        </map>
      </Fragment>
    );
  } else if (uri) {
    logoElement = (
      <Link
        onClick={onClick}
        href={uri}
        checkUserLocation={checkUserLocation}
        site={site}
      >
        {image}
      </Link>
    );
  }

  return logoElement;
};

/**
 * propTypes
 * @property {String} class Class name of the element
 * @property {boolean} checkUserLocation if true, check user location before redirect
 * @property {String} uri URI of the logo link
 * @property {String} src Logo source
 * @property {String} alt Alt text to render if image src doesn't load
 * @property {string} site Site name
 */
Logo.propTypes = {
  className: PropTypes.string,
  checkUserLocation: PropTypes.bool,
  uri: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClick: PropTypes.func,
  logoMap: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string,
    shape: PropTypes.string,
    coords: PropTypes.string,
    href: PropTypes.string,
  })),
  site: PropTypes.string,
};

Logo.defaultProps = {
  alt: 'Logo image',
};

export default Logo;
