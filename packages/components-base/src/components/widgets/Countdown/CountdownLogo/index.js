import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Picture from '../../../Picture';
import * as ratios from '../../../Picture/aspectRatios';
import * as sizes from '../../../Picture/imageSizes';

import Styles from './CountdownLogo.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

/**
 * A clickable item with an image in the footer
 * @param {Object} props for this component
 * @returns {JSX}
 */
const CountdownLogo = ({ className, image }) => {
  const aspectRatio = ratios.ASPECT_RATIO_ORIGINAL;
  const deviceSizeOverrides = {
    xl: sizes.X_SMALL,
    lg: sizes.X_SMALL,
    md: sizes.X_SMALL,
    sm: sizes.X_SMALL,
    xsm: sizes.XX_SMALL,
  };
  return (
    <Wrapper className={className}>
      <Picture
        image={image}
        aspectRatio={aspectRatio}
        deviceSizeOverrides={deviceSizeOverrides}
        preload={false}
      />
    </Wrapper>
  );
};

/**
 * @property {string} [className=''] - class for overriding default styles
 * @property {Object} image - logo image data
 */
CountdownLogo.propTypes = {
  className: PropTypes.string,
  image: PropTypes.shape({
    renditions: PropTypes.object,
  }),
};

CountdownLogo.defaultProps = {
  className: '',
};

export default CountdownLogo;
