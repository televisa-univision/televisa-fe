import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { exists, isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import Link from '../Link';
import Picture from '../Picture';
import * as sizes from '../Picture/imageSizes';

import Styles from './Sponsor.styles';

const WrappedPicture = styled(Picture)`${Styles.image}`;
const Image = styled.img`${Styles.image}`;
const By = styled.span`${Styles.by}`;

/**
 * Basic building block for sponsor
 * this maybe extended depending on context
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const Sponsor = ({
  name, logo, link, className, sponsorBy, onClick, aspectRatio, hideSponsorCopy,
}) => {
  if (exists(name) || exists(logo)) {
    let image;

    if (isValidObject(logo)) {
      image = (
        <WrappedPicture
          alt={name}
          image={logo}
          deviceSizeOverrides={{
            xl: sizes.XX_SMALL,
            lg: sizes.XX_SMALL,
            md: sizes.XX_SMALL,
            sm: sizes.XX_SMALL,
            xsm: sizes.XX_SMALL,
          }}
          aspectRatio={aspectRatio}
        />
      );
    } else if (exists(logo)) {
      image = <Image src={logo} alt={name} />;
    }

    return (
      <div className={className}>
        {!hideSponsorCopy && <By className="uvs-font-b-light">{sponsorBy}</By>}
        <Link href={link} target="_blank" onClick={onClick}>
          {image || name}
        </Link>
      </div>
    );
  }
  return null;
};

/**
 * propTypes
 * @property {string} name Text of the particular icon
 * @property {string} className Text to apply additional styles to the icon (color, shadow...)
 * @property {string} link used for the sponsor
 * @property {string} logo used for the sponsor
 * @property {string} sponsorBy text as legend
 * @property {function} onClick event for the link
 */
Sponsor.propTypes = {
  aspectRatio: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string,
  logo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  className: PropTypes.string,
  sponsorBy: PropTypes.string,
  onClick: PropTypes.func,
  hideSponsorCopy: PropTypes.bool,
};

Sponsor.defaultProps = {
  sponsorBy: 'Por:',
  onClick: null,
  hideSponsorCopy: false,
};

export default Sponsor;
